import React from 'react';
import { format, parseISO } from 'date-fns';
import { ArrowLeft, Printer, Send, Loader2 } from 'lucide-react';
import { Invoice, UserProfile, DocumentType } from '../types';
import { formatCurrency, cn } from '../lib/utils';
import { useTranslation } from 'react-i18next';

interface Props {
  invoice: Invoice;
  profile: UserProfile;
  onBack?: () => void;
  onExportPDF: () => void;
  onSendEmail: () => void;
  isExporting: boolean;
  isSending: boolean;
}

export const InvoicePreview: React.FC<Props> = React.memo(({ invoice, profile, onBack, onExportPDF, onSendEmail, isExporting, isSending }) => {
  const { t } = useTranslation();
  if (!invoice) return null;
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

  const renderSenderInfo = () => (
    <div className="text-sm space-y-1 text-slate-500">
      <p className="font-bold text-slate-800">{profile.companyName || 'Your Company'}</p>
      <p>{profile.address || 'Your Address'}</p>
      <p>{profile.email || 'your@email.com'}</p>
      <p>{profile.phone || 'Your Phone'}</p>
      {(profile.siret || profile.rib) && (
        <div className="pt-2 text-xs">
          {profile.siret && <p>SIRET: {profile.siret}</p>}
          {profile.rib && <p>RIB/IBAN: {profile.rib}</p>}
        </div>
      )}
    </div>
  );

  const renderClientInfo = () => (
    <div className="text-sm space-y-1 text-slate-500">
      <p className="font-bold text-slate-800">{invoice.client.name || 'Client Name'}</p>
      <p className="whitespace-pre-wrap">{invoice.client.address || 'Client Address'}</p>
      <p>{invoice.client.email || 'client@email.com'}</p>
    </div>
  );

  const renderInvoiceDetails = () => (
    <div className="text-sm space-y-1 text-right">
      <p><span className="text-slate-500">{t('invoice.number', { defaultValue: 'Invoice No:' })}</span> <span className="font-bold">{invoice.invoiceNumber || 'INV-001'}</span></p>
      <p><span className="text-slate-500">{t('invoice.issueDate', { defaultValue: 'Date:' })}</span> <span className="font-bold">{invoice.date ? format(parseISO(invoice.date), 'PP') : ''}</span></p>
      <p><span className="text-slate-500">{t('invoice.dueDate', { defaultValue: 'Due Date:' })}</span> <span className="font-bold">{invoice.dueDate ? format(parseISO(invoice.dueDate), 'PP') : ''}</span></p>
    </div>
  );

  const renderItemsTable = (headerBg: string = 'bg-slate-50', headerText: string = 'text-slate-500') => (
    <table className="w-full text-sm">
      <thead className={`${headerBg} ${headerText}`}>
        <tr>
          <th className="text-left py-3 px-4 font-bold">{t('invoice.itemDescriptionPlaceholder', { defaultValue: 'Description' })}</th>
          <th className="text-right py-3 px-4 font-bold">{t('invoice.quantity', { defaultValue: 'Qty' })}</th>
          <th className="text-right py-3 px-4 font-bold">{t('invoice.unitPrice', { defaultValue: 'Price' })}</th>
          <th className="text-right py-3 px-4 font-bold">{t('invoice.total', { defaultValue: 'Total' })}</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-100">
        {invoice.items.map((item, idx) => (
          <tr key={item.id || idx}>
            <td className="py-4 px-4">{item.description || '-'}</td>
            <td className="text-right py-4 px-4">{item.quantity}</td>
            <td className="text-right py-4 px-4">{formatCurrency(item.unitPrice)}</td>
            <td className="text-right py-4 px-4 font-bold">{formatCurrency(item.quantity * item.unitPrice)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  const renderTotals = () => (
    <div className="w-64 space-y-3 text-sm">
      <div className="flex justify-between text-slate-500">
        <span>{t('invoice.subtotal', { defaultValue: 'Subtotal' })}</span>
        <span>{formatCurrency(subtotal)}</span>
      </div>
      {invoice.taxRate > 0 && (
        <div className="flex justify-between text-slate-500">
          <span>{t('invoice.taxRate', { defaultValue: 'Tax' })} ({invoice.taxRate}%)</span>
          <span>{formatCurrency(tax)}</span>
        </div>
      )}
      {invoice.discount > 0 && (
        <div className="flex justify-between text-rose-500">
          <span>{t('invoice.discountLabel', { defaultValue: 'Discount' })}</span>
          <span>-{formatCurrency(invoice.discount)}</span>
        </div>
      )}
      <div className="flex justify-between text-lg font-black pt-4 border-t border-slate-200">
        <span>{t('invoice.total', { defaultValue: 'Total' })}</span>
        <span>{formatCurrency(total)}</span>
      </div>
    </div>
  );

  const templates = {
    minimalist: (
      <div className="space-y-12 text-slate-800 font-sans p-8 sm:p-12 bg-white min-h-[1000px] shadow-sm border border-slate-100">
        <div className="flex justify-between items-start">
          <div>
            {profile.logoUrl && <img src={profile.logoUrl} alt="Logo" className="h-12 mb-4" referrerPolicy="no-referrer" />}
            <h1 className="text-4xl font-black tracking-tighter mb-2">{getDocumentTitle(invoice.type)}</h1>
            {renderInvoiceDetails()}
          </div>
          <div className="text-right">
            {renderSenderInfo()}
          </div>
        </div>
        
        <div className="pt-8 border-t border-slate-100">
          <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">{t('invoice.billTo', { defaultValue: 'Bill To:' })}</h3>
          {renderClientInfo()}
        </div>

        <div className="pt-8">
          {renderItemsTable()}
        </div>

        <div className="flex justify-end pt-8">
          {renderTotals()}
        </div>

        {invoice.notes && (
          <div className="pt-12 text-sm text-slate-500 whitespace-pre-wrap">
            <h4 className="font-bold text-slate-800 mb-2">{t('invoice.notesMentions', { defaultValue: 'Notes' })}</h4>
            {invoice.notes}
          </div>
        )}
      </div>
    ),
    corporate: (
      <div className="bg-white min-h-[1000px] p-0 font-sans text-slate-800 shadow-sm border border-slate-100">
        <div className="bg-slate-800 text-white p-8 sm:p-12 flex justify-between items-center">
          <div>
            {profile.logoUrl ? (
              <img src={profile.logoUrl} alt="Logo" className="h-16 bg-white p-2 rounded" referrerPolicy="no-referrer" />
            ) : (
              <h2 className="text-2xl font-bold">{profile.companyName || 'Your Company'}</h2>
            )}
          </div>
          <div className="text-right">
            <h1 className="text-4xl font-black tracking-widest uppercase">{getDocumentTitle(invoice.type)}</h1>
            <p className="text-slate-300 mt-2">{invoice.invoiceNumber || 'INV-001'}</p>
          </div>
        </div>
        
        <div className="p-8 sm:p-12 space-y-12">
          <div className="flex justify-between">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">{t('invoice.from', { defaultValue: 'From:' })}</h3>
              {renderSenderInfo()}
            </div>
            <div className="text-right">
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">{t('invoice.billTo', { defaultValue: 'To:' })}</h3>
              {renderClientInfo()}
            </div>
          </div>

          <div className="flex justify-between bg-slate-50 p-4 rounded-lg">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-slate-400">{t('invoice.issueDate', { defaultValue: 'Date' })}</p>
              <p className="font-bold">{invoice.date ? format(parseISO(invoice.date), 'PP') : ''}</p>
            </div>
            <div className="text-right">
              <p className="text-xs font-bold uppercase tracking-widest text-slate-400">{t('invoice.dueDate', { defaultValue: 'Due Date' })}</p>
              <p className="font-bold">{invoice.dueDate ? format(parseISO(invoice.dueDate), 'PP') : ''}</p>
            </div>
          </div>

          <div>
            {renderItemsTable('bg-slate-800', 'text-white')}
          </div>

          <div className="flex justify-end">
            {renderTotals()}
          </div>

          {invoice.notes && (
            <div className="pt-8 border-t border-slate-200 text-sm text-slate-500 whitespace-pre-wrap">
              {invoice.notes}
            </div>
          )}
        </div>
      </div>
    ),
    modern: (
      <div className="bg-white min-h-[1000px] p-8 sm:p-12 font-sans text-slate-900 relative overflow-hidden shadow-sm border border-slate-100">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-bl-full -z-10" />
        
        <div className="flex justify-between items-start mb-16">
          <div className="space-y-4">
            {profile.logoUrl && <img src={profile.logoUrl} alt="Logo" className="h-12" referrerPolicy="no-referrer" />}
            <h1 className="text-5xl font-black tracking-tighter text-blue-600">{getDocumentTitle(invoice.type)}</h1>
            <p className="text-xl font-bold text-slate-400">#{invoice.invoiceNumber || 'INV-001'}</p>
          </div>
          <div className="text-right bg-white/80 backdrop-blur p-4 rounded-2xl shadow-sm">
            {renderSenderInfo()}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 mb-12">
          <div className="bg-slate-50 p-6 rounded-3xl">
            <h3 className="text-xs font-black uppercase tracking-widest text-blue-600 mb-4">{t('invoice.billTo', { defaultValue: 'Billed To' })}</h3>
            {renderClientInfo()}
          </div>
          <div className="bg-slate-50 p-6 rounded-3xl flex flex-col justify-center space-y-4">
            <div className="flex justify-between">
              <span className="text-slate-500 font-bold">{t('invoice.issueDate', { defaultValue: 'Issue Date' })}</span>
              <span className="font-black">{invoice.date ? format(parseISO(invoice.date), 'PP') : ''}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500 font-bold">{t('invoice.dueDate', { defaultValue: 'Due Date' })}</span>
              <span className="font-black">{invoice.dueDate ? format(parseISO(invoice.dueDate), 'PP') : ''}</span>
            </div>
          </div>
        </div>

        <div className="mb-12">
          {renderItemsTable('bg-blue-50', 'text-blue-600')}
        </div>

        <div className="flex justify-end mb-12">
          <div className="bg-slate-50 p-6 rounded-3xl">
            {renderTotals()}
          </div>
        </div>

        {invoice.notes && (
          <div className="text-sm text-slate-500 bg-blue-50/50 p-6 rounded-3xl whitespace-pre-wrap">
            <h4 className="font-black text-blue-600 mb-2">{t('invoice.notesMentions', { defaultValue: 'Notes' })}</h4>
            {invoice.notes}
          </div>
        )}
      </div>
    ),
    credit_note: (
      <div className="bg-white min-h-[1000px] p-0 font-sans text-rose-900 border-t-8 border-rose-600 shadow-sm">
        <div className="p-8 sm:p-12 space-y-12">
          <div className="flex justify-between items-start border-b border-rose-100 pb-8">
            <div>
              <h1 className="text-4xl font-black tracking-tighter text-rose-600 mb-2">{getDocumentTitle(invoice.type)}</h1>
              <p className="text-rose-400 font-bold">{invoice.invoiceNumber || 'CN-001'}</p>
            </div>
            <div className="text-right">
              {profile.logoUrl && <img src={profile.logoUrl} alt="Logo" className="h-12 mb-4 ml-auto" referrerPolicy="no-referrer" />}
              {renderSenderInfo()}
            </div>
          </div>

          <div className="flex justify-between">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-rose-400 mb-2">{t('invoice.billTo', { defaultValue: 'Credit To:' })}</h3>
              {renderClientInfo()}
            </div>
            <div className="text-right space-y-2">
              <p><span className="text-rose-400">{t('invoice.issueDate', { defaultValue: 'Date:' })}</span> <span className="font-bold">{invoice.date ? format(parseISO(invoice.date), 'PP') : ''}</span></p>
            </div>
          </div>

          <div>
            {renderItemsTable('bg-rose-50', 'text-rose-600')}
          </div>

          <div className="flex justify-end">
            {renderTotals()}
          </div>

          {invoice.notes && (
            <div className="pt-8 border-t border-rose-100 text-sm text-rose-500 whitespace-pre-wrap">
              {invoice.notes}
            </div>
          )}
        </div>
      </div>
    )
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        {onBack && (
          <button onClick={onBack} className="flex items-center gap-2 text-slate-500 hover:text-slate-800 font-bold text-sm transition-colors">
            <ArrowLeft size={20} /> {t('common.back', { defaultValue: 'Back' })}
          </button>
        )}
        <div className="flex flex-wrap gap-4 w-full sm:w-auto ml-auto">
          <button onClick={onExportPDF} className="flex-1 sm:flex-none px-6 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold flex items-center justify-center gap-2 hover:bg-slate-50 transition-all shadow-sm">
            {isExporting ? <Loader2 className="animate-spin" size={18} /> : <Printer size={18} />} {t('invoice.exportPdf', { defaultValue: 'Export PDF' })}
          </button>
          <button onClick={onSendEmail} className="flex-1 sm:flex-none px-8 py-2 bg-blue-600 text-white rounded-xl text-sm font-black flex items-center justify-center gap-2 hover:bg-blue-700 transition-all shadow-lg shadow-blue-100">
            {isSending ? <Loader2 className="animate-spin" size={18} /> : <Send size={18} />} {t('invoice.sendEmail', { defaultValue: 'Send Email' })}
          </button>
        </div>
      </div>
      <div className="w-full max-w-[800px] mx-auto shadow-2xl rounded-lg overflow-hidden">
        {templates[invoice.template] || templates.minimalist}
      </div>
    </div>
  );
});
