import React from 'react';
import { Mail, Phone, MapPin, Twitter, Linkedin, Github } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface Props {
  onNavigate: (view: any) => void;
}

export const PublicFooter: React.FC<Props> = ({ onNavigate }) => {
  const { t } = useTranslation();
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  return (
    <footer className="bg-slate-900 text-white pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-slate-800 pb-24">
        <div className="space-y-6">
          <div 
            onClick={() => onNavigate('landing')}
            className="flex items-center gap-3 text-blue-500 cursor-pointer"
          >
            <div className="w-10 h-10 bg-blue-600 rounded-2xl flex items-center justify-center text-white font-black text-2xl shadow-lg shadow-blue-100">I</div>
            <h1 className="text-xl font-black tracking-tighter text-white">InvoiceGEN</h1>
          </div>
          <p className="text-slate-400 text-sm leading-relaxed">
            {t('footer.description', { defaultValue: 'The all-in-one SaaS billing platform for modern SMEs and freelancers. 2026 compliant.' })}
          </p>
          <div className="flex gap-4">
            <SocialIcon icon={<Twitter size={18} />} />
            <SocialIcon icon={<Linkedin size={18} />} />
            <SocialIcon icon={<Github size={18} />} />
          </div>
        </div>

        <div>
          <h4 className="font-black text-sm uppercase tracking-widest mb-8 text-slate-500">{t('footer.product', { defaultValue: 'Product' })}</h4>
          <ul className="space-y-4 text-slate-400 text-sm font-bold">
            <li><button onClick={() => onNavigate('landing')} className="hover:text-blue-500 transition-colors">{t('nav.home')}</button></li>
            <li><button onClick={() => onNavigate('features')} className="hover:text-blue-500 transition-colors">{t('nav.features')}</button></li>
            <li><button onClick={() => onNavigate('dashboard')} className="hover:text-blue-500 transition-colors">{t('footer.start')}</button></li>
            <li><button onClick={() => onNavigate('blog')} className="hover:text-blue-500 transition-colors">{t('footer.blogGuides')}</button></li>
          </ul>
        </div>

        <div>
          <h4 className="font-black text-sm uppercase tracking-widest mb-8 text-slate-500">{t('nav.legal')}</h4>
          <ul className="space-y-4 text-slate-400 text-sm font-bold">
            <li><button onClick={() => onNavigate('legal')} className="hover:text-blue-500 transition-colors">{t('footer.termsOfUse')}</button></li>
            <li><button onClick={() => onNavigate('legal')} className="hover:text-blue-500 transition-colors">{t('footer.privacyPolicy')}</button></li>
            <li><button onClick={() => onNavigate('legal')} className="hover:text-blue-500 transition-colors">{t('footer.legalMentions')}</button></li>
          </ul>
        </div>

        <div>
          <h4 className="font-black text-sm uppercase tracking-widest mb-8 text-slate-500">{t('footer.contact', { defaultValue: 'Contact' })}</h4>
          {isSubmitted ? (
            <div className="bg-blue-600/10 border border-blue-600/20 p-6 rounded-2xl text-center space-y-3">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white mx-auto shadow-lg shadow-blue-600/20">
                <Mail size={20} />
              </div>
              <p className="text-blue-400 text-sm font-black uppercase tracking-widest">
                {t('common.messageSent', { defaultValue: 'Message sent!' })}
              </p>
              <button 
                onClick={() => setIsSubmitted(false)}
                className="text-slate-500 text-[10px] font-black uppercase tracking-widest hover:text-white transition-colors"
              >
                {t('common.sendAnother', { defaultValue: 'Send another' })}
              </button>
            </div>
          ) : (
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                setIsSubmitted(true);
              }}
              className="space-y-4"
            >
              <input 
                type="email" 
                required
                placeholder={t('settings.professionalEmail', { defaultValue: 'Email' })}
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-sm font-bold text-white placeholder:text-slate-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
              />
              <textarea 
                required
                placeholder={t('common.message', { defaultValue: 'Your message...' })}
                rows={3}
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-sm font-bold text-white placeholder:text-slate-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none resize-none"
              />
              <button 
                type="submit"
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-black uppercase tracking-widest transition-all shadow-lg shadow-blue-900/20"
              >
                {t('common.send', { defaultValue: 'Send' })}
              </button>
            </form>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-12 flex flex-col md:flex-row items-center justify-between gap-6">
        <p className="text-slate-500 text-xs font-bold tracking-widest">
          {t('footer.copyright', { defaultValue: '© 2026 InvoiceGEN. All rights reserved.' })}
        </p>
        <div className="flex items-center gap-2 text-slate-500 text-xs font-bold tracking-widest">
          {t('footer.madeWith', { defaultValue: 'By' })} <span className="text-blue-500">♥</span> {t('footer.byTeam', { defaultValue: 'InvoiceGen Team' })}
        </div>
      </div>
    </footer>
  );
};

function SocialIcon({ icon }: { icon: React.ReactNode }) {
  return (
    <button className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white transition-all">
      {icon}
    </button>
  );
}
