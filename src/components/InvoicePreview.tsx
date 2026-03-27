import React from 'react';
import { format, parseISO } from 'date-fns';
import { ArrowLeft, Printer, Send, Loader2 } from 'lucide-react';
import { Invoice, UserProfile, DocumentType } from '../types';
import { formatCurrency, cn } from '../lib/utils';
import { useTranslation } from 'react-i18next';

interface Props {
  invoice: Invoice;
  onBack: () => void;
  onExportPDF: () => void;
  onSendEmail: () => void;
  isExporting: boolean;
  isSending: boolean;
}

export const InvoicePreview: React.FC<Props> = React.memo(({ invoice, onBack, onExportPDF, onSendEmail, isExporting, isSending }) => {
  const { t } = useTranslation();
  const subtotal = invoice.items.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);
  const tax = subtotal * (invoice.taxRate / 100);
  const total = subtotal + tax - invoice.discount;

  const getDocumentTitle = (type: DocumentType) => {
    switch (type) {
      case 'invoice': return t('invoice.types.invoice', { defaultValue: 'INVOICE' }).toUpperCase();
      case 'credit_note': return t('invoice.types.credit_note', { defaultValue: 'CREDIT NOTE' }).toUpperCase();
      case 'quote': return t('invoice.types.quote', { defaultValue: 'QUOTE' }).toUpperCase();
      case 'purchase_order': return t('invoice.types.purchase_order', { defaultValue: 'PURCHASE ORDER' }).toUpperCase();
      default: return t('invoice.types.invoice', { defaultValue: 'INVOICE' }).toUpperCase();
    }
  };

  const templates = {
    minimalist: (
      <div className="space-y-12 text-slate-800 font-sans p-6 sm:p-12 bg-white min-h-[1123px]">
        {/* ... (rest of the template content) */}
      </div>
    ),
    corporate: (
      <div className="bg-white min-h-[1123px] p-0 font-sans text-slate-800">
        {/* ... (rest of the template content) */}
      </div>
    ),
    modern: (
      <div className="bg-white min-h-[1123px] p-6 sm:p-12 font-sans text-slate-900 relative overflow-hidden">
        {/* ... (rest of the template content) */}
      </div>
    ),
    credit_note: (
      <div className="bg-white min-h-[1123px] p-0 font-sans text-blue-900 border-4 border-blue-900">
        {/* ... (rest of the template content) */}
      </div>
    )
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <button onClick={onBack} className="flex items-center gap-2 text-slate-500 hover:text-slate-800 font-bold text-sm transition-colors">
          <ArrowLeft size={20} /> {t('common.back', { defaultValue: 'Back' })}
        </button>
        <div className="flex flex-wrap gap-4 w-full sm:w-auto">
          <button onClick={onExportPDF} className="flex-1 sm:flex-none px-6 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold flex items-center justify-center gap-2 hover:bg-slate-50 transition-all shadow-sm">
            {isExporting ? <Loader2 className="animate-spin" size={18} /> : <Printer size={18} />} {t('invoice.exportPdf', { defaultValue: 'Export PDF' })}
          </button>
          <button onClick={onSendEmail} className="flex-1 sm:flex-none px-8 py-2 bg-blue-600 text-white rounded-xl text-sm font-black flex items-center justify-center gap-2 hover:bg-blue-700 transition-all shadow-lg shadow-blue-100">
            {isSending ? <Loader2 className="animate-spin" size={18} /> : <Send size={18} />} {t('invoice.sendEmail', { defaultValue: 'Send Email' })}
          </button>
        </div>
      </div>
      <div className="w-full max-w-[800px] mx-auto shadow-2xl">
        {templates[invoice.template]}
      </div>
    </div>
  );
});
