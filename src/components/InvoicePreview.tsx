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

export const InvoicePreview: React.FC<Props> = ({ invoice, userProfile, id }) => {
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
        <div className="flex flex-col sm:flex-row justify-between items-start border-b border-slate-100 pb-12 gap-8">
          <div className="space-y-4">
            {userProfile.logoUrl && <img src={userProfile.logoUrl} alt="Logo" className="h-12 w-auto" referrerPolicy="no-referrer" />}
            <h1 className="text-3xl font-black tracking-tighter">{userProfile.companyName}</h1>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-widest leading-relaxed">
              {userProfile.address}<br />{userProfile.email} • {userProfile.phone}
            </p>
          </div>
          <div className="text-left sm:text-right space-y-2">
            <h2 className="text-5xl font-black text-slate-100 uppercase tracking-tighter">{getDocumentTitle(invoice.type)}</h2>
            <p className="text-sm font-black text-slate-800">{invoice.invoiceNumber}</p>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">{t('invoice.issuedOn', { defaultValue: 'Issued on' })}: {format(parseISO(invoice.date), 'dd/MM/yyyy')}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 sm:gap-24">
          <div className="space-y-4">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-300">{t('invoice.billedTo', { defaultValue: 'Billed to' })}</h4>
            <p className="text-lg font-black tracking-tight">{invoice.client.name}</p>
            <p className="text-sm text-slate-500 font-medium whitespace-pre-line leading-relaxed">{invoice.client.address}</p>
            <p className="text-sm text-slate-500 font-medium">{invoice.client.email}</p>
          </div>
          <div className="text-left sm:text-right space-y-4">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-300">{t('invoice.paymentDetails', { defaultValue: 'Payment Details' })}</h4>
            <p className="text-sm font-bold text-slate-800">{t('invoice.dueDate', { defaultValue: 'Due Date' })}: {format(parseISO(invoice.dueDate), 'dd/MM/yyyy')}</p>
            <p className="text-sm font-bold text-blue-600 uppercase tracking-widest">{t(`invoice.status.${invoice.status}`, { defaultValue: invoice.status })}</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px] sm:min-w-0">
            <thead>
              <tr className="border-b-2 border-slate-100 text-left">
                <th className="py-4 text-[10px] font-black uppercase tracking-widest text-slate-300">{t('invoice.description', { defaultValue: 'Description' })}</th>
                <th className="py-4 text-[10px] font-black uppercase tracking-widest text-slate-300 text-center">{t('invoice.qty', { defaultValue: 'Qty' })}</th>
                <th className="py-4 text-[10px] font-black uppercase tracking-widest text-slate-300 text-right">{t('invoice.unitPrice', { defaultValue: 'Unit Price' })}</th>
                <th className="py-4 text-[10px] font-black uppercase tracking-widest text-slate-300 text-right">{t('invoice.total', { defaultValue: 'Total' })}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {invoice.items.map(item => (
                <tr key={item.id}>
                  <td className="py-6 font-bold text-slate-800">{item.description}</td>
                  <td className="py-6 text-center text-slate-500 font-bold">{item.quantity}</td>
                  <td className="py-6 text-right text-slate-500 font-bold">{formatCurrency(item.unitPrice)}</td>
                  <td className="py-6 text-right font-black text-slate-800">{formatCurrency(item.quantity * item.unitPrice)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-end">
          <div className="w-full sm:w-72 space-y-4">
            <div className="flex justify-between text-sm">
              <span className="text-slate-400 font-bold">{t('invoice.subtotal', { defaultValue: 'Subtotal' })}</span>
              <span className="font-black">{formatCurrency(subtotal)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-400 font-bold">{t('invoice.tax', { defaultValue: 'Tax' })} ({invoice.taxRate}%)</span>
              <span className="font-black">{formatCurrency(tax)}</span>
            </div>
            {invoice.discount > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-slate-400 font-bold">{t('invoice.discount', { defaultValue: 'Discount' })}</span>
                <span className="font-black text-rose-500">-{formatCurrency(invoice.discount)}</span>
              </div>
            )}
            <div className="flex justify-between text-2xl font-black pt-6 border-t-4 border-slate-800 tracking-tighter">
              <span>{t('invoice.total', { defaultValue: 'Total' })}</span>
              <span className="text-blue-600">{formatCurrency(total)}</span>
            </div>
          </div>
        </div>

        <div className="mt-auto pt-24 border-t border-slate-100 space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
            <div className="space-y-2">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-300">{t('invoice.notes', { defaultValue: 'Notes' })}</h4>
              <p className="text-xs text-slate-400 font-medium leading-relaxed">{invoice.notes || t('invoice.noNotes', { defaultValue: 'No additional notes.' })}</p>
            </div>
            <div className="space-y-2 text-left sm:text-right">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-300">{t('invoice.bankDetails', { defaultValue: 'Bank Details' })}</h4>
              <p className="text-xs text-slate-400 font-bold font-mono break-all">{userProfile.rib}</p>
            </div>
          </div>
          <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-[8px] font-black uppercase tracking-[0.2em] text-slate-300">
            <span>SIRET: {userProfile.siret}</span>
            <span className="bg-slate-50 px-3 py-1 rounded-full">{t('invoice.generatedVia', { defaultValue: 'Generated via InvoiceGEN' })}</span>
          </div>
        </div>
      </div>
    ),
    corporate: (
      <div className="bg-white min-h-[1123px] p-0 font-sans text-slate-800">
        <div className="bg-slate-800 text-white p-6 sm:p-12 flex flex-col sm:row justify-between items-start sm:items-center gap-6">
          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl font-black tracking-tighter">{userProfile.companyName}</h1>
            <p className="text-[10px] sm:text-xs text-slate-400 font-bold uppercase tracking-widest">{userProfile.email} • {userProfile.phone}</p>
          </div>
          <div className="text-left sm:text-right">
            <h2 className="text-3xl sm:text-4xl font-black tracking-tighter mb-1">{getDocumentTitle(invoice.type)}</h2>
            <p className="text-sm font-bold opacity-50">{invoice.invoiceNumber}</p>
          </div>
        </div>
        <div className="p-6 sm:p-12 space-y-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-12">
            <div className="p-6 sm:p-8 bg-slate-50 rounded-3xl space-y-4">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400">{t('invoice.recipient', { defaultValue: 'Recipient' })}</h4>
              <p className="text-xl font-black tracking-tight">{invoice.client.name}</p>
              <p className="text-sm text-slate-500 font-medium whitespace-pre-line leading-relaxed">{invoice.client.address}</p>
            </div>
            <div className="p-6 sm:p-8 border border-slate-100 rounded-3xl space-y-4 text-left sm:text-right">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400">{t('invoice.information', { defaultValue: 'Information' })}</h4>
              <div className="space-y-1">
                <p className="text-sm font-bold">{t('invoice.issued', { defaultValue: 'Issued' })}: {format(parseISO(invoice.date), 'dd/MM/yyyy')}</p>
                <p className="text-sm font-bold">{t('invoice.dueDate', { defaultValue: 'Due Date' })}: {format(parseISO(invoice.dueDate), 'dd/MM/yyyy')}</p>
                <p className="text-sm font-black text-blue-600 uppercase tracking-widest">{t(`invoice.status.${invoice.status}`, { defaultValue: invoice.status })}</p>
              </div>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px] sm:min-w-0">
              <thead className="bg-slate-800 text-white">
                <tr>
                  <th className="px-6 py-4 text-left text-[10px] font-black uppercase tracking-widest">{t('invoice.description', { defaultValue: 'Description' })}</th>
                  <th className="px-6 py-4 text-center text-[10px] font-black uppercase tracking-widest">{t('invoice.qty', { defaultValue: 'Qty' })}</th>
                  <th className="px-6 py-4 text-right text-[10px] font-black uppercase tracking-widest">{t('invoice.price', { defaultValue: 'Price' })}</th>
                  <th className="px-6 py-4 text-right text-[10px] font-black uppercase tracking-widest">{t('invoice.total', { defaultValue: 'Total' })}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {invoice.items.map(item => (
                  <tr key={item.id}>
                    <td className="px-6 py-6 font-bold">{item.description}</td>
                    <td className="px-6 py-6 text-center font-bold text-slate-500">{item.quantity}</td>
                    <td className="px-6 py-6 text-right font-bold text-slate-500">{formatCurrency(item.unitPrice)}</td>
                    <td className="px-6 py-6 text-right font-black">{formatCurrency(item.quantity * item.unitPrice)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-end">
            <div className="w-full sm:w-80 bg-slate-50 p-8 rounded-3xl space-y-4">
              <div className="flex justify-between text-sm font-bold text-slate-500">
                <span>{t('invoice.subtotal', { defaultValue: 'Subtotal' })}</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-slate-500">
                <span>{t('invoice.tax', { defaultValue: 'Tax' })} ({invoice.taxRate}%)</span>
                <span>{formatCurrency(tax)}</span>
              </div>
              <div className="flex justify-between text-2xl font-black pt-6 border-t-2 border-slate-200 tracking-tighter">
                <span>{t('invoice.total', { defaultValue: 'Total' })}</span>
                <span className="text-blue-600">{formatCurrency(total)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    modern: (
      <div className="bg-white min-h-[1123px] p-6 sm:p-12 font-sans text-slate-900 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 sm:w-96 h-64 sm:h-96 bg-blue-50 rounded-full -mr-32 sm:-mr-48 -mt-32 sm:-mt-48 opacity-50 blur-3xl" />
        <div className="relative z-10 space-y-12 sm:space-y-16">
          <div className="flex flex-col sm:flex-row justify-between items-start gap-8">
            <div className="space-y-6">
              <div className="w-16 h-16 bg-blue-600 rounded-3xl flex items-center justify-center text-white font-black text-3xl shadow-2xl shadow-blue-200">
                {userProfile.companyName.charAt(0)}
              </div>
              <div className="space-y-1">
                <h1 className="text-2xl sm:text-3xl font-black tracking-tighter">{userProfile.companyName}</h1>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600">{userProfile.email}</p>
              </div>
            </div>
            <div className="text-left sm:text-right space-y-4">
              <h2 className="text-5xl sm:text-7xl font-black text-slate-100 tracking-tighter leading-none">
                {invoice.type === 'invoice' ? 'INV' : 
                 invoice.type === 'credit_note' ? 'CRD' : 
                 invoice.type === 'quote' ? 'DEV' : 'BON'}
              </h2>
              <div className="space-y-1">
                <p className="text-lg sm:text-xl font-black tracking-tighter">{invoice.invoiceNumber}</p>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{t('invoice.issuedOn', { defaultValue: 'Issued on' })} {format(parseISO(invoice.date), 'dd MMM yyyy')}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-12">
            <div className="space-y-4">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-300">{t('invoice.billedTo', { defaultValue: 'Billed to' })}</h4>
              <div className="space-y-2">
                <p className="text-xl sm:text-2xl font-black tracking-tight">{invoice.client.name}</p>
                <p className="text-sm text-slate-500 font-medium leading-relaxed">{invoice.client.address}</p>
              </div>
            </div>
            <div className="text-left sm:text-right space-y-4">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-300">{t('invoice.dueDate', { defaultValue: 'Due Date' })}</h4>
              <p className="text-xl sm:text-2xl font-black tracking-tight text-rose-500">{format(parseISO(invoice.dueDate), 'dd MMM yyyy')}</p>
              <div className="inline-block px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full text-[10px] font-black uppercase tracking-widest">
                {t(`invoice.status.${invoice.status}`, { defaultValue: invoice.status })}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-300">{t('invoice.itemsServices', { defaultValue: 'Items & Services' })}</h4>
            <div className="space-y-4">
              {invoice.items.map(item => (
                <div key={item.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-6 sm:p-8 bg-slate-50 rounded-[32px] group hover:bg-blue-50 transition-colors gap-4">
                  <div className="space-y-1">
                    <p className="font-black text-base sm:text-lg tracking-tight">{item.description}</p>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{item.quantity} x {formatCurrency(item.unitPrice)}</p>
                  </div>
                  <p className="text-xl sm:text-2xl font-black tracking-tighter">{formatCurrency(item.quantity * item.unitPrice)}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end pt-12">
            <div className="w-full sm:w-80 space-y-6">
              <div className="space-y-3">
                <div className="flex justify-between text-sm font-bold text-slate-400">
                  <span>{t('invoice.subtotal', { defaultValue: 'Subtotal' })}</span>
                  <span className="text-slate-900">{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-slate-400">
                  <span>{t('invoice.tax', { defaultValue: 'Tax' })} ({invoice.taxRate}%)</span>
                  <span className="text-slate-900">{formatCurrency(tax)}</span>
                </div>
              </div>
              <div className="flex justify-between text-3xl sm:text-4xl font-black tracking-tighter pt-8 border-t-8 border-blue-600">
                <span>{t('invoice.total', { defaultValue: 'Total' })}</span>
                <span className="text-blue-600">{formatCurrency(total)}</span>
              </div>
            </div>
          </div>

          <div className="mt-auto pt-24 space-y-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-12">
              <div className="p-8 bg-slate-900 rounded-[32px] text-white space-y-4">
                <h4 className="text-[10px] font-black uppercase tracking-widest opacity-50">{t('invoice.payment', { defaultValue: 'Payment' })}</h4>
                <p className="text-xs font-mono font-bold leading-relaxed break-all">{userProfile.rib}</p>
              </div>
              <div className="p-8 border-2 border-slate-100 rounded-[32px] space-y-4">
                <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-300">{t('invoice.notes', { defaultValue: 'Notes' })}</h4>
                <p className="text-xs text-slate-500 font-medium leading-relaxed">{invoice.notes || t('invoice.noNotes', { defaultValue: 'No notes.' })}</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] font-black uppercase tracking-widest text-slate-300">
              <p className="text-center sm:text-left">SIRET: {userProfile.siret} • {userProfile.address}</p>
              <p className="bg-blue-600 text-white px-4 py-1.5 rounded-full">InvoiceGEN</p>
            </div>
          </div>
        </div>
      </div>
    ),
    credit_note: (
      <div className="bg-white min-h-[1123px] p-0 font-sans text-blue-900 border-4 border-blue-900">
        <div className="bg-white text-blue-900 p-6 sm:p-12 flex flex-col sm:flex-row justify-between items-start sm:items-center border-b-4 border-blue-900 gap-6">
          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl font-black tracking-tighter uppercase">{userProfile.companyName}</h1>
            <p className="text-[10px] sm:text-xs text-blue-400 font-bold uppercase tracking-widest">{userProfile.email} • {userProfile.phone}</p>
          </div>
          <div className="text-left sm:text-right">
            <h2 className="text-3xl sm:text-4xl font-black tracking-tighter mb-1">{getDocumentTitle(invoice.type)}</h2>
            <p className="text-sm font-bold opacity-50">{invoice.invoiceNumber}</p>
          </div>
        </div>
        <div className="p-6 sm:p-12 space-y-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-12">
            <div className="p-6 sm:p-8 bg-blue-50 rounded-3xl space-y-4">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-blue-400">{t('invoice.refundedTo', { defaultValue: 'Refunded to' })}</h4>
              <p className="text-xl font-black tracking-tight">{invoice.client.name}</p>
              <p className="text-sm text-blue-700 font-medium whitespace-pre-line leading-relaxed">{invoice.client.address}</p>
            </div>
            <div className="p-6 sm:p-8 border border-blue-100 rounded-3xl space-y-4 text-left sm:text-right">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-blue-400">{t('invoice.refundInfo', { defaultValue: 'Refund Information' })}</h4>
              <div className="space-y-1">
                <p className="text-sm font-bold">{t('invoice.creditNoteDate', { defaultValue: 'Credit Note Date' })}: {format(parseISO(invoice.date), 'dd/MM/yyyy')}</p>
                <p className="text-sm font-bold">{t('invoice.dueDate', { defaultValue: 'Due Date' })}: {format(parseISO(invoice.dueDate), 'dd/MM/yyyy')}</p>
                <p className="text-sm font-black text-rose-600 uppercase tracking-widest">{t(`invoice.status.${invoice.status}`, { defaultValue: invoice.status })}</p>
              </div>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px] sm:min-w-0">
              <thead className="bg-blue-900 text-white">
                <tr>
                  <th className="px-6 py-4 text-left text-[10px] font-black uppercase tracking-widest">{t('invoice.cancellationDescription', { defaultValue: 'Cancellation Description' })}</th>
                  <th className="px-6 py-4 text-center text-[10px] font-black uppercase tracking-widest">{t('invoice.qty', { defaultValue: 'Qty' })}</th>
                  <th className="px-6 py-4 text-right text-[10px] font-black uppercase tracking-widest">{t('invoice.price', { defaultValue: 'Price' })}</th>
                  <th className="px-6 py-4 text-right text-[10px] font-black uppercase tracking-widest">{t('invoice.total', { defaultValue: 'Total' })}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-blue-50">
                {invoice.items.map(item => (
                  <tr key={item.id}>
                    <td className="px-6 py-6 font-bold">{item.description}</td>
                    <td className="px-6 py-6 text-center font-bold text-blue-500">{item.quantity}</td>
                    <td className="px-6 py-6 text-right font-bold text-blue-500">{formatCurrency(item.unitPrice)}</td>
                    <td className="px-6 py-6 text-right font-black">{formatCurrency(item.quantity * item.unitPrice)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-end">
            <div className="w-full sm:w-80 bg-blue-50 p-8 rounded-3xl text-left sm:text-right space-y-4">
              <div className="flex justify-between text-sm font-bold text-blue-500">
                <span>{t('invoice.cancelledSubtotal', { defaultValue: 'Cancelled Subtotal' })}</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-blue-500">
                <span>{t('invoice.tax', { defaultValue: 'Tax' })} ({invoice.taxRate}%)</span>
                <span>{formatCurrency(tax)}</span>
              </div>
              <div className="flex justify-between text-2xl font-black pt-6 border-t-2 border-blue-200 tracking-tighter">
                <span>{t('invoice.totalToRefund', { defaultValue: 'Total to refund' })}</span>
                <span className="text-rose-600">{formatCurrency(total)}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-auto p-6 sm:p-12 border-t border-blue-100 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] font-black uppercase tracking-widest text-blue-300">
          <p className="text-center sm:text-left">SIRET: {userProfile.siret} • {userProfile.address}</p>
          <p className="bg-blue-900 text-white px-4 py-1.5 rounded-full">{t('invoice.officialCreditNote', { defaultValue: 'Official Credit Note' })}</p>
        </div>
      </div>
    )
  };

  return (
    <div id={id} className="w-full max-w-[800px] mx-auto shadow-2xl">
      {templates[invoice.template]}
    </div>
  );
};
