import React from 'react';
import { BookOpen, Star, ArrowRight, Clock, Zap, ShieldCheck } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';

export const Blog: React.FC<{ onNavigate: (view: any, slug?: string) => void, onStart: () => void }> = ({ onNavigate, onStart }) => {
  const { t, i18n } = useTranslation();

  return (
    <div className="relative overflow-hidden bg-white">
      {/* Background Accents */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none">
        <div className="absolute top-1/4 -left-24 w-96 h-96 bg-blue-500/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-1/4 -right-24 w-96 h-96 bg-indigo-500/10 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto space-y-24 pt-40 pb-32 px-6 relative z-10">
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
          <div className="space-y-6 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-blue-100">
              <Star size={14} fill="currentColor" /> {t('blog.expertResource', { defaultValue: "Ressources Experts" })}
            </div>
            <h1 className="text-6xl lg:text-8xl font-black tracking-tighter leading-[0.9] text-slate-900">
              {t('blog.heroTitle', { defaultValue: "Blog & Guides" })}
            </h1>
          </div>
          <p className="text-xl text-slate-500 font-medium max-w-md leading-relaxed border-l-4 border-blue-600 pl-8">
            {t('blogPost2026.description', { defaultValue: "Découvrez nos conseils pour optimiser votre facturation, rester conforme et gagner du temps au quotidien." })}
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Featured Post */}
          <motion.div 
            whileHover={{ y: -8 }}
            onClick={() => onNavigate('blog-post', i18n.language === 'fr' ? 'guide-conformite-facturation-2026' : '2026-invoicing-conformity-guide')}
            className="lg:col-span-8 group cursor-pointer relative bg-slate-900 rounded-[64px] overflow-hidden shadow-2xl shadow-blue-900/20 border border-slate-800"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/30 via-transparent to-indigo-600/30 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            
            <div className="relative aspect-[16/9] md:aspect-auto md:h-[650px] flex flex-col justify-end p-12 md:p-20">
              {/* Visual Accent */}
              <div className="absolute top-12 right-12 w-80 h-80 bg-blue-500/20 blur-[100px] rounded-full group-hover:scale-125 transition-transform duration-1000" />
              
              <div className="relative z-10 space-y-8 max-w-3xl">
                <div className="flex items-center gap-3">
                  <span className="px-4 py-1 bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg shadow-blue-900/50">Nouveau</span>
                  <span className="text-blue-400 text-[10px] font-black uppercase tracking-widest">Guide Complet 2026</span>
                </div>
                <h2 className="text-4xl lg:text-7xl font-black text-white tracking-tighter leading-[0.95]">
                  {t('blogPost2026.title', { defaultValue: "Réforme de la Facturation 2026 : Tout ce que les Freelances et PME doivent savoir." })}
                </h2>
                <p className="text-xl text-slate-400 font-bold leading-relaxed">
                  {t('blogPost2026.description', { defaultValue: "Le 1er septembre 2026, la facturation électronique devient obligatoire. Découvrez les 5 mentions indispensables et comment préparer votre transition gratuitement." })}
                </p>
                <div className="flex items-center gap-8 pt-6">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-slate-900 font-black text-2xl shadow-xl">IG</div>
                    <div>
                      <p className="text-base font-black text-white">{t('blog.authorName', { defaultValue: "Équipe InvoiceGEN" })}</p>
                      <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{t('blog.authorRole', { defaultValue: "Expert Fintech" })}</p>
                    </div>
                  </div>
                  <div className="h-10 w-px bg-slate-800" />
                  <div className="flex items-center gap-3 text-slate-400 text-sm font-bold">
                    <Clock size={20} className="text-blue-500" /> {t('blogPost2026.readingTime', { defaultValue: "12 min" })}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Side Resources */}
          <div className="lg:col-span-4 flex flex-col gap-12">
            <ResourceCard 
              title={t('blog.card2Title', { defaultValue: "Automatisation par l'IA" })}
              desc={t('blog.card2Desc', { defaultValue: "Comment les outils propulsés par l'IA comme Magic Fill révolutionnent la facturation SaaS." })}
              icon={<Zap size={28} />}
              color="blue"
            />
            <ResourceCard 
              title={t('blog.card3Title', { defaultValue: "Optimisation des Paiements" })}
              desc={t('blog.card3Desc', { defaultValue: "Stratégies et modèles pour réduire les retards de paiement de 40% grâce au design intelligent." })}
              icon={<ShieldCheck size={28} />}
              color="indigo"
            />
            
            <div className="flex-1 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[48px] p-12 text-white flex flex-col justify-between shadow-2xl shadow-blue-200 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl group-hover:scale-150 transition-transform duration-700" />
              <div className="space-y-4 relative z-10">
                <h4 className="text-3xl font-black tracking-tighter leading-tight">
                  {i18n.language === 'fr' ? 'Prêt pour la révolution 2026 ?' : 'Ready for the 2026 revolution?'}
                </h4>
                <p className="text-blue-100 font-bold text-sm">
                  {i18n.language === 'fr' ? 'Générez votre première facture conforme en 10 secondes.' : 'Generate your first compliant invoice in 10 seconds.'}
                </p>
              </div>
              <button 
                onClick={onStart}
                className="w-full py-5 bg-white text-blue-600 rounded-2xl font-black text-sm uppercase tracking-widest hover:scale-105 transition-transform shadow-xl relative z-10 mt-8"
              >
                {i18n.language === 'fr' ? 'Démarrer maintenant' : 'Start now'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function ResourceCard({ title, desc, icon, color, onClick }: { title: string, desc: string, icon: React.ReactNode, color: 'blue' | 'indigo', onClick?: () => void }) {
  return (
    <motion.div 
      whileHover={{ y: -4, scale: 1.02 }}
      onClick={onClick}
      className="bg-white p-10 rounded-[48px] shadow-2xl shadow-slate-200/50 border border-slate-100 flex flex-col gap-8 group cursor-pointer relative overflow-hidden"
    >
      <div className={`absolute top-0 right-0 w-32 h-32 bg-${color}-500/5 blur-3xl rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700`} />
      
      <div className={`w-16 h-16 rounded-3xl flex items-center justify-center text-white shadow-xl shadow-${color}-100 transition-transform group-hover:rotate-6 ${
        color === 'blue' ? 'bg-blue-600' : 'bg-indigo-600'
      }`}>
        {icon}
      </div>
      <div className="space-y-4 relative z-10">
        <h4 className="text-3xl font-black text-slate-900 tracking-tighter group-hover:text-blue-600 transition-colors leading-tight">{title}</h4>
        <p className="text-lg text-slate-500 font-medium leading-relaxed">{desc}</p>
      </div>
      <div className="flex items-center gap-3 text-sm font-black uppercase tracking-widest text-blue-600 mt-2 opacity-0 group-hover:opacity-100 transition-all -translate-x-4 group-hover:translate-x-0">
        Lire la suite <ArrowRight size={20} />
      </div>
    </motion.div>
  );
}
