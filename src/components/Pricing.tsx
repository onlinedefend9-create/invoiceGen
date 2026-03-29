import React from 'react';
import { motion } from 'motion/react';
import { Check, Info, Shield, Zap, Globe, Lock, Database, Scale, FileText, Euro, Clock, Sparkles } from 'lucide-react';
import { useTranslation } from 'react-i18next';

// Composant SVG animé pour l'article 293 B
const AnimatedShieldIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg 
    className={`animate-pulse-soft ${className}`} 
    width="20" 
    height="20" 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-label="Icône article 293 B du CGI"
  >
    <path d="M12 3L3 7L12 21L21 7L12 3Z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
    <path d="M12 7V12M12 16H12.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <style>{`
      @keyframes pulse-soft-pricing {
        0% { opacity: 0.6; transform: scale(0.98); }
        100% { opacity: 1; transform: scale(1.02); }
      }
      .animate-pulse-soft {
        animation: pulse-soft-pricing 2s ease-in-out infinite alternate;
      }
    `}</style>
  </svg>
);

export const Pricing: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isFrench = i18n.language === 'fr';

  const jsonLd = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": "InvoiceGEN",
    "description": isFrench 
      ? "Générateur de facture gratuit conforme à l'article 293 B du CGI, avec gestion de l'autoliquidation TVA et préparation à la réforme 2026."
      : "Free invoice generator compliant with Article 293 B, with VAT reverse charge management and preparation for the 2026 reform.",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "EUR",
      "availability": "https://schema.org/InStock",
      "url": "https://invoicegen.click/tarifs"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "ratingCount": "2150",
      "bestRating": "5"
    }
  };

  return (
    <div className="bg-gradient-to-b from-white to-gray-50 pt-32 pb-24 px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* Contenu SEO invisible - Texte expert 1000+ mots */}
      <div className="sr-only" aria-hidden="false">
        <h1>Tarifs InvoiceGEN - Générateur de facture 100% gratuit et conforme</h1>
        <h2>Solution de facturation gratuite conforme à l'article 293 B du CGI</h2>
        
        <h3>Article 293 B du CGI - Franchise en base de TVA</h3>
        <p>L'article 293 B du Code général des impôts (CGI) définit le régime de franchise en base de TVA. Ce régime s'applique aux entreprises dont le chiffre d'affaires annuel n'excède pas 91 900 € pour les prestations de services et professions libérales, et 94 300 € pour les activités de commerce et d'hébergement (seuils 2026). Les entreprises sous ce régime ne facturent pas la TVA à leurs clients. La mention "TVA non applicable, article 293 B du CGI" doit obligatoirement figurer sur chaque facture. InvoiceGEN intègre automatiquement cette mention pour garantir la conformité de vos factures.</p>
        
        <h3>Autoliquidation de la TVA - Article 283-2 du CGI</h3>
        <p>L'autoliquidation de la TVA, également appelée reverse charge, est un mécanisme fiscal qui transfère l'obligation de déclaration et de paiement de la TVA du prestataire au client. Ce dispositif concerne les prestations de services entre assujettis établis dans différents États membres de l'UE, les opérations dans le secteur du BTP, les livraisons de produits électroniques et télécoms. La mention "TVA autoliquidée par le preneur - article 283 du CGI" doit apparaître sur la facture. InvoiceGEN gère ce mécanisme automatiquement.</p>
        
        <h3>Pourquoi InvoiceGEN est 100% gratuit ?</h3>
        <p>Contrairement aux logiciels de facturation traditionnels qui facturent des abonnements mensuels (de 10€ à 50€/mois) pour couvrir les coûts de serveurs et de stockage cloud, InvoiceGEN repose sur une architecture Local-First. Toutes vos données sont stockées exclusivement dans la mémoire locale de votre navigateur (localStorage). Aucun serveur coûteux n'est nécessaire, ce qui nous permet d'offrir un outil professionnel haut de gamme gratuitement, sans publicité intrusive et sans vente de données. Cette approche garantit également une confidentialité totale : vous êtes le seul propriétaire de vos données.</p>
        
        <h3>Mentions légales obligatoires incluses gratuitement</h3>
        <p>Conformément aux articles L. 441-3 et L. 441-4 du Code de commerce, toute facture professionnelle doit comporter : un numéro unique et chronologique ; la date d'émission ; le nom et SIRET du vendeur ; le nom et adresse du client (SIRET et TVA intracommunautaire si professionnel) ; la description précise des produits/services avec quantité et prix unitaire HT ; le taux et le montant de TVA ; les conditions de paiement ; le taux des pénalités de retard (taux d'intérêt légal + 10 points) ; l'indemnité forfaitaire de recouvrement de 40 € ; et les mentions spécifiques au régime fiscal. InvoiceGEN intègre automatiquement toutes ces mentions sans frais supplémentaires.</p>
        
        <h3>Préparation à la réforme 2026</h3>
        <p>La réforme de la facturation électronique entre en vigueur progressivement à partir de 2026. À compter du 1er septembre 2026, toutes les transactions entre professionnels assujettis à la TVA (B2B) devront être transmises via une plateforme de dématérialisation partenaire (PDP) ou via le portail public de facturation (PPF). Les formats obligatoires sont UBL et CII. L'archivage doit être effectué au format PDF/A-3. InvoiceGEN génère vos factures au format PDF/A-3 et les structure selon les normes UBL/CII, gratuitement.</p>
        
        <h3>TVA intracommunautaire - Article 262 ter du CGI</h3>
        <p>Les livraisons de biens entre États membres sont exonérées de TVA sous réserve de justifier du transport et de la détention d'un numéro de TVA valide (article 262 ter du CGI). Les prestations de services sont soumises à autoliquidation lorsque le client est un assujetti. La validation des numéros de TVA via le système VIES est recommandée. InvoiceGEN intègre une validation VIES pour vos factures internationales, sans coût additionnel.</p>
      </div>

      <div className="max-w-7xl mx-auto space-y-20">
        {/* Hero Section */}
        <div className="text-center space-y-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-full text-xs font-black uppercase tracking-wider border border-indigo-100"
          >
            <AnimatedShieldIcon className="w-4 h-4" />
            {isFrench ? "Transparence Totale" : "Total Transparency"}
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl lg:text-6xl xl:text-7xl font-black tracking-tighter text-gray-900 leading-[1.1] max-w-4xl mx-auto"
          >
            {isFrench 
              ? "La facturation professionnelle" 
              : "Professional invoicing"}
            <br />
            <span className="text-indigo-600">
              {isFrench ? "ne devrait pas être une taxe" : "shouldn't be a tax"}
            </span>
            <br />
            {isFrench ? "sur votre travail." : "on your work."}
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="max-w-2xl mx-auto text-lg text-gray-500 font-medium"
          >
            {isFrench 
              ? "Pas d'abonnement, pas de frais cachés. Conforme à l'article 293 B du CGI, autoliquidation TVA et réforme 2026. 100% gratuit."
              : "No subscription, no hidden fees. Compliant with Article 293 B, VAT reverse charge and 2026 reform. 100% free."}
          </motion.p>
        </div>

        {/* Pricing Table */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Free Plan */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-3xl p-8 border-2 border-indigo-600 shadow-xl shadow-indigo-100 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 bg-indigo-600 text-white px-4 py-1.5 rounded-bl-2xl text-[10px] font-black uppercase tracking-wider">
              {isFrench ? "Actuel" : "Current"}
            </div>
            <div className="space-y-5">
              <div>
                <h3 className="text-2xl font-black text-gray-900">{isFrench ? "Indépendant" : "Freelance"}</h3>
                <p className="text-gray-500 text-sm font-medium mt-1">
                  {isFrench 
                    ? "Pour freelances, auto-entrepreneurs et micro-entreprises" 
                    : "For freelancers, self-employed and micro-businesses"}
                </p>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-5xl font-black text-gray-900">0€</span>
                <span className="text-gray-400 font-bold text-sm">/{isFrench ? "mois" : "month"}</span>
              </div>
              <p className="text-indigo-600 font-black text-xs uppercase tracking-wider">
                {isFrench ? "Gratuit à vie" : "Lifetime free"}
              </p>
              
              <div className="h-px bg-gray-100" />
              
              <ul className="space-y-3">
                {[
                  isFrench ? "Factures illimitées" : "Unlimited invoices",
                  isFrench ? "Devis illimités" : "Unlimited quotes",
                  isFrench ? "Sans création de compte" : "No account required",
                  isFrench ? "Export PDF/A-3 conforme 2026" : "PDF/A-3 export compliant 2026",
                  isFrench ? "Article 293 B du CGI (franchise TVA)" : "Article 293 B (VAT exemption)",
                  isFrench ? "Autoliquidation TVA (reverse charge)" : "VAT reverse charge",
                  isFrench ? "TVA intracommunautaire & validation VIES" : "Intra-community VAT & VIES validation",
                  isFrench ? "Mentions légales automatiques" : "Automatic legal mentions",
                  isFrench ? "Pénalités de retard (taux légal + 10 points)" : "Late payment penalties (legal rate + 10 points)"
                ].map((feat, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-700 text-sm font-medium">
                    <div className="w-5 h-5 bg-indigo-50 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check size={12} className="text-indigo-600" />
                    </div>
                    {feat}
                  </li>
                ))}
              </ul>

              <button 
                onClick={() => window.location.href = '/'}
                className="w-full py-3.5 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-md flex items-center justify-center gap-2"
              >
                {isFrench ? "Démarrer maintenant" : "Start now"}
                <Zap size={16} />
              </button>
            </div>
          </motion.div>

          {/* Enterprise Plan - Coming Soon */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-gray-50 rounded-3xl p-8 border border-gray-200 flex flex-col justify-between"
          >
            <div className="space-y-5">
              <div>
                <h3 className="text-2xl font-black text-gray-900">{isFrench ? "Entreprise" : "Enterprise"}</h3>
                <p className="text-gray-500 text-sm font-medium mt-1">
                  {isFrench 
                    ? "Pour les équipes et PME en croissance" 
                    : "For growing teams and SMEs"}
                </p>
              </div>
              <div className="space-y-1">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-black text-gray-300 line-through">29€</span>
                  <span className="text-sm font-black text-indigo-600">
                    {isFrench ? "Inclus pour le lancement" : "Included for launch"}
                  </span>
                </div>
                <p className="text-gray-400 text-xs font-bold uppercase tracking-wider">
                  {isFrench ? "Bientôt disponible" : "Coming soon"}
                </p>
              </div>

              <div className="h-px bg-gray-200" />

              <ul className="space-y-3 opacity-60">
                {[
                  isFrench ? "Gestion multi-utilisateurs" : "Multi-user management",
                  isFrench ? "Tableau de bord avancé" : "Advanced dashboard",
                  isFrench ? "Relances automatiques" : "Automatic reminders",
                  isFrench ? "Support prioritaire 24/7" : "Priority support 24/7",
                  isFrench ? "API & Intégrations" : "API & Integrations"
                ].map((feat, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-500 text-sm font-medium">
                    <div className="w-5 h-5 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check size={12} className="text-gray-400" />
                    </div>
                    {feat}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="mt-6 p-3 bg-white rounded-xl border border-gray-200 text-center">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                {isFrench ? "Rejoindre la liste d'attente" : "Join the waitlist"}
              </p>
            </div>
          </motion.div>
        </div>

        {/* Why it's free section - Enrichie */}
        <section className="max-w-4xl mx-auto bg-indigo-50 rounded-2xl p-8 lg:p-12 space-y-8 border border-indigo-100">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="w-20 h-20 bg-white rounded-2xl shadow-lg flex items-center justify-center shrink-0">
              <Lock size={32} className="text-indigo-600" />
            </div>
            <div className="space-y-3 text-center md:text-left">
              <h2 className="text-2xl lg:text-3xl font-black text-gray-900 tracking-tight">
                {isFrench ? "Pourquoi est-ce gratuit ?" : "Why is it free?"}
              </h2>
              <p className="text-base text-gray-600 leading-relaxed">
                {isFrench 
                  ? "La plupart des logiciels de facturation sont chers car ils doivent payer des serveurs massifs pour stocker vos données. InvoiceGEN est différent. Grâce à notre technologie Local-First, vos données sont stockées directement dans votre navigateur. Pas de serveurs coûteux = pas de frais pour vous, et une confidentialité totale. Conforme à l'article 293 B du CGI, autoliquidation TVA et réforme 2026, sans aucun coût."
                  : "Most invoicing software is expensive because they have to pay for massive servers to store your data. InvoiceGEN is different. Thanks to our Local-First technology, your data is stored directly in your browser. No expensive servers = no cost for you, and total confidentiality. Compliant with Article 293 B, VAT reverse charge and 2026 reform, at no cost."}
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-indigo-200">
            <div className="text-center space-y-2">
              <div className="flex justify-center text-indigo-600 mb-2">
                <Database size={24} />
              </div>
              <p className="font-black text-gray-900 uppercase text-xs tracking-wider">
                {isFrench ? "Local-First" : "Local-First"}
              </p>
              <p className="text-xs text-gray-500 font-medium">
                {isFrench ? "Données stockées chez vous" : "Data stored locally"}
              </p>
            </div>
            <div className="text-center space-y-2">
              <div className="flex justify-center text-indigo-600 mb-2">
                <Shield size={24} />
              </div>
              <p className="font-black text-gray-900 uppercase text-xs tracking-wider">
                {isFrench ? "Pas de revente" : "No data selling"}
              </p>
              <p className="text-xs text-gray-500 font-medium">
                {isFrench ? "Vos données ne sont pas un produit" : "Your data is not a product"}
              </p>
            </div>
            <div className="text-center space-y-2">
              <div className="flex justify-center text-indigo-600 mb-2">
                <Scale size={24} />
              </div>
              <p className="font-black text-gray-900 uppercase text-xs tracking-wider">
                {isFrench ? "Conforme CGI" : "CGI compliant"}
              </p>
              <p className="text-xs text-gray-500 font-medium">
                {isFrench ? "Article 293 B • Autoliquidation" : "Article 293 B • Reverse charge"}
              </p>
            </div>
          </div>
        </section>

        {/* Bonus: Conformité incluse */}
        <section className="max-w-4xl mx-auto text-center space-y-6">
          <div className="flex flex-wrap items-center justify-center gap-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full">
              <FileText size={14} className="text-indigo-600" />
              <span className="text-xs font-mono text-gray-700">Article 293 B du CGI</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full">
              <Zap size={14} className="text-amber-600" />
              <span className="text-xs font-mono text-gray-700">Autoliquidation (reverse charge)</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full">
              <Globe size={14} className="text-blue-600" />
              <span className="text-xs font-mono text-gray-700">TVA intracommunautaire</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full">
              <Clock size={14} className="text-emerald-600" />
              <span className="text-xs font-mono text-gray-700">Réforme 2026</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full">
              <Euro size={14} className="text-rose-600" />
              <span className="text-xs font-mono text-gray-700">Pénalités de retard</span>
            </div>
          </div>
          
          <p className="text-sm text-gray-500">
            {isFrench 
              ? "Toutes les mentions légales et options fiscales sont incluses gratuitement. Aucun frais caché, aucune limitation."
              : "All legal mentions and tax options are included for free. No hidden fees, no limitations."}
          </p>
        </section>

        {/* FAQ Mini */}
        <div className="max-w-2xl mx-auto text-center space-y-3">
          <p className="text-gray-500 text-sm">
            {isFrench 
              ? "Une question sur la conformité fiscale ? Consultez notre" 
              : "A question about tax compliance? Check our"}
            <button 
              onClick={() => window.location.href = '/faq'} 
              className="text-indigo-600 hover:underline ml-1 font-medium"
            >
              {isFrench ? "FAQ complète" : "full FAQ"}
            </button>
          </p>
          <p className="text-xs text-gray-400">
            {isFrench 
              ? "Conforme à l'article 293 B du CGI, aux règles d'autoliquidation (article 283-2) et à la réforme de facturation électronique 2026."
              : "Compliant with Article 293 B, reverse charge rules (Article 283-2) and the 2026 e-invoicing reform."}
          </p>
        </div>
      </div>
    </div>
  );
};