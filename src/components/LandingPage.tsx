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
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "backOut" }}
            className="pt-24 relative max-w-5xl mx-auto"
          >
            {/* Magic Tech Showcase Container */}
            <div className="relative z-10 bg-white rounded-[64px] p-8 lg:p-20 border border-slate-100 overflow-hidden aspect-[16/10] flex items-center justify-center shadow-[0_50px_100px_-20px_rgba(59,130,246,0.12)]">
              
              {/* Vibrant Background Glows */}
              <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.05),transparent_70%)]" />
              <div className="absolute -top-24 -right-24 w-96 h-96 bg-purple-500/10 blur-[100px] rounded-full animate-pulse" />
              <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-500/10 blur-[100px] rounded-full animate-pulse" style={{ animationDelay: '1s' }} />

              <div className="relative w-full h-full flex items-center justify-center">
                
                {/* The "Magic" Transformation Scene */}
                <div className="relative w-full max-w-3xl aspect-video">
                  
                  {/* Glowing Connection Beam */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div 
                      animate={{ 
                        opacity: [0.3, 0.6, 0.3],
                        scaleX: [1, 1.2, 1]
                      }}
                      transition={{ duration: 4, repeat: Infinity }}
                      className="w-full h-32 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent blur-3xl"
                    />
                  </div>

                  {/* Main 3D-style Invoice Card */}
                  <motion.div
                    animate={{ 
                      y: [0, -20, 0],
                      rotateY: [-10, 10, -10],
                      rotateX: [5, -5, 5]
                    }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    style={{ perspective: 1000 }}
                    className="absolute inset-0 m-auto w-[300px] md:w-[420px] aspect-[3/4] bg-white rounded-[40px] shadow-[0_40px_80px_-15px_rgba(0,0,0,0.1)] border border-slate-100 p-10 flex flex-col gap-8 overflow-hidden group"
                  >
                    {/* Holographic Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/5 via-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    
                    <div className="flex justify-between items-center relative z-10">
                      <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-blue-200">
                        <Zap size={32} fill="currentColor" />
                      </div>
                      <div className="px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-blue-100">
                        Draft v2.0
                      </div>
                    </div>

                    <div className="flex-1 space-y-8 relative z-10">
                      <div className="h-px bg-slate-100 w-full" />
                      <div className="space-y-4">
                        {[1, 2, 3].map(i => (
                          <div key={i} className="flex justify-between items-center">
                            <div className="space-y-2">
                              <div className="w-40 h-2 bg-slate-100 rounded-full" />
                              <div className="w-24 h-1.5 bg-slate-50 rounded-full" />
                            </div>
                            <div className="w-12 h-2 bg-slate-100 rounded-full" />
                          </div>
                        ))}
                      </div>
                      <div className="h-px bg-slate-100 w-full" />
                    </div>

                    <div className="mt-auto flex justify-between items-end relative z-10">
                      <div className="space-y-2">
                        <div className="w-20 h-2 bg-slate-100 rounded-full" />
                        <div className="w-32 h-6 bg-slate-900 rounded-full" />
                      </div>
                      <motion.div 
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center text-white shadow-lg shadow-emerald-200 border-4 border-white"
                      >
                        <ShieldCheck size={32} />
                      </motion.div>
                    </div>
                  </motion.div>

                  {/* Floating "Magic" Particles */}
                  {[1, 2, 3, 4].map(i => (
                    <motion.div
                      key={i}
                      animate={{ 
                        y: [0, -100, 0],
                        opacity: [0, 1, 0],
                        scale: [0.5, 1, 0.5]
                      }}
                      transition={{ 
                        duration: 3 + i, 
                        repeat: Infinity, 
                        delay: i * 0.5 
                      }}
                      className="absolute w-4 h-4 bg-blue-400 rounded-full blur-[4px]"
                      style={{ 
                        left: `${20 + i * 15}%`,
                        bottom: '20%'
                      }}
                    />
                  ))}

                  {/* Floating Status Badges */}
                  <motion.div
                    animate={{ x: [0, 20, 0], y: [0, -10, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-10 right-0 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3"
                  >
                    <div className="w-8 h-8 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center">
                      <CheckCircle2 size={18} />
                    </div>
                    <span className="text-[10px] font-black text-slate-900 uppercase tracking-widest">Certifié 2026</span>
                  </motion.div>

                  <motion.div
                    animate={{ x: [0, -20, 0], y: [0, 10, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="absolute bottom-10 left-0 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3"
                  >
                    <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center">
                      <BarChart3 size={18} />
                    </div>
                    <span className="text-[10px] font-black text-slate-900 uppercase tracking-widest">Vitesse Max</span>
                  </motion.div>

                </div>
              </div>
            </div>

            {/* Background Grid Accent */}
            <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
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
    <div className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-sm hover:shadow-[0_30px_60px_-15px_rgba(59,130,246,0.1)] hover:-translate-y-2 transition-all duration-500 space-y-6 group relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-2xl group-hover:bg-white group-hover:shadow-xl group-hover:shadow-blue-100 transition-all duration-500 relative z-10">
        {icon}
      </div>
      <div className="space-y-3 relative z-10">
        <h3 className="text-xl font-black tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors">{title}</h3>
        <p className="text-slate-500 font-bold text-sm leading-relaxed">{description}</p>
      </div>
      <div className="pt-4 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0 relative z-10">
        <div className="flex items-center gap-2 text-blue-600 font-black text-[10px] uppercase tracking-widest">
          Learn more <ArrowRight size={14} />
        </div>
      </div>
    </div>
  );
}
