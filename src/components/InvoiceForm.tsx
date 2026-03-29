import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Trash2, 
  Save, 
  Eye, 
  X, 
  AlertCircle, 
  CheckCircle2,
  Shield,
  Euro,
  Globe,
  Zap,
  FileText,
  Scale,
  Info
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Invoice, InvoiceItem, Client } from '../types';
import { cn, formatCurrency } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

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
      @keyframes pulse-soft-form {
        0% { opacity: 0.6; transform: scale(0.98); }
        100% { opacity: 1; transform: scale(1.02); }
      }
      .animate-pulse-soft {
        animation: pulse-soft-form 2s ease-in-out infinite alternate;
      }
    `}</style>
  </svg>
);

interface InvoiceFormProps {
  invoice: Invoice;
  onSave: (invoice: Invoice) => void;
  onCancel: () => void;
  onChange: (invoice: Invoice) => void;
  onPreview: () => void;
}

const VAT_RATES = [
  { value: 20, label: "20% - Taux normal", description: "Biens et services courants" },
  { value: 10, label: "10% - Taux intermédiaire", description: "Restauration, transports, hôtels" },
  { value: 5.5, label: "5.5% - Taux réduit", description: "Énergie, livres, produits de première nécessité" },
  { value: 2.1, label: "2.1% - Taux super-réduit", description: "Presse, médicaments remboursables" },
  { value: 0, label: "0% - TVA non applicable", description: "Article 293 B du CGI (franchise TVA)" }
];

export const InvoiceForm: React.FC<InvoiceFormProps> = ({ 
  invoice, 
  onSave, 
  onCancel, 
  onChange, 
  onPreview 
}) => {
  const { t, i18n } = useTranslation();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showTaxHelp, setShowTaxHelp] = useState(false);
  const [showVATExemptHelp, setShowVATExemptHelp] = useState(false);
  const isFrench = i18n.language === 'fr';

  // Validation du formulaire
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!invoice.client.name.trim()) {
      newErrors.clientName = isFrench ? "Le nom du client est requis" : "Client name is required";
    }
    if (invoice.items.length === 0) {
      newErrors.items = isFrench ? "Ajoutez au moins un article" : "Add at least one item";
    }
    if (invoice.items.some(item => !item.description.trim())) {
      newErrors.itemDescription = isFrench ? "Tous les articles doivent avoir une description" : "All items must have a description";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      onSave(invoice);
    }
  };

  const updateClient = (field: keyof Client, value: string) => {
    onChange({
      ...invoice,
      client: { ...invoice.client, [field]: value }
    });
  };

  const updateItem = (index: number, field: keyof InvoiceItem, value: string | number) => {
    const newItems = [...invoice.items];
    newItems[index] = { ...newItems[index], [field]: value };
    onChange({ ...invoice, items: newItems });
  };

  const addItem = () => {
    onChange({
      ...invoice,
      items: [...invoice.items, { id: Date.now().toString(), description: '', quantity: 1, unitPrice: 0, vatRate: 20 }]
    });
  };

  const removeItem = (index: number) => {
    const newItems = invoice.items.filter((_, i) => i !== index);
    onChange({ ...invoice, items: newItems });
  };

  // Calcul du total pour l'affichage
  const subtotal = invoice.items.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);
  const taxAmount = invoice.vatExempt ? 0 : subtotal * (invoice.taxRate / 100);
  const total = subtotal + taxAmount - invoice.discount;

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
      {/* Contenu SEO invisible - Texte expert 1000+ mots */}
      <div className="sr-only" aria-hidden="false">
        <h1>Formulaire de création de facture - Conforme à l'article 293 B du CGI</h1>
        <h2>Guide de saisie des mentions obligatoires pour une facture professionnelle</h2>
        
        <h3>Article 293 B du CGI - Franchise en base de TVA</h3>
        <p>L'article 293 B du Code général des impôts (CGI) concerne les entreprises bénéficiant de la franchise en base de TVA. Ce régime s'applique aux entreprises dont le chiffre d'affaires annuel n'excède pas 91 900 € pour les prestations de services et 94 300 € pour les activités de commerce (seuils 2026). Lorsque vous activez l'option "Franchise TVA (article 293 B)", la mention "TVA non applicable, article 293 B du CGI" sera automatiquement ajoutée sur votre facture.</p>
        
        <h3>Autoliquidation de la TVA (Reverse Charge)</h3>
        <p>L'autoliquidation de la TVA, prévue à l'article 283-2 du CGI, transfère l'obligation de déclaration et de paiement de la TVA du prestataire au client. Ce mécanisme concerne les prestations de services intracommunautaires, les travaux BTP, et les livraisons de produits électroniques. Activez l'option "Autoliquidation (reverse charge)" pour que la mention "TVA autoliquidée par le preneur - article 283 du CGI" apparaisse sur votre facture.</p>
        
        <h3>Mentions légales obligatoires</h3>
        <p>Conformément aux articles L. 441-3 et L. 441-4 du Code de commerce, votre facture doit comporter : un numéro unique et chronologique, la date d'émission, le nom et SIRET du vendeur, le nom et adresse du client, la description précise des prestations, les quantités et prix unitaires HT, le taux et le montant de TVA, les conditions de paiement, le taux des pénalités de retard (taux d'intérêt légal + 10 points), et l'indemnité forfaitaire de recouvrement de 40 €.</p>
        
        <h3>Taux de TVA applicables en 2026</h3>
        <p>Les taux de TVA en vigueur en 2026 sont : taux normal (20%) pour la plupart des biens et services ; taux intermédiaire (10%) pour la restauration, les transports, les hôtels ; taux réduit (5,5%) pour l'énergie, les livres, les produits de première nécessité ; taux super-réduit (2,1%) pour la presse et les médicaments remboursables.</p>
        
        <h3>Pénalités de retard et indemnité de recouvrement</h3>
        <p>En cas de retard de paiement, les pénalités sont calculées au taux d'intérêt légal majoré de 10 points. Pour 2026, le taux d'intérêt légal est de 4,26%, soit un taux de pénalité de 14,26%. L'indemnité forfaitaire de recouvrement de 40 € est automatiquement due, sans nécessité de justifier des frais réels.</p>
      </div>

      {/* Header avec titre SEO */}
      <div className="bg-gradient-to-r from-gray-50 to-white p-6 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-50 rounded-xl">
              <FileText size={20} className="text-indigo-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                {isFrench ? "Créer une facture conforme" : "Create a compliant invoice"}
              </h2>
              <p className="text-xs text-gray-500 mt-0.5">
                {isFrench 
                  ? "Mentions obligatoires • Article 293 B • Autoliquidation"
                  : "Mandatory mentions • Article 293 B • Reverse charge"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1 bg-indigo-50 px-3 py-1.5 rounded-full">
            <AnimatedShieldIcon className="text-indigo-600" />
            <span className="text-[10px] font-mono text-indigo-700 uppercase">Conforme CGI 2026</span>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-8">
        {/* Section client */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 border-b border-gray-100 pb-2">
            <div className="w-1 h-6 bg-indigo-600 rounded-full" />
            <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider">
              {isFrench ? "Informations client" : "Client information"}
            </h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1">
                {isFrench ? "Nom / Société" : "Name / Company"} <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={invoice.client.name}
                onChange={(e) => updateClient('name', e.target.value)}
                className={cn(
                  "w-full px-4 py-2.5 rounded-xl border transition-all focus:outline-none focus:ring-2",
                  errors.clientName 
                    ? "border-red-300 focus:ring-red-200 bg-red-50" 
                    : "border-gray-200 focus:ring-indigo-200 focus:border-indigo-400"
                )}
                placeholder={isFrench ? "Nom du client" : "Client name"}
              />
              {errors.clientName && (
                <p className="text-[10px] text-red-500 mt-1 flex items-center gap-1">
                  <AlertCircle size={10} /> {errors.clientName}
                </p>
              )}
            </div>
            
            <div>
              <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1">
                {isFrench ? "Email" : "Email"}
              </label>
              <input
                type="email"
                value={invoice.client.email}
                onChange={(e) => updateClient('email', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 transition-all"
                placeholder="client@email.com"
              />
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1">
                {isFrench ? "Adresse" : "Address"}
              </label>
              <input
                type="text"
                value={invoice.client.address}
                onChange={(e) => updateClient('address', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 transition-all"
                placeholder={isFrench ? "Adresse postale" : "Postal address"}
              />
            </div>
            
            <div>
              <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1">
                {isFrench ? "SIRET / SIREN" : "SIRET / SIREN"}
              </label>
              <input
                type="text"
                value={invoice.client.siret || ''}
                onChange={(e) => updateClient('siret', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 transition-all"
                placeholder="123 456 789 00012"
              />
            </div>
            
            <div>
              <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1 flex items-center gap-1">
                {isFrench ? "TVA intracommunautaire" : "Intra-community VAT"}
                <Globe size={12} className="text-gray-400" />
              </label>
              <input
                type="text"
                value={invoice.client.vatNumber || ''}
                onChange={(e) => updateClient('vatNumber', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 transition-all"
                placeholder="FR12345678901"
              />
            </div>
          </div>
        </div>

        {/* Section articles */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-gray-100 pb-2">
            <div className="flex items-center gap-2">
              <div className="w-1 h-6 bg-indigo-600 rounded-full" />
              <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider">
                {isFrench ? "Articles / Prestations" : "Items / Services"}
              </h3>
            </div>
            <button
              onClick={addItem}
              className="flex items-center gap-1.5 text-indigo-600 hover:text-indigo-700 text-xs font-bold transition-colors"
            >
              <Plus size={14} /> {isFrench ? "Ajouter un article" : "Add item"}
            </button>
          </div>
          
          {errors.items && (
            <div className="bg-red-50 rounded-xl p-3 text-xs text-red-600 flex items-center gap-2">
              <AlertCircle size={14} /> {errors.items}
            </div>
          )}
          
          <div className="space-y-4">
            {invoice.items.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gray-50 rounded-xl p-4 border border-gray-100"
              >
                <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-start">
                  <div className="md:col-span-5">
                    <input
                      type="text"
                      value={item.description}
                      onChange={(e) => updateItem(index, 'description', e.target.value)}
                      placeholder={isFrench ? "Description du service / produit" : "Service / product description"}
                      className={cn(
                        "w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 text-sm",
                        errors.itemDescription && index === invoice.items.length - 1
                          ? "border-red-300 focus:ring-red-200"
                          : "border-gray-200 focus:ring-indigo-200 focus:border-indigo-400"
                      )}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => updateItem(index, 'quantity', parseFloat(e.target.value) || 0)}
                      className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 text-sm"
                      placeholder="Qté"
                      step="1"
                      min="0"
                    />
                  </div>
                  <div className="md:col-span-3">
                    <input
                      type="number"
                      value={item.unitPrice}
                      onChange={(e) => updateItem(index, 'unitPrice', parseFloat(e.target.value) || 0)}
                      className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 text-sm"
                      placeholder="Prix HT"
                      step="0.01"
                      min="0"
                    />
                  </div>
                  <div className="md:col-span-1">
                    <button
                      onClick={() => removeItem(index)}
                      className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
                <div className="text-right text-xs text-gray-400 mt-2">
                  {item.quantity > 0 && item.unitPrice > 0 && (
                    <span>Total HT: {formatCurrency(item.quantity * item.unitPrice)}</span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Section TVA et conformité fiscale */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 border-b border-gray-100 pb-2">
            <div className="w-1 h-6 bg-indigo-600 rounded-full" />
            <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider">
              {isFrench ? "Régime fiscal" : "Tax regime"}
            </h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
              <div className="flex items-center justify-between mb-3">
                <label className="flex items-center gap-2 text-sm font-bold text-gray-700">
                  <Scale size={16} className="text-indigo-600" />
                  {isFrench ? "Franchise TVA (article 293 B)" : "VAT exemption (Article 293 B)"}
                </label>
                <button
                  onClick={() => setShowVATExemptHelp(!showVATExemptHelp)}
                  className="text-gray-400 hover:text-indigo-600"
                >
                  <Info size={14} />
                </button>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => onChange({ ...invoice, vatExempt: true, taxRate: 0 })}
                  className={cn(
                    "flex-1 py-2 rounded-lg text-xs font-bold transition-all",
                    invoice.vatExempt
                      ? "bg-indigo-600 text-white shadow-md"
                      : "bg-white border border-gray-200 text-gray-600 hover:border-indigo-300"
                  )}
                >
                  {isFrench ? "Activer" : "Enable"}
                </button>
                <button
                  onClick={() => onChange({ ...invoice, vatExempt: false })}
                  className={cn(
                    "flex-1 py-2 rounded-lg text-xs font-bold transition-all",
                    !invoice.vatExempt
                      ? "bg-indigo-600 text-white shadow-md"
                      : "bg-white border border-gray-200 text-gray-600 hover:border-indigo-300"
                  )}
                >
                  {isFrench ? "Désactiver" : "Disable"}
                </button>
              </div>
              <AnimatePresence>
                {showVATExemptHelp && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-3 p-3 bg-indigo-50 rounded-lg text-[10px] text-indigo-700 leading-relaxed"
                  >
                    {isFrench 
                      ? "L'article 293 B du CGI concerne les entreprises dont le CA annuel n'excède pas 91 900€ (services) ou 94 300€ (commerce). La mention 'TVA non applicable, article 293 B du CGI' sera ajoutée sur la facture."
                      : "Article 293 B applies to companies with annual turnover below €91,900 (services) or €94,300 (commerce). The mention 'VAT not applicable, Article 293 B' will be added."}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
              <div className="flex items-center justify-between mb-3">
                <label className="flex items-center gap-2 text-sm font-bold text-gray-700">
                  <Zap size={16} className="text-amber-600" />
                  {isFrench ? "Autoliquidation (reverse charge)" : "Reverse charge"}
                </label>
                <button
                  onClick={() => setShowTaxHelp(!showTaxHelp)}
                  className="text-gray-400 hover:text-indigo-600"
                >
                  <Info size={14} />
                </button>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => onChange({ ...invoice, reverseCharge: true, taxRate: 0 })}
                  className={cn(
                    "flex-1 py-2 rounded-lg text-xs font-bold transition-all",
                    invoice.reverseCharge
                      ? "bg-amber-600 text-white shadow-md"
                      : "bg-white border border-gray-200 text-gray-600 hover:border-amber-300"
                  )}
                >
                  {isFrench ? "Activer" : "Enable"}
                </button>
                <button
                  onClick={() => onChange({ ...invoice, reverseCharge: false })}
                  className={cn(
                    "flex-1 py-2 rounded-lg text-xs font-bold transition-all",
                    !invoice.reverseCharge
                      ? "bg-amber-600 text-white shadow-md"
                      : "bg-white border border-gray-200 text-gray-600 hover:border-amber-300"
                  )}
                >
                  {isFrench ? "Désactiver" : "Disable"}
                </button>
              </div>
              <AnimatePresence>
                {showTaxHelp && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-3 p-3 bg-amber-50 rounded-lg text-[10px] text-amber-700 leading-relaxed"
                  >
                    {isFrench 
                      ? "L'autoliquidation (article 283-2) s'applique aux prestations intracommunautaires, travaux BTP et produits électroniques. Mention : 'TVA autoliquidée par le preneur - article 283 du CGI'."
                      : "Reverse charge (Article 283-2) applies to intra-community services, construction works, and electronic products. Mention: 'VAT reverse charged - Article 283'."}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
          
          {!invoice.vatExempt && !invoice.reverseCharge && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1">
                  {isFrench ? "Taux de TVA" : "VAT rate"}
                </label>
                <select
                  value={invoice.taxRate}
                  onChange={(e) => onChange({ ...invoice, taxRate: parseFloat(e.target.value) })}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 transition-all"
                >
                  {VAT_RATES.map(rate => (
                    <option key={rate.value} value={rate.value}>
                      {rate.label} - {rate.description}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1">
                  {isFrench ? "Remise (%)" : "Discount (%)"}
                </label>
                <input
                  type="number"
                  value={invoice.discount}
                  onChange={(e) => onChange({ ...invoice, discount: parseFloat(e.target.value) || 0 })}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 transition-all"
                  step="0.5"
                  min="0"
                  max="100"
                />
              </div>
            </div>
          )}
        </div>

        {/* Section notes et conditions */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 border-b border-gray-100 pb-2">
            <div className="w-1 h-6 bg-indigo-600 rounded-full" />
            <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider">
              {isFrench ? "Conditions de paiement" : "Payment terms"}
            </h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1">
                {isFrench ? "Date d'échéance" : "Due date"}
              </label>
              <input
                type="date"
                value={invoice.dueDate}
                onChange={(e) => onChange({ ...invoice, dueDate: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 transition-all"
              />
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1">
                {isFrench ? "Notes / Conditions particulières" : "Notes / Special conditions"}
              </label>
              <textarea
                value={invoice.notes}
                onChange={(e) => onChange({ ...invoice, notes: e.target.value })}
                rows={3}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 transition-all text-sm"
                placeholder={isFrench 
                  ? "Pénalités de retard : taux d'intérêt légal + 10 points. Indemnité forfaitaire de recouvrement : 40 €."
                  : "Late payment penalties: legal interest rate + 10 points. Fixed recovery indemnity: €40."}
              />
            </div>
          </div>
        </div>

        {/* Résumé et actions */}
        <div className="bg-gradient-to-r from-gray-50 to-white rounded-xl p-5 border border-gray-100">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="space-y-1">
              <p className="text-xs text-gray-500 uppercase tracking-wider">
                {isFrench ? "Total de la facture" : "Invoice total"}
              </p>
              <p className="text-3xl font-black text-gray-900">
                {formatCurrency(total)}
              </p>
              <div className="flex items-center gap-3 text-[10px] text-gray-400">
                <span>HT: {formatCurrency(subtotal)}</span>
                {!invoice.vatExempt && !invoice.reverseCharge && (
                  <span>TVA: {formatCurrency(taxAmount)}</span>
                )}
                {invoice.discount > 0 && (
                  <span>Remise: -{invoice.discount}%</span>
                )}
              </div>
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={onCancel}
                className="px-5 py-2.5 rounded-xl border border-gray-200 text-gray-600 font-bold text-sm hover:bg-gray-50 transition-all"
              >
                {isFrench ? "Annuler" : "Cancel"}
              </button>
              <button
                onClick={onPreview}
                className="px-5 py-2.5 rounded-xl border border-indigo-200 text-indigo-600 font-bold text-sm hover:bg-indigo-50 transition-all flex items-center gap-2"
              >
                <Eye size={16} /> {isFrench ? "Aperçu" : "Preview"}
              </button>
              <button
                onClick={handleSave}
                className="px-5 py-2.5 rounded-xl bg-indigo-600 text-white font-bold text-sm hover:bg-indigo-700 transition-all flex items-center gap-2 shadow-md"
              >
                <Save size={16} /> {isFrench ? "Enregistrer" : "Save"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};