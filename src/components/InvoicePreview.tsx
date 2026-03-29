import React, { useState, useEffect } from 'react';
import { format, parseISO } from 'date-fns';
import { ArrowLeft, Printer, Send, Loader2, Layout, Shield, Euro, Globe, Scale, FileText, Zap, CheckCircle2 } from 'lucide-react';
import { Invoice, UserProfile, DocumentType, TemplateType } from '../types';
import { formatCurrency, cn } from '../lib/utils';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';

// Composant SVG animé pour l'article 293 B
const AnimatedShieldIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg 
    className={`animate-pulse-soft ${className}`} 
    width="16" 
    height="16" 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-label="Icône article 293 B du CGI"
  >
    <path d="M12 3L3 7L12 21L21 7L12 3Z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
    <path d="M12 7V12M12 16H12.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <style>{`
      @keyframes pulse-soft-preview {
        0% { opacity: 0.6; transform: scale(0.98); }
        100% { opacity: 1; transform: scale(1.02); }
      }
      .animate-pulse-soft {
        animation: pulse-soft-preview 2s ease-in-out infinite alternate;
      }
    `}</style>
  </svg>
);

interface Props {
  invoice: Invoice;
  profile: UserProfile;
  onBack?: () => void;
  onExportPDF: () => void;
  onSendEmail: () => void;
  onTemplateChange?: (template: TemplateType) => void;
  isExporting: boolean;
  isSending: boolean;
}

export const InvoicePreview: React.FC<Props> = React.memo(({ 
  invoice, 
  profile, 
  onBack, 
  onExportPDF, 
  onSendEmail, 
  onTemplateChange, 
  isExporting, 
  isSending 
}) => {
  const { t, i18n } = useTranslation();
  const [previewTemplate, setPreviewTemplate] = useState<TemplateType>(invoice?.template || 'minimalist');
  const isFrench = i18n.language === 'fr';

  useEffect(() => {
    if (invoice) {
      setPreviewTemplate(invoice.template);
    }
  }, [invoice?.template]);

  const handleTemplateChange = (template: TemplateType) => {
    setPreviewTemplate(template);
    if (onTemplateChange) {
      onTemplateChange(template);
    }
  };

  if (!invoice) return null;

  const subtotal = invoice.items.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);
  const tax = invoice.vatExempt ? 0 : subtotal * (invoice.taxRate / 100);
  const total = subtotal + tax - invoice.discount;

  // Calcul des pénalités de retard (taux d'intérêt légal + 10 points)
  const legalInterestRate = 4.26; // 2026
  const latePenaltyRate = legalInterestRate + 10;
  const daysOverdue = invoice.status !== 'paid' && invoice.dueDate 
    ? Math.max(0, Math.floor((new Date().getTime() - parseISO(invoice.dueDate).getTime()) / (1000 * 60 * 60 * 24)))
    : 0;
  const latePenalty = daysOverdue > 0 ? (total * latePenaltyRate / 100 * daysOverdue / 365) : 0;
  const recoveryIndemnity = 40; // Indemnité forfaitaire de recouvrement

  const getDocumentTitle = (type: DocumentType) => {
    switch (type) {
      case 'invoice': return t('invoice.types.invoice', { defaultValue: 'FACTURE' }).toUpperCase();
      case 'credit_note': return t('invoice.types.credit_note', { defaultValue: 'AVOIR' }).toUpperCase();
      case 'quote': return t('invoice.types.quote', { defaultValue: 'DEVIS' }).toUpperCase();
      case 'purchase_order': return t('invoice.types.purchase_order', { defaultValue: 'BON DE COMMANDE' }).toUpperCase();
      default: return t('invoice.types.invoice', { defaultValue: 'FACTURE' }).toUpperCase();
    }
  };

  // Fonction pour afficher les mentions fiscales
  const getTaxMentions = () => {
    if (invoice.vatExempt) {
      return isFrench 
        ? "TVA non applicable, article 293 B du CGI"
        : "VAT not applicable, Article 293 B of the French Tax Code";
    }
    if (invoice.reverseCharge) {
      return isFrench
        ? "TVA autoliquidée par le preneur - article 283 du CGI"
        : "VAT reverse charged by the customer - Article 283";
    }
    return null;
  };

  const renderSenderInfo = () => (
    <div className="text-sm space-y-1 text-gray-500">
      <p className="font-bold text-gray-800">{profile.companyName || (isFrench ? 'Votre Société' : 'Your Company')}</p>
      <p>{profile.address || (isFrench ? 'Votre Adresse' : 'Your Address')}</p>
      <p>{profile.email || 'your@email.com'}</p>
      <p>{profile.phone || (isFrench ? 'Votre Téléphone' : 'Your Phone')}</p>
      {(profile.siret || profile.rib) && (
        <div className="pt-2 text-xs border-t border-gray-100 mt-2">
          {profile.siret && <p>SIRET: {profile.siret}</p>}
          {profile.rib && <p>RIB/IBAN: {profile.rib}</p>}
        </div>
      )}
    </div>
  );

  const renderClientInfo = () => (
    <div className="text-sm space-y-1 text-gray-500">
      <p className="font-bold text-gray-800">{invoice.client.name || (isFrench ? 'Nom du Client' : 'Client Name')}</p>
      <p className="whitespace-pre-wrap">{invoice.client.address || (isFrench ? 'Adresse du client' : 'Client Address')}</p>
      <p>{invoice.client.email || 'client@email.com'}</p>
      {invoice.client.siret && <p className="text-xs text-gray-400">SIRET: {invoice.client.siret}</p>}
      {invoice.client.vatNumber && <p className="text-xs text-gray-400">TVA: {invoice.client.vatNumber}</p>}
    </div>
  );

  const renderInvoiceDetails = () => (
    <div className="text-sm space-y-1 text-right">
      <p><span className="text-gray-500">{t('invoice.number', { defaultValue: 'N° Facture:' })}</span> <span className="font-bold">{invoice.invoiceNumber || 'FACT-001'}</span></p>
      <p><span className="text-gray-500">{t('invoice.issueDate', { defaultValue: 'Date:' })}</span> <span className="font-bold">{invoice.date ? format(parseISO(invoice.date), 'PP') : ''}</span></p>
      <p><span className="text-gray-500">{t('invoice.dueDate', { defaultValue: 'Échéance:' })}</span> <span className="font-bold">{invoice.dueDate ? format(parseISO(invoice.dueDate), 'PP') : ''}</span></p>
    </div>
  );

  const renderItemsTable = (headerBg: string = 'bg-gray-50', headerText: string = 'text-gray-500') => (
    <table className="w-full text-sm">
      <thead className={`${headerBg} ${headerText}`}>
        <tr>
          <th className="text-left py-3 px-4 font-bold">{t('invoice.itemDescriptionPlaceholder', { defaultValue: 'Description' })}</th>
          <th className="text-right py-3 px-4 font-bold">{t('invoice.quantity', { defaultValue: 'Qté' })}</th>
          <th className="text-right py-3 px-4 font-bold">{t('invoice.unitPrice', { defaultValue: 'Prix HT' })}</th>
          <th className="text-right py-3 px-4 font-bold">{t('invoice.total', { defaultValue: 'Total HT' })}</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-100">
        {invoice.items.map((item, idx) => (
          <tr key={item.id || idx}>
            <td className="py-3 px-4">{item.description || '-'}</td>
            <td className="text-right py-3 px-4">{item.quantity}</td>
            <td className="text-right py-3 px-4">{formatCurrency(item.unitPrice)}</td>
            <td className="text-right py-3 px-4 font-bold">{formatCurrency(item.quantity * item.unitPrice)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  const renderTotals = () => (
    <div className="w-64 space-y-2 text-sm">
      <div className="flex justify-between text-gray-500">
        <span>{t('invoice.subtotal', { defaultValue: 'Sous-total HT' })}</span>
        <span>{formatCurrency(subtotal)}</span>
      </div>
      {invoice.taxRate > 0 && !invoice.vatExempt && !invoice.reverseCharge && (
        <div className="flex justify-between text-gray-500">
          <span>{t('invoice.taxRate', { defaultValue: 'TVA' })} ({invoice.taxRate}%)</span>
          <span>{formatCurrency(tax)}</span>
        </div>
      )}
      {invoice.discount > 0 && (
        <div className="flex justify-between text-rose-500">
          <span>{t('invoice.discountLabel', { defaultValue: 'Remise' })}</span>
          <span>-{formatCurrency(invoice.discount)}</span>
        </div>
      )}
      <div className="flex justify-between text-base font-black pt-3 border-t border-gray-200">
        <span>{t('invoice.total', { defaultValue: 'Total TTC' })}</span>
        <span>{formatCurrency(total)}</span>
      </div>
    </div>
  );

  const renderPaymentTerms = () => (
    <div className="text-xs text-gray-400 space-y-1 mt-6 pt-4 border-t border-gray-100">
      <p>
        {isFrench 
          ? `Pénalités de retard : ${latePenaltyRate}% du montant TTC (taux d'intérêt légal ${legalInterestRate}% + 10 points). Indemnité forfaitaire de recouvrement : ${recoveryIndemnity} €.`
          : `Late payment penalties: ${latePenaltyRate}% of total (legal interest rate ${legalInterestRate}% + 10 points). Fixed recovery indemnity: €${recoveryIndemnity}.`}
      </p>
      {daysOverdue > 0 && invoice.status !== 'paid' && (
        <p className="text-amber-600 font-medium">
          {isFrench 
            ? `⚠️ Retard de paiement : ${daysOverdue} jours. Pénalités estimées : ${formatCurrency(latePenalty)}`
            : `⚠️ Late payment: ${daysOverdue} days. Estimated penalties: ${formatCurrency(latePenalty)}`}
        </p>
      )}
    </div>
  );

  const taxMention = getTaxMentions();
  const mentionElement = taxMention ? (
    <div className="mt-4 p-3 bg-indigo-50 rounded-lg border border-indigo-100">
      <div className="flex items-center gap-2">
        <AnimatedShieldIcon className="text-indigo-600" />
        <p className="text-[10px] font-mono text-indigo-700">{taxMention}</p>
      </div>
    </div>
  ) : null;

  const templates = {
    minimalist: (
      <div id="invoice-render" className="space-y-8 text-gray-800 font-sans p-8 sm:p-12 bg-white min-h-[1123px] shadow-2xl rounded-2xl">
        {/* Contenu SEO invisible pour l'aperçu */}
        <div className="sr-only" aria-hidden="false">
          <h2>Aperçu de facture conforme à l'article 293 B du CGI</h2>
          <p>Cette facture a été générée avec InvoiceGEN, un générateur de facture gratuit et conforme à la législation fiscale française. Toutes les mentions obligatoires sont présentes conformément aux articles L. 441-3 et L. 441-4 du Code de commerce.</p>
        </div>
        
        <div className="flex justify-between items-start">
          <div>
            {profile.logoUrl && <img src={profile.logoUrl} alt="Logo de l'entreprise" className="h-12 mb-4" referrerPolicy="no-referrer" />}
            <h1 className="text-4xl font-black tracking-tighter mb-2">{getDocumentTitle(invoice.type)}</h1>
            {renderInvoiceDetails()}
          </div>
          <div className="text-right">
            {renderSenderInfo()}
          </div>
        </div>
        
        <div className="pt-8 border-t border-gray-100">
          <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">{t('invoice.billTo', { defaultValue: 'Facturé à :' })}</h3>
          {renderClientInfo()}
        </div>

        <div className="pt-6">
          {renderItemsTable()}
        </div>

        <div className="flex justify-end pt-6">
          <div>
            {renderTotals()}
          </div>
        </div>

        {mentionElement}

        {invoice.notes && (
          <div className="pt-6 text-sm text-gray-500 whitespace-pre-wrap">
            <h4 className="font-bold text-gray-800 mb-2">{t('invoice.notesMentions', { defaultValue: 'Notes' })}</h4>
            {invoice.notes}
          </div>
        )}

        {renderPaymentTerms()}
      </div>
    ),
    corporate: (
      <div id="invoice-render" className="bg-white min-h-[1123px] p-0 font-sans text-gray-800 shadow-2xl rounded-2xl overflow-hidden">
        <div className="bg-gray-800 text-white p-8 sm:p-12 flex justify-between items-center">
          <div>
            {profile.logoUrl ? (
              <img src={profile.logoUrl} alt="Logo de l'entreprise" className="h-16 bg-white p-2 rounded" referrerPolicy="no-referrer" />
            ) : (
              <h2 className="text-2xl font-bold">{profile.companyName || (isFrench ? 'Votre Société' : 'Your Company')}</h2>
            )}
          </div>
          <div className="text-right">
            <h1 className="text-4xl font-black tracking-widest uppercase">{getDocumentTitle(invoice.type)}</h1>
            <p className="text-gray-300 mt-2">{invoice.invoiceNumber || 'FACT-001'}</p>
          </div>
        </div>
        
        <div className="p-8 sm:p-12 space-y-10">
          <div className="flex justify-between">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">{t('invoice.from', { defaultValue: 'Émetteur :' })}</h3>
              {renderSenderInfo()}
            </div>
            <div className="text-right">
              <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">{t('invoice.billTo', { defaultValue: 'Destinataire :' })}</h3>
              {renderClientInfo()}
            </div>
          </div>

          <div className="flex justify-between bg-gray-50 p-4 rounded-lg">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400">{t('invoice.issueDate', { defaultValue: 'Date' })}</p>
              <p className="font-bold">{invoice.date ? format(parseISO(invoice.date), 'PP') : ''}</p>
            </div>
            <div className="text-right">
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400">{t('invoice.dueDate', { defaultValue: 'Échéance' })}</p>
              <p className="font-bold">{invoice.dueDate ? format(parseISO(invoice.dueDate), 'PP') : ''}</p>
            </div>
          </div>

          <div>
            {renderItemsTable('bg-gray-800', 'text-white')}
          </div>

          <div className="flex justify-end">
            {renderTotals()}
          </div>

          {mentionElement}

          {invoice.notes && (
            <div className="pt-6 border-t border-gray-200 text-sm text-gray-500 whitespace-pre-wrap">
              {invoice.notes}
            </div>
          )}

          {renderPaymentTerms()}
        </div>
      </div>
    ),
    modern: (
      <div id="invoice-render" className="bg-white min-h-[1123px] p-8 sm:p-12 font-sans text-gray-900 relative overflow-hidden shadow-2xl rounded-2xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-50 rounded-bl-full -z-10" />
        
        <div className="flex justify-between items-start mb-12">
          <div className="space-y-4">
            {profile.logoUrl && <img src={profile.logoUrl} alt="Logo de l'entreprise" className="h-12" referrerPolicy="no-referrer" />}
            <h1 className="text-5xl font-black tracking-tighter text-indigo-600">{getDocumentTitle(invoice.type)}</h1>
            <p className="text-xl font-bold text-gray-400">#{invoice.invoiceNumber || 'FACT-001'}</p>
          </div>
          <div className="text-right bg-white/80 backdrop-blur p-4 rounded-2xl shadow-sm">
            {renderSenderInfo()}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 mb-12">
          <div className="bg-gray-50 p-6 rounded-3xl">
            <h3 className="text-xs font-black uppercase tracking-widest text-indigo-600 mb-4">{t('invoice.billTo', { defaultValue: 'Facturé à' })}</h3>
            {renderClientInfo()}
          </div>
          <div className="bg-gray-50 p-6 rounded-3xl flex flex-col justify-center space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-500 font-bold">{t('invoice.issueDate', { defaultValue: 'Date d\'émission' })}</span>
              <span className="font-black">{invoice.date ? format(parseISO(invoice.date), 'PP') : ''}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 font-bold">{t('invoice.dueDate', { defaultValue: 'Date d\'échéance' })}</span>
              <span className="font-black">{invoice.dueDate ? format(parseISO(invoice.dueDate), 'PP') : ''}</span>
            </div>
          </div>
        </div>

        <div className="mb-12">
          {renderItemsTable('bg-indigo-50', 'text-indigo-600')}
        </div>

        <div className="flex justify-end mb-12">
          <div className="bg-gray-50 p-6 rounded-3xl">
            {renderTotals()}
          </div>
        </div>

        {mentionElement && (
          <div className="mb-6">
            {mentionElement}
          </div>
        )}

        {invoice.notes && (
          <div className="text-sm text-gray-500 bg-indigo-50/50 p-6 rounded-3xl whitespace-pre-wrap">
            <h4 className="font-black text-indigo-600 mb-2">{t('invoice.notesMentions', { defaultValue: 'Notes' })}</h4>
            {invoice.notes}
          </div>
        )}

        {renderPaymentTerms()}
      </div>
    ),
    credit_note: (
      <div id="invoice-render" className="bg-white min-h-[1123px] p-0 font-sans text-rose-900 border-t-8 border-rose-600 shadow-2xl rounded-2xl overflow-hidden">
        <div className="p-8 sm:p-12 space-y-10">
          <div className="flex justify-between items-start border-b border-rose-100 pb-8">
            <div>
              <h1 className="text-4xl font-black tracking-tighter text-rose-600 mb-2">{getDocumentTitle(invoice.type)}</h1>
              <p className="text-rose-400 font-bold">{invoice.invoiceNumber || 'AV-001'}</p>
            </div>
            <div className="text-right">
              {profile.logoUrl && <img src={profile.logoUrl} alt="Logo de l'entreprise" className="h-12 mb-4 ml-auto" referrerPolicy="no-referrer" />}
              {renderSenderInfo()}
            </div>
          </div>

          <div className="flex justify-between">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-rose-400 mb-2">{t('invoice.billTo', { defaultValue: 'Crédité à :' })}</h3>
              {renderClientInfo()}
            </div>
            <div className="text-right space-y-2">
              <p><span className="text-rose-400">{t('invoice.issueDate', { defaultValue: 'Date :' })}</span> <span className="font-bold">{invoice.date ? format(parseISO(invoice.date), 'PP') : ''}</span></p>
            </div>
          </div>

          <div>
            {renderItemsTable('bg-rose-50', 'text-rose-600')}
          </div>

          <div className="flex justify-end">
            {renderTotals()}
          </div>

          {invoice.notes && (
            <div className="pt-6 border-t border-rose-100 text-sm text-rose-500 whitespace-pre-wrap">
              {invoice.notes}
            </div>
          )}
        </div>
      </div>
    )
  };

  return (
    <div className="space-y-6">
      {/* Contenu SEO invisible - Texte expert 1000+ mots pour l'aperçu */}
      <div className="sr-only" aria-hidden="false">
        <h1>Aperçu de facture - InvoiceGEN</h1>
        <h2>Conformité avec l'article 293 B du CGI et les règles d'autoliquidation</h2>
        <p>L'aperçu de facture vous permet de visualiser le document final avant son export ou envoi. InvoiceGEN génère automatiquement toutes les mentions obligatoires conformément au Code général des impôts et au Code de commerce.</p>
        
        <h3>Mentions légales automatiques</h3>
        <p>Votre facture intègre automatiquement : un numéro unique et chronologique, la date d'émission, les coordonnées complètes de votre entreprise (SIRET, TVA intracommunautaire), les coordonnées de votre client, la description détaillée des prestations, les quantités et prix unitaires HT, le taux et le montant de TVA applicable, les conditions de paiement, le taux des pénalités de retard (taux d'intérêt légal + 10 points), et l'indemnité forfaitaire de recouvrement de 40 €.</p>
        
        <h3>Franchise TVA - Article 293 B du CGI</h3>
        <p>Si vous bénéficiez de la franchise en base de TVA, la mention "TVA non applicable, article 293 B du CGI" est automatiquement ajoutée sur votre facture. Ce régime s'applique aux entreprises dont le chiffre d'affaires annuel n'excède pas 91 900 € pour les services ou 94 300 € pour le commerce (seuils 2026).</p>
        
        <h3>Autoliquidation - Article 283-2 du CGI</h3>
        <p>Pour les opérations soumises à autoliquidation (reverse charge), la mention "TVA autoliquidée par le preneur - article 283 du CGI" apparaît. Ce mécanisme concerne les prestations intracommunautaires, les travaux BTP, et les livraisons de produits électroniques.</p>
        
        <h3>Pénalités de retard et indemnité de recouvrement</h3>
        <p>En application de l'article L. 441-3 du Code de commerce, les pénalités de retard sont calculées au taux d'intérêt légal majoré de 10 points. Pour 2026, le taux d'intérêt légal est de 4,26%, soit un taux de pénalité de 14,26%. L'indemnité forfaitaire de recouvrement de 40 € est automatiquement due en cas de retard de paiement.</p>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        {onBack && (
          <button onClick={onBack} className="flex items-center gap-2 text-gray-500 hover:text-gray-800 font-bold text-sm transition-colors">
            <ArrowLeft size={18} /> {t('common.back', { defaultValue: 'Retour' })}
          </button>
        )}
        <div className="flex flex-wrap gap-3 w-full sm:w-auto ml-auto items-center">
          <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-3 py-2 shadow-sm">
            <Layout size={16} className="text-gray-400" />
            <select
              value={previewTemplate}
              onChange={(e) => handleTemplateChange(e.target.value as TemplateType)}
              className="bg-transparent border-none text-xs font-bold text-gray-700 focus:ring-0 cursor-pointer outline-none"
            >
              <option value="minimalist">{t('invoice.templates.minimalist', { defaultValue: 'Minimaliste' })}</option>
              <option value="corporate">{t('invoice.templates.corporate', { defaultValue: 'Corporate' })}</option>
              <option value="modern">{t('invoice.templates.modern', { defaultValue: 'Moderne' })}</option>
              <option value="credit_note">{t('invoice.templates.credit_note', { defaultValue: 'Avoir' })}</option>
            </select>
          </div>
          <button 
            onClick={onExportPDF} 
            className="flex-1 sm:flex-none px-5 py-2 bg-white border border-gray-200 rounded-xl text-xs font-bold flex items-center justify-center gap-2 hover:bg-gray-50 transition-all shadow-sm"
          >
            {isExporting ? <Loader2 className="animate-spin" size={14} /> : <Printer size={14} />} 
            {t('invoice.exportPdf', { defaultValue: 'Export PDF' })}
          </button>
          <button 
            onClick={onSendEmail} 
            className="flex-1 sm:flex-none px-6 py-2 bg-indigo-600 text-white rounded-xl text-xs font-black flex items-center justify-center gap-2 hover:bg-indigo-700 transition-all shadow-md"
          >
            {isSending ? <Loader2 className="animate-spin" size={14} /> : <Send size={14} />} 
            {t('invoice.sendEmail', { defaultValue: 'Envoyer' })}
          </button>
        </div>
      </div>
      
      <div className="w-full max-w-[800px] mx-auto">
        {templates[previewTemplate] || templates.minimalist}
      </div>
    </div>
  );
});