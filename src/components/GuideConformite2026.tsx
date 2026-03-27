import React, { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { ArrowLeft, Clock, Calendar, User, Zap, ArrowRight, ShieldCheck, FileText, CheckCircle, Smartphone, ArrowDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';

// --- Animations ---

const PulseInvoice = () => (
  <div className="relative w-full max-w-md mx-auto h-64 bg-slate-50 rounded-[40px] flex items-center justify-center overflow-hidden border border-slate-100 my-16 shadow-inner">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/5 via-transparent to-transparent animate-pulse" />
    
    <motion.div 
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="relative z-10 flex flex-col items-center gap-6"
    >
      <div className="relative">
        <motion.div
          animate={{ 
            scale: [1, 1.05, 1],
            rotate: [0, -1, 1, 0]
          }}
          transition={{ duration: 4, repeat: Infinity }}
          className="w-32 h-40 bg-white rounded-xl shadow-2xl border border-slate-100 p-4 flex flex-col gap-2"
        >
          <div className="w-full h-3 bg-slate-100 rounded" />
          <div className="w-3/4 h-3 bg-slate-100 rounded" />
          <div className="w-1/2 h-3 bg-slate-100 rounded" />
          <div className="mt-auto w-full h-8 bg-slate-50 rounded-lg" />
        </motion.div>
        
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.8, type: "spring" }}
          className="absolute -bottom-4 -right-4 bg-blue-600 text-white px-4 py-2 rounded-xl font-black text-xs shadow-xl border-2 border-white flex items-center gap-2"
        >
          <ShieldCheck size={14} /> CERTIFIÉ 2026
        </motion.div>
      </div>
      
      <p className="text-xs font-black text-slate-400 uppercase tracking-widest animate-bounce">
        Transformation automatique
      </p>
    </motion.div>
  </div>
);

const TimelineAnimation = () => (
  <div className="relative h-48 w-full bg-slate-50 rounded-[32px] overflow-hidden flex items-center justify-center px-12 my-12">
    <div className="absolute h-1 w-full bg-slate-200 top-1/2 -translate-y-1/2" />
    <div className="flex justify-between w-full relative z-10">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 bg-white border-4 border-slate-200 rounded-full flex items-center justify-center font-black text-slate-400">2025</div>
        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Standard</span>
      </div>
      <motion.div 
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5, type: "spring" }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
      >
        <div className="bg-green-500 text-white px-4 py-2 rounded-lg font-black text-sm rotate-12 shadow-xl border-2 border-white">CONFORME</div>
      </motion.div>
      <div className="flex flex-col items-center gap-4">
        <div className="w-16 h-16 bg-blue-600 border-4 border-blue-100 rounded-full flex items-center justify-center font-black text-white shadow-xl">2026</div>
        <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">Réforme</span>
      </div>
    </div>
    <motion.div 
      initial={{ width: 0 }}
      whileInView={{ width: "50%" }}
      transition={{ duration: 1.5, ease: "easeInOut" }}
      className="absolute h-1 bg-blue-600 top-1/2 -translate-y-1/2 left-0"
    />
  </div>
);

const FacturXAnimation = () => (
  <div className="relative h-64 w-full bg-slate-900 rounded-[48px] overflow-hidden flex items-center justify-center gap-12 my-12">
    <motion.div
      animate={{ 
        x: [0, 50, 0],
        opacity: [1, 0, 1],
        scale: [1, 0.8, 1]
      }}
      transition={{ duration: 4, repeat: Infinity }}
      className="flex flex-col items-center gap-4"
    >
      <div className="w-20 h-24 bg-white rounded-lg flex items-center justify-center shadow-2xl relative">
        <FileText size={40} className="text-slate-400" />
        <div className="absolute bottom-2 right-2 bg-red-500 text-[8px] font-black text-white px-1 rounded">PDF</div>
      </div>
      <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Simple PDF</span>
    </motion.div>

    <ArrowRight size={32} className="text-blue-500" />

    <motion.div
      animate={{ 
        scale: [0.9, 1.1, 0.9],
        rotate: [0, 5, -5, 0]
      }}
      transition={{ duration: 5, repeat: Infinity }}
      className="flex flex-col items-center gap-4"
    >
      <div className="w-24 h-28 bg-blue-600 rounded-xl flex items-center justify-center shadow-2xl relative border-2 border-blue-400">
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
        <Zap size={48} className="text-white" />
        <div className="absolute bottom-2 right-2 bg-white text-[8px] font-black text-blue-600 px-1 rounded">FACTUR-X</div>
      </div>
      <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Smart Invoice</span>
    </motion.div>
  </div>
);

const FreelanceAnimation = () => (
  <div className="relative h-64 w-full bg-blue-50 rounded-[48px] overflow-hidden flex items-center justify-center my-12">
    <motion.div 
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 3, repeat: Infinity }}
      className="relative"
    >
      <div className="w-32 h-64 bg-slate-900 rounded-[32px] border-4 border-slate-800 shadow-2xl overflow-hidden p-2">
        <div className="w-full h-full bg-white rounded-[24px] flex flex-col p-4 gap-2">
          <div className="w-full h-4 bg-slate-100 rounded" />
          <div className="w-2/3 h-4 bg-slate-100 rounded" />
          <div className="mt-auto w-full h-10 bg-blue-600 rounded-xl flex items-center justify-center">
            <CheckCircle size={20} className="text-white" />
          </div>
        </div>
      </div>
      <motion.div 
        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute -top-4 -right-4 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white shadow-lg"
      >
        <Zap size={20} fill="currentColor" />
      </motion.div>
    </motion.div>
    <div className="ml-12 space-y-2">
      <div className="h-2 w-24 bg-blue-200 rounded-full" />
      <div className="h-2 w-32 bg-blue-200 rounded-full" />
      <div className="h-2 w-20 bg-blue-200 rounded-full" />
    </div>
  </div>
);

// --- Main Component ---

export const GuideConformite2026: React.FC<{ onBack: () => void, onStart: () => void }> = ({ onBack, onStart }) => {
  const { t, i18n } = useTranslation();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [readingTime, setReadingTime] = useState(0);

  useEffect(() => {
    const text = document.getElementById('article-content')?.innerText || '';
    const words = text.trim().split(/\s+/).length;
    setReadingTime(Math.ceil(words / 200));

    // SEO: Hreflang tags
    const frLink = document.createElement('link');
    frLink.rel = 'alternate';
    frLink.hreflang = 'fr';
    frLink.href = 'https://invoicegen.click/blog/guide-conformite-facturation-2026';
    
    const enLink = document.createElement('link');
    enLink.rel = 'alternate';
    enLink.hreflang = 'en';
    enLink.href = 'https://invoicegen.click/blog/2026-invoicing-conformity-guide';

    document.head.appendChild(frLink);
    document.head.appendChild(enLink);

    return () => {
      document.head.removeChild(frLink);
      document.head.removeChild(enLink);
    };
  }, [i18n.language]);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": t('blogPost2026.title'),
    "image": "https://invoicegen.click/og-image-blog.png",
    "author": {
      "@type": "Organization",
      "name": t('blogPost2026.author')
    },
    "publisher": {
      "@type": "Organization",
      "name": "InvoiceGEN",
      "logo": {
        "@type": "ImageObject",
        "url": "https://invoicegen.click/logo.png"
      }
    },
    "datePublished": "2026-03-27",
    "dateModified": "2026-03-27",
    "description": t('blogPost2026.description')
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": t('blogPost2026.q1'),
        "acceptedAnswer": {
          "@type": "Answer",
          "text": t('blogPost2026.a1')
        }
      },
      {
        "@type": "Question",
        "name": t('blogPost2026.q2'),
        "acceptedAnswer": {
          "@type": "Answer",
          "text": t('blogPost2026.a2')
        }
      }
    ]
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": i18n.language === 'fr' ? "Accueil" : "Home",
        "item": "https://invoicegen.click"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Blog",
        "item": "https://invoicegen.click/blog"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": t('blogPost2026.title'),
        "item": i18n.language === 'fr' 
          ? "https://invoicegen.click/blog/guide-conformite-facturation-2026" 
          : "https://invoicegen.click/blog/2026-invoicing-conformity-guide"
      }
    ]
  };

  return (
    <div className="bg-white min-h-screen font-serif selection:bg-blue-100 selection:text-blue-900">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1.5 bg-blue-600 z-50 origin-left"
        style={{ scaleX }}
      />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 h-20 bg-white/80 backdrop-blur-md z-40 border-b border-slate-100 px-6 flex items-center justify-between font-sans">
        <button onClick={onBack} className="flex items-center gap-2 text-slate-500 hover:text-blue-600 transition-colors font-bold">
          <ArrowLeft size={20} /> {i18n.language === 'fr' ? 'Retour au blog' : 'Back to blog'}
        </button>
        <div className="hidden md:flex items-center gap-4">
          <span className="text-xs font-black uppercase tracking-widest text-slate-400">{i18n.language === 'fr' ? 'Lecture en cours' : 'Now reading'}</span>
          <div className="w-px h-4 bg-slate-200" />
          <span className="text-xs font-black uppercase tracking-widest text-blue-600 truncate max-w-[200px]">{t('blogPost2026.title')}</span>
        </div>
        <button onClick={onStart} className="relative group bg-blue-600 text-white px-6 py-2.5 rounded-xl text-sm font-black hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite]" />
          {i18n.language === 'fr' ? 'Essayer l\'outil' : 'Try the tool'}
        </button>
      </nav>

      <article id="article-content" className="pt-40 pb-32 px-6 max-w-3xl mx-auto">
        {/* Header */}
        <header className="space-y-12 mb-20 font-sans">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full text-[10px] font-black uppercase tracking-widest">
              <ShieldCheck size={14} /> {t('blogPost2026.heroBadge')}
            </div>
            <h1 className="text-5xl lg:text-7xl font-black tracking-tighter leading-[0.95] text-slate-900">
              {t('blogPost2026.title')}
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-8 text-slate-400 font-bold text-sm border-y border-slate-100 py-6">
            <div className="flex items-center gap-2">
              <User size={18} className="text-blue-600" /> {t('blogPost2026.author')}
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={18} /> 27 Mars 2026
            </div>
            <div className="flex items-center gap-2">
              <Clock size={18} /> {readingTime} {i18n.language === 'fr' ? 'min de lecture' : 'min read'}
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="prose prose-slate prose-2xl max-w-none prose-headings:font-sans prose-headings:font-black prose-headings:tracking-tighter prose-p:leading-relaxed prose-p:text-slate-700 prose-li:text-slate-700">
          <p className="text-3xl font-medium text-slate-500 italic border-l-4 border-blue-600 pl-8 mb-16">
            "{t('blogPost2026.intro')}"
          </p>

          <PulseInvoice />

          {/* Psychological Structure: The Problem */}
          <div className="my-20 p-12 bg-red-50 rounded-[48px] border-2 border-red-100 font-sans not-prose">
            <h3 className="text-3xl font-black text-red-900 tracking-tighter mb-4">
              {i18n.language === 'fr' ? 'La réforme 2026 arrive. Êtes-vous prêt ?' : 'The 2026 reform is coming. Are you ready?'}
            </h3>
            <p className="text-xl text-red-700 font-bold leading-relaxed">
              {i18n.language === 'fr' 
                ? 'Le 1er septembre 2026, la facturation papier et Excel devient illégale pour toutes les entreprises françaises. Sans préparation, vous risquez des amendes et des blocages de paiement.' 
                : 'On September 1, 2026, paper and Excel invoicing will become illegal for all French companies. Without preparation, you risk fines and payment blocks.'}
            </p>
          </div>

          <TimelineAnimation />

          {/* Psychological Structure: The Solution */}
          <div className="my-20 p-12 bg-green-50 rounded-[48px] border-2 border-green-100 font-sans not-prose">
            <h3 className="text-3xl font-black text-green-900 tracking-tighter mb-4">
              {i18n.language === 'fr' ? 'InvoiceGEN rend la conformité gratuite.' : 'InvoiceGEN makes compliance free.'}
            </h3>
            <p className="text-xl text-green-700 font-bold leading-relaxed">
              {i18n.language === 'fr' 
                ? 'Nous avons conçu InvoiceGEN pour que la conformité ne soit plus un fardeau financier. Pas d\'abonnement, pas de frais cachés, juste un outil puissant et conforme.' 
                : 'We designed InvoiceGEN so that compliance is no longer a financial burden. No subscriptions, no hidden fees, just a powerful and compliant tool.'}
            </p>
          </div>

          <h2 id="changement" className="mt-20">{t('blogPost2026.section1Title')}</h2>
          <p>{t('blogPost2026.section1Content')}</p>
          <ul>
            <li><strong>{t('blogPost2026.change1').split(':')[0]}:</strong> {t('blogPost2026.change1').split(':')[1]}</li>
            <li><strong>{t('blogPost2026.change2').split(':')[0]}:</strong> {t('blogPost2026.change2').split(':')[1]}</li>
            <li><strong>{t('blogPost2026.change3').split(':')[0]}:</strong> {t('blogPost2026.change3').split(':')[1]}</li>
          </ul>

          {/* Psychological Structure: The Action */}
          <div className="my-20 p-12 bg-blue-600 rounded-[48px] text-white font-sans not-prose shadow-2xl shadow-blue-200 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl group-hover:scale-110 transition-transform duration-700" />
            <div className="relative z-10 space-y-8">
              <h3 className="text-4xl font-black tracking-tighter leading-none">
                {i18n.language === 'fr' ? 'Générez votre facture en 10 secondes.' : 'Generate your invoice in 10 seconds.'}
              </h3>
              <p className="text-xl font-bold opacity-90">{t('blogPost2026.ctaText')}</p>
              <button onClick={onStart} className="relative overflow-hidden group px-10 py-5 bg-white text-blue-600 rounded-2xl font-black text-xl hover:scale-105 transition-transform flex items-center gap-3">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-600/10 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite]" />
                {i18n.language === 'fr' ? 'Créer ma facture' : 'Create my invoice'} <Zap size={24} fill="currentColor" />
              </button>
            </div>
          </div>

          <h2 id="mentions">{t('blogPost2026.section2Title')}</h2>
          <p>{t('blogPost2026.section2Content')}</p>
          <ol>
            <li><strong>{t('blogPost2026.mention1').split(':')[0]}:</strong> {t('blogPost2026.mention1').split(':')[1]}</li>
            <li><strong>{t('blogPost2026.mention2').split(':')[0]}:</strong> {t('blogPost2026.mention2').split(':')[1]}</li>
            <li><strong>{t('blogPost2026.mention3').split(':')[0]}:</strong> {t('blogPost2026.mention3').split(':')[1]}</li>
            <li><strong>{t('blogPost2026.mention4').split(':')[0]}:</strong> {t('blogPost2026.mention4').split(':')[1]}</li>
            <li><strong>{t('blogPost2026.mention5').split(':')[0]}:</strong> {t('blogPost2026.mention5').split(':')[1]}</li>
          </ol>

          <h2 id="pourquoi">{t('blogPost2026.section3Title')}</h2>
          <p>{t('blogPost2026.section3Content')}</p>
          
          <FacturXAnimation />

          <p className="mt-12">{t('blogPost2026.facturXDesc')}</p>

          <h3 className="mt-16">{t('blogPost2026.tableTitle')}</h3>
          <div className="not-prose overflow-x-auto rounded-3xl border border-slate-100 shadow-xl mb-16">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50">
                  <th className="p-6 text-sm font-black uppercase tracking-widest text-slate-400 border-b border-slate-100">Caractéristique</th>
                  <th className="p-6 text-sm font-black uppercase tracking-widest text-slate-400 border-b border-slate-100">{t('blogPost2026.tableOld')}</th>
                  <th className="p-6 text-sm font-black uppercase tracking-widest text-blue-600 border-b border-slate-100">{t('blogPost2026.tableNew')}</th>
                </tr>
              </thead>
              <tbody className="text-slate-700 font-bold">
                <tr>
                  <td className="p-6 border-b border-slate-50">{t('blogPost2026.row1Label')}</td>
                  <td className="p-6 border-b border-slate-50 text-slate-400">{t('blogPost2026.row1Old')}</td>
                  <td className="p-6 border-b border-slate-50 text-blue-600">{t('blogPost2026.row1New')}</td>
                </tr>
                <tr>
                  <td className="p-6 border-b border-slate-50">{t('blogPost2026.row2Label')}</td>
                  <td className="p-6 border-b border-slate-50 text-slate-400">{t('blogPost2026.row2Old')}</td>
                  <td className="p-6 border-b border-slate-50 text-blue-600">{t('blogPost2026.row2New')}</td>
                </tr>
                <tr>
                  <td className="p-6">{t('blogPost2026.row3Label')}</td>
                  <td className="p-6 text-slate-400">{t('blogPost2026.row3Old')}</td>
                  <td className="p-6 text-blue-600">{t('blogPost2026.row3New')}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 id="invoicegen">{t('blogPost2026.section4Title')}</h2>
          <p>{t('blogPost2026.section4Content')}</p>
          
          <FreelanceAnimation />

          <ul className="mt-12">
            <li><strong>{t('blogPost2026.feature1').split(':')[0]}:</strong> {t('blogPost2026.feature1').split(':')[1]}</li>
            <li><strong>{t('blogPost2026.feature2').split(':')[0]}:</strong> {t('blogPost2026.feature2').split(':')[1]}</li>
            <li><strong>{t('blogPost2026.feature3').split(':')[0]}:</strong> {t('blogPost2026.feature3').split(':')[1]}</li>
          </ul>

          {/* CTA Block 2 */}
          <div className="my-20 p-12 bg-slate-900 rounded-[48px] text-white font-sans not-prose shadow-2xl relative overflow-hidden">
            <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-blue-600/20 to-transparent" />
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
              <div className="space-y-6">
                <h3 className="text-4xl font-black tracking-tighter leading-none">{i18n.language === 'fr' ? 'Prêt pour 2026 ?' : 'Ready for 2026?'}</h3>
                <p className="text-xl text-slate-400 font-bold">{i18n.language === 'fr' ? 'Rejoignez des milliers d\'indépendants qui utilisent déjà InvoiceGEN.' : 'Join thousands of freelancers already using InvoiceGEN.'}</p>
              </div>
              <button onClick={onStart} className="shrink-0 px-12 py-6 bg-blue-600 text-white rounded-3xl font-black text-2xl hover:bg-blue-700 transition-all shadow-2xl shadow-blue-900/50 flex items-center gap-3">
                {i18n.language === 'fr' ? 'Commencer' : 'Get Started'} <ArrowRight size={28} />
              </button>
            </div>
          </div>

          <h2 id="faq" className="mt-20">{t('blogPost2026.faqTitle')}</h2>
          <div className="space-y-12 not-prose">
            <div className="space-y-4">
              <h4 className="text-2xl font-black tracking-tight text-slate-900">{t('blogPost2026.q1')}</h4>
              <p className="text-lg text-slate-600 font-medium leading-relaxed">{t('blogPost2026.a1')}</p>
            </div>
            <div className="space-y-4">
              <h4 className="text-2xl font-black tracking-tight text-slate-900">{t('blogPost2026.q2')}</h4>
              <p className="text-lg text-slate-600 font-medium leading-relaxed">{t('blogPost2026.a2')}</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-32 pt-12 border-t border-slate-100 font-sans">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 bg-slate-900 rounded-[28px] flex items-center justify-center text-white font-black text-3xl shadow-xl">IG</div>
              <div>
                <p className="text-xl font-black text-slate-900">{t('blogPost2026.author')}</p>
                <p className="text-sm text-slate-400 font-bold uppercase tracking-widest">{t('blogPost2026.authorRole')}</p>
              </div>
            </div>
            <div className="flex gap-4">
              <button className="p-4 bg-slate-50 hover:bg-blue-50 hover:text-blue-600 rounded-2xl transition-all text-slate-400 font-black text-xs uppercase tracking-widest">
                LinkedIn
              </button>
              <button className="p-4 bg-slate-50 hover:bg-blue-50 hover:text-blue-600 rounded-2xl transition-all text-slate-400 font-black text-xs uppercase tracking-widest">
                Twitter
              </button>
            </div>
          </div>
        </footer>
      </article>
      
      {/* Floating CTA for mobile */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 md:hidden">
        <button onClick={onStart} className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-black shadow-2xl flex items-center gap-2">
          {t('blogPost2026.ctaText')} <ArrowDown size={20} />
        </button>
      </div>
    </div>
  );
};
