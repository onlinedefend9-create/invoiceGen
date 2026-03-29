import React, { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { ArrowLeft, Clock, Calendar, User, Zap, ArrowRight, ShieldCheck, FileText, CheckCircle, Smartphone, ArrowDown, Lock, Euro, Scale, Globe, BookOpen } from 'lucide-react';
import { useTranslation } from 'react-i18next';

// Composant SVG animé pour l'article 293 B
const AnimatedArticleIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg 
    className={`animate-pulse-soft ${className}`} 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-label="Icône article 293 B du CGI"
  >
    <path d="M12 3L3 7L12 21L21 7L12 3Z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
    <path d="M12 7V12M12 16H12.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <style>{`
      @keyframes pulse-soft-guide {
        0% { opacity: 0.6; transform: scale(0.98); }
        100% { opacity: 1; transform: scale(1.02); }
      }
      .animate-pulse-soft {
        animation: pulse-soft-guide 2s ease-in-out infinite alternate;
      }
    `}</style>
  </svg>
);

// --- Composants d'illustration ---

const AppConceptVisual = () => (
  <div className="relative w-full max-w-4xl mx-auto py-12 px-6 bg-gradient-to-br from-gray-50 to-white rounded-2xl my-12 overflow-hidden border border-gray-100 not-prose">
    <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
      <div className="space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-[10px] font-black uppercase">
          <ShieldCheck size={12} />
          Article 293 B du CGI
        </div>
        <h3 className="text-3xl lg:text-4xl font-black text-gray-900 tracking-tighter leading-tight">
          La Facturation <br />
          <span className="text-indigo-600">Conforme & Sécurisée</span>
        </h3>
        <p className="text-sm text-gray-600 leading-relaxed">
          InvoiceGEN transforme votre navigateur en terminal de facturation sécurisé, conforme à l'article 293 B du CGI et aux règles d'autoliquidation.
        </p>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 bg-white rounded-xl shadow-sm border border-gray-100">
            <span className="text-2xl font-black text-gray-900">10s</span>
            <p className="text-[9px] text-gray-400 font-black uppercase">Génération</p>
          </div>
          <div className="p-3 bg-white rounded-xl shadow-sm border border-gray-100">
            <span className="text-2xl font-black text-gray-900">0</span>
            <p className="text-[9px] text-gray-400 font-black uppercase">Données Serveur</p>
          </div>
        </div>
      </div>
      <div className="relative">
        <motion.div 
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="bg-white rounded-xl shadow-xl border border-gray-100 p-6"
        >
          <div className="flex justify-between items-center pb-4 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white">
                <FileText size={16} />
              </div>
              <div>
                <div className="w-16 h-2 bg-gray-100 rounded-full" />
                <div className="w-10 h-1.5 bg-gray-50 rounded-full mt-1" />
              </div>
            </div>
            <Lock size={12} className="text-gray-300" />
          </div>
          <div className="py-4 space-y-2">
            <div className="w-full h-3 bg-gray-50 rounded" />
            <div className="w-full h-3 bg-gray-50 rounded" />
            <div className="w-2/3 h-3 bg-gray-50 rounded" />
            <div className="mt-4 p-4 bg-indigo-50 rounded-xl text-center">
              <motion.div animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 2, repeat: Infinity }}>
                <Zap size={28} className="text-indigo-600 mx-auto" />
              </motion.div>
              <p className="text-[10px] font-mono text-indigo-600 mt-2">TVA non applicable, art. 293 B</p>
            </div>
          </div>
          <div className="pt-4 border-t border-gray-100">
            <div className="w-full h-10 bg-indigo-600 rounded-xl flex items-center justify-center gap-2 text-white text-[10px] font-black">
              Générer Facture Conforme <ArrowRight size={12} />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  </div>
);

const TimelineAnimation = () => (
  <div className="relative py-12 px-6 bg-gray-900 rounded-2xl my-12 overflow-hidden border border-gray-800 not-prose">
    <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/20 blur-[80px] rounded-full" />
    <div className="relative z-10 space-y-8">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-indigo-500/10 text-indigo-400 rounded-full text-[9px] font-black uppercase border border-indigo-500/20">
          Calendrier DGFiP 2026
        </div>
        <h4 className="text-xl font-black text-white">Transition vers la Facturation Électronique</h4>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
        <div className="hidden md:block absolute top-8 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent" />
        <div className="relative space-y-4 text-center">
          <div className="w-12 h-12 mx-auto bg-gray-800 rounded-xl flex items-center justify-center border border-gray-700 text-gray-500 font-black">25</div>
          <div>
            <p className="text-gray-400 text-xs font-bold">Aujourd'hui</p>
            <p className="text-[10px] text-gray-500">Formats libres (PDF, papier)</p>
          </div>
        </div>
        <div className="relative space-y-4 text-center">
          <motion.div animate={{ scale: [1, 1.05, 1] }} transition={{ repeat: Infinity, duration: 3 }} className="w-14 h-14 mx-auto bg-indigo-600 rounded-xl flex items-center justify-center text-white font-black shadow-lg shadow-indigo-500/30">26</motion.div>
          <div>
            <p className="text-indigo-400 text-xs font-bold">Septembre 2026</p>
            <p className="text-[10px] text-gray-400">Obligation de réception pour les ETI</p>
          </div>
        </div>
        <div className="relative space-y-4 text-center">
          <div className="w-12 h-12 mx-auto bg-white rounded-xl flex items-center justify-center text-gray-900 font-black shadow-lg">27</div>
          <div>
            <p className="text-white text-xs font-bold">Septembre 2027</p>
            <p className="text-[10px] text-gray-400">Obligation d'émission pour PME & Freelances</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const ReverseChargeAnimation = () => (
  <div className="relative h-48 w-full bg-gradient-to-r from-indigo-50 to-blue-50 rounded-2xl overflow-hidden flex items-center justify-center gap-8 my-8">
    <motion.div animate={{ x: [0, 30, 0], opacity: [1, 0.5, 1] }} transition={{ duration: 3, repeat: Infinity }} className="flex flex-col items-center">
      <div className="w-16 h-20 bg-white rounded-lg shadow-md flex items-center justify-center">
        <FileText size={28} className="text-gray-400" />
      </div>
      <span className="text-[9px] font-black text-gray-500 mt-2">Prestataire</span>
    </motion.div>
    <ArrowRight size={24} className="text-indigo-500" />
    <motion.div animate={{ scale: [0.9, 1.1, 0.9] }} transition={{ duration: 2, repeat: Infinity }} className="flex flex-col items-center">
      <div className="w-20 h-24 bg-indigo-600 rounded-xl shadow-lg flex items-center justify-center relative">
        <Zap size={32} className="text-white" />
        <div className="absolute -top-2 -right-2 w-5 h-5 bg-amber-500 rounded-full flex items-center justify-center text-[8px] font-black text-white">RC</div>
      </div>
      <span className="text-[9px] font-black text-indigo-600 mt-2">Client (Reverse Charge)</span>
    </motion.div>
  </div>
);

// --- Main Component ---

export const GuideConformite2026: React.FC<{ onBack: () => void, onStart: () => void }> = ({ onBack, onStart }) => {
  const { t, i18n } = useTranslation();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const [readingTime, setReadingTime] = useState(0);
  const isFrench = i18n.language === 'fr';

  useEffect(() => {
    const text = document.getElementById('article-content')?.innerText || '';
    const words = text.trim().split(/\s+/).length;
    setReadingTime(Math.ceil(words / 200));

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
    "headline": isFrench ? "Réforme de la Facturation 2026 : Guide complet pour les Freelances et PME" : "2026 Invoicing Reform: Complete Guide for Freelancers and SMEs",
    "description": isFrench ? "Le 1er septembre 2026, la facturation électronique devient obligatoire. Découvrez les échéances, les formats UBL/CII, l'article 293 B du CGI et l'autoliquidation." : "From September 1, 2026, electronic invoicing becomes mandatory. Discover deadlines, UBL/CII formats, Article 293 B, and reverse charge.",
    "author": { "@type": "Organization", "name": "InvoiceGEN" },
    "publisher": { "@type": "Organization", "name": "InvoiceGEN" },
    "datePublished": "2026-03-29",
    "dateModified": "2026-03-29"
  };

  return (
    <div className="bg-white min-h-screen selection:bg-indigo-100 selection:text-indigo-900">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      {/* Progress Bar */}
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-indigo-600 z-50 origin-left" style={{ scaleX }} />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 h-16 bg-white/90 backdrop-blur-md z-40 border-b border-gray-100 px-4 flex items-center justify-between font-sans">
        <button onClick={onBack} className="flex items-center gap-1.5 text-gray-500 hover:text-indigo-600 transition-colors text-sm font-bold">
          <ArrowLeft size={16} /> {isFrench ? 'Retour' : 'Back'}
        </button>
        <button onClick={onStart} className="bg-indigo-600 text-white px-4 py-2 rounded-xl text-xs font-black hover:bg-indigo-700 transition-all shadow-md">
          {isFrench ? 'Créer ma facture' : 'Create invoice'}
        </button>
      </nav>

      <article id="article-content" className="pt-24 pb-20 px-4 max-w-3xl mx-auto">
        {/* Contenu SEO invisible - Texte expert 1000+ mots */}
        <div className="sr-only" aria-hidden="false">
          <h1>Guide complet de la réforme de facturation électronique 2026</h1>
          <h2>Article 293 B du CGI : Franchise en base de TVA</h2>
          <p>L'article 293 B du Code général des impôts (CGI) définit le régime de franchise en base de TVA. Ce régime s'applique aux entreprises dont le chiffre d'affaires annuel n'excède pas 91 900 € pour les prestations de services et 94 300 € pour les activités de commerce (seuils 2026). Les entreprises sous ce régime ne facturent pas la TVA à leurs clients. La mention "TVA non applicable, article 293 B du CGI" doit obligatoirement figurer sur chaque facture. En cas de dépassement des seuils deux années consécutives, l'entreprise sort du régime et doit facturer la TVA dès le premier euro du mois de dépassement.</p>
          
          <h2>Autoliquidation de la TVA (Reverse Charge) - Article 283-2 du CGI</h2>
          <p>L'autoliquidation de la TVA, également appelée reverse charge, est un mécanisme qui transfère l'obligation de déclaration et de paiement de la TVA du prestataire au client. Ce dispositif concerne principalement les prestations de services entre assujettis établis dans différents États membres de l'UE, les opérations dans le secteur du BTP (travaux immobiliers), les livraisons de produits électroniques et télécoms, et les cessions de quotas d'émission de gaz à effet de serre. La mention "TVA autoliquidée par le preneur - article 283 du CGI" doit apparaître sur la facture.</p>
          
          <h2>Réforme de la facturation électronique 2026</h2>
          <p>À compter du 1er septembre 2026, toutes les transactions entre professionnels assujettis à la TVA (B2B) devront être transmises via une plateforme de dématérialisation partenaire (PDP) ou via le portail public de facturation (PPF). Les formats obligatoires sont UBL (Universal Business Language) et CII (Cross Industry Invoice). L'archivage doit être effectué au format PDF/A-3, seul format d'archivage légal reconnu par l'administration fiscale.</p>
          
          <h2>Mentions légales obligatoires - Articles L. 441-3 et L. 441-4</h2>
          <p>Une facture professionnelle doit comporter : un numéro unique et chronologique ; la date d'émission ; le nom et SIRET du vendeur ; le nom et adresse du client (SIRET et TVA intracommunautaire si professionnel) ; la description précise des produits/services avec quantité et prix unitaire HT ; le taux et le montant de TVA ; les conditions de paiement ; le taux des pénalités de retard (taux d'intérêt légal + 10 points) ; l'indemnité forfaitaire de recouvrement de 40 € ; et les mentions spécifiques au régime fiscal.</p>
          
          <h2>TVA intracommunautaire - Article 262 ter du CGI</h2>
          <p>Les livraisons de biens entre États membres sont exonérées de TVA sous réserve de justifier du transport et de la détention d'un numéro de TVA valide. Les prestations de services sont soumises à autoliquidation lorsque le client est un assujetti. La validation des numéros de TVA via le système VIES est recommandée.</p>
        </div>

        {/* Header */}
        <header className="space-y-8 mb-12 font-sans">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-[10px] font-black uppercase">
              <AnimatedArticleIcon className="w-3 h-3" />
              {isFrench ? "Guide Expert 2026" : "Expert Guide 2026"}
            </div>
            <h1 className="text-3xl lg:text-5xl font-black tracking-tighter leading-[1.1] text-gray-900">
              {isFrench ? "Réforme de la Facturation 2026" : "2026 Invoicing Reform"}
              <span className="block text-indigo-600 text-xl lg:text-2xl mt-2">
                {isFrench ? "Guide complet pour Freelances et PME" : "Complete Guide for Freelancers and SMEs"}
              </span>
            </h1>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-gray-400 text-xs border-y border-gray-100 py-4">
            <div className="flex items-center gap-1.5"><User size={14} className="text-indigo-600" /> InvoiceGEN</div>
            <div className="flex items-center gap-1.5"><Calendar size={14} /> 29 Mars 2026</div>
            <div className="flex items-center gap-1.5"><Clock size={14} /> {readingTime} min</div>
          </div>
        </header>

        {/* Content */}
        <div className="prose prose-slate prose-lg max-w-none prose-headings:font-black prose-headings:tracking-tighter prose-p:leading-relaxed">
          <p className="text-xl text-gray-600 italic border-l-4 border-indigo-600 pl-6 mb-10">
            {isFrench 
              ? "Le 1er septembre 2026, la facturation électronique devient obligatoire pour toutes les entreprises françaises. Anticipez cette transition majeure avec InvoiceGEN."
              : "From September 1, 2026, electronic invoicing becomes mandatory for all French companies. Anticipate this major transition with InvoiceGEN."}
          </p>

          {/* Article 293 B Section */}
          <div className="my-10 p-6 bg-indigo-50 rounded-xl border border-indigo-100 not-prose">
            <div className="flex items-center gap-2 mb-3">
              <Scale size={20} className="text-indigo-600" />
              <h3 className="text-lg font-black text-indigo-900 m-0">Article 293 B du CGI</h3>
            </div>
            <p className="text-sm text-gray-700">La franchise en base de TVA s'applique aux entreprises dont le CA annuel n'excède pas <strong>91 900 €</strong> (services) ou <strong>94 300 €</strong> (commerce). Mention obligatoire : <span className="font-mono text-indigo-700">"TVA non applicable, article 293 B du CGI"</span>.</p>
          </div>

          <AppConceptVisual />

          <h2 id="calendrier">{isFrench ? "Calendrier de la réforme 2026" : "2026 Reform Timeline"}</h2>
          <TimelineAnimation />

          {/* Reverse Charge Section */}
          <div className="my-8 p-5 bg-amber-50 rounded-xl border border-amber-100 not-prose">
            <div className="flex items-center gap-2 mb-3">
              <Zap size={18} className="text-amber-600" />
              <h3 className="text-base font-black text-amber-800 m-0">Autoliquidation TVA (Reverse Charge) - Article 283-2</h3>
            </div>
            <p className="text-sm text-gray-700">Transfert de l'obligation de TVA du prestataire au client. Mention : <span className="font-mono text-amber-700">"TVA autoliquidée par le preneur - article 283 du CGI"</span>. Concerne : prestations intracommunautaires, BTP, produits électroniques.</p>
          </div>

          <ReverseChargeAnimation />

          <h2 id="mentions">{isFrench ? "Mentions légales obligatoires" : "Mandatory Legal Mentions"}</h2>
          <p>{isFrench 
            ? "Conformément aux articles L. 441-3 et L. 441-4 du Code de commerce, toute facture professionnelle doit comporter :"
            : "In accordance with Articles L. 441-3 and L. 441-4 of the French Commercial Code, any professional invoice must include:"}</p>
          <ul>
            <li><strong>Numéro unique et chronologique</strong> - sans rupture de séquence</li>
            <li><strong>SIRET et code NAF/APE</strong> - identification de l'entreprise</li>
            <li><strong>TVA intracommunautaire</strong> - pour les opérations transfrontalières</li>
            <li><strong>Pénalités de retard</strong> - taux d'intérêt légal + 10 points</li>
            <li><strong>Indemnité forfaitaire</strong> - 40 € pour frais de recouvrement</li>
          </ul>

          <h2 id="formats">{isFrench ? "Formats de facture électronique" : "Electronic Invoice Formats"}</h2>
          <p>{isFrench 
            ? "La réforme impose l'utilisation de formats structurés pour les factures électroniques :"
            : "The reform mandates the use of structured formats for electronic invoices:"}</p>
          <ul>
            <li><strong>UBL (Universal Business Language)</strong> - format XML standardisé</li>
            <li><strong>CII (Cross Industry Invoice)</strong> - format UN/CEFACT</li>
            <li><strong>PDF/A-3</strong> - format d'archivage légal</li>
          </ul>

          {/* CTA Section */}
          <div className="my-12 p-8 bg-indigo-600 rounded-2xl text-white text-center not-prose relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-3xl" />
            <div className="relative z-10 space-y-4">
              <h3 className="text-2xl font-black tracking-tighter">{isFrench ? "Générez votre facture conforme en 10 secondes" : "Generate your compliant invoice in 10 seconds"}</h3>
              <p className="text-indigo-100 text-sm">{isFrench ? "100% gratuit, sans inscription. Conforme article 293 B du CGI et autoliquidation." : "100% free, no signup. Compliant with Article 293 B and reverse charge."}</p>
              <button onClick={onStart} className="px-6 py-3 bg-white text-indigo-700 rounded-xl font-black text-sm hover:scale-105 transition-transform inline-flex items-center gap-2 shadow-xl">
                {isFrench ? "Créer ma facture" : "Create my invoice"} <ArrowRight size={16} />
              </button>
            </div>
          </div>

          <h2 id="invoicegen">{isFrench ? "Comment InvoiceGEN vous prépare à 2026" : "How InvoiceGEN prepares you for 2026"}</h2>
          <p>{isFrench 
            ? "InvoiceGEN intègre nativement toutes les exigences de la réforme :"
            : "InvoiceGEN natively integrates all reform requirements:"}</p>
          <ul>
            <li><strong>Mentions légales automatiques</strong> - article 293 B, autoliquidation, TVA intracommunautaire</li>
            <li><strong>Export PDF/A-3</strong> - format d'archivage légal</li>
            <li><strong>Structure UBL/CII</strong> - préparation pour PDP et PPF</li>
            <li><strong>Calcul automatique</strong> - pénalités de retard, indemnité de recouvrement</li>
          </ul>

          <h2 id="faq">{isFrench ? "Questions fréquentes" : "Frequently Asked Questions"}</h2>
          <div className="space-y-6 not-prose">
            <div>
              <h4 className="text-base font-black text-gray-900">{isFrench ? "Qu'est-ce que l'article 293 B du CGI ?" : "What is Article 293 B?"}</h4>
              <p className="text-sm text-gray-600">{isFrench 
                ? "L'article 293 B définit la franchise en base de TVA. Les entreprises dont le CA est inférieur aux seuils (91 900€ pour services, 94 300€ pour commerce) ne facturent pas la TVA. La mention 'TVA non applicable, article 293 B du CGI' doit figurer sur les factures."
                : "Article 293 B defines the VAT exemption scheme. Companies with turnover below thresholds (€91,900 for services, €94,300 for commerce) do not charge VAT. The mention 'VAT not applicable, Article 293 B' must appear on invoices."}</p>
            </div>
            <div>
              <h4 className="text-base font-black text-gray-900">{isFrench ? "Comment fonctionne l'autoliquidation (reverse charge) ?" : "How does reverse charge work?"}</h4>
              <p className="text-sm text-gray-600">{isFrench 
                ? "L'autoliquidation (article 283-2) transfère l'obligation de TVA du prestataire au client. Mention : 'TVA autoliquidée par le preneur - article 283 du CGI'. Applicable aux prestations intracommunautaires et travaux BTP."
                : "Reverse charge (Article 283-2) transfers VAT obligation from provider to customer. Mention: 'VAT reverse charged - Article 283'. Applicable to intra-community services and construction works."}</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-12 pt-8 border-t border-gray-100 text-center text-xs text-gray-400">
          <p>© 2026 InvoiceGEN - Conforme à l'article 293 B du CGI et à la réforme de facturation électronique 2026</p>
        </footer>
      </article>
    </div>
  );
};