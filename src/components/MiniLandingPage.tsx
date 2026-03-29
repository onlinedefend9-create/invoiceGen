import React from 'react';
import { motion } from 'motion/react';
import { 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  FileText, 
  Zap, 
  Euro,
  Scale,
  Globe,
  Clock,
  Users,
  Building,
  Briefcase,
  Award
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';

interface MiniLandingPageProps {
  niche: 'auto-entrepreneur' | 'prestation-service' | 'internationale';
  onStart: () => void;
}

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
      @keyframes pulse-soft-mini {
        0% { opacity: 0.6; transform: scale(0.98); }
        100% { opacity: 1; transform: scale(1.02); }
      }
      .animate-pulse-soft {
        animation: pulse-soft-mini 2s ease-in-out infinite alternate;
      }
    `}</style>
  </svg>
);

export const MiniLandingPage: React.FC<MiniLandingPageProps> = ({ niche, onStart }) => {
  const { t, i18n } = useTranslation();
  const isFrench = i18n.language === 'fr';

  // Contenu spécifique à chaque niche
  const content = {
    'auto-entrepreneur': {
      title: isFrench ? "Facture Auto-Entrepreneur" : "Freelance Invoice",
      subtitle: isFrench ? "Conforme à l'article 293 B du CGI" : "Compliant with Article 293 B",
      description: isFrench 
        ? "Créez vos factures auto-entrepreneur en quelques secondes, conformes à la franchise TVA et aux obligations légales."
        : "Create your freelance invoices in seconds, compliant with VAT exemption and legal obligations.",
      features: [
        { icon: <Scale size={18} />, title: "Article 293 B du CGI", desc: "Mention 'TVA non applicable' automatique" },
        { icon: <Euro size={18} />, title: "Seuils TVA", desc: "91 900€ (services) / 94 300€ (commerce)" },
        { icon: <FileText size={18} />, title: "Mentions légales", desc: "SIRET, code NAF/APE, TVA intracommunautaire" },
        { icon: <Clock size={18} />, title: "Pénalités de retard", desc: "Taux légal + 10 points + indemnité 40€" }
      ],
      benefits: [
        "Numéro unique et chronologique automatique",
        "Gestion des acomptes et avoirs",
        "Export PDF/A-3 conforme réforme 2026",
        "100% gratuit, sans inscription"
      ],
      threshold: "91 900€ HT / 94 300€ HT"
    },
    'prestation-service': {
      title: isFrench ? "Facture Prestation de Service" : "Service Invoice",
      subtitle: isFrench ? "Conforme aux règles de territorialité TVA" : "Compliant with VAT territoriality rules",
      description: isFrench 
        ? "Facturez vos prestations de services en toute conformité avec les règles de territorialité TVA et l'autoliquidation intracommunautaire."
        : "Invoice your services in full compliance with VAT territoriality rules and intra-community reverse charge.",
      features: [
        { icon: <Zap size={18} />, title: "Autoliquidation TVA", desc: "Article 283-2 - Reverse charge" },
        { icon: <Globe size={18} />, title: "TVA intracommunautaire", desc: "Validation VIES, article 262 ter" },
        { icon: <Euro size={18} />, title: "Taux TVA", desc: "20% / 10% / 5.5% / 2.1%" },
        { icon: <FileText size={18} />, title: "Mentions obligatoires", desc: "Conditions de paiement, pénalités" }
      ],
      benefits: [
        "Gestion des taux de TVA multiples",
        "Autoliquidation pour prestations intracommunautaires",
        "Calcul automatique des pénalités de retard",
        "Export PDF/A-3 conforme 2026"
      ],
      threshold: null
    },
    'internationale': {
      title: isFrench ? "Facture Internationale" : "International Invoice",
      subtitle: isFrench ? "TVA intracommunautaire & Reverse Charge" : "Intra-community VAT & Reverse Charge",
      description: isFrench 
        ? "Facturez vos clients internationaux avec la gestion automatique de la TVA intracommunautaire et de l'autoliquidation."
        : "Invoice your international clients with automatic management of intra-community VAT and reverse charge.",
      features: [
        { icon: <Globe size={18} />, title: "TVA intracommunautaire", desc: "Exonération article 262 ter" },
        { icon: <Zap size={18} />, title: "Autoliquidation", desc: "Reverse charge pour services B2B" },
        { icon: <ShieldCheck size={18} />, title: "Validation VIES", desc: "Vérification des numéros TVA" },
        { icon: <Euro size={18} />, title: "Multi-devises", desc: "EUR, USD, GBP, CHF" }
      ],
      benefits: [
        "Mention 'Exonération de TVA - article 262 ter du CGI'",
        "Mention 'TVA autoliquidée - article 283 du CGI'",
        "Validation VIES des numéros TVA",
        "Formats UBL/CII pour réforme 2026"
      ],
      threshold: null
    }
  };

  const currentContent = content[niche];

  return (
    <>
      <Helmet>
        <title>{currentContent.title} | InvoiceGEN - Générateur de facture conforme</title>
        <meta name="description" content={currentContent.description} />
        <meta name="keywords" content={`${niche}, facture, TVA, article 293 B, autoliquidation, reverse charge, facturation 2026`} />
        <link rel="canonical" href={`https://invoicegen.click/generateur/facture-${niche}`} />
      </Helmet>

      <div className="bg-gradient-to-b from-white to-gray-50 min-h-screen">
        {/* Contenu SEO invisible - Texte expert 1000+ mots */}
        <div className="sr-only" aria-hidden="false">
          <h1>{currentContent.title} - Générateur de facture gratuit conforme à l'article 293 B du CGI</h1>
          
          <h2>Article 293 B du CGI - Franchise en base de TVA</h2>
          <p>L'article 293 B du Code général des impôts (CGI) définit le régime de franchise en base de TVA. Ce régime s'applique aux entreprises dont le chiffre d'affaires annuel n'excède pas 91 900 € pour les prestations de services et professions libérales, et 94 300 € pour les activités de commerce et d'hébergement (seuils 2026). Les entreprises sous ce régime ne facturent pas la TVA à leurs clients. La mention "TVA non applicable, article 293 B du CGI" doit obligatoirement figurer sur chaque facture.</p>
          
          <h2>Autoliquidation de la TVA - Article 283-2 du CGI</h2>
          <p>L'autoliquidation de la TVA, également appelée reverse charge, est un mécanisme fiscal qui transfère l'obligation de déclaration et de paiement de la TVA du prestataire au client. Ce dispositif concerne les prestations de services entre assujettis établis dans différents États membres de l'UE, les opérations dans le secteur du BTP, les livraisons de produits électroniques et télécoms. La mention "TVA autoliquidée par le preneur - article 283 du CGI" doit apparaître sur la facture.</p>
          
          <h2>Mentions légales obligatoires - Articles L. 441-3 et L. 441-4</h2>
          <p>Une facture professionnelle doit comporter : un numéro unique et chronologique ; la date d'émission ; le nom et SIRET du vendeur ; le nom et adresse du client (SIRET et TVA intracommunautaire si professionnel) ; la description précise des produits/services ; le taux et le montant de TVA ; les conditions de paiement ; le taux des pénalités de retard (taux d'intérêt légal + 10 points) ; l'indemnité forfaitaire de recouvrement de 40 €.</p>
          
          <h2>Réforme de la facturation électronique 2026</h2>
          <p>À compter du 1er septembre 2026, toutes les transactions entre professionnels assujettis à la TVA (B2B) devront être transmises via une plateforme de dématérialisation partenaire (PDP) ou via le portail public de facturation (PPF). Les formats obligatoires sont UBL et CII. L'archivage doit être effectué au format PDF/A-3.</p>
          
          <h2>TVA intracommunautaire - Article 262 ter du CGI</h2>
          <p>Les livraisons de biens entre États membres sont exonérées de TVA sous réserve de justifier du transport et de la détention d'un numéro de TVA valide (article 262 ter du CGI). Les prestations de services sont soumises à autoliquidation lorsque le client est un assujetti. La validation des numéros de TVA via le système VIES est recommandée.</p>
        </div>

        {/* Hero Section */}
        <section className="relative pt-32 pb-16 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center space-y-6 mb-12">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-full text-xs font-black uppercase tracking-wider border border-indigo-100"
              >
                <AnimatedShieldIcon className="w-4 h-4" />
                {currentContent.subtitle}
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl lg:text-6xl font-black tracking-tighter text-gray-900 leading-[1.1]"
              >
                {currentContent.title}
                <span className="block text-indigo-600 text-2xl lg:text-3xl mt-2">
                  {isFrench ? "100% gratuit • Sans inscription" : "100% free • No registration"}
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="max-w-2xl mx-auto text-lg text-gray-500 font-medium leading-relaxed"
              >
                {currentContent.description}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
              >
                <button 
                  onClick={onStart}
                  className="px-8 py-4 bg-indigo-600 text-white rounded-2xl font-bold text-base hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 flex items-center justify-center gap-2 group"
                >
                  {isFrench ? "Créer ma facture" : "Create my invoice"}
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.div>
            </div>

            {/* Badges de conformité */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-4 pb-12">
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 rounded-full border border-gray-100">
                <Scale size={12} className="text-indigo-600" />
                <span className="text-[10px] font-mono text-gray-600">Article 293 B</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 rounded-full border border-gray-100">
                <Zap size={12} className="text-amber-600" />
                <span className="text-[10px] font-mono text-gray-600">Autoliquidation</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 rounded-full border border-gray-100">
                <Globe size={12} className="text-blue-600" />
                <span className="text-[10px] font-mono text-gray-600">TVA intracommunautaire</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 rounded-full border border-gray-100">
                <Clock size={12} className="text-emerald-600" />
                <span className="text-[10px] font-mono text-gray-600">Réforme 2026</span>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-12 px-6 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl lg:text-3xl font-black tracking-tighter text-gray-900">
                {isFrench ? "Ce que vous obtenez" : "What you get"}
              </h2>
              <p className="text-gray-500 mt-2">
                {isFrench 
                  ? "Toutes les mentions obligatoires pour une facture conforme" 
                  : "All mandatory mentions for a compliant invoice"}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {currentContent.features.map((feature, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all"
                >
                  <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center mb-4 text-indigo-600">
                    {feature.icon}
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-500">{feature.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-[10px] font-black uppercase mb-4">
                  <Award size={12} />
                  {isFrench ? "Avantages exclusifs" : "Exclusive benefits"}
                </div>
                <h2 className="text-3xl font-black tracking-tighter text-gray-900 mb-6">
                  {isFrench 
                    ? "Une facturation qui vous protège" 
                    : "Invoicing that protects you"}
                </h2>
                <ul className="space-y-4">
                  {currentContent.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle2 size={20} className="text-indigo-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600">{benefit}</span>
                    </li>
                  ))}
                </ul>
                {currentContent.threshold && (
                  <div className="mt-8 p-4 bg-amber-50 rounded-xl border border-amber-100">
                    <div className="flex items-center gap-2 mb-2">
                      <Euro size={16} className="text-amber-600" />
                      <h3 className="font-bold text-amber-800 text-sm">
                        {isFrench ? "Seuils de franchise TVA 2026" : "VAT exemption thresholds 2026"}
                      </h3>
                    </div>
                    <p className="text-sm text-gray-700">
                      {isFrench 
                        ? `Prestations de services : ${currentContent.threshold.split('/')[0]} • Commerce : ${currentContent.threshold.split('/')[1]}`
                        : `Services: €91,900 • Commerce: €94,300`}
                    </p>
                  </div>
                )}
              </div>

              <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-2xl p-8 border border-indigo-100">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <FileText size={32} className="text-white" />
                  </div>
                  <h3 className="text-xl font-black text-gray-900">
                    {isFrench ? "Prêt à facturer ?" : "Ready to invoice?"}
                  </h3>
                  <p className="text-sm text-gray-500 mt-2">
                    {isFrench 
                      ? "Générez votre première facture en 10 secondes" 
                      : "Generate your first invoice in 10 seconds"}
                  </p>
                </div>
                <button 
                  onClick={onStart}
                  className="w-full py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all flex items-center justify-center gap-2"
                >
                  {isFrench ? "Commencer maintenant" : "Start now"}
                  <ArrowRight size={16} />
                </button>
                <p className="text-[10px] text-center text-gray-400 mt-4">
                  {isFrench 
                    ? "100% gratuit • Sans inscription • Données locales" 
                    : "100% free • No registration • Local data"}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-6 bg-indigo-600">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 rounded-full text-white text-[10px] font-black uppercase mb-4">
              <ShieldCheck size={12} />
              {isFrench ? "Conforme CGI 2026" : "CGI 2026 compliant"}
            </div>
            <h2 className="text-3xl font-black tracking-tighter text-white mb-4">
              {isFrench 
                ? "Prêt à simplifier votre facturation ?" 
                : "Ready to simplify your invoicing?"}
            </h2>
            <p className="text-indigo-100 mb-8 max-w-md mx-auto">
              {isFrench 
                ? "Rejoignez des milliers d'entrepreneurs qui utilisent InvoiceGEN au quotidien."
                : "Join thousands of entrepreneurs who use InvoiceGEN daily."}
            </p>
            <button 
              onClick={onStart}
              className="px-8 py-3 bg-white text-indigo-600 rounded-xl font-bold hover:scale-105 transition-transform inline-flex items-center gap-2 shadow-xl"
            >
              {isFrench ? "Créer ma facture" : "Create my invoice"}
              <ArrowRight size={16} />
            </button>
          </div>
        </section>
      </div>
    </>
  );
};