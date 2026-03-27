import React from 'react';
import { BookOpen, ChevronRight, Star, ArrowRight } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { useTranslation } from 'react-i18next';

export const Blog: React.FC = () => {
  const { t } = useTranslation();

  const ARTICLE_CONTENT = t('blog.articleContent', { defaultValue: `
# Mastering Billing for SMEs/Freelancers (2026)

Billing is not just a legal obligation, it's a reflection of your professionalism. In 2026, with the generalization of electronic invoicing, it is crucial to respect certain standards.

## 1. Mandatory Mentions
Each invoice must include:
- Your SIRET number and address.
- Complete client details.
- A unique and chronological invoice number.
- Details of services (quantity, unit price, excl. tax, VAT).

## 2. Design at the Service of Payment
A clear and aesthetic invoice is paid **20% faster**. Why? Because it inspires confidence and makes payment information easy to read.

## 3. Automation with AI
Using AI to extract data from your emails or notes saves up to **5 hours per month**. This is time you can reinvest in your core business.

---
*Guide written by the InvoiceGen Pro team.*
` });

  return (
    <div className="max-w-4xl mx-auto space-y-16 pt-32 pb-24 px-6">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full text-[10px] font-black uppercase tracking-widest">
          <Star size={12} /> {t('blog.expertResource', { defaultValue: "Expert Resource" })}
        </div>
        <h2 className="text-5xl font-black tracking-tighter leading-tight">{t('blog.heroTitle', { defaultValue: "The Ultimate Guide to Modern Billing" })}</h2>
      </div>

      <div className="bg-white rounded-[48px] border border-slate-100 shadow-2xl p-16 space-y-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full -mr-32 -mt-32 blur-3xl opacity-50" />
        <div className="prose prose-slate prose-lg max-w-none relative z-10">
          <ReactMarkdown>{ARTICLE_CONTENT}</ReactMarkdown>
        </div>
        
        <div className="pt-12 border-t border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center text-white font-black">IG</div>
            <div>
              <p className="text-sm font-black">{t('blog.authorName', { defaultValue: "InvoiceGen Team" })}</p>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">{t('blog.authorRole', { defaultValue: "Fintech Expert" })}</p>
            </div>
          </div>
          <button className="flex items-center gap-2 text-blue-600 font-black text-sm hover:gap-4 transition-all uppercase tracking-widest">
            {t('blog.shareArticle', { defaultValue: "Share the article" })} <ArrowRight size={18} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-20">
        <ResourceCard 
          title={t('blog.card1Title', { defaultValue: "2026 Compliance" })} 
          desc={t('blog.card1Desc', { defaultValue: "Everything you need to know about mandatory electronic invoicing." })} 
        />
        <ResourceCard 
          title={t('blog.card2Title', { defaultValue: "Tax Optimization" })} 
          desc={t('blog.card2Desc', { defaultValue: "How to manage your VAT without stress." })} 
        />
        <ResourceCard 
          title={t('blog.card3Title', { defaultValue: "Client Reminders" })} 
          desc={t('blog.card3Desc', { defaultValue: "Email templates to get paid on time." })} 
        />
      </div>
    </div>
  );
};

function ResourceCard({ title, desc }: { title: string, desc: string }) {
  return (
    <div className="p-8 bg-white rounded-[32px] border border-slate-100 shadow-xl hover:shadow-2xl transition-all group cursor-pointer">
      <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
        <BookOpen size={20} />
      </div>
      <h4 className="text-lg font-black tracking-tight mb-2">{title}</h4>
      <p className="text-sm text-slate-400 font-medium leading-relaxed mb-6">{desc}</p>
      <ChevronRight size={20} className="text-slate-200 group-hover:text-blue-600 transition-colors" />
    </div>
  );
}
