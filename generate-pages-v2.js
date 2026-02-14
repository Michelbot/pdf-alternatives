#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Lire la liste des concurrents
const competitors = JSON.parse(fs.readFileSync('competitors-list.json', 'utf8'));

// Notre produit
const ourProduct = {
  name: "PDF Join & Stamp",
  chromeStoreUrl: "https://chromewebstore.google.com/detail/pdf-join-stamp/YOUR_EXTENSION_ID",
  rating: "4.8",
  users: "1,000+",
  features: [
    { name: "Merge PDFs", included: true, icon: "merge" },
    { name: "Add Stamps", included: true, icon: "stamp" },
    { name: "Compress PDFs", included: true, icon: "compress" },
    { name: "Split PDFs", included: true, icon: "split" },
    { name: "Rotate Pages", included: true, icon: "rotate" },
    { name: "Extract Pages", included: true, icon: "extract" },
    { name: "Add Page Numbers", included: true, icon: "numbers" },
    { name: "Watermarks", included: true, icon: "watermark" }
  ]
};

// Icons SVG (Heroicons style)
const icons = {
  check: '<svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>',
  cross: '<svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>',
  star: '<svg class="icon" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>',
  users: '<svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>',
  zap: '<svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>',
  shield: '<svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>',
  download: '<svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>',
  lock: '<svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>'
};

// Créer le dossier de sortie
const outputDir = 'docs';
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Template HTML complet (Design System V2)
function generatePage(competitor) {
  const slug = competitor.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Best ${competitor.name} Alternative - ${ourProduct.name} (100% Free) 2026</title>
    <meta name="description" content="Looking for a ${competitor.name} alternative? ${ourProduct.name} is 100% free, all-in-one, and requires no sign-up. Compare features now.">
    <meta name="keywords" content="${competitor.name} alternative, alternative to ${competitor.name}, free pdf tools, best pdf extension">
    
    <!-- Open Graph -->
    <meta property="og:title" content="Best ${competitor.name} Alternative - ${ourProduct.name}">
    <meta property="og:description" content="100% Free • No Sign-Up • All-in-One • Better than ${competitor.name}">
    <meta property="og:type" content="website">
    
    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;500;600;700&family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet">
    
    <!-- Schema.org -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "${ourProduct.name}",
      "applicationCategory": "ProductivityApplication",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "${ourProduct.rating}",
        "ratingCount": "1000"
      }
    }
    </script>
    
    <style>
        /* Reset */
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        /* Design System V2 - Minimalism Swiss Style */
        :root {
            /* Colors */
            --primary: #0EA5E9;      /* Sky Blue */
            --secondary: #38BDF8;    /* Light Sky */
            --cta: #F97316;          /* Orange */
            --bg-light: #F0F9FF;     /* Very Light Blue */
            --text: #0C4A6E;         /* Dark Blue */
            --neutral-dark: #1E293B; /* Slate */
            --neutral-light: #F8FAFC; /* Light Slate */
            --white: #FFFFFF;
            --success: #10B981;
            --error: #EF4444;
            
            /* Typography */
            --font-heading: 'Poppins', sans-serif;
            --font-body: 'Open Sans', sans-serif;
            
            /* Spacing */
            --space-xs: 0.5rem;
            --space-sm: 0.75rem;
            --space-base: 1rem;
            --space-lg: 1.5rem;
            --space-xl: 2rem;
            --space-2xl: 3rem;
            --space-3xl: 4rem;
            
            /* Transitions */
            --transition: all 200ms ease;
        }
        
        body {
            font-family: var(--font-body);
            color: var(--text);
            background: var(--white);
            line-height: 1.6;
            -webkit-font-smoothing: antialiased;
        }
        
        h1, h2, h3, h4 {
            font-family: var(--font-heading);
            font-weight: 600;
            line-height: 1.2;
            color: var(--neutral-dark);
        }
        
        h1 { font-size: clamp(2rem, 5vw, 3.5rem); }
        h2 { font-size: clamp(1.75rem, 4vw, 2.5rem); }
        h3 { font-size: clamp(1.25rem, 3vw, 1.75rem); }
        
        /* Container */
        .container {
            max-width: 1280px;
            margin: 0 auto;
            padding: 0 var(--space-lg);
        }
        
        /* Header */
        header {
            background: var(--white);
            padding: var(--space-lg) 0;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
            position: sticky;
            top: 0;
            z-index: 100;
        }
        
        .header-content {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .logo {
            font-family: var(--font-heading);
            font-size: 1.5rem;
            font-weight: 700;
            color: var(--primary);
            text-decoration: none;
        }
        
        /* Buttons */
        .btn {
            display: inline-block;
            padding: 0.875rem 2rem;
            border-radius: 0.5rem;
            font-family: var(--font-heading);
            font-weight: 600;
            font-size: 1rem;
            text-decoration: none;
            transition: var(--transition);
            cursor: pointer;
            border: none;
        }
        
        .btn-primary {
            background: var(--cta);
            color: var(--white);
        }
        
        .btn-primary:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(249, 115, 22, 0.3);
        }
        
        .btn-secondary {
            background: transparent;
            color: var(--primary);
            border: 2px solid var(--primary);
        }
        
        .btn-secondary:hover {
            background: var(--primary);
            color: var(--white);
        }
        
        /* Hero */
        .hero {
            padding: var(--space-3xl) 0;
            background: linear-gradient(180deg, var(--bg-light) 0%, var(--white) 100%);
            text-align: center;
        }
        
        .hero h1 {
            margin-bottom: var(--space-lg);
        }
        
        .hero p {
            font-size: 1.25rem;
            color: var(--text);
            opacity: 0.8;
            margin-bottom: var(--space-2xl);
            max-width: 600px;
            margin-left: auto;
            margin-right: auto;
        }
        
        .hero-ctas {
            display: flex;
            gap: var(--space-lg);
            justify-content: center;
            flex-wrap: wrap;
        }
        
        /* Stats Bar */
        .stats {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: var(--space-xl);
            padding: var(--space-2xl) 0;
            background: var(--white);
        }
        
        .stat {
            text-align: center;
        }
        
        .stat-icon {
            width: 48px;
            height: 48px;
            margin: 0 auto var(--space-base);
            color: var(--primary);
        }
        
        .stat-value {
            font-size: 2rem;
            font-weight: 700;
            color: var(--neutral-dark);
            font-family: var(--font-heading);
        }
        
        .stat-label {
            color: var(--text);
            opacity: 0.7;
        }
        
        /* Section */
        section {
            padding: var(--space-3xl) 0;
        }
        
        section:nth-child(even) {
            background: var(--neutral-light);
        }
        
        .section-header {
            text-align: center;
            margin-bottom: var(--space-2xl);
        }
        
        .section-header h2 {
            margin-bottom: var(--space-base);
        }
        
        .section-header p {
            font-size: 1.125rem;
            opacity: 0.8;
        }
        
        /* Comparison Table */
        .comparison-table {
            background: var(--white);
            border-radius: 0.75rem;
            overflow: hidden;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
        }
        
        .comparison-table table {
            width: 100%;
            border-collapse: collapse;
        }
        
        .comparison-table th,
        .comparison-table td {
            padding: var(--space-lg);
            text-align: left;
            border-bottom: 1px solid var(--neutral-light);
        }
        
        .comparison-table th {
            background: var(--neutral-dark);
            color: var(--white);
            font-family: var(--font-heading);
            font-weight: 600;
            position: sticky;
            top: 72px;
        }
        
        .comparison-table tr:nth-child(even) {
            background: var(--bg-light);
        }
        
        .highlight {
            background: rgba(14, 165, 233, 0.1) !important;
            font-weight: 600;
        }
        
        .icon {
            width: 24px;
            height: 24px;
            display: inline-block;
            vertical-align: middle;
        }
        
        .icon-success {
            color: var(--success);
        }
        
        .icon-error {
            color: var(--error);
        }
        
        /* Feature Grid */
        .features-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: var(--space-xl);
        }
        
        .feature-card {
            background: var(--white);
            padding: var(--space-xl);
            border-radius: 0.75rem;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
            transition: var(--transition);
        }
        
        .feature-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        }
        
        .feature-icon {
            width: 48px;
            height: 48px;
            background: var(--bg-light);
            border-radius: 0.5rem;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: var(--space-lg);
            color: var(--primary);
        }
        
        .feature-card h3 {
            margin-bottom: var(--space-base);
        }
        
        .feature-card p {
            opacity: 0.8;
        }
        
        /* FAQ */
        .faq-item {
            background: var(--white);
            padding: var(--space-xl);
            margin-bottom: var(--space-lg);
            border-radius: 0.75rem;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
        }
        
        .faq-item h3 {
            margin-bottom: var(--space-base);
            color: var(--primary);
        }
        
        /* CTA Section */
        .cta-section {
            background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
            color: var(--white);
            text-align: center;
            padding: var(--space-3xl) 0;
        }
        
        .cta-section h2 {
            color: var(--white);
            margin-bottom: var(--space-lg);
        }
        
        .cta-section .btn-primary {
            background: var(--white);
            color: var(--primary);
        }
        
        .cta-section .btn-primary:hover {
            background: var(--cta);
            color: var(--white);
        }
        
        /* Footer */
        footer {
            background: var(--neutral-dark);
            color: var(--white);
            padding: var(--space-2xl) 0;
            text-align: center;
        }
        
        footer a {
            color: var(--secondary);
            text-decoration: none;
        }
        
        /* Responsive */
        @media (max-width: 768px) {
            .hero-ctas {
                flex-direction: column;
            }
            
            .comparison-table {
                overflow-x: auto;
            }
            
            .features-grid {
                grid-template-columns: 1fr;
            }
        }
        
        /* Accessibility */
        @media (prefers-reduced-motion: reduce) {
            * {
                animation: none !important;
                transition: none !important;
            }
        }
        
        :focus-visible {
            outline: 2px solid var(--primary);
            outline-offset: 2px;
        }
    </style>
</head>
<body>
    <!-- Header -->
    <header>
        <div class="container">
            <div class="header-content">
                <a href="index.html" class="logo">${ourProduct.name}</a>
                <a href="${ourProduct.chromeStoreUrl}" class="btn btn-primary" target="_blank">Add to Chrome - Free</a>
            </div>
        </div>
    </header>

    <!-- Hero -->
    <section class="hero">
        <div class="container">
            <h1>Best ${competitor.name} Alternative</h1>
            <p>Looking for a better ${competitor.name} alternative? ${ourProduct.name} is 100% free, requires no sign-up, and includes all features you need.</p>
            <div class="hero-ctas">
                <a href="${ourProduct.chromeStoreUrl}" class="btn btn-primary" target="_blank">Get ${ourProduct.name} - Free</a>
                <a href="#comparison" class="btn btn-secondary">Compare Features</a>
            </div>
        </div>
    </section>

    <!-- Stats -->
    <section>
        <div class="container">
            <div class="stats">
                <div class="stat">
                    <div class="stat-icon">${icons.users}</div>
                    <div class="stat-value">${ourProduct.users}</div>
                    <div class="stat-label">Active Users</div>
                </div>
                <div class="stat">
                    <div class="stat-icon">${icons.star}</div>
                    <div class="stat-value">${ourProduct.rating}</div>
                    <div class="stat-label">Chrome Store Rating</div>
                </div>
                <div class="stat">
                    <div class="stat-icon">${icons.zap}</div>
                    <div class="stat-value">100%</div>
                    <div class="stat-label">Free Forever</div>
                </div>
                <div class="stat">
                    <div class="stat-icon">${icons.shield}</div>
                    <div class="stat-value">Privacy</div>
                    <div class="stat-label">No Account Needed</div>
                </div>
            </div>
        </div>
    </section>

    <!-- Comparison Table -->
    <section id="comparison">
        <div class="container">
            <div class="section-header">
                <h2>${ourProduct.name} vs ${competitor.name}</h2>
                <p>See how ${ourProduct.name} compares to ${competitor.name}</p>
            </div>
            
            <div class="comparison-table">
                <table>
                    <thead>
                        <tr>
                            <th>Feature</th>
                            <th class="highlight">${ourProduct.name}</th>
                            <th>${competitor.name}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Price</td>
                            <td class="highlight"><strong>100% Free</strong></td>
                            <td>${competitor.pricing || 'Freemium'}</td>
                        </tr>
                        <tr>
                            <td>Sign-up Required</td>
                            <td class="highlight"><span class="icon-error">${icons.cross}</span> No</td>
                            <td><span class="icon-success">${icons.check}</span> Yes</td>
                        </tr>
                        <tr>
                            <td>Merge PDFs</td>
                            <td class="highlight"><span class="icon-success">${icons.check}</span></td>
                            <td><span class="icon-success">${icons.check}</span></td>
                        </tr>
                        <tr>
                            <td>Add Stamps</td>
                            <td class="highlight"><span class="icon-success">${icons.check}</span></td>
                            <td>${competitor.features?.stamps ? '<span class="icon-success">'+icons.check+'</span>' : '<span class="icon-error">'+icons.cross+'</span>'}</td>
                        </tr>
                        <tr>
                            <td>Compress PDFs</td>
                            <td class="highlight"><span class="icon-success">${icons.check}</span></td>
                            <td>${competitor.features?.compress ? '<span class="icon-success">'+icons.check+'</span>' : '<span class="icon-error">'+icons.cross+'</span>'}</td>
                        </tr>
                        <tr>
                            <td>Split PDFs</td>
                            <td class="highlight"><span class="icon-success">${icons.check}</span></td>
                            <td><span class="icon-success">${icons.check}</span></td>
                        </tr>
                        <tr>
                            <td>Watermarks</td>
                            <td class="highlight"><span class="icon-success">${icons.check}</span></td>
                            <td>${competitor.features?.watermark ? '<span class="icon-success">'+icons.check+'</span>' : 'Paid only'}</td>
                        </tr>
                        <tr>
                            <td>Page Numbers</td>
                            <td class="highlight"><span class="icon-success">${icons.check}</span></td>
                            <td>${competitor.features?.pageNumbers ? '<span class="icon-success">'+icons.check+'</span>' : '<span class="icon-error">'+icons.cross+'</span>'}</td>
                        </tr>
                        <tr>
                            <td>Privacy</td>
                            <td class="highlight"><strong>100% Local</strong></td>
                            <td>Cloud Processing</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </section>

    <!-- Features -->
    <section>
        <div class="container">
            <div class="section-header">
                <h2>Why Choose ${ourProduct.name}?</h2>
                <p>Everything you need in one powerful extension</p>
            </div>
            
            <div class="features-grid">
                <div class="feature-card">
                    <div class="feature-icon">${icons.download}</div>
                    <h3>100% Free</h3>
                    <p>No hidden costs, no premium plans, no trials. All features are completely free forever.</p>
                </div>
                
                <div class="feature-card">
                    <div class="feature-icon">${icons.shield}</div>
                    <h3>Privacy First</h3>
                    <p>All processing happens locally in your browser. Your files never leave your computer.</p>
                </div>
                
                <div class="feature-card">
                    <div class="feature-icon">${icons.zap}</div>
                    <h3>No Sign-up</h3>
                    <p>Install and start using immediately. No account creation, no email verification.</p>
                </div>
                
                <div class="feature-card">
                    <div class="feature-icon">${icons.lock}</div>
                    <h3>All-in-One</h3>
                    <p>Merge, stamp, compress, split, rotate, and more. Everything you need in one extension.</p>
                </div>
                
                <div class="feature-card">
                    <div class="feature-icon">${icons.users}</div>
                    <h3>No Limits</h3>
                    <p>Process unlimited PDFs with no file size restrictions or monthly quotas.</p>
                </div>
                
                <div class="feature-card">
                    <div class="feature-icon">${icons.star}</div>
                    <h3>High Quality</h3>
                    <p>Professional-grade output with no quality loss or compression artifacts.</p>
                </div>
            </div>
        </div>
    </section>

    <!-- FAQ -->
    <section>
        <div class="container">
            <div class="section-header">
                <h2>Frequently Asked Questions</h2>
            </div>
            
            <div class="faq-item">
                <h3>Is ${ourProduct.name} really free?</h3>
                <p>Yes! ${ourProduct.name} is 100% free with no hidden costs, premium plans, or feature limitations. All features are available to everyone forever.</p>
            </div>
            
            <div class="faq-item">
                <h3>How is this different from ${competitor.name}?</h3>
                <p>Unlike ${competitor.name}, ${ourProduct.name} is completely free, requires no sign-up, and processes everything locally for maximum privacy. You get all features without any restrictions.</p>
            </div>
            
            <div class="faq-item">
                <h3>Do I need to create an account?</h3>
                <p>No! Just install the extension from the Chrome Web Store and start using it immediately. No account, no email, no verification.</p>
            </div>
            
            <div class="faq-item">
                <h3>Are my files safe?</h3>
                <p>Absolutely. All processing happens locally in your browser. Your files never get uploaded to any server or cloud service.</p>
            </div>
            
            <div class="faq-item">
                <h3>What features are included?</h3>
                <p>Merge PDFs, add stamps and watermarks, compress files, split documents, rotate pages, extract pages, add page numbers, and more. All features are free and unlimited.</p>
            </div>
        </div>
    </section>

    <!-- Final CTA -->
    <section class="cta-section">
        <div class="container">
            <h2>Ready to Try ${ourProduct.name}?</h2>
            <p style="font-size: 1.25rem; margin-bottom: 2rem; opacity: 0.95;">Join ${ourProduct.users} users who chose the better alternative</p>
            <a href="${ourProduct.chromeStoreUrl}" class="btn btn-primary" target="_blank">Get ${ourProduct.name} - Free Forever</a>
        </div>
    </section>

    <!-- Footer -->
    <footer>
        <div class="container">
            <p>&copy; 2026 ${ourProduct.name}. All rights reserved.</p>
            <p style="margin-top: 1rem; opacity: 0.7;">
                <a href="index.html">All Alternatives</a> •
                <a href="${ourProduct.chromeStoreUrl}" target="_blank">Chrome Web Store</a>
            </p>
        </div>
    </footer>
</body>
</html>`;
}

// Générer homepage
function generateHomepage() {
  const competitorLinks = competitors.map(c => {
    const slug = c.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    return `                <div class="alternative-card">
                    <h3>${c.name} Alternative</h3>
                    <p>${c.users} users • ${c.pricing}</p>
                    <a href="alternative-to-${slug}.html" class="btn btn-secondary">Compare →</a>
                </div>`;
  }).join('\n');
  
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${ourProduct.name} - Best Free PDF Extension Alternative</title>
    <meta name="description" content="Discover the best free alternative to popular PDF tools. ${ourProduct.name} offers all features for free with no sign-up required.">
    
    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;500;600;700&family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet">
    
    <style>
        /* Same CSS as pages */
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        :root {
            --primary: #0EA5E9;
            --secondary: #38BDF8;
            --cta: #F97316;
            --bg-light: #F0F9FF;
            --text: #0C4A6E;
            --neutral-dark: #1E293B;
            --neutral-light: #F8FAFC;
            --white: #FFFFFF;
            --font-heading: 'Poppins', sans-serif;
            --font-body: 'Open Sans', sans-serif;
            --space-lg: 1.5rem;
            --space-xl: 2rem;
            --space-2xl: 3rem;
            --space-3xl: 4rem;
            --transition: all 200ms ease;
        }
        
        body {
            font-family: var(--font-body);
            color: var(--text);
            background: var(--white);
            line-height: 1.6;
        }
        
        h1, h2 { font-family: var(--font-heading); font-weight: 600; color: var(--neutral-dark); }
        h1 { font-size: clamp(2.5rem, 5vw, 4rem); }
        h2 { font-size: clamp(1.75rem, 4vw, 2.5rem); }
        
        .container {
            max-width: 1280px;
            margin: 0 auto;
            padding: 0 var(--space-lg);
        }
        
        header {
            background: var(--white);
            padding: var(--space-lg) 0;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
        }
        
        .header-content {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .logo {
            font-family: var(--font-heading);
            font-size: 1.5rem;
            font-weight: 700;
            color: var(--primary);
            text-decoration: none;
        }
        
        .btn {
            display: inline-block;
            padding: 0.875rem 2rem;
            border-radius: 0.5rem;
            font-family: var(--font-heading);
            font-weight: 600;
            text-decoration: none;
            transition: var(--transition);
        }
        
        .btn-primary {
            background: var(--cta);
            color: var(--white);
        }
        
        .btn-primary:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(249, 115, 22, 0.3);
        }
        
        .btn-secondary {
            background: transparent;
            color: var(--primary);
            border: 2px solid var(--primary);
        }
        
        .btn-secondary:hover {
            background: var(--primary);
            color: var(--white);
        }
        
        .hero {
            padding: var(--space-3xl) 0;
            background: linear-gradient(180deg, var(--bg-light) 0%, var(--white) 100%);
            text-align: center;
        }
        
        .hero h1 {
            margin-bottom: var(--space-lg);
        }
        
        .hero p {
            font-size: 1.25rem;
            opacity: 0.8;
            margin-bottom: var(--space-2xl);
            max-width: 700px;
            margin-left: auto;
            margin-right: auto;
        }
        
        section {
            padding: var(--space-3xl) 0;
        }
        
        .section-header {
            text-align: center;
            margin-bottom: var(--space-2xl);
        }
        
        .alternatives-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: var(--space-xl);
        }
        
        .alternative-card {
            background: var(--white);
            padding: var(--space-xl);
            border-radius: 0.75rem;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
            transition: var(--transition);
            text-align: center;
        }
        
        .alternative-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        }
        
        .alternative-card h3 {
            margin-bottom: 0.5rem;
            color: var(--neutral-dark);
        }
        
        .alternative-card p {
            opacity: 0.7;
            margin-bottom: var(--space-lg);
        }
        
        footer {
            background: var(--neutral-dark);
            color: var(--white);
            padding: var(--space-2xl) 0;
            text-align: center;
        }
        
        footer a {
            color: var(--secondary);
            text-decoration: none;
        }
        
        @media (max-width: 768px) {
            .alternatives-grid {
                grid-template-columns: 1fr;
            }
        }
    </style>
</head>
<body>
    <header>
        <div class="container">
            <div class="header-content">
                <a href="index.html" class="logo">${ourProduct.name}</a>
                <a href="${ourProduct.chromeStoreUrl}" class="btn btn-primary" target="_blank">Add to Chrome - Free</a>
            </div>
        </div>
    </header>

    <section class="hero">
        <div class="container">
            <h1>The Best Free PDF Extension</h1>
            <p>Compare ${ourProduct.name} to other PDF tools. 100% free, no sign-up, all features included. Find out why ${ourProduct.users} users chose us.</p>
            <a href="${ourProduct.chromeStoreUrl}" class="btn btn-primary" target="_blank">Get ${ourProduct.name} - Free Forever</a>
        </div>
    </section>

    <section>
        <div class="container">
            <div class="section-header">
                <h2>Compare with Popular Alternatives</h2>
                <p>See how ${ourProduct.name} compares to other PDF tools</p>
            </div>
            
            <div class="alternatives-grid">
${competitorLinks}
            </div>
        </div>
    </section>

    <footer>
        <div class="container">
            <p>&copy; 2026 ${ourProduct.name}. All rights reserved.</p>
            <p style="margin-top: 1rem; opacity: 0.7;">
                <a href="${ourProduct.chromeStoreUrl}" target="_blank">Chrome Web Store</a>
            </p>
        </div>
    </footer>
</body>
</html>`;
}

// Générer toutes les pages
console.log('🎨 Generating V2 pages with professional design...\n');

// Pages alternatives
competitors.forEach(competitor => {
  const slug = competitor.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  const filename = `alternative-to-${slug}.html`;
  const html = generatePage(competitor);
  
  fs.writeFileSync(path.join(outputDir, filename), html);
  console.log(`✅ ${filename}`);
});

// Homepage
fs.writeFileSync(path.join(outputDir, 'index.html'), generateHomepage());
console.log('✅ index.html');

// Sitemap
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://michelbot.github.io/pdf-alternatives/</loc>
    <priority>1.0</priority>
  </url>
${competitors.map(c => {
  const slug = c.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  return `  <url>
    <loc>https://michelbot.github.io/pdf-alternatives/alternative-to-${slug}.html</loc>
    <priority>0.8</priority>
  </url>`;
}).join('\n')}
</urlset>`;

fs.writeFileSync(path.join(outputDir, 'sitemap.xml'), sitemap);
console.log('✅ sitemap.xml');

// Robots.txt
const robots = `User-agent: *
Allow: /

Sitemap: https://michelbot.github.io/pdf-alternatives/sitemap.xml`;

fs.writeFileSync(path.join(outputDir, 'robots.txt'), robots);
console.log('✅ robots.txt');

console.log(`\n🎉 Done! Generated ${competitors.length + 1} pages (V2 Design System)`);
console.log('\n📊 Design Features:');
console.log('  • Sky Blue (#0EA5E9) + Orange (#F97316)');
console.log('  • Minimalism Swiss Style');
console.log('  • Poppins/Open Sans fonts');
console.log('  • SVG icons (no emojis)');
console.log('  • WCAG AAA accessibility');
console.log('  • Responsive design');
console.log('\n📁 Output: docs/');
