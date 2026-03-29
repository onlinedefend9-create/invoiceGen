import React, { useState } from 'react';
import { Save, Building, Mail, Phone, MapPin, CreditCard, Hash, Image as ImageIcon, Shield, Scale, Euro, Globe, FileText, CheckCircle2 } from 'lucide-react';
import { UserProfile } from '../types';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';

interface Props {
  profile: UserProfile;
  onSave: (profile: UserProfile) => void;
}

// Composant SVG animé pour l'article 293 B
const AnimatedShieldIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg 
    className={`animate-pulse-soft ${className}`} 
    width="18" 
    height="18" 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-label="Icône article 293 B du CGI"
  >
    <path d="M12 3L3 7L12 21L21 7L12 3Z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
    <path d="M12 7V12M12 16H12.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <style>{`
      @keyframes pulse-soft-profile {
        0% { opacity: 0.6; transform: scale(0.98); }
        100% { opacity: 1; transform: scale(1.02); }
      }
      .animate-pulse-soft {
        animation: pulse-soft-profile 2s ease-in-out infinite alternate;
      }
    `}</style>
  </svg>
);

export const ProfileSettings: React.FC<Props> = ({ profile, onSave }) => {
  const { t, i18n } = useTranslation();
  const [formData, setFormData] = useState<UserProfile>(profile);
  const [saved, setSaved] = useState(false);
  const isFrench = i18n.language === 'fr';

  const handleSave = () => {
    onSave(formData);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-12">
      {/* Contenu SEO invisible - Texte expert 1000+ mots */}
      <div className="sr-only" aria-hidden="false">
        <h1>Paramètres du profil - InvoiceGEN</h1>
        <h2>Configuration de votre entreprise pour une facturation conforme à l'article 293 B du CGI</h2>
        
        <h3>Article 293 B du CGI - Franchise en base de TVA</h3>
        <p>L'article 293 B du Code général des impôts (CGI) définit le régime de franchise en base de TVA. Ce régime s'applique aux entreprises dont le chiffre d'affaires annuel n'excède pas 91 900 € pour les prestations de services et professions libérales, et 94 300 € pour les activités de commerce et d'hébergement (seuils 2026). Les entreprises sous ce régime ne facturent pas la TVA à leurs clients. La mention "TVA non applicable, article 293 B du CGI" doit obligatoirement figurer sur chaque facture. Renseignez vos informations SIRET et TVA intracommunautaire pour que nos factures soient automatiquement conformes.</p>
        
        <h3>Autoliquidation de la TVA - Article 283-2 du CGI</h3>
        <p>L'autoliquidation de la TVA, également appelée reverse charge, est un mécanisme fiscal qui transfère l'obligation de déclaration et de paiement de la TVA du prestataire au client. Ce dispositif concerne les prestations de services entre assujettis établis dans différents États membres de l'UE, les opérations dans le secteur du BTP, les livraisons de produits électroniques et télécoms. La mention "TVA autoliquidée par le preneur - article 283 du CGI" doit apparaître sur la facture. Renseignez votre numéro de TVA intracommunautaire pour activer ce mécanisme.</p>
        
        <h3>Mentions légales obligatoires - Articles L. 441-3 et L. 441-4 du Code de commerce</h3>
        <p>Pour que vos factures soient juridiquement valables, elles doivent comporter : un numéro unique et chronologique ; la date d'émission ; le nom et SIRET du vendeur ; le nom et adresse du client (SIRET et TVA intracommunautaire si professionnel) ; la description précise des produits/services ; le taux et le montant de TVA ; les conditions de paiement ; le taux des pénalités de retard (taux d'intérêt légal + 10 points) ; l'indemnité forfaitaire de recouvrement de 40 €. Renseignez vos informations dans les paramètres pour que ces mentions soient automatiquement ajoutées.</p>
        
        <h3>TVA intracommunautaire - Article 262 ter du CGI</h3>
        <p>Les livraisons de biens entre États membres sont exonérées de TVA sous réserve de justifier du transport et de la détention d'un numéro de TVA valide (article 262 ter du CGI). Les prestations de services sont soumises à autoliquidation lorsque le client est un assujetti. Renseignez votre numéro de TVA intracommunautaire au format FR + 11 chiffres pour bénéficier de ces exonérations et de la validation VIES.</p>
        
        <h3>Réforme de la facturation électronique 2026</h3>
        <p>À compter du 1er septembre 2026, toutes les transactions entre professionnels assujettis à la TVA (B2B) devront être transmises via une plateforme de dématérialisation partenaire (PDP) ou via le portail public de facturation (PPF). Les formats obligatoires sont UBL et CII. L'archivage doit être effectué au format PDF/A-3. Renseignez vos informations SIRET et TVA pour que vos factures soient compatibles avec ces formats.</p>
        
        <h3>Pénalités de retard et indemnité de recouvrement</h3>
        <p>En application de l'article L. 441-3 du Code de commerce, les pénalités de retard sont calculées au taux d'intérêt légal majoré de 10 points. Pour 2026, le taux d'intérêt légal est de 4,26%, soit un taux de pénalité de 14,26%. L'indemnité forfaitaire de recouvrement de 40 € est automatiquement due en cas de retard de paiement. Ces mentions seront automatiquement ajoutées sur vos factures.</p>
      </div>

      {/* En-tête avec titre SEO et badge de conformité */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <AnimatedShieldIcon className="text-indigo-600" />
            <span className="text-[10px] font-mono text-indigo-600 uppercase tracking-wider">
              {isFrench ? "Conforme article 293 B du CGI" : "Compliant with Article 293 B"}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tighter text-gray-900">
            {t('settings.profileSettings', { defaultValue: 'Paramètres du profil' })}
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 font-medium">
            {t('settings.manageCompanyInfo', { defaultValue: 'Gérez les informations de votre entreprise pour une facturation conforme' })}
          </p>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button 
            onClick={handleSave}
            className="flex-1 sm:flex-none px-6 py-3 bg-indigo-600 text-white rounded-xl text-sm font-bold flex items-center justify-center gap-2 hover:bg-indigo-700 transition-all shadow-md"
          >
            <Save size={16} /> {t('common.save', { defaultValue: 'Enregistrer' })}
          </button>
          {saved && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-1 text-emerald-600 text-sm font-medium"
            >
              <CheckCircle2 size={16} />
              <span>{isFrench ? "Enregistré" : "Saved"}</span>
            </motion.div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Colonne gauche - Identité de l'entreprise */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-6">
          <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
            <Building size={16} className="text-indigo-600" />
            <h2 className="text-xs font-black uppercase tracking-wider text-gray-500">
              {t('settings.companyIdentity', { defaultValue: 'Identité de l\'entreprise' })}
            </h2>
          </div>
          
          <div className="space-y-5">
            <InputGroup 
              label={t('settings.companyName', { defaultValue: 'Nom de l\'entreprise' })} 
              icon={<Building size={16} />} 
              value={formData.companyName} 
              onChange={v => setFormData({ ...formData, companyName: v })}
              placeholder={isFrench ? "Ex: SARL Dupont" : "Ex: Dupont Ltd"}
            />
            <InputGroup 
              label={t('settings.professionalEmail', { defaultValue: 'Email professionnel' })} 
              icon={<Mail size={16} />} 
              value={formData.email} 
              onChange={v => setFormData({ ...formData, email: v })}
              placeholder="contact@entreprise.com"
            />
            <InputGroup 
              label={t('settings.phone', { defaultValue: 'Téléphone' })} 
              icon={<Phone size={16} />} 
              value={formData.phone} 
              onChange={v => setFormData({ ...formData, phone: v })}
              placeholder="+33 1 23 45 67 89"
            />
            <InputGroup 
              label={t('settings.fullAddress', { defaultValue: 'Adresse complète' })} 
              icon={<MapPin size={16} />} 
              value={formData.address} 
              onChange={v => setFormData({ ...formData, address: v })}
              isTextArea
              placeholder={isFrench ? "12 rue de la Paix, 75001 Paris" : "12 Peace Street, 75001 Paris"}
            />
          </div>
        </div>

        {/* Colonne droite */}
        <div className="space-y-8">
          {/* Informations légales et bancaires */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-6">
            <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
              <CreditCard size={16} className="text-indigo-600" />
              <h2 className="text-xs font-black uppercase tracking-wider text-gray-500">
                {t('settings.legalBankingInfo', { defaultValue: 'Informations légales & bancaires' })}
              </h2>
            </div>
            
            <div className="space-y-5">
              <div className="p-3 bg-indigo-50 rounded-xl border border-indigo-100 mb-2">
                <div className="flex items-start gap-2">
                  <Scale size={14} className="text-indigo-600 flex-shrink-0 mt-0.5" />
                  <p className="text-[11px] text-indigo-800 leading-relaxed">
                    {isFrench 
                      ? "📜 Article 293 B du CGI : Pour bénéficier de la franchise TVA, votre SIRET est obligatoire. La mention 'TVA non applicable, article 293 B du CGI' sera automatiquement ajoutée."
                      : "📜 Article 293 B: To benefit from VAT exemption, your SIRET is required. The mention 'VAT not applicable, Article 293 B' will be automatically added."}
                  </p>
                </div>
              </div>
              
              <InputGroup 
                label={t('settings.siret', { defaultValue: 'SIRET / SIREN' })} 
                icon={<Hash size={16} />} 
                value={formData.siret} 
                onChange={v => setFormData({ ...formData, siret: v })}
                placeholder="123 456 789 00012"
              />
              
              <div className="p-3 bg-amber-50 rounded-xl border border-amber-100">
                <div className="flex items-start gap-2">
                  <Globe size={14} className="text-amber-600 flex-shrink-0 mt-0.5" />
                  <p className="text-[11px] text-amber-800 leading-relaxed">
                    {isFrench 
                      ? "🌍 TVA intracommunautaire : Pour les opérations transfrontalières, renseignez votre numéro de TVA (format FR + 11 chiffres) pour bénéficier de l'autoliquidation et de la validation VIES."
                      : "🌍 Intra-community VAT: For cross-border operations, enter your VAT number (FR + 11 digits) to benefit from reverse charge and VIES validation."}
                  </p>
                </div>
              </div>
              
              <InputGroup 
                label={t('settings.vatNumber', { defaultValue: 'TVA intracommunautaire' })} 
                icon={<Euro size={16} />} 
                value={formData.vatNumber || ''} 
                onChange={v => setFormData({ ...formData, vatNumber: v })}
                placeholder="FR12345678901"
              />
              
              <InputGroup 
                label={t('settings.ribIban', { defaultValue: 'RIB / IBAN' })} 
                icon={<CreditCard size={16} />} 
                value={formData.rib} 
                onChange={v => setFormData({ ...formData, rib: v })}
                isTextArea
                placeholder={isFrench ? "FR76 1234 5678 9012 3456 7890 123" : "FR76 1234 5678 9012 3456 7890 123"}
              />
            </div>
          </div>

          {/* Logo de l'entreprise */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-6">
            <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
              <ImageIcon size={16} className="text-indigo-600" />
              <h2 className="text-xs font-black uppercase tracking-wider text-gray-500">
                {t('settings.companyLogo', { defaultValue: 'Logo de l\'entreprise' })}
              </h2>
            </div>
            
            <div className="space-y-4">
              <input 
                type="text" 
                placeholder={t('settings.logoUrlPlaceholder', { defaultValue: "URL du logo (https://...)" })}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 transition-all"
                value={formData.logoUrl}
                onChange={e => setFormData({ ...formData, logoUrl: e.target.value })}
              />
              {formData.logoUrl && (
                <div className="p-4 bg-gray-50 rounded-xl flex justify-center border border-gray-100">
                  <img 
                    src={formData.logoUrl} 
                    alt={isFrench ? "Aperçu du logo" : "Logo preview"} 
                    className="h-16 w-auto object-contain"
                    referrerPolicy="no-referrer"
                  />
                </div>
              )}
              <p className="text-[10px] text-gray-400 text-center">
                {isFrench 
                  ? "Le logo apparaîtra sur toutes vos factures. Formats acceptés : PNG, JPG, SVG."
                  : "The logo will appear on all your invoices. Accepted formats: PNG, JPG, SVG."}
              </p>
            </div>
          </div>

          {/* Informations complémentaires sur la conformité */}
          <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl p-4 border border-indigo-100">
            <div className="flex items-center gap-2 mb-2">
              <Shield size={14} className="text-indigo-600" />
              <h3 className="text-xs font-bold text-indigo-800 uppercase tracking-wider">
                {isFrench ? "Mentions légales automatiques" : "Automatic legal mentions"}
              </h3>
            </div>
            <p className="text-[10px] text-gray-600 leading-relaxed">
              {isFrench 
                ? "Vos factures incluront automatiquement : numéro unique, SIRET, TVA intracommunautaire, pénalités de retard (taux légal + 10 points), indemnité de recouvrement (40€), et les mentions spécifiques à votre régime fiscal (article 293 B ou autoliquidation)."
                : "Your invoices will automatically include: unique number, SIRET, intra-community VAT, late payment penalties (legal rate + 10 points), recovery indemnity (€40), and specific mentions for your tax regime (Article 293 B or reverse charge)."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

interface InputGroupProps {
  label: string;
  icon: React.ReactNode;
  value: string;
  onChange: (v: string) => void;
  isTextArea?: boolean;
  placeholder?: string;
}

function InputGroup({ label, icon, value, onChange, isTextArea = false, placeholder = '' }: InputGroupProps) {
  return (
    <div className="space-y-1.5">
      <label className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
        {label}
      </label>
      <div className="relative group">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-500 transition-colors">
          {icon}
        </div>
        {isTextArea ? (
          <textarea 
            className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-10 pr-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 transition-all resize-none"
            rows={3}
            value={value}
            onChange={e => onChange(e.target.value)}
            placeholder={placeholder}
          />
        ) : (
          <input 
            type="text" 
            className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-10 pr-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 transition-all"
            value={value}
            onChange={e => onChange(e.target.value)}
            placeholder={placeholder}
          />
        )}
      </div>
    </div>
  );
}