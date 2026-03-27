import React from 'react';
import { motion } from 'motion/react';
import { Check, Info, Shield, Zap, Globe, Lock, Database } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const Pricing: React.FC = () => {
  const { t } = useTranslation();

  const jsonLd = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": "InvoiceGEN",
    "description": t('pricing.heroSubtitle', { defaultValue: "La facturation professionnelle gratuite et sans compte pour freelances." }),
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "EUR",
      "availability": "https://schema.org/InStock",
      "url": "https://invoicegen.click/tarifs"
    }
  };

  return (
    <div className="bg-white pt-32 pb-24 px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <div className="max-w-7xl mx-auto space-y-24">
        {/* Hero Section */}
        <div className="text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-block px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full text-sm font-bold tracking-wide uppercase"
          >
            {t('pricing.heroBadge', { defaultValue: "Transparence Totale" })}
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl lg:text-7xl font-black tracking-tighter text-slate-900 leading-[1.1] max-w-4xl mx-auto"
          >
            {t('pricing.heroTitle', { defaultValue: "La Facturation Professionnelle ne devrait pas être une taxe sur votre travail." })}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="max-w-2xl mx-auto text-xl text-slate-500 font-medium"
          >
            {t('pricing.heroSubtitle', { defaultValue: "Pas d'abonnement, pas de frais cachés. Juste un outil puissant pour propulser votre activité." })}
          </motion.p>
        </div>

        {/* Pricing Table */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Free Plan */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-[40px] p-10 border-2 border-blue-600 shadow-2xl shadow-blue-100 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 bg-blue-600 text-white px-6 py-2 rounded-bl-3xl text-xs font-black uppercase tracking-widest">
              {t('pricing.currentPlan', { defaultValue: "Actuel" })}
            </div>
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-black text-slate-900">{t('pricing.freeTitle', { defaultValue: "Indépendant" })}</h3>
                <p className="text-slate-500 font-bold">{t('pricing.freeSubtitle', { defaultValue: "Pour les freelances et auto-entrepreneurs" })}</p>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-5xl font-black text-slate-900">0€</span>
                <span className="text-slate-400 font-bold">/{t('pricing.perMonth', { defaultValue: "mois" })}</span>
              </div>
              <p className="text-blue-600 font-black text-sm uppercase tracking-widest">{t('pricing.freeLifetime', { defaultValue: "Gratuit à vie" })}</p>
              
              <div className="h-px bg-slate-100" />
              
              <ul className="space-y-4">
                {[
                  t('pricing.feat1', { defaultValue: "Factures illimitées" }),
                  t('pricing.feat2', { defaultValue: "Devis illimités" }),
                  t('pricing.feat3', { defaultValue: "Sans création de compte" }),
                  t('pricing.feat4', { defaultValue: "Export PDF Haute Définition" }),
                  t('pricing.feat5', { defaultValue: "Conformité Normes 2026" }),
                  t('pricing.feat6', { defaultValue: "Données 100% privées" })
                ].map((feat, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-700 font-bold">
                    <div className="w-5 h-5 bg-blue-50 rounded-full flex items-center justify-center">
                      <Check size={14} className="text-blue-600" />
                    </div>
                    {feat}
                  </li>
                ))}
              </ul>

              <button 
                onClick={() => window.location.href = '/'}
                className="w-full py-4 bg-blue-600 text-white rounded-2xl font-black hover:bg-blue-700 transition-all shadow-lg shadow-blue-100"
              >
                {t('pricing.ctaStart', { defaultValue: "Démarrer maintenant" })}
              </button>
            </div>
          </motion.div>

          {/* Enterprise Plan */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-slate-50 rounded-[40px] p-10 border border-slate-100 flex flex-col justify-between"
          >
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-black text-slate-900">{t('pricing.proTitle', { defaultValue: "Entreprise +" })}</h3>
                <p className="text-slate-500 font-bold">{t('pricing.proSubtitle', { defaultValue: "Pour les équipes et PME en croissance" })}</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-black text-slate-300 line-through">29€</span>
                  <span className="text-xl font-black text-blue-600">{t('pricing.proPromo', { defaultValue: "Inclus pour le lancement" })}</span>
                </div>
                <p className="text-slate-400 text-sm font-bold uppercase tracking-widest">{t('pricing.comingSoon', { defaultValue: "Bientôt disponible" })}</p>
              </div>

              <div className="h-px bg-slate-200" />

              <ul className="space-y-4 opacity-60">
                {[
                  t('pricing.proFeat1', { defaultValue: "Gestion multi-utilisateurs" }),
                  t('pricing.proFeat2', { defaultValue: "Tableau de bord avancé" }),
                  t('pricing.proFeat3', { defaultValue: "Relances automatiques" }),
                  t('pricing.proFeat4', { defaultValue: "Support prioritaire 24/7" }),
                  t('pricing.proFeat5', { defaultValue: "API & Intégrations" })
                ].map((feat, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-500 font-bold">
                    <div className="w-5 h-5 bg-slate-200 rounded-full flex items-center justify-center">
                      <Check size={14} className="text-slate-400" />
                    </div>
                    {feat}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="mt-8 p-4 bg-white rounded-2xl border border-slate-200 text-center">
              <p className="text-sm font-black text-slate-400 uppercase tracking-widest">
                {t('pricing.proWaitlist', { defaultValue: "Rejoindre la liste d'attente" })}
              </p>
            </div>
          </motion.div>
        </div>

        {/* Why it's free section */}
        <section className="max-w-4xl mx-auto bg-blue-50 rounded-[48px] p-12 lg:p-16 space-y-10 border border-blue-100">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="w-24 h-24 bg-white rounded-3xl shadow-xl flex items-center justify-center shrink-0">
              <Lock size={40} className="text-blue-600" />
            </div>
            <div className="space-y-4 text-center md:text-left">
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">
                {t('pricing.whyFreeTitle', { defaultValue: "Pourquoi est-ce gratuit ?" })}
              </h2>
              <p className="text-lg text-slate-600 font-medium leading-relaxed">
                {t('pricing.whyFreeContent', { defaultValue: "La plupart des logiciels de facturation sont chers car ils doivent payer des serveurs massifs pour stocker vos données. InvoiceGEN est différent. Grâce à notre technologie 'Local-First', vos données sont stockées directement dans votre navigateur. Pas de serveurs coûteux = pas de frais pour vous, et une confidentialité totale." })}
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-8 border-t border-blue-200">
            <div className="text-center space-y-2">
              <div className="flex justify-center text-blue-600 mb-2"><Database size={24} /></div>
              <p className="font-black text-slate-900 uppercase text-xs tracking-widest">{t('pricing.localFirst', { defaultValue: "Local-First" })}</p>
              <p className="text-xs text-slate-500 font-bold">{t('pricing.localFirstDesc', { defaultValue: "Données stockées chez vous" })}</p>
            </div>
            <div className="text-center space-y-2">
              <div className="flex justify-center text-blue-600 mb-2"><Shield size={24} /></div>
              <p className="font-black text-slate-900 uppercase text-xs tracking-widest">{t('pricing.noDataSell', { defaultValue: "Pas de revente" })}</p>
              <p className="text-xs text-slate-500 font-bold">{t('pricing.noDataSellDesc', { defaultValue: "Vos données ne sont pas un produit" })}</p>
            </div>
            <div className="text-center space-y-2">
              <div className="flex justify-center text-blue-600 mb-2"><Globe size={24} /></div>
              <p className="font-black text-slate-900 uppercase text-xs tracking-widest">{t('pricing.openAccess', { defaultValue: "Accès Libre" })}</p>
              <p className="text-xs text-slate-500 font-bold">{t('pricing.openAccessDesc', { defaultValue: "Pour tous les entrepreneurs" })}</p>
            </div>
          </div>
        </section>

        {/* FAQ Mini */}
        <div className="max-w-2xl mx-auto text-center space-y-4">
          <p className="text-slate-400 font-bold">
            {t('pricing.questions', { defaultValue: "Une question ? Consultez notre" })} 
            <button onClick={() => window.location.href = '/legal'} className="text-blue-600 hover:underline ml-1">
              {t('pricing.faqLink', { defaultValue: "FAQ complète" })}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};
