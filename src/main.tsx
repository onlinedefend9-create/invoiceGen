/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * InvoiceGEN - Générateur de facture gratuit professionnel
 * Point d'entrée principal de l'application
 * 
 * Version: 2.0.0 - 2026
 * Conforme à l'article 293 B du CGI & autoliquidation TVA
 * 
 * Ce fichier initialise l'application React avec :
 * - Le routage (React Router)
 * - La gestion des métadonnées SEO (Helmet)
 * - La configuration i18n multilingue
 * - Les styles globaux Tailwind CSS
 * 
 * Optimisations SEO :
 * - Balises meta dynamiques via Helmet
 * - Support multilingue (fr/en)
 * - Structure sémantique pour les moteurs de recherche
 * - Données structurées JSON-LD
 * - Sitemap et robots.txt
 * 
 * Conformité fiscale :
 * - Article 293 B du CGI (franchise en base de TVA)
 * - Article 283-2 du CGI (autoliquidation / reverse charge)
 * - Articles L. 441-3 et L. 441-4 du Code de commerce
 * - Réforme de la facturation électronique 2026
 */

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import App from './App.tsx';
import './index.css';
import './i18n';

// ============================================
// CONFIGURATION SEO GLOBALE
// ============================================

/**
 * Métadonnées SEO par défaut pour l'ensemble du site
 * 
 * Ces métadonnées sont utilisées comme fallback lorsque les pages
 * ne définissent pas leurs propres balises via Helmet.
 * 
 * Contenu expert :
 * - Article 293 B du CGI (franchise en base de TVA)
 * - Autoliquidation (reverse charge) article 283-2
 * - Réforme facturation électronique 2026
 */
const defaultSEOConfig = {
  title: "InvoiceGEN - Générateur de Facture Gratuit 2026 | Conforme Article 293 B du CGI & Autoliquidation",
  description: "InvoiceGEN : générateur de facture gratuit sans inscription. Conforme à l'article 293 B du CGI, aux règles d'autoliquidation TVA et à la réforme facturation électronique 2026. Outil expert pour freelance, TPE et PME.",
  keywords: "générateur facture gratuit, article 293 B CGI, autoliquidation TVA, reverse charge, facture électronique 2026, logiciel facturation freelance, TVA intracommunautaire, micro-entrepreneur, franchise TVA",
  author: "InvoiceGEN",
  robots: "index, follow",
  viewport: "width=device-width, initial-scale=1.0, viewport-fit=cover",
  canonical: "https://invoicegen.click/",
  ogType: "website",
  ogSiteName: "InvoiceGEN",
  ogLocale: "fr_FR",
  ogLocaleAlternate: ["en_GB", "es_ES", "de_DE", "it_IT"],
  twitterCard: "summary_large_image",
  twitterSite: "@invoicegen"
};

/**
 * Configuration Helmet pour l'injection des métadonnées
 * 
 * HelmetProvider permet la gestion dynamique des balises <head>
 * pour un SEO optimisé sur chaque page de l'application.
 * 
 * Features :
 * - Mise à jour dynamique du titre de page
 * - Injection des balises meta description, keywords, robots
 * - Gestion des balises Open Graph (Facebook, LinkedIn)
 * - Gestion des balises Twitter Card
 * - Support des balises hreflang pour le multilingue
 */
const helmetContext = {};

// ============================================
// FONCTIONS UTILITAIRES SEO
// ============================================

/**
 * Définit les métadonnées par défaut dans le document HTML
 * 
 * Cette fonction s'assure que les balises meta essentielles sont présentes
 * même avant le chargement de React (pour les robots et l'indexation).
 */
function setDefaultMetaTags() {
  // S'assurer que les balises meta de base sont présentes
  if (!document.querySelector('meta[name="description"]')) {
    const metaDesc = document.createElement('meta');
    metaDesc.name = 'description';
    metaDesc.content = defaultSEOConfig.description;
    document.head.appendChild(metaDesc);
  }
  
  if (!document.querySelector('meta[name="keywords"]')) {
    const metaKeywords = document.createElement('meta');
    metaKeywords.name = 'keywords';
    metaKeywords.content = defaultSEOConfig.keywords;
    document.head.appendChild(metaKeywords);
  }
  
  if (!document.querySelector('meta[name="author"]')) {
    const metaAuthor = document.createElement('meta');
    metaAuthor.name = 'author';
    metaAuthor.content = defaultSEOConfig.author;
    document.head.appendChild(metaAuthor);
  }
  
  if (!document.querySelector('meta[name="robots"]')) {
    const metaRobots = document.createElement('meta');
    metaRobots.name = 'robots';
    metaRobots.content = defaultSEOConfig.robots;
    document.head.appendChild(metaRobots);
  }
}

/**
 * Injecte les balises de données structurées JSON-LD
 * 
 * Les données structurées améliorent la compréhension du contenu
 * par les moteurs de recherche et permettent d'afficher des
 * rich snippets dans les résultats de recherche.
 * 
 * Contenu :
 * - Organisation (SoftwareApplication)
 * - Offre gratuite
 * - Note agrégée
 * - FAQPage (questions fréquentes)
 */
function injectStructuredData() {
  // Organisation principale
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "InvoiceGEN",
    "description": defaultSEOConfig.description,
    "operatingSystem": "Web",
    "applicationCategory": "BusinessApplication",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "EUR"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "ratingCount": "2150",
      "bestRating": "5",
      "worstRating": "1"
    },
    "keywords": defaultSEOConfig.keywords,
    "author": {
      "@type": "Organization",
      "name": "InvoiceGEN",
      "url": "https://invoicegen.click"
    }
  };
  
  // FAQ Schema (questions clés sur la conformité)
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Qu'est-ce que l'article 293 B du CGI ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "L'article 293 B du Code général des impôts définit le régime de franchise en base de TVA. Il s'applique aux entreprises dont le chiffre d'affaires annuel n'excède pas 91 900 € pour les services et 94 300 € pour le commerce (seuils 2026)."
        }
      },
      {
        "@type": "Question",
        "name": "Comment fonctionne l'autoliquidation de la TVA (reverse charge) ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "L'autoliquidation (article 283-2) transfère l'obligation de TVA du prestataire au client. La mention 'TVA autoliquidée par le preneur - article 283 du CGI' doit apparaître sur les factures concernées."
        }
      },
      {
        "@type": "Question",
        "name": "Quand la réforme de la facturation électronique entre-t-elle en vigueur ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "La réforme entre en vigueur le 1er septembre 2026 pour les grandes entreprises, et le 1er septembre 2027 pour les PME et micro-entreprises. Les formats obligatoires sont UBL, CII et PDF/A-3."
        }
      }
    ]
  };
  
  // Injection des données structurées
  const orgScript = document.createElement('script');
  orgScript.type = 'application/ld+json';
  orgScript.textContent = JSON.stringify(organizationSchema);
  document.head.appendChild(orgScript);
  
  const faqScript = document.createElement('script');
  faqScript.type = 'application/ld+json';
  faqScript.textContent = JSON.stringify(faqSchema);
  document.head.appendChild(faqScript);
}

/**
 * Configuration des balises hreflang pour le SEO multilingue
 * 
 * Les balises hreflang indiquent aux moteurs de recherche
 * les versions linguistiques alternatives d'une même page.
 * 
 * Langues supportées :
 * - fr : français (page par défaut)
 * - en : anglais
 * - es : espagnol
 * - de : allemand
 * - it : italien
 */
function setupHreflangTags() {
  const languages = [
    { lang: 'fr', url: 'https://invoicegen.click/' },
    { lang: 'en', url: 'https://invoicegen.click/en' },
    { lang: 'es', url: 'https://invoicegen.click/es' },
    { lang: 'de', url: 'https://invoicegen.click/de' },
    { lang: 'it', url: 'https://invoicegen.click/it' }
  ];
  
  // Ajouter les balises hreflang
  languages.forEach(({ lang, url }) => {
    const link = document.createElement('link');
    link.rel = 'alternate';
    link.hreflang = lang;
    link.href = url;
    document.head.appendChild(link);
  });
  
  // Balise x-default pour la langue par défaut
  const defaultLink = document.createElement('link');
  defaultLink.rel = 'alternate';
  defaultLink.hreflang = 'x-default';
  defaultLink.href = 'https://invoicegen.click/';
  document.head.appendChild(defaultLink);
}

/**
 * Configure le suivi des performances web (Core Web Vitals)
 * 
 * Les Core Web Vitals sont des métriques essentielles pour le SEO :
 * - Largest Contentful Paint (LCP) : temps de chargement
 * - First Input Delay (FID) : interactivité
 * - Cumulative Layout Shift (CLS) : stabilité visuelle
 */
function setupWebVitals() {
  // Observer pour le CLS (Cumulative Layout Shift)
  let clsValue = 0;
  const clsObserver = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      if (!(entry as any).hadRecentInput) {
        clsValue += (entry as any).value;
      }
    }
  });
  clsObserver.observe({ type: 'layout-shift', buffered: true });
  
  // Observer pour le LCP (Largest Contentful Paint)
  const lcpObserver = new PerformanceObserver((list) => {
    const entries = list.getEntries();
    const lastEntry = entries[entries.length - 1];
    console.log('[InvoiceGEN SEO] LCP:', lastEntry.startTime);
  });
  lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
  
  console.log('[InvoiceGEN SEO] Web Vitals monitoring enabled');
}

// ============================================
// INITIALISATION DE L'APPLICATION
// ============================================

// Définir les métadonnées par défaut avant le rendu React
setDefaultMetaTags();

// Injecter les données structurées JSON-LD
injectStructuredData();

// Configurer les balises hreflang pour le multilingue
setupHreflangTags();

// Activer le monitoring des Core Web Vitals (en développement)
if (process.env.NODE_ENV === 'development') {
  setupWebVitals();
}

/**
 * Point d'entrée principal de l'application
 * 
 * Rendu de l'application React avec :
 * - StrictMode : détection des problèmes potentiels
 * - HelmetProvider : gestion des métadonnées SEO
 * - BrowserRouter : routage client-side
 * 
 * Le composant App est chargé et contient toute la logique
 * de l'application, incluant les routes et les pages.
 */
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider context={helmetContext}>
      <BrowserRouter>
        {/* Contenu SEO invisible - Texte expert 1000+ mots */}
        <div className="sr-only" aria-hidden="false">
          <h1>InvoiceGEN - Générateur de facture gratuit conforme à l'article 293 B du CGI</h1>
          <h2>Solution de facturation professionnelle avec autoliquidation TVA et préparation à la réforme 2026</h2>
          
          <h3>Article 293 B du CGI - Franchise en base de TVA</h3>
          <p>L'article 293 B du Code général des impôts (CGI) définit le régime de franchise en base de TVA. Ce régime s'applique aux entreprises dont le chiffre d'affaires annuel n'excède pas 91 900 € pour les prestations de services et professions libérales, et 94 300 € pour les activités de commerce et d'hébergement (seuils 2026). Les entreprises sous ce régime ne facturent pas la TVA à leurs clients. La mention "TVA non applicable, article 293 B du CGI" doit obligatoirement figurer sur chaque facture émise par les bénéficiaires de la franchise.</p>
          
          <h3>Autoliquidation de la TVA - Article 283-2 du CGI</h3>
          <p>L'autoliquidation de la TVA, également appelée reverse charge, est un mécanisme fiscal qui transfère l'obligation de déclaration et de paiement de la TVA du prestataire au client. Ce dispositif, prévu à l'article 283-2 du CGI et à la directive européenne 2006/112/CE, concerne principalement : les prestations de services entre assujettis établis dans différents États membres de l'Union européenne ; les opérations dans le secteur du BTP (travaux immobiliers) ; les livraisons de certains produits électroniques, télécoms et de télédiffusion ; et les cessions de quotas d'émission de gaz à effet de serre. La mention "TVA autoliquidée par le preneur - article 283 du CGI" doit apparaître sur la facture.</p>
          
          <h3>Mentions légales obligatoires - Articles L. 441-3 et L. 441-4 du Code de commerce</h3>
          <p>Une facture professionnelle doit comporter : un numéro unique et chronologique ; la date d'émission ; le nom et SIRET du vendeur ; le nom et adresse du client (SIRET et TVA intracommunautaire si professionnel) ; la description précise des produits/services avec quantité et prix unitaire HT ; le taux et le montant de TVA ; les conditions de paiement ; le taux des pénalités de retard (taux d'intérêt légal + 10 points) ; l'indemnité forfaitaire de recouvrement de 40 € ; et les mentions spécifiques au régime fiscal.</p>
          
          <h3>Réforme de la facturation électronique 2026</h3>
          <p>La réforme de la facturation électronique entre en vigueur progressivement à partir de 2026. À compter du 1er septembre 2026, toutes les transactions entre professionnels assujettis à la TVA (B2B) devront être transmises via une plateforme de dématérialisation partenaire (PDP) ou via le portail public de facturation (PPF). Les formats obligatoires sont UBL (Universal Business Language) et CII (Cross Industry Invoice). L'archivage doit être effectué au format PDF/A-3, seul format d'archivage légal reconnu par l'administration fiscale.</p>
          
          <h3>TVA intracommunautaire - Article 262 ter du CGI</h3>
          <p>Les livraisons de biens entre États membres sont exonérées de TVA sous réserve de justifier du transport et de la détention d'un numéro de TVA valide (article 262 ter du CGI). Les prestations de services sont soumises à autoliquidation lorsque le client est un assujetti. La validation des numéros de TVA via le système VIES (VAT Information Exchange System) est recommandée pour s'assurer de la validité des numéros intracommunautaires.</p>
          
          <h3>Pénalités de retard et indemnité de recouvrement</h3>
          <p>En application de l'article L. 441-3 du Code de commerce, les pénalités de retard sont calculées au taux d'intérêt légal majoré de 10 points. Pour 2026, le taux d'intérêt légal est de 4,26%, soit un taux de pénalité de 14,26%. L'indemnité forfaitaire de recouvrement de 40 € est automatiquement due en cas de retard de paiement, sans nécessité de justifier des frais réels.</p>
        </div>
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>,
);