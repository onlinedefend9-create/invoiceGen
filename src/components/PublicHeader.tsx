import React from 'react';
import { Menu, X, FileText } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { cn } from '../lib/utils';

interface Props {
  onNavigate: (view: any) => void;
  currentView: string;
}

export const PublicHeader: React.FC<Props> = ({ onNavigate, currentView }) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = React.useState(false);

  const navLinks = [
    { label: t('nav.home', { defaultValue: 'Home' }), view: 'landing' },
    { label: t('nav.features', { defaultValue: 'Features' }), view: 'features' },
    { label: t('nav.pricing', { defaultValue: 'Tarifs' }), view: 'pricing' },
    { label: t('nav.faq', { defaultValue: 'FAQ' }), view: 'faq' },
    { label: t('nav.blog', { defaultValue: 'Blog' }), view: 'blog' },
    { label: t('nav.legal', { defaultValue: 'Legal' }), view: 'legal' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div 
          onClick={() => onNavigate('landing')}
          className="flex items-center gap-3 text-blue-600 cursor-pointer"
        >
          <div className="w-10 h-10 bg-blue-600 rounded-2xl flex items-center justify-center text-white font-black text-2xl shadow-lg shadow-blue-100">I</div>
          <h1 className="text-xl font-black tracking-tighter text-slate-900">InvoiceGEN</h1>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map(link => (
            <button
              key={link.view}
              onClick={() => onNavigate(link.view)}
              className={cn(
                "text-sm font-bold transition-colors",
                currentView === link.view ? "text-blue-600" : "text-slate-500 hover:text-slate-900"
              )}
            >
              {link.label}
            </button>
          ))}
          <button 
            onClick={() => onNavigate('dashboard')}
            className="bg-blue-600 text-white px-6 py-2.5 rounded-xl text-sm font-black hover:bg-blue-700 transition-all shadow-lg shadow-blue-100"
          >
            {t('nav.accessApp', { defaultValue: 'Access App' })}
          </button>
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
            <button
              key={link.view}
              onClick={() => { onNavigate(link.view); setIsOpen(false); }}
              className="block w-full text-left text-lg font-bold text-slate-600 hover:text-blue-600"
            >
              {link.label}
            </button>
          ))}
          <button 
            onClick={() => { onNavigate('dashboard'); setIsOpen(false); }}
            className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black text-center"
          >
            {t('nav.accessApp', { defaultValue: 'Access App' })}
          </button>
        </div>
      )}
    </header>
  );
};
