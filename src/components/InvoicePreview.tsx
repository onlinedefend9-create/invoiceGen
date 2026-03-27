import React from 'react';
import { format, parseISO } from 'date-fns';
import { Invoice, UserProfile, DocumentType } from '../types';
import { formatCurrency, cn } from '../lib/utils';
import { useTranslation } from 'react-i18next';

interface Props {
  invoice: Invoice;
  userProfile: UserProfile;
  id?: string;
}

export const InvoicePreview: React.FC<Props> = React.memo(({ invoice, userProfile, id }) => {
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
    <div id={id} className="w-full max-w-[800px] mx-auto shadow-2xl">
      {templates[invoice.template]}
    </div>
  );
});
