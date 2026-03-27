import React from 'react';
import { useTranslation } from 'react-i18next';

export const AppFooter: React.FC = () => {
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
          <a href="#" className="text-slate-400 hover:text-blue-600 text-[10px] font-black uppercase tracking-widest transition-colors">
            {t('footer.termsOfUse', { defaultValue: 'Terms' })}
          </a>
          <a href="#" className="text-slate-400 hover:text-blue-600 text-[10px] font-black uppercase tracking-widest transition-colors">
            {t('footer.privacyPolicy', { defaultValue: 'Privacy' })}
          </a>
          <a href="#" className="text-slate-400 hover:text-blue-600 text-[10px] font-black uppercase tracking-widest transition-colors">
            {t('footer.contact', { defaultValue: 'Contact' })}
          </a>
        </div>
      </div>
    </footer>
  );
};
