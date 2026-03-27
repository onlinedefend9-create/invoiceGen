import React from 'react';
import { Menu, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '../lib/utils';

interface Props {
  onNavigate?: (view: any) => void;
}

export const PublicHeader: React.FC<Props> = ({ onNavigate }) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = React.useState(false);
  const location = useLocation();

  const navLinks = [
    { label: t('nav.home', { defaultValue: 'Home' }), path: '/' },
    { label: t('nav.features', { defaultValue: 'Features' }), path: '/features' },
    { label: t('nav.pricing', { defaultValue: 'Tarifs' }), path: '/pricing' },
    { label: t('nav.faq', { defaultValue: 'FAQ' }), path: '/faq' },
    { label: t('nav.blog', { defaultValue: 'Blog' }), path: '/blog' },
    { label: t('nav.legal', { defaultValue: 'Legal' }), path: '/legal' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link 
          to="/"
          className="flex items-center gap-3 text-blue-600 cursor-pointer"
        >
          <div className="w-10 h-10 bg-blue-600 rounded-2xl flex items-center justify-center text-white font-black text-2xl shadow-lg shadow-blue-100">I</div>
          <h1 className="text-xl font-black tracking-tighter text-slate-900">InvoiceGEN</h1>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map(link => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                "text-sm font-bold transition-colors",
                location.pathname === link.path ? "text-blue-600" : "text-slate-500 hover:text-slate-900"
              )}
            >
              {link.label}
            </Link>
          ))}
          <Link 
            to="/dashboard"
            className="bg-blue-600 text-white px-6 py-2.5 rounded-xl text-sm font-black hover:bg-blue-700 transition-all shadow-lg shadow-blue-100"
          >
            {t('nav.accessApp', { defaultValue: 'Access App' })}
          </Link>
        </nav>

        {/* Mobile Toggle */}
        <button className="md:hidden p-2 text-slate-600" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-slate-100 p-6 space-y-4 animate-in slide-in-from-top duration-300">
          {navLinks.map(link => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className="block w-full text-left text-lg font-bold text-slate-600 hover:text-blue-600"
            >
              {link.label}
            </Link>
          ))}
          <Link 
            to="/dashboard"
            onClick={() => setIsOpen(false)}
            className="block w-full bg-blue-600 text-white py-4 rounded-2xl font-black text-center"
          >
            {t('nav.accessApp', { defaultValue: 'Access App' })}
          </Link>
        </div>
      )}
    </header>
  );
};
