import React from 'react';
import { useTranslation } from 'react-i18next';

export const AppFooter: React.FC<{ onNavigate: (view: any) => void }> = ({ onNavigate }) => {
  const { t } = useTranslation();
  
  return (
    <footer className="mt-auto py-8 px-4 lg:px-10 border-t border-slate-100 bg-white/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-slate-400 text-[10px] font-black uppercase tracking-widest">
          <span>{t('footer.copyright', { defaultValue: '© 2026 InvoiceGEN.' })}</span>
          <span className="hidden sm:inline">•</span>
          <span>{t('footer.madeWith', { defaultValue: 'Made with' })} <span className="text-blue-500">♥</span></span>
        </div>
        
        <div className="flex items-center gap-6">
          <button onClick={() => onNavigate('facture-auto-entrepreneur')} className="text-slate-400 hover:text-blue-600 text-[10px] font-black uppercase tracking-widest transition-colors">
            Auto-entrepreneur
          </button>
          <button onClick={() => onNavigate('facture-prestation-service')} className="text-slate-400 hover:text-blue-600 text-[10px] font-black uppercase tracking-widest transition-colors">
            Prestation
          </button>
          <button onClick={() => onNavigate('facture-internationale')} className="text-slate-400 hover:text-blue-600 text-[10px] font-black uppercase tracking-widest transition-colors">
            Internationale
          </button>
        </div>
      </div>
    </footer>
  );
};
