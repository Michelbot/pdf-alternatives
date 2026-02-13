#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Lire la liste des concurrents
const competitors = JSON.parse(fs.readFileSync('competitors-list.json', 'utf8'));

// Créer le dossier de sortie
const outputDir = 'pages';
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Template HTML pour chaque page
function generatePage(competitor) {
  const slug = competitor.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  
  return `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Alternative à ${competitor.name} - Meilleure Extension PDF Gratuite 2026</title>
    <meta name="description" content="Cherchez une alternative à ${competitor.name} ? PDF Join & Stamp est 100% gratuit, tout-en-un, et ne nécessite aucune inscription. Comparez maintenant.">
    <meta name="keywords" content="${competitor.name} alternative, alternative ${competitor.name}, ${competitor.name} gratuit, meilleure extension pdf">
    
    <!-- Open Graph -->
    <meta property="og:title" content="Alternative à ${competitor.name} - PDF Join & Stamp (Gratuit)">
    <meta property="og:description" content="100% gratuit • Sans inscription • Tout-en-un • Meilleure alternative à ${competitor.name}">
    <meta property="og:type" content="website">
    
    <!-- Schema.org -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "PDF Join & Stamp",
      "applicationCategory": "ProductivityApplication",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "ratingCount": "1000"
      }
    }
    </script>
    
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            line-height: 1.6;
            color: #333;
            background: #f8f9fa;
        }
        .container { max-width: 1200px; margin: 0 auto; padding: 20px; }
        header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 60px 20px;
            text-align: center;
        }
        h1 { font-size: 2.5em; margin-bottom: 20px; }
        .subtitle { font-size: 1.2em; opacity: 0.9; }
        .comparison {
            background: white;
            border-radius: 10px;
            padding: 40px;
            margin: 40px 0;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin: 30px 0;
        }
        th, td {
            padding: 15px;
            text-align: left;
            border-bottom: 1px solid #eee;
        }
        th {
            background: #f8f9fa;
            font-weight: 600;
        }
        .winner { background: #d4edda; font-weight: bold; }
        .cta {
            background: #28a745;
            color: white;
            padding: 20px 40px;
            border-radius: 50px;
            text-decoration: none;
            display: inline-block;
            font-size: 1.2em;
            font-weight: bold;
            margin: 20px 0;
            transition: transform 0.2s;
        }
        .cta:hover { transform: scale(1.05); }
        .features {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
            margin: 40px 0;
        }
        .feature-card {
            background: white;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .feature-card h3 { color: #667eea; margin-bottom: 10px; }
        .badge {
            display: inline-block;
            padding: 5px 15px;
            background: #28a745;
            color: white;
            border-radius: 20px;
            font-size: 0.9em;
            margin: 5px;
        }
        footer {
            background: #2c3e50;
            color: white;
            padding: 40px 20px;
            text-align: center;
            margin-top: 60px;
        }
    </style>
</head>
<body>
    <header>
        <div class="container">
            <h1>🎯 Meilleure Alternative à ${competitor.name}</h1>
            <p class="subtitle">Pourquoi PDF Join & Stamp est la meilleure alternative gratuite en 2026</p>
        </div>
    </header>

    <div class="container">
        <div class="comparison">
            <h2>⚡ Pourquoi choisir PDF Join & Stamp ?</h2>
            
            <table>
                <thead>
                    <tr>
                        <th>Fonctionnalité</th>
                        <th>PDF Join & Stamp</th>
                        <th>${competitor.name}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Prix</td>
                        <td class="winner">✅ 100% GRATUIT</td>
                        <td>❌ Freemium / Payant</td>
                    </tr>
                    <tr>
                        <td>Inscription requise</td>
                        <td class="winner">✅ Aucune</td>
                        <td>❌ Obligatoire</td>
                    </tr>
                    <tr>
                        <td>Fusion PDF</td>
                        <td class="winner">✅ Illimité</td>
                        <td>⚠️ Limité sans premium</td>
                    </tr>
                    <tr>
                        <td>Tamponnage</td>
                        <td class="winner">✅ Inclus</td>
                        <td>❌ Non disponible</td>
                    </tr>
                    <tr>
                        <td>Compression</td>
                        <td class="winner">✅ Inclus</td>
                        <td>✅ Oui</td>
                    </tr>
                    <tr>
                        <td>Rotation</td>
                        <td class="winner">✅ Inclus</td>
                        <td>✅ Oui</td>
                    </tr>
                    <tr>
                        <td>Privacité</td>
                        <td class="winner">✅ 100% local</td>
                        <td>⚠️ Upload serveur</td>
                    </tr>
                    <tr>
                        <td>Vitesse</td>
                        <td class="winner">✅ Instantané</td>
                        <td>⚠️ Dépend connexion</td>
                    </tr>
                </tbody>
            </table>

            <div style="text-align: center; margin: 40px 0;">
                <a href="https://chrome.google.com/webstore/detail/pdf-join-stamp/YOUR_EXTENSION_ID" class="cta">
                    📥 Installer PDF Join & Stamp GRATUITEMENT
                </a>
                <p style="margin-top: 10px; color: #666;">
                    <span class="badge">1000+ utilisateurs</span>
                    <span class="badge">⭐ 4.8/5</span>
                    <span class="badge">100% Gratuit</span>
                </p>
            </div>
        </div>

        <div class="comparison">
            <h2>🎁 Ce qui rend PDF Join & Stamp unique</h2>
            
            <div class="features">
                <div class="feature-card">
                    <h3>🔒 Privacité Totale</h3>
                    <p>Vos PDF ne quittent jamais votre ordinateur. Traitement 100% local dans votre navigateur.</p>
                </div>
                
                <div class="feature-card">
                    <h3>⚡ Ultra Rapide</h3>
                    <p>Pas de temps d'upload ou de téléchargement. Traitement instantané.</p>
                </div>
                
                <div class="feature-card">
                    <h3>💰 Vraiment Gratuit</h3>
                    <p>Aucune limite. Aucun paywall. Aucune inscription. Gratuit pour toujours.</p>
                </div>
                
                <div class="feature-card">
                    <h3>🎯 Tout-en-Un</h3>
                    <p>Fusion, tamponnage, compression, rotation - tout ce dont vous avez besoin.</p>
                </div>
                
                <div class="feature-card">
                    <h3>🌐 Aucune Installation</h3>
                    <p>Extension Chrome légère. Fonctionne immédiatement après installation.</p>
                </div>
                
                <div class="feature-card">
                    <h3>📱 Compatible</h3>
                    <p>Fonctionne sur Windows, Mac, Linux, ChromeOS - partout où Chrome tourne.</p>
                </div>
            </div>
        </div>

        <div class="comparison">
            <h2>❓ Questions Fréquentes</h2>
            
            <div style="margin: 20px 0;">
                <h3>Pourquoi passer de ${competitor.name} à PDF Join & Stamp ?</h3>
                <p>PDF Join & Stamp est 100% gratuit, ne nécessite aucune inscription, et traite vos fichiers localement pour une confidentialité maximale.</p>
            </div>
            
            <div style="margin: 20px 0;">
                <h3>Y a-t-il des limitations ?</h3>
                <p>Non. Contrairement à ${competitor.name}, PDF Join & Stamp n'a aucune limitation. Tout est gratuit et illimité.</p>
            </div>
            
            <div style="margin: 20px 0;">
                <h3>Mes fichiers sont-ils sécurisés ?</h3>
                <p>Absolument. Vos PDF ne quittent jamais votre ordinateur. Tout est traité localement dans votre navigateur.</p>
            </div>
            
            <div style="margin: 20px 0;">
                <h3>Comment installer PDF Join & Stamp ?</h3>
                <p>Cliquez simplement sur le bouton ci-dessus pour accéder au Chrome Web Store et installer l'extension en un clic.</p>
            </div>
        </div>

        <div style="text-align: center; margin: 60px 0;">
            <h2>🚀 Prêt à passer à la meilleure alternative ?</h2>
            <p style="font-size: 1.2em; margin: 20px 0;">Rejoignez des milliers d'utilisateurs qui ont fait le switch</p>
            <a href="https://chrome.google.com/webstore/detail/pdf-join-stamp/YOUR_EXTENSION_ID" class="cta">
                Essayer PDF Join & Stamp Gratuitement
            </a>
        </div>
    </div>

    <footer>
        <div class="container">
            <p>&copy; 2026 PDF Join & Stamp - Meilleure alternative gratuite à ${competitor.name}</p>
            <p style="margin-top: 10px; opacity: 0.8;">100% Gratuit • Sans Inscription • Privé & Sécurisé</p>
        </div>
    </footer>
</body>
</html>`;
}

// Générer les pages
competitors.forEach(competitor => {
  const slug = competitor.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  const filename = `alternative-to-${slug}.html`;
  const filepath = path.join(outputDir, filename);
  
  const html = generatePage(competitor);
  fs.writeFileSync(filepath, html);
  
  console.log(`✅ Créé: ${filename}`);
});

// Créer l'index
const indexHtml = `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Meilleures Alternatives PDF Tools 2026 - Comparatifs Gratuits</title>
    <meta name="description" content="Comparez les meilleures alternatives aux outils PDF populaires. PDF Join & Stamp - 100% gratuit, sans inscription, tout-en-un.">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            background: #f8f9fa;
        }
        header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 80px 20px;
            text-align: center;
        }
        h1 { font-size: 3em; margin-bottom: 20px; }
        .container { max-width: 1200px; margin: 0 auto; padding: 40px 20px; }
        .grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 30px;
            margin: 40px 0;
        }
        .card {
            background: white;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            transition: transform 0.2s;
        }
        .card:hover { transform: translateY(-5px); }
        .card h3 { color: #667eea; margin-bottom: 15px; }
        .card a {
            display: inline-block;
            margin-top: 15px;
            color: #667eea;
            text-decoration: none;
            font-weight: bold;
        }
        .card a:hover { text-decoration: underline; }
    </style>
</head>
<body>
    <header>
        <h1>🎯 Alternatives PDF Tools</h1>
        <p style="font-size: 1.3em; opacity: 0.9;">Trouvez la meilleure alternative gratuite à votre outil PDF actuel</p>
    </header>
    
    <div class="container">
        <div class="grid">
${competitors.map(c => {
  const slug = c.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  return `            <div class="card">
                <h3>Alternative à ${c.name}</h3>
                <p>Découvrez pourquoi PDF Join & Stamp est une meilleure alternative gratuite à ${c.name}.</p>
                <a href="alternative-to-${slug}.html">Voir la comparaison →</a>
            </div>`;
}).join('\n')}
        </div>
    </div>
</body>
</html>`;

fs.writeFileSync(path.join(outputDir, 'index.html'), indexHtml);
console.log('✅ Créé: index.html');

console.log(`\n🎉 ${competitors.length + 1} pages générées dans ${outputDir}/`);
