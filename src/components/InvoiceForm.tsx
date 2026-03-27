import React from 'react';
import { Plus, Trash2, Save, Printer, ArrowLeft, Layout, Type as TypeIcon, Briefcase } from 'lucide-react';
import { Invoice, InvoiceItem, Client, TemplateType, DocumentType } from '../types';
import { formatCurrency, cn } from '../lib/utils';
import { AIInput } from './AIInput';
import { useTranslation } from 'react-i18next';

interface Props {
  invoice: Invoice;
  onSave: (invoice: Invoice) => void;
  onPreview: () => void;
  onBack: () => void;
  onChange: (invoice: Invoice) => void;
}

export const InvoiceForm: React.FC<Props> = ({ invoice, onSave, onPreview, onBack, onChange }) => {
  const { t } = useTranslation();
  const subtotal = invoice.items.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);
  const tax = subtotal * (invoice.taxRate / 100);
  const total = subtotal + tax - invoice.discount;

  const handleAIUpdate = (data: { client: Partial<Client>, items: InvoiceItem[] }) => {
    onChange({
      ...invoice,
      client: { ...invoice.client, ...data.client },
      items: data.items.length > 0 ? data.items : invoice.items
    });
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <button onClick={onBack} className="flex items-center gap-2 text-slate-500 hover:text-slate-800 font-bold text-sm transition-colors">
          <ArrowLeft size={20} /> {t('common.back', { defaultValue: 'Back' })}
        </button>
        <div className="flex flex-wrap gap-4 w-full sm:w-auto">
          <button onClick={onPreview} className="flex-1 sm:flex-none px-6 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold flex items-center justify-center gap-2 hover:bg-slate-50 transition-all shadow-sm">
            <Printer size={18} /> {t('invoice.previewPdf', { defaultValue: 'PDF Preview' })}
          </button>
          <button onClick={() => onSave(invoice)} className="flex-1 sm:flex-none px-8 py-2 bg-blue-600 text-white rounded-xl text-sm font-black flex items-center justify-center gap-2 hover:bg-blue-700 transition-all shadow-lg shadow-blue-100">
            <Save size={18} /> {t('common.save', { defaultValue: 'Save' })}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white rounded-3xl border border-slate-100 shadow-xl p-4 lg:p-8 space-y-12">
            <section className="space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                  <Layout size={14} /> {t('invoice.details', { defaultValue: 'Invoice Details' })}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {(['minimalist', 'corporate', 'modern', 'credit_note'] as TemplateType[]).map(t_type => (
                    <button 
                      key={t_type}
                      onClick={() => onChange({ ...invoice, template: t_type })}
                      className={cn(
                        "px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all",
                        invoice.template === t_type ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                      )}
                    >
                      {t(`invoice.templates.${t_type}`, { defaultValue: t_type.replace('_', ' ') })}
                    </button>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <InputGroup 
                  label={t('invoice.documentType', { defaultValue: 'Document Type' })} 
                  type="select" 
                  value={invoice.type} 
                  options={[
                    { value: 'invoice', label: t('invoice.types.invoice', { defaultValue: 'Invoice' }) },
                    { value: 'credit_note', label: t('invoice.types.credit_note', { defaultValue: 'Credit Note' }) },
                    { value: 'quote', label: t('invoice.types.quote', { defaultValue: 'Quote' }) },
                    { value: 'purchase_order', label: t('invoice.types.purchase_order', { defaultValue: 'Purchase Order' }) }
                  ]} 
                  onChange={v => onChange({ ...invoice, type: v as DocumentType })} 
                />
                <InputGroup label={t('invoice.number', { defaultValue: 'Number' })} value={invoice.invoiceNumber} onChange={v => onChange({ ...invoice, invoiceNumber: v })} />
                <InputGroup 
                  label={t('invoice.statusLabel', { defaultValue: 'Status' })} 
                  type="select" 
                  value={invoice.status} 
                  options={[
                    { value: 'draft', label: t('invoice.status.draft', { defaultValue: 'Draft' }) },
                    { value: 'sent', label: t('invoice.status.sent', { defaultValue: 'Sent' }) },
                    { value: 'paid', label: t('invoice.status.paid', { defaultValue: 'Paid' }) },
                    { value: 'overdue', label: t('invoice.status.overdue', { defaultValue: 'Overdue' }) }
                  ]} 
                  onChange={v => onChange({ ...invoice, status: v as any })} 
                />
                <InputGroup label={t('invoice.issueDate', { defaultValue: 'Issue Date' })} type="date" value={invoice.date} onChange={v => onChange({ ...invoice, date: v })} />
                <InputGroup label={t('invoice.dueDate', { defaultValue: 'Due Date' })} type="date" value={invoice.dueDate} onChange={v => onChange({ ...invoice, dueDate: v })} />
              </div>
            </section>

            <section className="space-y-6">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                <Briefcase size={14} /> {t('invoice.clientInfo', { defaultValue: 'Client Information' })}
              </h4>
              <div className="space-y-6">
                <InputGroup label={t('invoice.clientName', { defaultValue: 'Client Name' })} value={invoice.client.name} onChange={v => onChange({ ...invoice, client: { ...invoice.client, name: v } })} />
                <InputGroup label={t('invoice.clientEmail', { defaultValue: 'Email' })} value={invoice.client.email} onChange={v => onChange({ ...invoice, client: { ...invoice.client, email: v } })} />
                <InputGroup label={t('invoice.billingAddress', { defaultValue: 'Billing Address' })} isTextArea value={invoice.client.address} onChange={v => onChange({ ...invoice, client: { ...invoice.client, address: v } })} />
              </div>
            </section>

            <section className="space-y-6">
              <div className="flex items-center justify-between">
                <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                  <TypeIcon size={14} /> {t('invoice.itemsServices', { defaultValue: 'Items & Services' })}
                </h4>
                <button 
                  onClick={() => onChange({ ...invoice, items: [...invoice.items, { id: Math.random().toString(), description: '', quantity: 1, unitPrice: 0 }] })}
                  className="text-blue-600 text-[10px] font-black uppercase tracking-widest flex items-center gap-1 hover:underline"
                >
                  <Plus size={14} /> {t('common.add', { defaultValue: 'Add' })}
                </button>
              </div>
              <div className="space-y-4">
                {invoice.items.map((item, idx) => (
                  <div key={item.id} className="p-4 lg:p-6 bg-slate-50 rounded-2xl space-y-4 relative group">
                    <button 
                      onClick={() => onChange({ ...invoice, items: invoice.items.filter((_, i) => i !== idx) })}
                      className="absolute top-4 right-4 p-2 text-slate-300 hover:text-rose-500 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                    <input 
                      type="text" 
                      placeholder={t('invoice.itemDescriptionPlaceholder', { defaultValue: "Item description..." })}
                      className="w-full bg-transparent border-none p-0 font-black text-base lg:text-lg tracking-tight focus:ring-0 placeholder:text-slate-300"
                      value={item.description}
                      onChange={(e) => {
                        const newItems = [...invoice.items];
                        newItems[idx].description = e.target.value;
                        onChange({ ...invoice, items: newItems });
                      }}
                    />
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 lg:gap-6">
                      <div className="col-span-2 sm:col-span-2 space-y-1">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">{t('invoice.quantity', { defaultValue: 'Quantity' })}</label>
                        <input 
                          type="number" 
                          className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2 text-sm font-bold"
                          value={item.quantity}
                          onChange={(e) => {
                            const newItems = [...invoice.items];
                            newItems[idx].quantity = Number(e.target.value);
                            onChange({ ...invoice, items: newItems });
                          }}
                        />
                      </div>
                      <div className="col-span-2 sm:col-span-1 space-y-1">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">{t('invoice.unitPrice', { defaultValue: 'Unit Price' })}</label>
                        <input 
                          type="number" 
                          className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2 text-sm font-bold"
                          value={item.unitPrice}
                          onChange={(e) => {
                            const newItems = [...invoice.items];
                            newItems[idx].unitPrice = Number(e.target.value);
                            onChange({ ...invoice, items: newItems });
                          }}
                        />
                      </div>
                      <div className="col-span-2 sm:col-span-1 space-y-1">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">{t('invoice.total', { defaultValue: 'Total' })}</label>
                        <div className="px-4 py-2 text-sm font-black text-blue-600 bg-blue-50/50 rounded-xl">
                          {formatCurrency(item.quantity * item.unitPrice)}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>

        <div className="space-y-8">
          <AIInput onDataExtracted={handleAIUpdate} />
          
          <div className="bg-white rounded-3xl border border-slate-100 shadow-xl p-8 space-y-6">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400">{t('invoice.financialSummary', { defaultValue: 'Financial Summary' })}</h4>
            <div className="space-y-4">
              <SummaryRow label={t('invoice.subtotal', { defaultValue: 'Subtotal' })} value={formatCurrency(subtotal)} />
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-slate-400 font-bold">{t('invoice.taxRate', { defaultValue: 'Tax (%)' })}</span>
                  <input 
                    type="number" 
                    className="w-16 bg-slate-50 border-none rounded-lg px-2 py-1 text-xs font-black"
                    value={invoice.taxRate}
                    onChange={(e) => onChange({ ...invoice, taxRate: Number(e.target.value) })}
                  />
                </div>
                <span className="font-black">{formatCurrency(tax)}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-slate-400 font-bold">{t('invoice.discountLabel', { defaultValue: 'Discount ($)' })}</span>
                  <input 
                    type="number" 
                    className="w-16 bg-slate-50 border-none rounded-lg px-2 py-1 text-xs font-black"
                    value={invoice.discount}
                    onChange={(e) => onChange({ ...invoice, discount: Number(e.target.value) })}
                  />
                </div>
                <span className="font-black text-rose-500">-{formatCurrency(invoice.discount)}</span>
              </div>
              <div className="flex justify-between text-2xl font-black pt-6 border-t-4 border-blue-600 tracking-tighter">
                <span>{t('invoice.total', { defaultValue: 'Total' })}</span>
                <span className="text-blue-600">{formatCurrency(total)}</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-slate-100 shadow-xl p-8 space-y-4">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400">{t('invoice.notesMentions', { defaultValue: 'Notes & Mentions' })}</h4>
            <textarea 
              rows={4}
              placeholder={t('invoice.notesPlaceholder', { defaultValue: "Additional notes or legal mentions..." })}
              className="w-full bg-slate-50 border-none rounded-2xl p-4 text-sm focus:ring-2 focus:ring-blue-500 resize-none font-medium"
              value={invoice.notes}
              onChange={(e) => onChange({ ...invoice, notes: e.target.value })}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

function InputGroup({ label, value, onChange, type = 'text', options = [], isTextArea = false }: { label: string, value: any, onChange: (v: string) => void, type?: string, options?: (string | { value: string, label: string })[], isTextArea?: boolean }) {
  return (
    <div className="space-y-1">
      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">{label}</label>
      {isTextArea ? (
        <textarea 
          className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 text-sm font-bold focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all resize-none shadow-sm focus:shadow-blue-100"
          rows={3}
          value={value}
          onChange={e => onChange(e.target.value)}
        />
      ) : type === 'select' ? (
        <select 
          className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 text-sm font-bold focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all shadow-sm focus:shadow-blue-100"
          value={value}
          onChange={e => onChange(e.target.value)}
        >
          {options.map(o => {
            const val = typeof o === 'string' ? o : o.value;
            const lab = typeof o === 'string' ? o : o.label;
            return <option key={val} value={val}>{lab}</option>;
          })}
        </select>
      ) : (
        <input 
          type={type}
          className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 text-sm font-bold focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all shadow-sm focus:shadow-blue-100"
          value={value}
          onChange={e => onChange(e.target.value)}
        />
      )}
    </div>
  );
}

function SummaryRow({ label, value }: { label: string, value: string }) {
  return (
    <div className="flex justify-between text-sm">
      <span className="text-slate-400 font-bold">{label}</span>
      <span className="font-black">{value}</span>
    </div>
  );
}
