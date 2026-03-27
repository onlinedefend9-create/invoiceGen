import React from 'react';
import { BookOpen, ChevronRight, Star, ArrowRight } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { useTranslation } from 'react-i18next';

export const Blog: React.FC<{ onNavigate: (view: any, slug?: string) => void }> = ({ onNavigate }) => {
  const { t } = useTranslation();

  return (
    <div className="max-w-6xl mx-auto space-y-24 pt-32 pb-24 px-6">
      <header className="text-center space-y-8">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full text-[10px] font-black uppercase tracking-widest">
          <Star size={12} /> {t('blog.expertResource', { defaultValue: "Ressources Experts" })}
        </div>
        <h1 className="text-6xl lg:text-8xl font-black tracking-tighter leading-none">{t('blog.heroTitle', { defaultValue: "Blog & Guides" })}</h1>
        <p className="max-w-2xl mx-auto text-xl text-slate-500 font-medium">
          Découvrez nos conseils pour optimiser votre facturation, rester conforme et gagner du temps au quotidien.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Featured Post */}
        <div 
          onClick={() => onNavigate('blog-post-2026', 'guide-conformite-facturation-2026')}
          className="lg:col-span-2 bg-slate-900 rounded-[64px] p-12 lg:p-20 text-white relative overflow-hidden group cursor-pointer shadow-2xl shadow-blue-100"
        >
          <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-blue-600/30 to-transparent opacity-50 group-hover:scale-110 transition-transform duration-700" />
          <div className="relative z-10 space-y-8 max-w-3xl">
            <div className="inline-block px-4 py-1 bg-blue-600 rounded-full text-[10px] font-black uppercase tracking-widest">Nouveau • Guide Complet</div>
            <h2 className="text-4xl lg:text-7xl font-black tracking-tighter leading-[0.9]">
              Réforme de la Facturation 2026 : Tout ce que les Freelances et PME doivent savoir.
            </h2>
            <p className="text-xl text-slate-400 font-bold leading-relaxed">
              Le 1er septembre 2026, la facturation électronique devient obligatoire. Découvrez les 5 mentions indispensables et comment préparer votre transition gratuitement.
            </p>
            <div className="flex items-center gap-4 pt-4">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-slate-900 font-black">IG</div>
              <div>
                <p className="text-sm font-black">Équipe InvoiceGEN</p>
                <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Temps de lecture : 12 min</p>
              </div>
            </div>
          </div>
        </div>

        {/* Other Posts */}
        <ResourceCard 
          title={t('blog.card1Title', { defaultValue: "Conformité 2026" })} 
          desc={t('blog.card1Desc', { defaultValue: "Tout ce qu'il faut savoir sur la facturation électronique obligatoire." })} 
          onClick={() => onNavigate('blog-post-2026', 'guide-conformite-facturation-2026')}
        />
        <ResourceCard 
          title={t('blog.card2Title', { defaultValue: "Optimisation Fiscale" })} 
          desc={t('blog.card2Desc', { defaultValue: "Comment gérer votre TVA sans stress et optimiser vos revenus." })} 
        />
      </div>
    </div>
  );
};

function ResourceCard({ title, desc, onClick }: { title: string, desc: string, onClick?: () => void }) {
  return (
    <div 
      onClick={onClick}
      className="p-12 bg-white rounded-[48px] border border-slate-100 shadow-xl hover:shadow-2xl transition-all group cursor-pointer flex flex-col justify-between"
    >
      <div>
        <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-3xl flex items-center justify-center mb-8 group-hover:bg-blue-600 group-hover:text-white transition-colors">
          <BookOpen size={28} />
        </div>
        <h4 className="text-3xl font-black tracking-tighter mb-4">{title}</h4>
        <p className="text-lg text-slate-400 font-bold leading-relaxed mb-8">{desc}</p>
      </div>
      <div className="flex items-center gap-2 text-blue-600 font-black text-sm uppercase tracking-widest group-hover:gap-4 transition-all">
        Lire l'article <ArrowRight size={20} />
      </div>
    </div>
  );
}
