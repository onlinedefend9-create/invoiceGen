import React from 'react';
import { motion } from 'motion/react';
import { 
  ArrowRight, 
  CheckCircle2, 
  Zap, 
  ShieldCheck, 
  Globe, 
  Cpu, 
  BarChart3, 
  Layout, 
  FileText,
  Mail,
  Download
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { cn } from '../lib/utils';

interface Props {
  onStart: () => void;
  onNavigate: (view: any) => void;
}

export const LandingPage: React.FC<Props> = ({ onStart, onNavigate }) => {
  const { t } = useTranslation();

  return (
    <div className="bg-white overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 lg:pt-48 lg:pb-32 px-6">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full -z-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-50 -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-100 rounded-full blur-3xl opacity-50 translate-x-1/2 translate-y-1/2" />
        </div>

        <div className="max-w-7xl mx-auto text-center space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-xs font-black uppercase tracking-widest border border-blue-100"
          >
            <Zap size={14} className="fill-blue-600" />
            {t('landing.newFeature', { defaultValue: 'Magic Fill' })}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl lg:text-8xl font-black tracking-tighter text-slate-900 leading-[0.9]"
          >
            {t('landing.heroTitle', { defaultValue: 'Invoice in seconds, not hours.' })}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl mx-auto text-xl text-slate-500 font-bold leading-relaxed"
          >
            {t('landing.heroSubtitle', { defaultValue: 'Power your business with the fastest AI billing on the market. 2026 compliant and 100% ' })}
            <motion.span
              animate={{ 
                scale: [1, 1.1, 1],
                color: ['#3b82f6', '#2563eb', '#3b82f6'],
                textShadow: [
                  '0 0 0px rgba(59, 130, 246, 0)',
                  '0 0 10px rgba(59, 130, 246, 0.5)',
                  '0 0 0px rgba(59, 130, 246, 0)'
                ]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="inline-block text-blue-600 font-black"
            >
              {t('landing.heroFree', { defaultValue: 'FREE' })}
            </motion.span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8"
          >
            <button 
              onClick={onStart}
              className="w-full sm:w-auto px-10 py-5 bg-blue-600 text-white rounded-2xl font-black text-lg hover:bg-blue-700 transition-all shadow-2xl shadow-blue-100 flex items-center justify-center gap-3 group"
            >
              {t('landing.startFree', { defaultValue: 'Start for free' })}
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={() => onNavigate('features')}
              className="w-full sm:w-auto px-10 py-5 bg-white border-2 border-slate-100 text-slate-900 rounded-2xl font-black text-lg hover:bg-slate-50 transition-all"
            >
              {t('landing.viewFeatures', { defaultValue: 'View Features' })}
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="pt-24 relative"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent z-10" />
            <div className="bg-slate-900 rounded-[40px] p-4 shadow-2xl border border-slate-800 overflow-hidden">
              <img 
                src="https://picsum.photos/seed/dashboard/1920/1080" 
                alt="App Dashboard" 
                className="rounded-[32px] w-full opacity-90"
                referrerPolicy="no-referrer"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-32 bg-slate-50 px-6">
        <div className="max-w-7xl mx-auto space-y-24">
          <div className="text-center space-y-6">
            <h2 className="text-4xl lg:text-6xl font-black tracking-tighter text-slate-900 leading-none">
              {t('landing.featuresTitle', { defaultValue: 'Everything you need to manage your business.' })}
            </h2>
            <p className="max-w-xl mx-auto text-slate-500 font-bold">
              {t('landing.featuresSubtitle', { defaultValue: 'Powerful tools designed for simplicity, compliance, and growth.' })}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Cpu className="text-blue-600" />}
              title={t('landing.feature1Title', { defaultValue: 'Magic Fill AI' })}
              description={t('landing.feature1Desc', { defaultValue: 'Paste your raw data and let our AI automatically extract clients and items.' })}
            />
            <FeatureCard 
              icon={<Layout className="text-indigo-600" />}
              title={t('landing.feature2Title', { defaultValue: 'WYSIWYG Templates' })}
              description={t('landing.feature2Desc', { defaultValue: 'Customize your invoices in real-time with our Minimalist, Corporate, and Modern templates.' })}
            />
            <FeatureCard 
              icon={<ShieldCheck className="text-emerald-600" />}
              title={t('landing.feature3Title', { defaultValue: '2026 Compliance' })}
              description={t('landing.feature3Desc', { defaultValue: 'All mandatory legal mentions are included by default for your peace of mind.' })}
            />
            <FeatureCard 
              icon={<BarChart3 className="text-rose-600" />}
              title={t('landing.feature4Title', { defaultValue: 'Advanced Analytics' })}
              description={t('landing.feature4Desc', { defaultValue: 'Track your revenue, unpaid invoices, and growth with intuitive charts.' })}
            />
            <FeatureCard 
              icon={<Globe className="text-sky-600" />}
              title={t('landing.feature5Title', { defaultValue: 'Multi-Currency' })}
              description={t('landing.feature5Desc', { defaultValue: 'Invoice your international clients in any currency with automatic conversion.' })}
            />
            <FeatureCard 
              icon={<Zap className="text-amber-600" />}
              title={t('landing.feature6Title', { defaultValue: 'Instant Sending' })}
              description={t('landing.feature6Desc', { defaultValue: 'Send your invoices directly by email with receipt and payment tracking.' })}
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6">
        <div className="max-w-5xl mx-auto bg-blue-600 rounded-[48px] p-12 lg:p-24 text-center space-y-12 relative overflow-hidden shadow-2xl shadow-blue-200">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-400/20 via-transparent to-transparent" />
          
          <h2 className="text-4xl lg:text-7xl font-black tracking-tighter text-white leading-[0.9] relative z-10">
            {t('landing.ctaTitle', { defaultValue: 'Ready to transform your billing?' })}
          </h2>
          <p className="text-blue-100 text-xl font-bold max-w-2xl mx-auto relative z-10">
            {t('landing.ctaSubtitle', { defaultValue: 'Join thousands of entrepreneurs who save time every day with InvoiceGEN.' })}
          </p>
          <div className="pt-8 relative z-10">
            <button 
              onClick={onStart}
              className="px-12 py-6 bg-white text-blue-600 rounded-3xl font-black text-xl hover:bg-blue-50 transition-all shadow-xl flex items-center justify-center gap-3 mx-auto group"
            >
              {t('landing.startAdventure', { defaultValue: 'Start the adventure' })}
              <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="bg-white p-10 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all space-y-6 group">
      <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-2xl group-hover:bg-blue-50 transition-colors">
        {icon}
      </div>
      <h3 className="text-xl font-black tracking-tight text-slate-900">{title}</h3>
      <p className="text-slate-500 font-bold text-sm leading-relaxed">{description}</p>
    </div>
  );
}
