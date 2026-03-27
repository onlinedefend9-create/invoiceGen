import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, MessageCircle, ShieldCheck, Zap, Lock, HelpCircle, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer, isOpen, onClick }) => {
  return (
    <div className="border-b border-slate-100 last:border-0">
      <button
        onClick={onClick}
        className="w-full py-8 flex items-center justify-between text-left group transition-all"
      >
        <span className={`text-xl lg:text-2xl font-black tracking-tight transition-colors ${isOpen ? 'text-blue-600' : 'text-slate-900 group-hover:text-blue-600'}`}>
          {question}
        </span>
        <div className={`shrink-0 ml-4 transition-transform duration-300 ${isOpen ? 'rotate-180 text-blue-600' : 'text-slate-400'}`}>
          <ChevronDown size={28} />
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="pb-8 text-lg text-slate-600 font-medium leading-relaxed max-w-4xl">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const FAQ: React.FC = () => {
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: t('faq.q1', { defaultValue: "Comment InvoiceGEN garantit-il la conformité avec la réforme de la facturation électronique 2026 ?" }),
      answer: t('faq.a1', { defaultValue: "InvoiceGEN intègre nativement toutes les mentions obligatoires exigées par la nouvelle réglementation française. Nos documents sont générés au format PDF haute définition, optimisés pour l'archivage légal. Nous suivons de près les évolutions du format Factur-X pour garantir que vos exports resteront compatibles avec les plateformes de dématérialisation partenaires (PDP) et le portail public de facturation (PPF) dès leur déploiement complet en 2026." })
    },
    {
      question: t('faq.q2', { defaultValue: "Mes données bancaires et clients sont-elles stockées sur vos serveurs ?" }),
      answer: t('faq.a2', { defaultValue: "Absolument pas. InvoiceGEN repose sur une architecture 'Local-First'. Toutes les informations que vous saisissez (coordonnées clients, RIB, montants) restent exclusivement dans la mémoire locale de votre navigateur. Rien n'est envoyé, stocké ou traité sur nos serveurs. C'est la garantie technique d'une confidentialité absolue : vous êtes le seul et unique propriétaire de vos données." })
    },
    {
      question: t('faq.q3', { defaultValue: "Pourquoi ce service est-il gratuit et sans inscription ?" }),
      answer: t('faq.a3', { defaultValue: "Notre mission est de lever les barrières administratives pour les indépendants. En utilisant le stockage local de votre appareil, nous éliminons les coûts massifs liés à l'hébergement de bases de données cloud. Cette efficacité technique nous permet d'offrir un outil professionnel haut de gamme gratuitement, sans avoir besoin de vendre vos données ou de vous imposer un abonnement." })
    },
    {
      question: t('faq.q4', { defaultValue: "Puis-je transformer un devis en facture en un clic ?" }),
      answer: t('faq.a4', { defaultValue: "Oui, l'outil a été pensé pour optimiser votre flux de travail. Une fois votre devis créé, vous pouvez le convertir instantanément en facture. Toutes les données sont transférées automatiquement, vous évitant ainsi toute double saisie et réduisant le risque d'erreurs manuelles. C'est un gain de temps précieux pour votre gestion quotidienne." })
    },
    {
      question: t('faq.q5', { defaultValue: "Dois-je installer un logiciel pour utiliser InvoiceGEN ?" }),
      answer: t('faq.a5', { defaultValue: "Non, InvoiceGEN est une application web moderne qui fonctionne directement dans votre navigateur (Chrome, Safari, Firefox, Edge). Elle est également optimisée pour mobile, vous permettant de générer une facture urgente depuis votre smartphone en quelques secondes, sans aucun téléchargement requis." })
    }
  ];

  // JSON-LD FAQPage markup
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <div className="bg-white pt-32 pb-24 px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      
      <div className="max-w-5xl mx-auto space-y-24">
        {/* Header */}
        <div className="text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-block px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full text-sm font-bold tracking-wide uppercase"
          >
            {t('faq.heroBadge', { defaultValue: "Centre d'aide" })}
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl lg:text-8xl font-black tracking-tighter text-slate-900 leading-[0.9]"
          >
            {t('faq.heroTitle', { defaultValue: "Questions Fréquentes" })}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="max-w-2xl mx-auto text-xl lg:text-2xl text-slate-500 font-medium leading-relaxed"
          >
            {t('faq.heroSubtitle', { defaultValue: "Tout ce que vous devez savoir sur la facturation moderne, la sécurité et la conformité 2026." })}
          </motion.p>
        </div>

        {/* FAQ List */}
        <div className="bg-white rounded-[48px] border border-slate-100 p-8 lg:p-16 shadow-2xl shadow-slate-100/50">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </div>

        {/* Support CTA */}
        <div className="bg-slate-900 rounded-[64px] p-12 lg:p-20 text-center space-y-10 text-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-600/20 to-transparent" />
          <div className="relative z-10 space-y-6">
            <div className="w-20 h-20 bg-blue-600 rounded-3xl flex items-center justify-center mx-auto shadow-2xl shadow-blue-900/50 mb-8">
              <MessageCircle size={40} />
            </div>
            <h2 className="text-4xl lg:text-6xl font-black tracking-tighter leading-none">
              {t('faq.ctaTitle', { defaultValue: "Vous avez encore des questions ?" })}
            </h2>
            <p className="max-w-2xl mx-auto text-xl text-slate-400 font-bold">
              Notre équipe d'experts est là pour vous aider à naviguer dans la complexité de la facturation.
            </p>
          </div>
          <div className="relative z-10 flex justify-center">
            <button 
              onClick={() => window.location.href = 'mailto:onlinedefend9@gmail.com'}
              className="px-12 py-6 bg-white text-slate-900 rounded-3xl text-xl font-black hover:scale-105 transition-transform flex items-center justify-center gap-3 shadow-2xl"
            >
              Contactez-nous
              <ArrowRight size={24} />
            </button>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 pt-12">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
              <ShieldCheck size={24} />
            </div>
            <h4 className="font-black text-slate-900 uppercase text-xs tracking-widest">Conformité Totale</h4>
            <p className="text-xs text-slate-500 font-bold">Mis à jour pour les normes fiscales 2026</p>
          </div>
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center">
              <Zap size={24} />
            </div>
            <h4 className="font-black text-slate-900 uppercase text-xs tracking-widest">Rapidité Extrême</h4>
            <p className="text-xs text-slate-500 font-bold">Générez vos documents en moins de 60s</p>
          </div>
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
              <Lock size={24} />
            </div>
            <h4 className="font-black text-slate-900 uppercase text-xs tracking-widest">Confidentialité</h4>
            <p className="text-xs text-slate-500 font-bold">Vos données ne quittent jamais votre PC</p>
          </div>
        </div>
      </div>
    </div>
  );
};
