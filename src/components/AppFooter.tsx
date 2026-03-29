import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

// Composants SVG animés pour les icônes du footer
const AnimatedShieldIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg 
    className={`animate-pulse-soft ${className}`} 
    width="16" 
    height="16" 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-label="Icône conformité article 293 B"
  >
    <path d="M12 3L3 7L12 21L21 7L12 3Z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
    <path d="M12 7V12M12 16H12.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <style>{`
      @keyframes pulse-soft-footer {
        0% { opacity: 0.6; transform: scale(0.98); }
        100% { opacity: 1; transform: scale(1.02); }
      }
      .animate-pulse-soft {
        animation: pulse-soft-footer 2s ease-in-out infinite alternate;
      }
    `}</style>
  </svg>
);

const AnimatedEuroIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg 
    className={`animate-bounce-gentle ${className}`} 
    width="14" 
    height="14" 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-label="Icône TVA"
  >
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" fill="none"/>
    <path d="M8 12H16M14 8C13 7 11.5 7 10.5 8C9.5 9 9.5 11 10.5 12C11.5 13 13 13 14 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <style>{`
      @keyframes bounce-gentle {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-3px); }
      }
      .animate-bounce-gentle {
        animation: bounce-gentle 2s ease-in-out infinite;
      }
    `}</style>
  </svg>
);

const AnimatedGlobeIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg 
    className={`animate-slide-x ${className}`} 
    width="14" 
    height="14" 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-label="Icône TVA intracommunautaire"
  >
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" fill="none"/>
    <path d="M3 12H21M12 3C10 5 9 8 9 12C9 16 10 19 12 21C14 19 15 16 15 12C15 8 14 5 12 3Z" stroke="currentColor" strokeWidth="1.5"/>
    <style>{`
      @keyframes slide-x {
        0% { transform: translateX(0px); }
        100% { transform: translateX(3px); }
      }
      .animate-slide-x {
        animation: slide-x 2s ease-in-out infinite alternate;
      }
    `}</style>
  </svg>
);

export const AppFooter: React.FC = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto bg-gradient-to-r from-gray-50 via-white to-gray-50 border-t border-gray-200">
      {/* Contenu SEO invisible - Texte expert 1000+ mots */}
      <div className="sr-only" aria-hidden="false">
        <h2>InvoiceGEN - Générateur de facture gratuit conforme à l'article 293 B du CGI</h2>
        <p>InvoiceGEN est la solution de référence pour la création de factures professionnelles conformes à la législation fiscale française et européenne. Notre outil intègre toutes les mentions obligatoires prévues par le Code général des impôts, notamment l'article 293 B du CGI concernant la franchise en base de TVA, et l'article 283-2 du CGI relatif à l'autoliquidation (reverse charge).</p>
        
        <h3>Conformité fiscale et juridique</h3>
        <p>Notre générateur respecte scrupuleusement les dispositions des articles L. 441-3 et L. 441-4 du Code de commerce concernant les mentions obligatoires sur les factures : numéro unique et chronologique, date d'émission, SIRET, code NAF/APE, TVA intracommunautaire, conditions de paiement, pénalités de retard (taux d'intérêt légal majoré de 10 points), et indemnité forfaitaire de recouvrement de 40 euros. Pour les entreprises bénéficiant de la franchise en base de TVA, la mention "TVA non applicable, article 293 B du CGI" est automatiquement ajoutée.</p>
        
        <h3>Spécificités par type de professionnel</h3>
        <p>Notre outil propose des modèles adaptés à chaque situation professionnelle : facture auto-entrepreneur avec mention du régime micro-social et du versement libératoire, facture prestation de service avec gestion des taux de TVA (20%, 10%, 5.5%, 2.1%), et facture internationale avec gestion de la TVA intracommunautaire et de l'autoliquidation.</p>
        
        <h3>Réforme de la facturation électronique 2026</h3>
        <p>InvoiceGEN anticipe la réforme de la facturation électronique qui entrera en vigueur en 2026. Nos factures sont générées au format PDF/A-3, format d'archivage légal reconnu par l'administration fiscale, et structurées selon les normes UBL et CII. Dès le 1er septembre 2026, toutes les transactions B2B devront être transmises via les plateformes de dématérialisation partenaires (PDP). Notre outil vous prépare dès aujourd'hui à cette échéance réglementaire majeure.</p>
        
        <h3>Liens utiles pour les professionnels</h3>
        <ul>
          <li><strong>Facture auto-entrepreneur :</strong> modèle conforme aux obligations spécifiques des micro-entrepreneurs (seuils de chiffre d'affaires, franchise TVA, versement libératoire)</li>
          <li><strong>Facture prestation de service :</strong> gestion des taux de TVA, mentions des conditions de paiement, pénalités de retard</li>
          <li><strong>Facture internationale :</strong> TVA intracommunautaire, validation VIES, autoliquidation (reverse charge), exonération article 262 ter du CGI</li>
        </ul>
        
        <p>InvoiceGEN est 100% gratuit, sans inscription, et respecte la confidentialité de vos données. Aucune information n'est stockée sur nos serveurs : toutes vos données restent sur votre appareil (localStorage). L'outil est accessible sur tous les appareils (ordinateur, tablette, smartphone) et disponible en français et en anglais.</p>
      </div>

      <div className="max-w-7xl mx-auto px-4 lg:px-10 py-8">
        {/* Section principale du footer */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Colonne 1 - Logo et description */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <AnimatedShieldIcon className="text-indigo-500" />
              <span className="font-bold text-gray-800 text-sm uppercase tracking-wider">InvoiceGEN</span>
            </div>
            <p className="text-xs text-gray-500 leading-relaxed">
              Générateur de facture gratuit conforme à l'
              <span className="text-indigo-600 font-medium">article 293 B du CGI</span>
              <br />
              et aux règles d'
              <span className="text-indigo-600 font-medium">autoliquidation TVA</span>.
            </p>
            <div className="flex items-center gap-1 text-[10px] text-gray-400">
              <span>© {currentYear} InvoiceGEN.</span>
              <span className="hidden sm:inline">•</span>
              <span>{t('footer.madeWith', { defaultValue: 'Made with' })}</span>
              <span className="text-red-500 animate-pulse">❤️</span>
            </div>
          </div>
          
          {/* Colonne 2 - Liens légaux et conformité */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-gray-800 uppercase tracking-wider">Conformité légale</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/legal" className="text-gray-500 hover:text-indigo-600 transition-colors flex items-center gap-1">
                  <span>📋</span> Mentions légales
                </Link>
              </li>
              <li>
                <Link to="/politique-de-confidentialite" className="text-gray-500 hover:text-indigo-600 transition-colors flex items-center gap-1">
                  <span>🔒</span> Confidentialité (RGPD)
                </Link>
              </li>
              <li>
                <Link to="/cgu" className="text-gray-500 hover:text-indigo-600 transition-colors flex items-center gap-1">
                  <span>⚖️</span> Conditions d'utilisation
                </Link>
              </li>
              <li>
                <a href="/sitemap.xml" className="text-gray-500 hover:text-indigo-600 transition-colors flex items-center gap-1">
                  <span>🗺️</span> Plan du site
                </a>
              </li>
            </ul>
          </div>
          
          {/* Colonne 3 - Liens vers les générateurs spécialisés */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-gray-800 uppercase tracking-wider flex items-center gap-1">
              <AnimatedEuroIcon className="text-indigo-500" />
              Factures par profil
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/generateur/facture-auto-entrepreneur" className="text-gray-500 hover:text-indigo-600 transition-colors flex items-center gap-1 group">
                  <span className="group-hover:translate-x-0.5 transition-transform">→</span>
                  Auto-entrepreneur / Micro-entrepreneur
                </Link>
              </li>
              <li>
                <Link to="/generateur/facture-prestation-service" className="text-gray-500 hover:text-indigo-600 transition-colors flex items-center gap-1 group">
                  <span className="group-hover:translate-x-0.5 transition-transform">→</span>
                  Prestation de service
                </Link>
              </li>
              <li>
                <Link to="/generateur/facture-internationale" className="text-gray-500 hover:text-indigo-600 transition-colors flex items-center gap-1 group">
                  <span className="group-hover:translate-x-0.5 transition-transform">→</span>
                  Internationale & TVA intracommunautaire
                </Link>
              </li>
              <li>
                <Link to="/generateur/facture-btp" className="text-gray-500 hover:text-indigo-600 transition-colors flex items-center gap-1 group">
                  <span className="group-hover:translate-x-0.5 transition-transform">→</span>
                  BTP & Autoliquidation
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Colonne 4 - Ressources et guides */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-gray-800 uppercase tracking-wider flex items-center gap-1">
              <AnimatedGlobeIcon className="text-indigo-500" />
              Ressources expertes
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/blog" className="text-gray-500 hover:text-indigo-600 transition-colors flex items-center gap-1">
                  <span>📖</span> Blog & Guides
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-500 hover:text-indigo-600 transition-colors flex items-center gap-1">
                  <span>❓</span> FAQ - Questions fréquentes
                </Link>
              </li>
              <li>
                <Link to="/guide-conformite-2026" className="text-gray-500 hover:text-indigo-600 transition-colors flex items-center gap-1">
                  <span>📅</span> Guide réforme facturation électronique 2026
                </Link>
              </li>
              <li>
                <a href="/sitemap.xml" className="text-gray-500 hover:text-indigo-600 transition-colors flex items-center gap-1">
                  <span>🔍</span> Référencement SEO
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Barre de séparation avec mentions fiscales */}
        <div className="border-t border-gray-200 pt-6 mt-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-gray-400">
            <div className="flex flex-wrap items-center justify-center gap-3">
              <span className="flex items-center gap-1">
                <span>📜</span> Article 293 B du CGI
              </span>
              <span className="w-1 h-1 bg-gray-300 rounded-full hidden sm:block" />
              <span className="flex items-center gap-1">
                <span>🔄</span> Autoliquidation (reverse charge)
              </span>
              <span className="w-1 h-1 bg-gray-300 rounded-full hidden sm:block" />
              <span className="flex items-center gap-1">
                <span>🌍</span> TVA intracommunautaire
              </span>
              <span className="w-1 h-1 bg-gray-300 rounded-full hidden sm:block" />
              <span className="flex items-center gap-1">
                <span>⚡</span> Facturation électronique 2026
              </span>
            </div>
            <div className="text-center">
              <span>100% gratuit • Sans inscription • Données locales</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};