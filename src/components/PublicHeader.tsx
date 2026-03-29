import React from 'react';
import { Menu, X, Shield, Scale, Zap, Globe, FileText, Star } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '../lib/utils';

interface Props {
  onNavigate?: (view: any) => void;
}

export const PublicHeader: React.FC<Props> = ({ onNavigate }) => {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = React.useState(false);
  const location = useLocation();
  const isFrench = i18n.language === 'fr';

  const navLinks = [
    { label: t('nav.home', { defaultValue: 'Accueil' }), path: '/', icon: <Star size={14} /> },
    { label: t('nav.features', { defaultValue: 'Fonctionnalités' }), path: '/features', icon: <Zap size={14} /> },
    { label: t('nav.pricing', { defaultValue: 'Tarifs' }), path: '/pricing', icon: <FileText size={14} /> },
    { label: t('nav.faq', { defaultValue: 'FAQ' }), path: '/faq', icon: <Scale size={14} /> },
    { label: t('nav.blog', { defaultValue: 'Blog' }), path: '/blog', icon: <Globe size={14} /> },
    { label: t('nav.legal', { defaultValue: 'Mentions' }), path: '/legal', icon: <Shield size={14} /> },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
      {/* Contenu SEO invisible pour l'en-tête */}
      <div className="sr-only" aria-hidden="false">
        <h1>InvoiceGEN - Générateur de facture gratuit conforme à l'article 293 B du CGI</h1>
        <h2>Solution de facturation professionnelle avec autoliquidation TVA et préparation à la réforme 2026</h2>
        <p>InvoiceGEN est un générateur de facture 100% gratuit qui respecte scrupuleusement la législation fiscale française. Notre outil intègre automatiquement toutes les mentions obligatoires prévues par le Code général des impôts, notamment l'article 293 B du CGI concernant la franchise en base de TVA, et l'article 283-2 du CGI relatif à l'autoliquidation (reverse charge). Pour les entreprises bénéficiant de la franchise TVA, la mention "TVA non applicable, article 293 B du CGI" est automatiquement ajoutée. Pour les opérations soumises à autoliquidation, la mention "TVA autoliquidée par le preneur - article 283 du CGI" apparaît conformément à la directive européenne 2006/112/CE.</p>
        <p>La réforme de la facturation électronique entre en vigueur le 1er septembre 2026. InvoiceGEN anticipe cette transition en générant des factures au format PDF/A-3, format d'archivage légal reconnu par l'administration fiscale, et en structurant les données selon les normes UBL (Universal Business Language) et CII (Cross Industry Invoice). Dès l'entrée en vigueur, vous pourrez exporter vos factures vers les plateformes de dématérialisation partenaires (PDP) ou le portail public de facturation (PPF).</p>
      </div>

      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo et titre */}
        <Link 
          to="/"
          className="flex items-center gap-2 group"
          aria-label={isFrench ? "Accueil InvoiceGEN" : "InvoiceGEN Home"}
        >
          <div className="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-md shadow-indigo-200 group-hover:scale-105 transition-transform">
            I
          </div>
          <div className="flex flex-col justify-center">
            <h1 className="text-lg font-black tracking-tighter text-gray-900 leading-tight">InvoiceGEN</h1>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map(link => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                "flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-lg transition-all",
                location.pathname === link.path 
                  ? "text-indigo-600 bg-indigo-50" 
                  : "text-gray-600 hover:text-indigo-600 hover:bg-gray-50"
              )}
            >
              {link.icon}
              {link.label}
            </Link>
          ))}
          <div className="w-px h-6 bg-gray-200 mx-2" />
          <Link 
            to="/dashboard"
            className="bg-indigo-600 text-white px-5 py-2 rounded-xl text-sm font-bold hover:bg-indigo-700 transition-all shadow-md flex items-center gap-2 ml-2"
          >
            <FileText size={14} />
            {t('nav.accessApp', { defaultValue: 'Application' })}
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors" 
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg animate-in slide-in-from-top duration-200">
          <div className="max-w-7xl mx-auto px-6 py-4 space-y-1">
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "flex items-center gap-3 w-full text-left px-4 py-3 text-base font-medium rounded-xl transition-all",
                  location.pathname === link.path 
                    ? "text-indigo-600 bg-indigo-50" 
                    : "text-gray-700 hover:bg-gray-50"
                )}
              >
                {link.icon}
                {link.label}
              </Link>
            ))}
            <div className="h-px bg-gray-100 my-3" />
            <Link 
              to="/dashboard"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center gap-2 w-full bg-indigo-600 text-white py-3 rounded-xl font-bold text-base shadow-md mt-2"
            >
              <FileText size={16} />
              {t('nav.accessApp', { defaultValue: 'Application' })}
            </Link>
            
            {/* Badge de conformité en mobile */}
            <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-center gap-2 text-[10px] text-gray-500">
              <Shield size={10} className="text-indigo-500" />
              <span>Article 293 B</span>
              <span className="w-1 h-1 bg-gray-300 rounded-full" />
              <Zap size={10} className="text-amber-500" />
              <span>Autoliquidation</span>
              <span className="w-1 h-1 bg-gray-300 rounded-full" />
              <Globe size={10} className="text-blue-500" />
              <span>Réforme 2026</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};