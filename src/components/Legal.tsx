import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Scale, FileText, Lock } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const Legal: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-white pt-32 pb-24 px-6">
      <div className="max-w-4xl mx-auto space-y-24">
        {/* Header */}
        <div className="text-center space-y-8">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl lg:text-7xl font-black tracking-tighter text-slate-900 leading-none"
          >
            {t('legal.title', { defaultValue: "Legal Mentions." })}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="max-w-2xl mx-auto text-xl text-slate-500 font-bold leading-relaxed"
          >
            {t('legal.subtitle', { defaultValue: "Transparency, security and compliance. Everything you need to know about InvoiceGen Pro." })}
          </motion.p>
        </div>

        {/* Content */}
        <div className="space-y-16">
          <LegalSection 
            icon={<Scale className="text-blue-600" />}
            title={t('legal.cguTitle', { defaultValue: "General Terms of Use (GTU)" })}
            content={t('legal.cguContent', { defaultValue: `
              InvoiceGen Pro is an online billing service. By using our platform, you agree to the following conditions:
              
              1. Use of the service: You are responsible for the accuracy of the data entered in your invoices.
              2. Intellectual property: The design, templates and code of InvoiceGen Pro are protected by copyright.
              3. Liability: InvoiceGen Pro cannot be held responsible for fiscal or legal errors resulting from misuse of the service.
              4. Modification of conditions: We reserve the right to modify these GTU at any time.
            ` })}
          />

          <LegalSection 
            icon={<Lock className="text-indigo-600" />}
            title={t('legal.privacyTitle', { defaultValue: "Privacy Policy (GDPR)" })}
            content={t('legal.privacyContent', { defaultValue: `
              Your privacy is our priority. Here is how we treat your data:
              
              1. Data collection: We only collect the data necessary for the proper functioning of the service (email, billing data).
              2. Storage: Your data is stored securely and is never resold to third parties.
              3. User rights: In accordance with the GDPR, you have a right of access, rectification and deletion of your data.
              4. Cookies: We use technical cookies to improve your user experience.
            ` })}
          />

          <LegalSection 
            icon={<ShieldCheck className="text-emerald-600" />}
            title={t('legal.mentionsTitle', { defaultValue: "Legal Mentions" })}
            content={t('legal.mentionsContent', { defaultValue: `
              Site publisher: InvoiceGen Pro SAS with a capital of €10,000
              Head office: 123 Avenue de la Facturation, 75000 Paris, France
              Registration: RCS Paris B 123 456 789
              Publication Director: Jean Facture
              Hosting: Cloud Run (Google Cloud Platform)
              Contact: legal@invoicegen.pro
            ` })}
          />
        </div>

        {/* Footer Note */}
        <div className="bg-slate-50 p-12 rounded-[48px] border border-slate-100 text-center space-y-4">
          <p className="text-slate-500 font-bold text-sm">
            {t('legal.lastUpdate', { defaultValue: "Last update: March 26, 2026. For any questions, contact our legal team." })}
          </p>
        </div>
      </div>
    </div>
  );
};

function LegalSection({ icon, title, content }: { icon: React.ReactNode, title: string, content: string }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="space-y-8"
    >
      <div className="flex items-center gap-6">
        <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-2xl shadow-sm">
          {icon}
        </div>
        <h2 className="text-3xl font-black tracking-tight text-slate-900">{title}</h2>
      </div>
      <div className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-sm">
        <p className="text-slate-500 font-bold leading-relaxed whitespace-pre-line text-lg">
          {content}
        </p>
      </div>
    </motion.div>
  );
}
