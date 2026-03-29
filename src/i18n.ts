/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * InvoiceGEN - Générateur de facture gratuit professionnel
 * Configuration i18n avec support multilingue et SEO international
 * 
 * Version: 2.0.0 - 2026
 * Conforme à l'article 293 B du CGI & autoliquidation TVA
 * 
 * Support linguistique :
 * - Français (fr) : langue principale, conforme à la législation française
 * - Anglais (en) : langue secondaire pour les utilisateurs internationaux
 * 
 * Optimisations SEO multilingues :
 * - Détection automatique de la langue via URL, cookie, localStorage, navigateur
 * - Balises hreflang dynamiques pour le référencement international
 * - Persistance de la langue choisie pour l'expérience utilisateur
 * - Fallback vers l'anglais pour les langues non supportées
 * 
 * Conformité fiscale :
 * Les traductions intègrent les mentions obligatoires :
 * - Article 293 B du CGI (franchise en base de TVA)
 * - Article 283-2 du CGI (autoliquidation / reverse charge)
 * - Articles L. 441-3 et L. 441-4 du Code de commerce
 * - Réforme de la facturation électronique 2026
 * - TVA intracommunautaire (article 262 ter)
 * - Pénalités de retard et indemnité de recouvrement
 */

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from './locales/en.json';
import fr from './locales/fr.json';

/**
 * Configuration de l'internationalisation pour InvoiceGEN
 * 
 * Objectifs SEO :
 * 1. Détection intelligente de la langue de l'utilisateur
 * 2. Persistance du choix de langue pour les visites ultérieures
 * 3. Support des URLs multilingues via querystring (?lang=fr|en)
 * 4. Balises hreflang dynamiques pour le référencement international
 * 5. Contenu traduit avec vocabulaire fiscal expert
 * 
 * Stratégie de détection de la langue (ordre de priorité) :
 * 1. Query string (?lang=fr) - pour le partage de liens multilingues
 * 2. Cookie (i18next) - pour la persistance entre sessions
 * 3. localStorage (i18nextLng) - pour la persistance dans le navigateur
 * 4. Navigateur (navigator.language) - pour la détection automatique
 * 5. HTML tag (lang) - fallback vers la balise html
 * 
 * Langues supportées :
 * - fr : Français (conforme à la législation française)
 * - en : English (pour les utilisateurs internationaux)
 * 
 * Fallback :
 * Si la langue détectée n'est ni fr ni en, le système utilise 'en'
 * comme langue par défaut.
 * 
 * Persistance :
 * Le choix de langue est sauvegardé dans localStorage et dans un cookie,
 * garantissant une expérience cohérente entre les sessions et les onglets.
 */
i18n
  // Détecteur automatique de langue
  .use(LanguageDetector)
  // Intégration avec React
  .use(initReactI18next)
  // Initialisation avec les ressources
  .init({
    // Ressources de traduction
    resources: {
      en: { translation: en },
      fr: { translation: fr },
    },
    
    /**
     * Langue de fallback
     * Utilisée lorsque la langue détectée n'est pas supportée
     */
    fallbackLng: 'en',
    
    /**
     * Configuration de la détection de langue
     * Optimisée pour le SEO multilingue
     */
    detection: {
      // Ordre de priorité pour la détection
      order: ['querystring', 'cookie', 'localStorage', 'navigator', 'htmlTag'],
      
      // Stockage du choix de langue
      caches: ['localStorage', 'cookie'],
      
      // Paramètre URL pour la langue (?lang=fr)
      lookupQuerystring: 'lang',
      
      // Nom du cookie pour la langue
      lookupCookie: 'i18next',
      
      // Nom de la clé localStorage pour la langue
      lookupLocalStorage: 'i18nextLng',
      
      // Convertir la langue détectée en format standard
      convertDetectedLanguage: (lng: string) => {
        // Normalisation des codes de langue (fr-FR -> fr, en-US -> en)
        const normalized = lng.split('-')[0];
        // Validation des langues supportées
        return normalized === 'fr' || normalized === 'en' ? normalized : 'en';
      },
    },
    
    /**
     * Échappement des valeurs
     * Désactivé car les traductions sont sécurisées
     */
    interpolation: {
      escapeValue: false,
    },
    
    /**
     * Réactiver le debug en mode développement
     * Désactivé en production pour des performances optimales
     */
    debug: process.env.NODE_ENV === 'development',
    
    /**
     * Chargement asynchrone des ressources
     * Désactivé car les ressources sont chargées au démarrage
     */
    partialBundledLanguages: false,
    
    /**
     * Retourner la clé si la traduction est manquante
     * Utile pour le débogage
     */
    returnEmptyString: false,
  });

/**
 * Gestionnaire d'événement pour le changement de langue
 * 
 * Met à jour les attributs suivants pour le SEO :
 * - html lang : langue du document
 * - Balises hreflang : liens alternatifs pour les moteurs de recherche
 * - Titre de la page : mise à jour dynamique
 */
if (typeof document !== 'undefined') {
  i18n.on('languageChanged', (lng: string) => {
    // Mise à jour de la langue dans la balise html
    document.documentElement.lang = lng;
    document.documentElement.dir = lng === 'ar' ? 'rtl' : 'ltr';
    
    // Mise à jour des balises hreflang pour le SEO multilingue
    const hreflangLinks = document.querySelectorAll('link[rel="alternate"][hreflang]');
    hreflangLinks.forEach(link => {
      const hreflang = link.getAttribute('hreflang');
      if (hreflang === lng || hreflang === 'x-default') {
        // Activer le lien correspondant
        link.setAttribute('href', window.location.href);
      }
    });
    
    console.log(`[InvoiceGEN] Langue changée vers : ${lng}`);
  });
}

/**
 * Fonction utilitaire pour obtenir la langue courante
 * @returns {string} Code de langue (fr|en)
 */
export const getCurrentLanguage = (): string => {
  return i18n.language;
};

/**
 * Fonction utilitaire pour changer de langue
 * @param {string} lng - Code de langue (fr|en)
 */
export const changeLanguage = (lng: string): Promise<void> => {
  return i18n.changeLanguage(lng).then(() => {});
};

/**
 * Fonction utilitaire pour obtenir une traduction avec fallback
 * @param {string} key - Clé de traduction
 * @param {Record<string, unknown>} options - Options de traduction
 * @returns {string} Texte traduit
 */
export const t = (key: string, options?: Record<string, unknown>): string => {
  return i18n.t(key, options);
};

/**
 * Export des langues supportées pour le SEO
 * Utilisé pour générer les balises hreflang dans le sitemap
 */
export const supportedLanguages = [
  { code: 'fr', name: 'Français', locale: 'fr_FR', hreflang: 'fr' },
  { code: 'en', name: 'English', locale: 'en_GB', hreflang: 'en' },
];

/**
 * Configuration des routes multilingues pour le SEO
 * 
 * Format : /{lang}/{path}
 * Exemples :
 * - /fr/ (français)
 * - /en/ (anglais)
 * - /fr/features
 * - /en/features
 */
export const getLocalizedPath = (path: string, lang?: string): string => {
  const language = lang || getCurrentLanguage();
  if (language === 'fr') {
    return path === '/' ? '/' : path;
  }
  return `/${language}${path === '/' ? '' : path}`;
};

export default i18n;