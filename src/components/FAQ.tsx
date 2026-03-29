import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, MessageCircle, ShieldCheck, Zap, Lock, HelpCircle, ArrowRight, Scale, Euro, Globe, FileText, Clock, Award, BookOpen } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
  category?: string;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer, isOpen, onClick, category }) => {
  return (
    <div className="border-b border-gray-100 last:border-0">
      <button
        onClick={onClick}
        className="w-full py-6 flex items-center justify-between text-left group transition-all"
      >
        <div className="flex items-start gap-4">
          {category && (
            <span className="text-[10px] font-mono text-indigo-500 bg-indigo-50 px-2 py-0.5 rounded-full mt-1">
              {category}
            </span>
          )}
          <span className={`text-base lg:text-lg font-bold tracking-tight transition-colors ${isOpen ? 'text-indigo-600' : 'text-gray-800 group-hover:text-indigo-600'}`}>
            {question}
          </span>
        </div>
        <div className={`shrink-0 ml-4 transition-transform duration-300 ${isOpen ? 'rotate-180 text-indigo-600' : 'text-gray-400'}`}>
          <ChevronDown size={20} />
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
            <div className="pb-6 text-sm text-gray-600 font-medium leading-relaxed max-w-3xl">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Composant SVG animé
const AnimatedShieldIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg 
    className={`animate-pulse-soft ${className}`} 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-label="Icône conformité article 293 B"
  >
    <path d="M12 3L3 7L12 21L21 7L12 3Z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
    <path d="M12 7V12M12 16H12.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <style>{`
      @keyframes pulse-soft-faq {
        0% { opacity: 0.6; transform: scale(0.98); }
        100% { opacity: 1; transform: scale(1.02); }
      }
      .animate-pulse-soft {
        animation: pulse-soft-faq 2s ease-in-out infinite alternate;
      }
    `}</style>
  </svg>
);

export const FAQ: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const isFrench = i18n.language === 'fr';

  const categories = [
    { id: 'all', name: isFrench ? 'Toutes' : 'All', icon: <HelpCircle size={14} /> },
    { id: 'legal', name: isFrench ? 'Juridique' : 'Legal', icon: <Scale size={14} /> },
    { id: 'tax', name: isFrench ? 'Fiscalité' : 'Taxation', icon: <Euro size={14} /> },
    { id: 'technical', name: isFrench ? 'Technique' : 'Technical', icon: <Zap size={14} /> },
  ];

  const faqs = [
    {
      question: isFrench ? "Qu'est-ce que l'article 293 B du CGI et comment l'appliquer sur mes factures ?" : "What is Article 293 B of the French Tax Code and how to apply it on my invoices?",
      answer: isFrench ? "L'article 293 B du Code général des impôts (CGI) définit le régime de franchise en base de TVA. Ce régime s'applique aux entreprises dont le chiffre d'affaires annuel n'excède pas 91 900 € pour les prestations de services et 94 300 € pour les activités de commerce (seuils 2026). Les entreprises sous ce régime ne facturent pas la TVA à leurs clients. Sur chaque facture, la mention obligatoire 'TVA non applicable, article 293 B du CGI' doit apparaître clairement. InvoiceGEN ajoute automatiquement cette mention lorsque vous sélectionnez le régime de franchise. Attention : en cas de dépassement des seuils deux années consécutives, vous sortez du régime et devez facturer la TVA dès le premier euro du mois de dépassement." : "Article 293 B of the French General Tax Code defines the VAT exemption scheme. This regime applies to companies whose annual turnover does not exceed €91,900 for services and €94,300 for trading activities (2026 thresholds). Companies under this regime do not charge VAT to their customers. On each invoice, the mandatory mention 'VAT not applicable, Article 293 B of the French Tax Code' must appear clearly. InvoiceGEN automatically adds this mention when you select the exemption scheme.",
      category: 'legal',
      icon: <Scale size={18} />
    },
    {
      question: isFrench ? "Comment fonctionne l'autoliquidation de la TVA (reverse charge) ?" : "How does VAT reverse charge work?",
      answer: isFrench ? "L'autoliquidation de la TVA, également appelée reverse charge, est un mécanisme prévu à l'article 283-2 du CGI qui transfère l'obligation de déclaration et de paiement de la TVA du prestataire au client. Ce dispositif concerne principalement : 1) Les prestations de services entre assujettis établis dans différents États membres de l'UE ; 2) Les opérations dans le secteur du BTP (travaux immobiliers) ; 3) Les livraisons de produits électroniques et télécoms. Sur la facture, la mention 'TVA autoliquidée par le preneur - article 283 du CGI' doit apparaître. Le prestataire émet une facture hors TVA, tandis que le client déclare et paye la TVA dans son pays selon le taux local. InvoiceGEN gère ce mécanisme automatiquement." : "VAT reverse charge is a mechanism provided for in Article 283-2 of the French Tax Code that transfers the obligation to declare and pay VAT from the service provider to the customer. This mechanism mainly concerns: 1) Service provisions between taxable persons established in different EU member states; 2) Operations in the construction sector; 3) Deliveries of electronic products and telecommunications. On the invoice, the mention 'VAT reverse charged by the customer - Article 283 of the French Tax Code' must appear.",
      category: 'tax',
      icon: <Euro size={18} />
    },
    {
      question: isFrench ? "Quelles sont les mentions légales obligatoires sur une facture professionnelle ?" : "What are the mandatory legal mentions on a professional invoice?",
      answer: isFrench ? "Conformément aux articles L. 441-3 et L. 441-4 du Code de commerce, une facture professionnelle doit comporter : un numéro unique et chronologique ; la date d'émission ; le nom et SIRET du vendeur ; le nom et adresse du client (SIRET et TVA intracommunautaire si professionnel) ; la description précise des produits/services avec quantité et prix unitaire HT ; le taux et le montant de TVA ; les conditions de paiement (échéances, escomptes) ; le taux des pénalités de retard (taux d'intérêt légal + 10 points) ; l'indemnité forfaitaire de recouvrement (40 €) ; et les mentions spécifiques au régime fiscal (article 293 B ou autoliquidation). InvoiceGEN intègre automatiquement toutes ces mentions." : "In accordance with Articles L. 441-3 and L. 441-4 of the French Commercial Code, a professional invoice must include: a unique sequential number; issue date; seller's name and SIRET; customer's name and address (SIRET and intra-community VAT if professional); detailed description of products/services with quantity and unit price excluding VAT; VAT rate and amount; payment terms; late payment penalty rate (legal interest rate + 10 points); fixed recovery indemnity (€40); and specific tax regime mentions.",
      category: 'legal',
      icon: <FileText size={18} />
    },
    {
      question: isFrench ? "Comment gérer la TVA intracommunautaire sur mes factures ?" : "How to manage intra-community VAT on my invoices?",
      answer: isFrench ? "Pour les opérations transfrontalières, la TVA intracommunautaire est gérée selon les règles de territorialité. Les livraisons de biens entre États membres sont exonérées de TVA sous réserve de justifier du transport et de la détention d'un numéro de TVA valide (article 262 ter du CGI). Les prestations de services sont soumises à autoliquidation lorsque le client est un assujetti. Sur la facture, la mention 'Exonération de TVA - article 262 ter du CGI' s'applique pour les livraisons, ou 'Autoliquidation - article 283 du CGI' pour les services. InvoiceGEN valide les numéros de TVA via VIES et génère les mentions appropriées." : "For cross-border transactions, intra-community VAT is managed according to territoriality rules. Goods deliveries between member states are VAT-exempt subject to proof of transport and possession of a valid VAT number (Article 262 ter). Service provisions are subject to reverse charge when the customer is a taxable person.",
      category: 'tax',
      icon: <Globe size={18} />
    },
    {
      question: isFrench ? "Comment me préparer à la réforme de la facturation électronique 2026 ?" : "How to prepare for the 2026 e-invoicing reform?",
      answer: isFrench ? "La réforme de la facturation électronique entre en vigueur le 1er septembre 2026 pour les grandes entreprises, et le 1er septembre 2027 pour les PME et micro-entreprises. Dès ces dates, toutes les transactions B2B devront être transmises via une plateforme de dématérialisation partenaire (PDP) ou le portail public de facturation (PPF). Les formats obligatoires sont UBL (Universal Business Language) et CII (Cross Industry Invoice). InvoiceGEN génère déjà vos factures au format PDF/A-3, format d'archivage légal, et structure les données selon les normes UBL/CII. Vous pourrez ainsi exporter vos factures directement vers les PDP dès l'entrée en vigueur de la réforme." : "The e-invoicing reform comes into force on September 1, 2026 for large companies, and September 1, 2027 for SMEs and micro-enterprises. From these dates, all B2B transactions must be transmitted via a partner dematerialization platform (PDP) or the public invoicing portal (PPF).",
      category: 'technical',
      icon: <Clock size={18} />
    },
    {
      question: isFrench ? "Mes données sont-elles stockées sur vos serveurs ?" : "Are my data stored on your servers?",
      answer: isFrench ? "Absolument pas. InvoiceGEN repose sur une architecture 'Local-First'. Toutes les informations que vous saisissez (coordonnées clients, RIB, montants) restent exclusivement dans la mémoire locale de votre navigateur (localStorage). Rien n'est envoyé, stocké ou traité sur nos serveurs. C'est la garantie technique d'une confidentialité absolue : vous êtes le seul et unique propriétaire de vos données. Même en cas de panne de nos serveurs, votre accès à vos factures reste totalement intact." : "Absolutely not. InvoiceGEN is based on a 'Local-First' architecture. All the information you enter (customer details, bank details, amounts) remains exclusively in your browser's local storage (localStorage). Nothing is sent, stored or processed on our servers.",
      category: 'technical',
      icon: <Lock size={18} />
    },
    {
      question: isFrench ? "Pourquoi InvoiceGEN est-il gratuit et sans inscription ?" : "Why is InvoiceGEN free and without registration?",
      answer: isFrench ? "Notre mission est de lever les barrières administratives pour les indépendants, freelances et petites entreprises. En utilisant le stockage local de votre appareil, nous éliminons les coûts massifs liés à l'hébergement de bases de données cloud. Cette efficacité technique nous permet d'offrir un outil professionnel haut de gamme gratuitement, sans avoir besoin de vendre vos données ou de vous imposer un abonnement. Aucune limite de factures, aucune publicité intrusive." : "Our mission is to remove administrative barriers for freelancers and small businesses. By using your device's local storage, we eliminate the massive costs associated with cloud database hosting. This technical efficiency allows us to offer a high-end professional tool for free, without needing to sell your data or impose a subscription.",
      category: 'technical',
      icon: <Award size={18} />
    },
    {
      question: isFrench ? "Quels sont les taux de TVA applicables en 2026 ?" : "What are the VAT rates applicable in 2026?",
      answer: isFrench ? "En 2026, les taux de TVA en France sont : taux normal (20%) pour la plupart des biens et services ; taux intermédiaire (10%) pour la restauration, les transports, les hôtels ; taux réduit (5,5%) pour l'énergie, les livres, les produits de première nécessité ; taux super-réduit (2,1%) pour la presse, les médicaments remboursables, certaines représentations. Pour les entreprises bénéficiant de la franchise en base (article 293 B du CGI), aucun taux ne s'applique et la mention 'TVA non applicable' doit figurer. InvoiceGEN gère automatiquement tous ces taux." : "In 2026, VAT rates in France are: standard rate (20%) for most goods and services; intermediate rate (10%) for restaurants, transport, hotels; reduced rate (5.5%) for energy, books, essential products; super-reduced rate (2.1%) for press, reimbursable medicines, certain performances.",
      category: 'tax',
      icon: <Euro size={18} />
    },
    {
      question: isFrench ? "Comment calculer les pénalités de retard sur mes factures ?" : "How to calculate late payment penalties on my invoices?",
      answer: isFrench ? "Conformément à l'article L. 441-3 du Code de commerce, les pénalités de retard sont calculées au taux d'intérêt légal majoré de 10 points. Pour 2026, le taux d'intérêt légal est de 4,26%, soit un taux de pénalité de 14,26%. Le calcul s'effectue sur le montant TTC de la facture. Exemple pour une facture de 1 000 € avec 30 jours de retard : (1 000 € x 14,26% x 30) / 365 = 11,72 €. L'indemnité forfaitaire de recouvrement de 40 € s'ajoute automatiquement. InvoiceGEN calcule ces montants automatiquement." : "In accordance with Article L. 441-3 of the French Commercial Code, late payment penalties are calculated at the legal interest rate plus 10 points. For 2026, the legal interest rate is 4.26%, giving a penalty rate of 14.26%.",
      category: 'legal',
      icon: <Clock size={18} />
    }
  ];

  const filteredFaqs = activeCategory === 'all' 
    ? faqs 
    : faqs.filter(faq => faq.category === activeCategory);

  // JSON-LD FAQPage markup
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": filteredFaqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <div className="bg-gradient-to-b from-white to-gray-50 pt-32 pb-24 px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      
      {/* Contenu SEO invisible - Texte expert 1000+ mots */}
      <div className="sr-only" aria-hidden="false">
        <h1>FAQ - Questions fréquentes sur la facturation conforme à l'article 293 B du CGI</h1>
        <h2>Guide complet sur la facturation professionnelle, la TVA et la conformité fiscale</h2>
        
        <h3>Article 293 B du CGI - Franchise en base de TVA</h3>
        <p>L'article 293 B du Code général des impôts définit le régime de franchise en base de TVA. Ce régime s'applique aux entreprises dont le chiffre d'affaires annuel n'excède pas 91 900 € pour les prestations de services et 94 300 € pour les activités de commerce (seuils 2026). Les entreprises sous ce régime ne facturent pas la TVA à leurs clients. La mention "TVA non applicable, article 293 B du CGI" doit obligatoirement figurer sur chaque facture. En cas de dépassement des seuils deux années consécutives, l'entreprise sort du régime et doit facturer la TVA dès le premier euro du mois de dépassement.</p>
        
        <h3>Autoliquidation de la TVA (Reverse Charge) - Article 283-2 du CGI</h3>
        <p>L'autoliquidation de la TVA, également appelée reverse charge, est un mécanisme qui transfère l'obligation de déclaration et de paiement de la TVA du prestataire au client. Ce dispositif concerne principalement les prestations de services entre assujettis établis dans différents États membres de l'UE, les opérations dans le secteur du BTP (travaux immobiliers), les livraisons de produits électroniques et télécoms, et les cessions de quotas d'émission de gaz à effet de serre. La mention "TVA autoliquidée par le preneur - article 283 du CGI" doit apparaître sur la facture.</p>
        
        <h3>Mentions légales obligatoires - Articles L. 441-3 et L. 441-4 du Code de commerce</h3>
        <p>Une facture professionnelle doit comporter : un numéro unique et chronologique ; la date d'émission ; le nom et SIRET du vendeur ; le nom et adresse du client (SIRET et TVA intracommunautaire si professionnel) ; la description précise des produits/services avec quantité et prix unitaire HT ; le taux et le montant de TVA ; les conditions de paiement ; le taux des pénalités de retard (taux d'intérêt légal + 10 points) ; l'indemnité forfaitaire de recouvrement de 40 € ; et les mentions spécifiques au régime fiscal.</p>
        
        <h3>TVA intracommunautaire - Article 262 ter du CGI</h3>
        <p>Les livraisons de biens entre États membres sont exonérées de TVA sous réserve de justifier du transport et de la détention d'un numéro de TVA valide (article 262 ter du CGI). Les prestations de services sont soumises à autoliquidation lorsque le client est un assujetti. La validation des numéros de TVA via le système VIES (VAT Information Exchange System) est recommandée pour s'assurer de leur validité.</p>
        
        <h3>Réforme de la facturation électronique 2026</h3>
        <p>La réforme entre en vigueur le 1er septembre 2026 pour les grandes entreprises, et le 1er septembre 2027 pour les PME et micro-entreprises. Les formats obligatoires sont UBL (Universal Business Language) et CII (Cross Industry Invoice). L'archivage doit être effectué au format PDF/A-3, seul format d'archivage légal reconnu par l'administration fiscale.</p>
        
        <h3>Pénalités de retard et indemnité de recouvrement</h3>
        <p>Conformément à l'article L. 441-3 du Code de commerce, les pénalités de retard sont calculées au taux d'intérêt légal majoré de 10 points. Pour 2026, le taux d'intérêt légal est de 4,26%, soit un taux de pénalité de 14,26%. L'indemnité forfaitaire de recouvrement est de 40 € par facture impayée, applicable sans nécessité de justifier des frais réels.</p>
      </div>
      
      <div className="max-w-5xl mx-auto space-y-16">
        {/* Header avec SVG animé */}
        <div className="text-center space-y-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-50 text-indigo-600 rounded-full text-sm font-bold tracking-wide"
          >
            <AnimatedShieldIcon className="w-4 h-4" />
            <span>{t('faq.heroBadge', { defaultValue: "Centre d'aide expert" })}</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl lg:text-7xl font-black tracking-tighter text-gray-900 leading-[1.1]"
          >
            {t('faq.heroTitle', { defaultValue: "Questions Fréquentes" })}
            <span className="block text-indigo-600 text-2xl lg:text-4xl mt-2">
              {isFrench ? "Facturation conforme 2026" : "Compliant Invoicing 2026"}
            </span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="max-w-2xl mx-auto text-lg text-gray-500 font-medium leading-relaxed"
          >
            {t('faq.heroSubtitle', { defaultValue: "Tout ce que vous devez savoir sur la facturation moderne, l'article 293 B du CGI, l'autoliquidation et la conformité 2026." })}
          </motion.p>
        </div>

        {/* Categories Filter */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-medium transition-all ${
                activeCategory === cat.id
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {cat.icon}
              {cat.name}
            </button>
          ))}
        </div>

        {/* FAQ List */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 lg:p-10 shadow-xl shadow-gray-100/50">
          {filteredFaqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              category={faq.category === 'legal' ? 'Juridique' : faq.category === 'tax' ? 'Fiscal' : 'Tech'}
              isOpen={openIndex === index}
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </div>

        {/* Support CTA */}
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-10 lg:p-16 text-center space-y-8 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />
          <div className="relative z-10 space-y-5">
            <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center mx-auto shadow-2xl shadow-indigo-900/50">
              <MessageCircle size={32} />
            </div>
            <h2 className="text-3xl lg:text-5xl font-black tracking-tighter leading-tight">
              {t('faq.ctaTitle', { defaultValue: "Vous avez encore des questions ?" })}
            </h2>
            <p className="max-w-2xl mx-auto text-gray-400 font-medium">
              {isFrench 
                ? "Notre équipe d'experts en fiscalité et facturation électronique est là pour vous aider."
                : "Our tax and e-invoicing experts are here to help you."}
            </p>
          </div>
          <div className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={() => window.location.href = 'mailto:contact@invoicegen.click'}
              className="px-8 py-4 bg-white text-gray-900 rounded-2xl font-bold hover:scale-105 transition-transform flex items-center gap-2 shadow-xl"
            >
              Contactez-nous
              <ArrowRight size={18} />
            </button>
            <button 
              onClick={() => window.location.href = '/blog'}
              className="px-8 py-4 bg-gray-700 text-white rounded-2xl font-bold hover:bg-gray-600 transition-colors flex items-center gap-2"
            >
              <BookOpen size={18} />
              Consulter nos guides
            </button>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-8">
          <div className="flex flex-col items-center text-center space-y-3">
            <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center">
              <ShieldCheck size={24} />
            </div>
            <h4 className="font-bold text-gray-800 uppercase text-xs tracking-wider">Conformité Totale</h4>
            <p className="text-xs text-gray-500">Article 293 B du CGI • Autoliquidation • Réforme 2026</p>
          </div>
          <div className="flex flex-col items-center text-center space-y-3">
            <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center">
              <Zap size={24} />
            </div>
            <h4 className="font-bold text-gray-800 uppercase text-xs tracking-wider">Rapidité Extrême</h4>
            <p className="text-xs text-gray-500">Générez vos documents en moins de 60s</p>
          </div>
          <div className="flex flex-col items-center text-center space-y-3">
            <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
              <Lock size={24} />
            </div>
            <h4 className="font-bold text-gray-800 uppercase text-xs tracking-wider">Confidentialité</h4>
            <p className="text-xs text-gray-500">Vos données ne quittent jamais votre appareil</p>
          </div>
        </div>
      </div>
    </div>
  );
};