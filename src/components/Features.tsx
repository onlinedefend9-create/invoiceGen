import React from 'react';
import { motion } from 'motion/react';
import { 
  Cpu, 
  Layout, 
  ShieldCheck, 
  BarChart3, 
  Globe, 
  Zap, 
  Mail, 
  Download, 
  FileText, 
  Settings, 
  Users, 
  Printer,
  CheckCircle2
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const Features: React.FC = () => {
  const { t } = useTranslation();

  const features = [
    {
      icon: <Cpu className="text-blue-600" />,
      title: t('features.feature1Title', { defaultValue: "Magic Fill AI" }),
      description: t('features.feature1Desc', { defaultValue: "Our cutting-edge AI analyzes your raw text to automatically extract clients, items, and prices. No more tedious manual entry." }),
      benefits: [
        t('features.feature1Benefit1', { defaultValue: "80% time saving" }),
        t('features.feature1Benefit2', { defaultValue: "Reduced entry errors" }),
        t('features.feature1Benefit3', { defaultValue: "Multi-language support" })
      ]
    },
    {
      icon: <Layout className="text-indigo-600" />,
      title: t('features.feature2Title', { defaultValue: "WYSIWYG Templates" }),
      description: t('features.feature2Desc', { defaultValue: "Visualize your changes in real-time. Choose from our Minimalist, Corporate, and Modern templates to reflect your brand image." }),
      benefits: [
        t('features.feature2Benefit1', { defaultValue: "Instant preview" }),
        t('features.feature2Benefit2', { defaultValue: "Full customization" }),
        t('features.feature2Benefit3', { defaultValue: "High-quality PDF export" })
      ]
    },
    {
      icon: <ShieldCheck className="text-emerald-600" />,
      title: t('features.feature3Title', { defaultValue: "2026 Compliance" }),
      description: t('features.feature3Desc', { defaultValue: "We automatically update your invoices to comply with the latest tax and legal standards in force." }),
      benefits: [
        t('features.feature3Benefit1', { defaultValue: "Mandatory legal mentions" }),
        t('features.feature3Benefit2', { defaultValue: "Accurate VAT calculation" }),
        t('features.feature3Benefit3', { defaultValue: "Data security" })
      ]
    },
    {
      icon: <BarChart3 className="text-rose-600" />,
      title: t('features.feature4Title', { defaultValue: "Analytics & Reporting" }),
      description: t('features.feature4Desc', { defaultValue: "Track your company's financial health with clear dashboards and real-time revenue charts." }),
      benefits: [
        t('features.feature4Benefit1', { defaultValue: "Unpaid invoice tracking" }),
        t('features.feature4Benefit2', { defaultValue: "Revenue forecasts" }),
        t('features.feature4Benefit3', { defaultValue: "Accounting data export" })
      ]
    },
    {
      icon: <Globe className="text-sky-600" />,
      title: t('features.feature5Title', { defaultValue: "Multi-Currency & Languages" }),
      description: t('features.feature5Desc', { defaultValue: "Invoice your clients anywhere in the world. InvoiceGEN handles currency conversions and international formats." }),
      benefits: [
        t('features.feature5Benefit1', { defaultValue: "Over 150 currencies" }),
        t('features.feature5Benefit2', { defaultValue: "Automatic translations" }),
        t('features.feature5Benefit3', { defaultValue: "Local date formats" })
      ]
    },
    {
      icon: <Zap className="text-amber-600" />,
      title: t('features.feature6Title', { defaultValue: "Automation" }),
      description: t('features.feature6Desc', { defaultValue: "Automate your payment reminders and recurring invoices to never forget a collection again." }),
      benefits: [
        t('features.feature6Benefit1', { defaultValue: "Automatic reminders" }),
        t('features.feature6Benefit2', { defaultValue: "Recurring billing" }),
        t('features.feature6Benefit3', { defaultValue: "Webhooks & API" })
      ]
    }
  ];

  return (
    <div className="bg-white pt-32 pb-24 px-6">
      <div className="max-w-7xl mx-auto space-y-32">
        {/* Header */}
        <div className="text-center space-y-8">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl lg:text-7xl font-black tracking-tighter text-slate-900 leading-none"
          >
            {t('features.heroTitle', { defaultValue: "Features designed for you." })}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="max-w-2xl mx-auto text-xl text-slate-500 font-bold leading-relaxed"
          >
            {t('features.heroSubtitle', { defaultValue: "InvoiceGEN is not just an invoice generator. It's your personal financial assistant, designed to simplify every step of your billing." })}
          </motion.p>
        </div>

        {/* Features List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-slate-50 p-12 rounded-[48px] border border-slate-100 space-y-8 hover:bg-white hover:shadow-2xl hover:-translate-y-2 transition-all group"
            >
              <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center text-3xl shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-all">
                {feature.icon}
              </div>
              <div className="space-y-4">
                <h3 className="text-3xl font-black tracking-tight text-slate-900">{feature.title}</h3>
                <p className="text-slate-500 font-bold leading-relaxed">{feature.description}</p>
              </div>
              <ul className="space-y-3">
                {feature.benefits.map((benefit, bIndex) => (
                  <li key={bIndex} className="flex items-center gap-3 text-sm font-black text-slate-700">
                    <CheckCircle2 size={18} className="text-blue-600" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Comparison Section */}
        <div className="bg-slate-900 rounded-[64px] p-12 lg:p-24 space-y-16 text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px]" />
          
          <div className="text-center space-y-6 relative z-10">
            <h2 className="text-4xl lg:text-6xl font-black tracking-tighter leading-none">
              {t('features.whyChooseTitle', { defaultValue: "Why choose InvoiceGEN?" })}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
            <ComparisonItem 
              title={t('features.simplicityTitle', { defaultValue: "Simplicity" })}
              description={t('features.simplicityDesc', { defaultValue: "No complex configuration. Create your first invoice in less than 60 seconds." })}
            />
            <ComparisonItem 
              title={t('features.intelligenceTitle', { defaultValue: "Intelligence" })}
              description={t('features.intelligenceDesc', { defaultValue: "Built-in AI eliminates repetitive tasks and reduces human errors." })}
            />
            <ComparisonItem 
              title={t('features.trustTitle', { defaultValue: "Trust" })}
              description={t('features.trustDesc', { defaultValue: "Used by over 10,000 entrepreneurs for its reliability and compliance." })}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

function ComparisonItem({ title, description }: { title: string, description: string }) {
  return (
    <div className="space-y-4">
      <div className="h-1 w-12 bg-blue-600 rounded-full" />
      <h4 className="text-2xl font-black tracking-tight">{title}</h4>
      <p className="text-slate-400 font-bold text-sm leading-relaxed">{description}</p>
    </div>
  );
}
