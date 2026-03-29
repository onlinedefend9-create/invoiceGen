import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  Settings, 
  Menu, 
  X, 
  PlusCircle,
  Home,
  BookOpen,
  HelpCircle,
  Shield,
  Globe,
  Euro,
  Sparkles,
  ArrowLeft
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Composants SVG animés pour les icônes
const AnimatedShieldIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg 
    className={`animate-pulse-soft ${className}`} 
    width="18" 
    height="18" 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-label="Icône conformité article 293 B"
  >
    <path d="M12 3L3 7L12 21L21 7L12 3Z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
    <path d="M12 7V12M12 16H12.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <style>{`
      @keyframes pulse-soft-app {
        0% { opacity: 0.6; transform: scale(0.98); }
        100% { opacity: 1; transform: scale(1.02); }
      }
      .animate-pulse-soft {
        animation: pulse-soft-app 2s ease-in-out infinite alternate;
      }
    `}</style>
  </svg>
);

const AnimatedEuroIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg 
    className={`animate-bounce-gentle ${className}`} 
    width="16" 
    height="16" 
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
    width="16" 
    height="16" 
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

interface AppLayoutProps {
  children: React.ReactNode;
  onCreate: () => void;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children, onCreate }) => {
  const { t } = useTranslation();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigation = [
    { name: 'Tableau de bord', href: '/dashboard', icon: LayoutDashboard, current: location.pathname === '/dashboard' },
    { name: 'Nouvelle facture', href: '#', icon: PlusCircle, onClick: onCreate, current: false },
    { name: 'Blog & Guides', href: '/blog', icon: BookOpen, current: location.pathname === '/blog' },
    { name: 'FAQ', href: '/faq', icon: HelpCircle, current: location.pathname === '/faq' },
    { name: 'Paramètres', href: '/dashboard/settings', icon: Settings, current: location.pathname === '/dashboard/settings' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Contenu SEO invisible - Texte expert 1000+ mots */}
      <div className="sr-only" aria-hidden="false">
        <h1>InvoiceGEN - Application de facturation professionnelle</h1>
        <h2>Solution complète pour la gestion de factures conformes à l'article 293 B du CGI</h2>
        <p>InvoiceGEN est une application de facturation 100% gratuite qui permet aux freelances, micro-entrepreneurs, TPE et PME de créer, gérer et exporter des factures professionnelles conformes à la législation fiscale française et européenne. Notre outil intègre automatiquement toutes les mentions obligatoires prévues par le Code général des impôts : numéro de facture unique et chronologique, date d'émission, SIRET, code NAF/APE, TVA intracommunautaire, conditions de paiement, pénalités de retard (taux d'intérêt légal majoré de 10 points), et indemnité forfaitaire de recouvrement de 40 euros.</p>
        
        <h3>Gestion des régimes fiscaux spécifiques</h3>
        <p>L'application prend en charge deux régimes fiscaux principaux : la franchise en base de TVA (article 293 B du CGI) pour les entreprises dont le chiffre d'affaires n'excède pas les seuils légaux (91 900 € pour les services, 94 300 € pour le commerce), et le régime réel normal d'imposition pour les assujettis. Notre outil adapte automatiquement les mentions légales en fonction du régime sélectionné, ajoutant la mention "TVA non applicable, article 293 B du CGI" pour les bénéficiaires de la franchise.</p>
        
        <h3>Autoliquidation de la TVA (reverse charge)</h3>
        <p>Le module d'autoliquidation permet de gérer les opérations soumises au reverse charge conformément à l'article 283-2 du CGI. Ce mécanisme s'applique notamment aux prestations de services intracommunautaires, aux travaux dans le secteur du BTP (travaux immobiliers), aux livraisons de produits électroniques et télécoms, ainsi qu'aux cessions de quotas d'émission de gaz à effet de serre. Notre application génère automatiquement la mention "TVA autoliquidée par le preneur - article 283 du CGI" et adapte le calcul de la TVA en conséquence.</p>
        
        <h3>Gestion multilingue et internationale</h3>
        <p>L'application est entièrement traduite en français et en anglais, avec support de la TVA intracommunautaire et de la validation VIES. Pour les opérations transfrontalières, notre outil intègre la validation des numéros de TVA via le système VIES (VAT Information Exchange System) et génère les mentions appropriées : "Exonération de TVA - article 262 ter du CGI" pour les livraisons intracommunautaires, ou "Autoliquidation - article 283 du CGI" pour les prestations de services.</p>
        
        <h3>Préparation à la réforme de la facturation électronique 2026</h3>
        <p>InvoiceGEN anticipe la réforme de la facturation électronique qui entrera en vigueur en 2026. Nos factures sont générées au format PDF/A-3, format d'archivage légal reconnu par l'administration fiscale, et structurées selon les normes UBL (Universal Business Language) et CII (Cross Industry Invoice). Dès le 1er septembre 2026, toutes les transactions B2B devront être transmises via les plateformes de dématérialisation partenaires (PDP) ou le portail public de facturation (PPF). Notre outil vous prépare dès aujourd'hui à cette échéance réglementaire majeure.</p>
        
        <h3>Fonctionnalités avancées</h3>
        <ul>
          <li><strong>Tableau de bord interactif :</strong> Visualisation en temps réel de vos revenus, factures impayées et échéances</li>
          <li><strong>Gestion des modèles :</strong> Plusieurs templates de facture (moderne, professionnel, minimaliste)</li>
          <li><strong>Export PDF professionnel :</strong> Génération de PDF/A-3 conformes aux normes d'archivage</li>
          <li><strong>Calcul automatique :</strong> Totaux HT, TVA, TTC, remises, acomptes, pénalités de retard</li>
          <li><strong>Base de données locale :</strong> Toutes vos données sont stockées localement (localStorage) pour une confidentialité totale</li>
          <li><strong>Sauvegarde automatique :</strong> Vos factures en cours sont automatiquement sauvegardées</li>
        </ul>
        
        <h3>Bonnes pratiques de facturation</h3>
        <p>Notre application vous guide dans l'application des bonnes pratiques de facturation professionnelle : numérotation chronologique ininterrompue (ex: FACT-2026-001), mentions des délais de paiement (30 jours fin de mois, 60 jours), calcul des pénalités de retard (taux d'intérêt légal + 10 points), indemnité forfaitaire de recouvrement de 40 €, et mentions spécifiques au régime fiscal. Ces pratiques vous permettent d'optimiser votre trésorerie et d'éviter les contentieux en cas d'impayés.</p>
        
        <p>InvoiceGEN est 100% gratuit, sans inscription, et respecte la confidentialité de vos données. Aucune information n'est stockée sur nos serveurs : toutes vos données restent sur votre appareil. L'outil est accessible sur tous les appareils (ordinateur, tablette, smartphone) et disponible en français et en anglais.</p>
      </div>

      {/* En-tête avec titre SEO */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/dashboard" className="flex items-center gap-2 group">
                <AnimatedShieldIcon className="text-indigo-600" />
                <span className="font-bold text-gray-900 text-lg tracking-tight">
                  Invoice<span className="text-indigo-600">GEN</span>
                </span>
                <span className="ml-2 text-[10px] font-mono bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full hidden sm:inline-block">
                  v2.0 • CGI 2026
                </span>
              </Link>
            </div>
            
            {/* Navigation desktop */}
            <nav className="hidden md:flex items-center space-x-4">
              {navigation.map((item) => (
                item.href === '#' ? (
                  <button
                    key={item.name}
                    onClick={item.onClick}
                    className="flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg transition-all hover:bg-indigo-50 text-gray-700 hover:text-indigo-600"
                  >
                    <item.icon size={18} />
                    {item.name}
                  </button>
                ) : (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg transition-all ${
                      item.current
                        ? 'bg-indigo-50 text-indigo-600'
                        : 'text-gray-700 hover:bg-gray-100 hover:text-indigo-600'
                    }`}
                  >
                    <item.icon size={18} />
                    {item.name}
                  </Link>
                )
              ))}
              
              {/* Badge de conformité */}
              <div className="flex items-center gap-1 ml-4 px-2 py-1 bg-green-50 rounded-full border border-green-100">
                <AnimatedEuroIcon className="text-green-600" />
                <span className="text-[10px] font-medium text-green-700 uppercase tracking-wider">
                  Article 293 B
                </span>
              </div>
            </nav>
            
            {/* Bouton menu mobile */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        
        {/* Menu mobile */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-gray-200 bg-white"
            >
              <div className="px-4 py-3 space-y-1">
                {navigation.map((item) => (
                  item.href === '#' ? (
                    <button
                      key={item.name}
                      onClick={() => {
                        item.onClick?.();
                        setIsMobileMenuOpen(false);
                      }}
                      className="flex items-center gap-3 w-full px-3 py-2 text-sm font-medium rounded-lg text-gray-700 hover:bg-gray-100"
                    >
                      <item.icon size={18} />
                      {item.name}
                    </button>
                  ) : (
                    <Link
                      key={item.name}
                      to={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg ${
                        item.current
                          ? 'bg-indigo-50 text-indigo-600'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <item.icon size={18} />
                      {item.name}
                    </Link>
                  )
                ))}
                
                {/* Badge de conformité mobile */}
                <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-200 px-3">
                  <AnimatedShieldIcon className="text-indigo-500" />
                  <span className="text-xs text-gray-600">
                    Conforme <strong>article 293 B du CGI</strong> et <strong>autoliquidation TVA</strong>
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
      
      {/* Contenu principal */}
      <main className="py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};