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
  Lock,
  Download
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

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
      @keyframes pulse-soft-landing {
        0% { opacity: 0.6; transform: scale(0.98); }
        100% { opacity: 1; transform: scale(1.02); }
      }
      .animate-pulse-soft {
        animation: pulse-soft-landing 2s ease-in-out infinite alternate;
      }
    `}</style>
  </svg>
);

interface LandingPageProps {
  onStart: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
  const { t, i18n } = useTranslation();
  const isFrench = i18n.language === 'fr';

  return (
    <div className="bg-gradient-to-b from-white to-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full overflow-hidden -z-10 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-100/50 blur-3xl" />
          <div className="absolute top-[20%] right-[-10%] w-[30%] h-[30%] rounded-full bg-blue-100/50 blur-3xl" />
        </div>

        <div className="max-w-5xl mx-auto text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-full text-xs font-black uppercase tracking-wider border border-indigo-100"
          >
            <AnimatedShieldIcon className="w-4 h-4" />
            {isFrench ? "Conforme Article 293 B & Réforme 2026" : "Compliant with Article 293 B & 2026 Reform"}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl lg:text-7xl font-black tracking-tighter text-gray-900 leading-[1.1]"
          >
            {isFrench ? "Générateur de Facture" : "Invoice Generator"}
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-500 mt-2">
              {isFrench ? "100% Gratuit & Sécurisé" : "100% Free & Secure"}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="max-w-2xl mx-auto text-xl text-gray-500 font-medium leading-relaxed"
          >
            {isFrench 
              ? "Créez des factures professionnelles conformes aux normes fiscales françaises en quelques secondes. Sans inscription, vos données restent sur votre appareil."
              : "Create professional invoices compliant with French tax standards in seconds. No registration, your data stays on your device."}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <button 
              onClick={onStart}
              className="w-full sm:w-auto px-8 py-4 bg-indigo-600 text-white rounded-2xl font-bold text-lg hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-200 flex items-center justify-center gap-2 group"
            >
              {isFrench ? "Créer une facture maintenant" : "Create an invoice now"}
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <Link 
              to="/features"
              className="w-full sm:w-auto px-8 py-4 bg-white text-gray-700 rounded-2xl font-bold text-lg hover:bg-gray-50 transition-all border border-gray-200 flex items-center justify-center gap-2"
            >
              {isFrench ? "Découvrir les fonctionnalités" : "Discover features"}
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="pt-8 flex flex-wrap justify-center gap-6 text-sm text-gray-500 font-medium"
          >
            <span className="flex items-center gap-2"><CheckCircle2 size={16} className="text-emerald-500" /> {isFrench ? "Sans inscription" : "No registration"}</span>
            <span className="flex items-center gap-2"><CheckCircle2 size={16} className="text-emerald-500" /> {isFrench ? "100% Gratuit" : "100% Free"}</span>
            <span className="flex items-center gap-2"><CheckCircle2 size={16} className="text-emerald-500" /> {isFrench ? "Données locales" : "Local data"}</span>
            <span className="flex items-center gap-2"><CheckCircle2 size={16} className="text-emerald-500" /> {isFrench ? "Export PDF/A-3" : "PDF/A-3 Export"}</span>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl lg:text-4xl font-black tracking-tighter text-gray-900">
              {isFrench ? "Conçu pour les indépendants et TPE" : "Designed for freelancers and small businesses"}
            </h2>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto">
              {isFrench 
                ? "Une solution complète qui intègre toutes les obligations légales françaises."
                : "A complete solution that integrates all French legal obligations."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-6">
                <Scale size={24} className="text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {isFrench ? "Article 293 B du CGI" : "Article 293 B of CGI"}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {isFrench 
                  ? "Gestion automatique de la franchise en base de TVA avec l'ajout de la mention légale obligatoire sur vos factures."
                  : "Automatic management of the VAT exemption with the addition of the mandatory legal mention on your invoices."}
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mb-6">
                <Zap size={24} className="text-amber-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {isFrench ? "Autoliquidation TVA" : "VAT Reverse Charge"}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {isFrench 
                  ? "Gérez facilement l'autoliquidation (reverse charge) pour vos clients professionnels en UE ou dans le secteur du BTP."
                  : "Easily manage reverse charge for your professional clients in the EU or in the construction sector."}
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-6">
                <Lock size={24} className="text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {isFrench ? "Sécurité Local-First" : "Local-First Security"}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {isFrench 
                  ? "Vos données ne quittent jamais votre appareil. Tout est stocké localement dans votre navigateur pour une confidentialité totale."
                  : "Your data never leaves your device. Everything is stored locally in your browser for total privacy."}
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                <Clock size={24} className="text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {isFrench ? "Prêt pour 2026" : "Ready for 2026"}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {isFrench 
                  ? "Générez des factures au format PDF/A-3, le standard d'archivage légal requis pour la réforme de la facturation électronique."
                  : "Generate invoices in PDF/A-3 format, the legal archiving standard required for the e-invoicing reform."}
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
                <FileText size={24} className="text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {isFrench ? "Mentions Obligatoires" : "Mandatory Mentions"}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {isFrench 
                  ? "Pénalités de retard, indemnité forfaitaire de 40€, SIRET, TVA intracommunautaire... Ne l'oubliez plus aucune mention légale."
                  : "Late penalties, €40 fixed indemnity, SIRET, intra-community VAT... Never forget a legal mention again."}
              </p>
            </div>

            {/* Feature 6 */}
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-rose-100 rounded-xl flex items-center justify-center mb-6">
                <Download size={24} className="text-rose-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {isFrench ? "Export Professionnel" : "Professional Export"}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {isFrench 
                  ? "Téléchargez vos factures en PDF haute qualité ou envoyez-les directement par email à vos clients en un clic."
                  : "Download your invoices in high-quality PDF or send them directly by email to your clients in one click."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-black tracking-tighter text-gray-900">
              {isFrench ? "Comment ça marche ?" : "How it works?"}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Ligne connectrice (desktop) */}
            <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-0.5 bg-indigo-100" />

            <div className="relative text-center space-y-4">
              <div className="w-24 h-24 mx-auto bg-white rounded-full border-4 border-indigo-50 flex items-center justify-center shadow-sm relative z-10">
                <span className="text-3xl font-black text-indigo-600">1</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900">
                {isFrench ? "Remplissez vos infos" : "Fill your info"}
              </h3>
              <p className="text-gray-500">
                {isFrench ? "Saisissez vos coordonnées et celles de votre client." : "Enter your details and your client's details."}
              </p>
            </div>

            <div className="relative text-center space-y-4">
              <div className="w-24 h-24 mx-auto bg-white rounded-full border-4 border-indigo-50 flex items-center justify-center shadow-sm relative z-10">
                <span className="text-3xl font-black text-indigo-600">2</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900">
                {isFrench ? "Ajoutez vos prestations" : "Add your services"}
              </h3>
              <p className="text-gray-500">
                {isFrench ? "Détaillez vos services, prix et sélectionnez le taux de TVA." : "Detail your services, prices and select the VAT rate."}
              </p>
            </div>

            <div className="relative text-center space-y-4">
              <div className="w-24 h-24 mx-auto bg-white rounded-full border-4 border-indigo-50 flex items-center justify-center shadow-sm relative z-10">
                <span className="text-3xl font-black text-indigo-600">3</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900">
                {isFrench ? "Téléchargez le PDF" : "Download the PDF"}
              </h3>
              <p className="text-gray-500">
                {isFrench ? "Obtenez instantanément votre facture conforme au format PDF/A-3." : "Instantly get your compliant invoice in PDF/A-3 format."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-indigo-600 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-4xl lg:text-5xl font-black tracking-tighter text-white mb-6">
            {isFrench 
              ? "Prêt à simplifier votre facturation ?" 
              : "Ready to simplify your invoicing?"}
          </h2>
          <p className="text-xl text-indigo-100 mb-10 max-w-2xl mx-auto">
            {isFrench 
              ? "Rejoignez des milliers d'indépendants qui utilisent InvoiceGEN pour créer des factures professionnelles et conformes."
              : "Join thousands of freelancers who use InvoiceGEN to create professional and compliant invoices."}
          </p>
          <button 
            onClick={onStart}
            className="px-10 py-5 bg-white text-indigo-600 rounded-2xl font-black text-xl hover:scale-105 transition-transform inline-flex items-center gap-3 shadow-2xl"
          >
            {isFrench ? "Créer ma première facture" : "Create my first invoice"}
            <ArrowRight size={24} />
          </button>
          <p className="mt-6 text-indigo-200 font-medium">
            {isFrench ? "Totalement gratuit. Aucune carte de crédit requise." : "Totally free. No credit card required."}
          </p>
        </div>
      </section>
    </div>
  );
};
