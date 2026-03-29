import React from 'react';
import { motion } from 'motion/react';
import { 
  Shield, 
  Database, 
  Cookie, 
  Server, 
  Mail, 
  Scale, 
  FileText, 
  Lock,
  Globe,
  Zap,
  Clock,
  Euro,
  CheckCircle2,
  ArrowLeft
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
      @keyframes pulse-soft-legal {
        0% { opacity: 0.6; transform: scale(0.98); }
        100% { opacity: 1; transform: scale(1.02); }
      }
      .animate-pulse-soft {
        animation: pulse-soft-legal 2s ease-in-out infinite alternate;
      }
    `}</style>
  </svg>
);

export const Legal = () => {
  const { t, i18n } = useTranslation();
  const isFrench = i18n.language === 'fr';
  const currentYear = new Date().getFullYear();

  return (
    <div className="bg-gradient-to-b from-white to-gray-50 min-h-screen py-16 px-6">
      {/* Contenu SEO invisible - Texte expert 1000+ mots */}
      <div className="sr-only" aria-hidden="false">
        <h1>Mentions légales et politique de confidentialité - InvoiceGEN</h1>
        <h2>Informations légales, conformité fiscale et protection des données</h2>
        
        <h3>Article 293 B du CGI - Franchise en base de TVA</h3>
        <p>L'article 293 B du Code général des impôts (CGI) définit le régime de franchise en base de TVA. Ce régime s'applique aux entreprises dont le chiffre d'affaires annuel n'excède pas 91 900 € pour les prestations de services et professions libérales, et 94 300 € pour les activités de commerce et d'hébergement (seuils 2026). Les entreprises sous ce régime ne facturent pas la TVA à leurs clients. La mention "TVA non applicable, article 293 B du CGI" doit obligatoirement figurer sur chaque facture émise par les bénéficiaires de la franchise. InvoiceGEN intègre automatiquement cette mention pour garantir la conformité de vos factures.</p>
        
        <h3>Autoliquidation de la TVA - Article 283-2 du CGI</h3>
        <p>L'autoliquidation de la TVA, également appelée reverse charge, est un mécanisme fiscal prévu à l'article 283-2 du CGI qui transfère l'obligation de déclaration et de paiement de la TVA du prestataire au client. Ce dispositif concerne les prestations de services entre assujettis établis dans différents États membres de l'UE, les opérations dans le secteur du BTP, les livraisons de produits électroniques et télécoms, et les cessions de quotas d'émission de gaz à effet de serre. La mention "TVA autoliquidée par le preneur - article 283 du CGI" doit apparaître sur la facture. InvoiceGEN gère ce mécanisme automatiquement.</p>
        
        <h3>Mentions légales obligatoires - Articles L. 441-3 et L. 441-4 du Code de commerce</h3>
        <p>Conformément aux articles L. 441-3 et L. 441-4 du Code de commerce, toute facture professionnelle doit comporter : un numéro unique et chronologique ; la date d'émission ; le nom et SIRET du vendeur ; le nom et adresse du client (SIRET et TVA intracommunautaire si professionnel) ; la description précise des produits/services avec quantité et prix unitaire HT ; le taux et le montant de TVA ; les conditions de paiement ; le taux des pénalités de retard (taux d'intérêt légal + 10 points) ; l'indemnité forfaitaire de recouvrement de 40 € ; et les mentions spécifiques au régime fiscal. InvoiceGEN intègre automatiquement toutes ces mentions.</p>
        
        <h3>Réforme de la facturation électronique 2026</h3>
        <p>La réforme de la facturation électronique entre en vigueur progressivement à partir de 2026. À compter du 1er septembre 2026, toutes les transactions entre professionnels assujettis à la TVA (B2B) devront être transmises via une plateforme de dématérialisation partenaire (PDP) ou via le portail public de facturation (PPF). Les formats obligatoires sont UBL (Universal Business Language) et CII (Cross Industry Invoice). L'archivage doit être effectué au format PDF/A-3, seul format d'archivage légal reconnu par l'administration fiscale. InvoiceGEN génère vos factures au format PDF/A-3 et les structure selon les normes UBL/CII.</p>
        
        <h3>Protection des données personnelles - RGPD</h3>
        <p>Conformément au Règlement Général sur la Protection des Données (RGPD), InvoiceGEN ne stocke aucune donnée personnelle sur ses serveurs. Toutes les informations saisies (coordonnées clients, montants, factures) restent exclusivement dans la mémoire locale de votre navigateur (localStorage). Vous êtes le seul propriétaire de vos données. Aucune information n'est transmise, stockée ou traitée sur nos serveurs.</p>
        
        <h3>Pénalités de retard et indemnité de recouvrement</h3>
        <p>En application de l'article L. 441-3 du Code de commerce, les pénalités de retard sont calculées au taux d'intérêt légal majoré de 10 points. Pour 2026, le taux d'intérêt légal est de 4,26%, soit un taux de pénalité de 14,26%. L'indemnité forfaitaire de recouvrement de 40 € est automatiquement due en cas de retard de paiement, sans nécessité de justifier des frais réels. InvoiceGEN calcule automatiquement ces montants et les mentionne sur vos factures.</p>
        
        <h3>TVA intracommunautaire - Article 262 ter du CGI</h3>
        <p>Les livraisons de biens entre États membres sont exonérées de TVA sous réserve de justifier du transport et de la détention d'un numéro de TVA valide (article 262 ter du CGI). Les prestations de services sont soumises à autoliquidation lorsque le client est un assujetti. La validation des numéros de TVA via le système VIES (VAT Information Exchange System) est recommandée pour s'assurer de la validité des numéros intracommunautaires.</p>
        
        <h3>Cookies et technologies de suivi</h3>
        <p>Ce site utilise Google AdSense pour la diffusion de publicités. Google utilise des cookies pour diffuser des annonces basées sur vos visites antérieures. Les utilisateurs peuvent désactiver la publicité personnalisée via les paramètres des annonces Google. Aucun cookie de suivi interne n'est utilisé, et les données de facturation ne sont jamais partagées avec des tiers.</p>
      </div>

      <div className="max-w-4xl mx-auto">
        {/* En-tête avec SVG animé */}
        <div className="text-center space-y-6 mb-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-full text-xs font-black uppercase tracking-wider border border-indigo-100"
          >
            <AnimatedShieldIcon className="w-4 h-4" />
            {isFrench ? "Informations légales" : "Legal information"}
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl lg:text-5xl font-black tracking-tighter text-gray-900 leading-[1.1]"
          >
            {isFrench ? "Mentions légales & Protection des données" : "Legal notices & Data protection"}
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-500 font-medium max-w-2xl mx-auto"
          >
            {isFrench 
              ? "Conformément aux dispositions du Code général des impôts, du Code de commerce, du RGPD et de la réforme facturation électronique 2026."
              : "In accordance with the provisions of the General Tax Code, the Commercial Code, the GDPR and the 2026 e-invoicing reform."}
          </motion.p>
        </div>

        <div className="space-y-8">
          {/* Section 1: Fonctionnement technique */}
          <section className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow p-8">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                <Database size={20} className="text-blue-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">
                {isFrench ? "1. Fonctionnement technique" : "1. Technical operation"}
              </h2>
            </div>
            
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                {isFrench 
                  ? "InvoiceGEN est une application de facturation traitée exclusivement <strong>côté client (navigateur)</strong>. Par mesure de sécurité, aucune donnée de facturation saisie (noms, montants, descriptions) n'est transmise ou stockée sur nos serveurs."
                  : "InvoiceGEN is an invoicing application processed exclusively <strong>client-side (browser)</strong>. For security reasons, no invoicing data entered (names, amounts, descriptions) is transmitted or stored on our servers."}
              </p>
              <p>
                {isFrench 
                  ? "Le stockage des données s'effectue localement dans votre propre navigateur via le <strong>Local Storage</strong>. L'utilisateur est seul responsable de l'exactitude des informations portées sur ses documents. Cette architecture Local-First garantit une confidentialité totale de vos données commerciales."
                  : "Data storage is done locally in your own browser via <strong>Local Storage</strong>. The user is solely responsible for the accuracy of the information on their documents. This Local-First architecture guarantees total confidentiality of your business data."}
              </p>
              <div className="mt-4 p-4 bg-blue-50 rounded-xl border border-blue-100">
                <div className="flex items-center gap-2">
                  <Lock size={14} className="text-blue-600" />
                  <p className="text-sm font-medium text-blue-800">
                    {isFrench 
                      ? "🔒 Aucune donnée n'est stockée sur nos serveurs - vos factures restent sur votre appareil."
                      : "🔒 No data is stored on our servers - your invoices remain on your device."}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 2: Politique de cookies */}
          <section className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow p-8">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
                <Cookie size={20} className="text-amber-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">
                {isFrench ? "2. Politique de cookies (AdSense)" : "2. Cookie policy (AdSense)"}
              </h2>
            </div>
            
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                {isFrench 
                  ? "Ce site utilise <strong>Google AdSense</strong> pour la diffusion de publicités. Google utilise des cookies pour diffuser des annonces basées sur vos visites antérieures sur ce site ou sur d'autres sites web."
                  : "This site uses <strong>Google AdSense</strong> for advertising. Google uses cookies to serve ads based on your prior visits to this site or other websites."}
              </p>
              <p>
                {isFrench 
                  ? "Les utilisateurs peuvent désactiver la publicité personnalisée en consultant les paramètres des annonces Google. Aucun cookie de suivi interne n'est utilisé pour les fonctionnalités de facturation."
                  : "Users can disable personalized advertising by visiting Google's ad settings. No internal tracking cookies are used for invoicing features."}
              </p>
              <div className="mt-4 p-4 bg-amber-50 rounded-xl border border-amber-100">
                <p className="text-sm text-amber-800">
                  {isFrench 
                    ? "🍪 Pour en savoir plus sur la gestion des cookies publicitaires, consultez les <a href='https://policies.google.com/technologies/ads' target='_blank' rel='noopener noreferrer' class='underline'>Politiques de publicité Google</a>."
                    : "🍪 To learn more about managing advertising cookies, see <a href='https://policies.google.com/technologies/ads' target='_blank' rel='noopener noreferrer' class='underline'>Google Advertising Policies</a>."}
                </p>
              </div>
            </div>
          </section>

          {/* Section 3: Hébergement et contact */}
          <section className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow p-8">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                <Server size={20} className="text-purple-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">
                {isFrench ? "3. Hébergement & Contact" : "3. Hosting & Contact"}
              </h2>
            </div>
            
            <div className="space-y-3 text-gray-600">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="font-semibold text-gray-800">{isFrench ? "Hébergement :" : "Hosting:"}</p>
                  <p>Google Cloud Platform (Cloud Run)</p>
                  <p className="text-xs text-gray-400 mt-1">Région : europe-west9 (Paris)</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-800">{isFrench ? "Contact :" : "Contact:"}</p>
                  <p>legal@invoicegen.click</p>
                  <p className="text-xs text-gray-400 mt-1">{isFrench ? "Réponse sous 48h" : "Response within 48h"}</p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 4: Conformité fiscale */}
          <section className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow p-8">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
                <Scale size={20} className="text-emerald-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">
                {isFrench ? "4. Conformité fiscale" : "4. Tax compliance"}
              </h2>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-3 bg-indigo-50 rounded-xl border border-indigo-100">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield size={14} className="text-indigo-600" />
                    <h3 className="font-bold text-indigo-800 text-sm">Article 293 B du CGI</h3>
                  </div>
                  <p className="text-xs text-gray-600">
                    {isFrench 
                      ? "Franchise TVA : seuils 91 900€ (services) / 94 300€ (commerce). Mention automatique."
                      : "VAT exemption: thresholds €91,900 (services) / €94,300 (commerce). Automatic mention."}
                  </p>
                </div>
                <div className="p-3 bg-amber-50 rounded-xl border border-amber-100">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap size={14} className="text-amber-600" />
                    <h3 className="font-bold text-amber-800 text-sm">Autoliquidation - Art. 283-2</h3>
                  </div>
                  <p className="text-xs text-gray-600">
                    {isFrench 
                      ? "Reverse charge pour prestations intracommunautaires, BTP, produits électroniques."
                      : "Reverse charge for intra-community services, construction, electronic products."}
                  </p>
                </div>
                <div className="p-3 bg-blue-50 rounded-xl border border-blue-100">
                  <div className="flex items-center gap-2 mb-2">
                    <Globe size={14} className="text-blue-600" />
                    <h3 className="font-bold text-blue-800 text-sm">TVA intracommunautaire</h3>
                  </div>
                  <p className="text-xs text-gray-600">
                    {isFrench 
                      ? "Exonération art. 262 ter, validation VIES, autoliquidation pour services."
                      : "Exemption Art. 262 ter, VIES validation, reverse charge for services."}
                  </p>
                </div>
                <div className="p-3 bg-rose-50 rounded-xl border border-rose-100">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock size={14} className="text-rose-600" />
                    <h3 className="font-bold text-rose-800 text-sm">Pénalités de retard</h3>
                  </div>
                  <p className="text-xs text-gray-600">
                    {isFrench 
                      ? "Taux légal + 10 points (14,26% en 2026) + indemnité 40€."
                      : "Legal rate + 10 points (14.26% in 2026) + €40 recovery indemnity."}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 5: Réforme 2026 */}
          <section className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow p-8">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 bg-cyan-100 rounded-xl flex items-center justify-center">
                <FileText size={20} className="text-cyan-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">
                {isFrench ? "5. Préparation à la réforme 2026" : "5. Preparation for the 2026 reform"}
              </h2>
            </div>
            
            <div className="space-y-4">
              <p className="text-gray-600">
                {isFrench 
                  ? "À compter du 1er septembre 2026, la facturation électronique devient obligatoire pour toutes les transactions B2B. InvoiceGEN anticipe cette réforme en générant des factures au format PDF/A-3 et en structurant les données selon les normes UBL et CII."
                  : "From September 1, 2026, electronic invoicing becomes mandatory for all B2B transactions. InvoiceGEN anticipates this reform by generating invoices in PDF/A-3 format and structuring data according to UBL and CII standards."}
              </p>
              <div className="flex flex-wrap gap-2 mt-3">
                <span className="px-3 py-1 bg-gray-100 rounded-full text-xs font-mono">PDF/A-3</span>
                <span className="px-3 py-1 bg-gray-100 rounded-full text-xs font-mono">UBL</span>
                <span className="px-3 py-1 bg-gray-100 rounded-full text-xs font-mono">CII</span>
                <span className="px-3 py-1 bg-gray-100 rounded-full text-xs font-mono">PDP</span>
                <span className="px-3 py-1 bg-gray-100 rounded-full text-xs font-mono">PPF</span>
              </div>
            </div>
          </section>
        </div>

        {/* Footer avec lien retour */}
        <div className="mt-12 pt-8 border-t border-gray-200 text-center">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-medium transition-colors"
          >
            <ArrowLeft size={16} />
            {isFrench ? "Retour à l'accueil" : "Back to home"}
          </Link>
          <p className="text-xs text-gray-400 mt-6">
            © {currentYear} InvoiceGEN - {isFrench ? "Tous droits réservés" : "All rights reserved"}
          </p>
          <p className="text-[10px] text-gray-400 mt-2">
            {isFrench 
              ? "Conforme à l'article 293 B du CGI, aux règles d'autoliquidation (article 283-2) et à la réforme de facturation électronique 2026."
              : "Compliant with Article 293 B, reverse charge rules (Article 283-2) and the 2026 e-invoicing reform."}
          </p>
        </div>
      </div>
    </div>
  );
};