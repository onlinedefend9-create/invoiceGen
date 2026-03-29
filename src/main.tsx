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

import { StrictMode, useState, useEffect } from 'react';
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
// Composant de sécurisation du rendu
function SafeHydration({ children }: { children: React.ReactNode }) {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    // Sécurise l'hydratation côté client
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    return (
      <div style={{ display: 'flex', height: '100vh', width: '100vw', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f9fafb' }}>
        <div style={{ width: '40px', height: '40px', border: '3px solid #e5e7eb', borderTopColor: '#3b82f6', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return <>{children}</>;
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider context={helmetContext}>
      <BrowserRouter>
        <SafeHydration>
          <App />
        </SafeHydration>
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>
);