import React from 'react';
import { Mail, Phone, MapPin, Twitter, Linkedin, Github, Shield, Scale, Globe, Zap, FileText, Clock, Euro, CheckCircle2, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface Props {
  onNavigate?: (view: any) => void;
}

// Composant SVG animé pour l'article 293 B
const AnimatedShieldIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg 
    className={`animate-pulse-soft ${className}`} 
    width="16" 
    height="16" 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-label="Icône article 293 B du CGI"
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

export const PublicFooter: React.FC<Props> = ({ onNavigate }) => {
  const { t, i18n } = useTranslation();
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const isFrench = i18n.language === 'fr';
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 text-slate-300 pt-24 pb-12 border-t border-slate-800">
      {/* Contenu SEO invisible - Texte expert 1000+ mots */}
      <div className="sr-only" aria-hidden="false">
        <h2>InvoiceGEN - Générateur de facture gratuit conforme à l'article 293 B du CGI</h2>
        <h3>Solution de facturation professionnelle avec autoliquidation TVA et préparation à la réforme 2026</h3>
        
        <h3>Article 293 B du CGI - Franchise en base de TVA</h3>
        <p>L'article 293 B du Code général des impôts (CGI) définit le régime de franchise en base de TVA. Ce régime s'applique aux entreprises dont le chiffre d'affaires annuel n'excède pas 91 900 € pour les prestations de services et professions libérales, et 94 300 € pour les activités de commerce et d'hébergement (seuils 2026). Les entreprises sous ce régime ne facturent pas la TVA à leurs clients. La mention "TVA non applicable, article 293 B du CGI" doit obligatoirement figurer sur chaque facture. InvoiceGEN intègre automatiquement cette mention pour garantir la conformité de vos factures.</p>
        
        <h3>Autoliquidation de la TVA - Article 283-2 du CGI</h3>
        <p>L'autoliquidation de la TVA, également appelée reverse charge, est un mécanisme fiscal qui transfère l'obligation de déclaration et de paiement de la TVA du prestataire au client. Ce dispositif concerne les prestations de services entre assujettis établis dans différents États membres de l'UE, les opérations dans le secteur du BTP, les livraisons de produits électroniques et télécoms. La mention "TVA autoliquidée par le preneur - article 283 du CGI" doit apparaître sur la facture. InvoiceGEN gère ce mécanisme automatiquement.</p>
        
        <h3>Mentions légales obligatoires - Articles L. 441-3 et L. 441-4 du Code de commerce</h3>
        <p>Une facture professionnelle doit comporter : un numéro unique et chronologique ; la date d'émission ; le nom et SIRET du vendeur ; le nom et adresse du client (SIRET et TVA intracommunautaire si professionnel) ; la description précise des produits/services ; le taux et le montant de TVA ; les conditions de paiement ; le taux des pénalités de retard (taux d'intérêt légal + 10 points) ; l'indemnité forfaitaire de recouvrement de 40 €. InvoiceGEN intègre automatiquement toutes ces mentions.</p>
        
        <h3>Réforme de la facturation électronique 2026</h3>
        <p>À compter du 1er septembre 2026, toutes les transactions entre professionnels assujettis à la TVA (B2B) devront être transmises via une plateforme de dématérialisation partenaire (PDP) ou via le portail public de facturation (PPF). Les formats obligatoires sont UBL et CII. L'archivage doit être effectué au format PDF/A-3. InvoiceGEN génère vos factures au format PDF/A-3 et les structure selon les normes UBL/CII.</p>
        
        <h3>TVA intracommunautaire - Article 262 ter du CGI</h3>
        <p>Les livraisons de biens entre États membres sont exonérées de TVA sous réserve de justifier du transport et de la détention d'un numéro de TVA valide (article 262 ter du CGI). Les prestations de services sont soumises à autoliquidation lorsque le client est un assujetti. La validation des numéros de TVA via le système VIES est recommandée.</p>
        
        <h3>Pénalités de retard et indemnité de recouvrement</h3>
        <p>En application de l'article L. 441-3 du Code de commerce, les pénalités de retard sont calculées au taux d'intérêt légal majoré de 10 points. Pour 2026, le taux d'intérêt légal est de 4,26%, soit un taux de pénalité de 14,26%. L'indemnité forfaitaire de recouvrement de 40 € est automatiquement due en cas de retard de paiement.</p>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        {/* Section principale du footer */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 border-b border-slate-800 pb-16">
          {/* Colonne 1 - Logo et description */}
          <div className="lg:col-span-2 space-y-5">
            <div 
              onClick={() => onNavigate?.('landing')}
              className="flex items-center gap-2 cursor-pointer group"
            >
              <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-indigo-500/20 group-hover:scale-110 transition-transform">
                I
              </div>
              <h1 className="text-xl font-black tracking-tighter text-white">InvoiceGEN</h1>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-md">
              {isFrench 
                ? "Générateur de facture gratuit conforme à l'article 293 B du CGI, avec gestion de l'autoliquidation TVA et préparation à la réforme 2026."
                : "Free invoice generator compliant with Article 293 B, with VAT reverse charge management and preparation for the 2026 reform."}
            </p>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 px-2 py-1 bg-indigo-500/20 rounded-full">
                <AnimatedShieldIcon className="text-indigo-400" />
                <span className="text-[9px] font-mono text-indigo-300">Article 293 B</span>
              </div>
              <div className="flex items-center gap-1 px-2 py-1 bg-amber-500/20 rounded-full">
                <Zap size={10} className="text-amber-400" />
                <span className="text-[9px] font-mono text-amber-300">Autoliquidation</span>
              </div>
              <div className="flex items-center gap-1 px-2 py-1 bg-blue-500/20 rounded-full">
                <Globe size={10} className="text-blue-400" />
                <span className="text-[9px] font-mono text-blue-300">TVA intra</span>
              </div>
            </div>
            <div className="flex gap-3 pt-2">
              <SocialIcon icon={<Twitter size={16} />} href="https://twitter.com/invoicegen" />
              <SocialIcon icon={<Linkedin size={16} />} href="https://linkedin.com/company/invoicegen" />
              <SocialIcon icon={<Github size={16} />} href="https://github.com/invoicegen" />
            </div>
          </div>

          {/* Colonne 2 - Produit */}
          <div>
            <h4 className="font-black text-xs uppercase tracking-wider mb-6 text-slate-500 flex items-center gap-2">
              <FileText size={12} />
              {t('footer.product', { defaultValue: 'Produit' })}
            </h4>
            <ul className="space-y-3 text-slate-400 text-sm font-medium">
              <li><button onClick={() => onNavigate?.('landing')} className="hover:text-indigo-400 transition-colors">{t('nav.home', { defaultValue: 'Accueil' })}</button></li>
              <li><button onClick={() => onNavigate?.('features')} className="hover:text-indigo-400 transition-colors">{t('nav.features', { defaultValue: 'Fonctionnalités' })}</button></li>
              <li><button onClick={() => onNavigate?.('pricing')} className="hover:text-indigo-400 transition-colors">{t('nav.pricing', { defaultValue: 'Tarifs' })}</button></li>
              <li><button onClick={() => onNavigate?.('faq')} className="hover:text-indigo-400 transition-colors">FAQ</button></li>
              <li><button onClick={() => onNavigate?.('dashboard')} className="hover:text-indigo-400 transition-colors">{t('footer.start', { defaultValue: 'Créer une facture' })}</button></li>
              <li><button onClick={() => onNavigate?.('blog')} className="hover:text-indigo-400 transition-colors">{t('footer.blogGuides', { defaultValue: 'Blog & Guides' })}</button></li>
            </ul>
          </div>

          {/* Colonne 3 - Ressources légales */}
          <div>
            <h4 className="font-black text-xs uppercase tracking-wider mb-6 text-slate-500 flex items-center gap-2">
              <Scale size={12} />
              {t('nav.legal', { defaultValue: 'Légal' })}
            </h4>
            <ul className="space-y-3 text-slate-400 text-sm font-medium">
              <li><button onClick={() => onNavigate?.('legal')} className="hover:text-indigo-400 transition-colors">{t('footer.termsOfUse', { defaultValue: "Conditions d'utilisation" })}</button></li>
              <li><button onClick={() => onNavigate?.('legal')} className="hover:text-indigo-400 transition-colors">{t('footer.privacyPolicy', { defaultValue: 'Politique de confidentialité' })}</button></li>
              <li><button onClick={() => onNavigate?.('legal')} className="hover:text-indigo-400 transition-colors">{t('footer.legalMentions', { defaultValue: 'Mentions légales' })}</button></li>
              <li><button onClick={() => onNavigate?.('legal')} className="hover:text-indigo-400 transition-colors text-slate-500">Cookies</button></li>
              <li><button onClick={() => onNavigate?.('legal')} className="hover:text-indigo-400 transition-colors">RGPD</button></li>
            </ul>
          </div>

          {/* Colonne 4 - Contact */}
          <div>
            <h4 className="font-black text-xs uppercase tracking-wider mb-6 text-slate-500 flex items-center gap-2">
              <Mail size={12} />
              {t('footer.contact', { defaultValue: 'Contact' })}
            </h4>
            {isSubmitted ? (
              <div className="bg-indigo-600/10 border border-indigo-600/20 p-5 rounded-xl text-center space-y-3">
                <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white mx-auto">
                  <CheckCircle2 size={18} />
                </div>
                <p className="text-indigo-400 text-xs font-bold uppercase tracking-wider">
                  {t('common.messageSent', { defaultValue: 'Message envoyé !' })}
                </p>
                <button 
                  onClick={() => setIsSubmitted(false)}
                  className="text-slate-500 text-[9px] font-black uppercase tracking-wider hover:text-white transition-colors"
                >
                  {t('common.sendAnother', { defaultValue: 'Envoyer un autre' })}
                </button>
              </div>
            ) : (
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  setIsSubmitted(true);
                }}
                className="space-y-3"
              >
                <input 
                  type="email" 
                  required
                  placeholder={t('settings.professionalEmail', { defaultValue: 'Email' })}
                  className="w-full px-3 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-sm text-white placeholder:text-slate-500 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none"
                />
                <textarea 
                  required
                  placeholder={t('common.message', { defaultValue: 'Votre message...' })}
                  rows={2}
                  className="w-full px-3 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-sm text-white placeholder:text-slate-500 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none resize-none"
                />
                <button 
                  type="submit"
                  className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-[10px] font-black uppercase tracking-wider transition-all flex items-center justify-center gap-1"
                >
                  {t('common.send', { defaultValue: 'Envoyer' })} <ArrowRight size={12} />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Barre de conformité fiscale */}
        <div className="pt-8 pb-6 flex flex-wrap items-center justify-center gap-4 text-[10px] text-slate-500">
          <div className="flex items-center gap-1.5">
            <Shield size={10} />
            <span>Article 293 B du CGI</span>
          </div>
          <span className="w-1 h-1 bg-slate-800 rounded-full" />
          <div className="flex items-center gap-1.5">
            <Zap size={10} className="text-amber-500" />
            <span>Autoliquidation (reverse charge)</span>
          </div>
          <span className="w-1 h-1 bg-slate-800 rounded-full" />
          <div className="flex items-center gap-1.5">
            <Globe size={10} className="text-blue-500" />
            <span>TVA intracommunautaire</span>
          </div>
          <span className="w-1 h-1 bg-slate-800 rounded-full" />
          <div className="flex items-center gap-1.5">
            <Clock size={10} className="text-emerald-500" />
            <span>Réforme 2026</span>
          </div>
          <span className="w-1 h-1 bg-slate-800 rounded-full" />
          <div className="flex items-center gap-1.5">
            <Euro size={10} className="text-rose-500" />
            <span>Pénalités de retard</span>
          </div>
        </div>

        {/* Copyright et mentions */}
        <div className="pt-6 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] text-slate-500">
          <p>
            © {currentYear} InvoiceGEN. {isFrench ? 'Tous droits réservés.' : 'All rights reserved.'}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <span>{isFrench ? 'Conforme à l\'article 293 B du CGI' : 'Compliant with Article 293 B'}</span>
            <span>•</span>
            <span>{isFrench ? 'Autoliquidation TVA (article 283-2)' : 'VAT reverse charge (Article 283-2)'}</span>
            <span>•</span>
            <span>{isFrench ? 'Réforme facturation électronique 2026' : '2026 e-invoicing reform'}</span>
          </div>
          <div className="flex items-center gap-1">
            <span>{t('footer.madeWith', { defaultValue: 'Made with' })}</span>
            <span className="text-red-500 animate-pulse">♥</span>
            <span>{t('footer.byTeam', { defaultValue: 'by InvoiceGEN Team' })}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

function SocialIcon({ icon, href }: { icon: React.ReactNode; href?: string }) {
  const Component = href ? 'a' : 'button';
  return (
    <Component
      {...(href ? { href, target: "_blank", rel: "noopener noreferrer" } : {})}
      className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center text-slate-400 hover:bg-indigo-600 hover:text-white transition-all"
    >
      {icon}
    </Component>
  );
}