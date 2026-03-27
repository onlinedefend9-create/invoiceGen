import React from 'react';
import { motion } from 'motion/react';
import { 
  FileText, 
  Zap, 
  ShieldCheck, 
  Lock, 
  CheckCircle2,
  ArrowRight,
  Clock,
  Globe,
  Database
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const Features: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-white pt-32 pb-24 px-6">
      <div className="max-w-7xl mx-auto space-y-32">
        {/* Hero Section */}
        <div className="text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-block px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full text-sm font-bold tracking-wide uppercase"
          >
            {t('features.heroBadge', { defaultValue: "Conforme Normes 2026" })}
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl lg:text-8xl font-black tracking-tighter text-slate-900 leading-[0.9]"
          >
            {t('features.heroTitle', { defaultValue: "Le Logiciel de Facturation Ultime pour 2026" })}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="max-w-3xl mx-auto text-xl lg:text-2xl text-slate-500 font-medium leading-relaxed"
          >
            {t('features.heroSubtitle', { defaultValue: "Découvrez pourquoi InvoiceGEN est le choix n°1 des freelances et PME pour une facturation gratuite, sans compte et 100% sécurisée." })}
          </motion.p>
        </div>

        {/* Feature 1: Invoices */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center py-12 border-b border-slate-100">
          <div className="space-y-8">
            <div className="w-16 h-16 bg-blue-600 text-white rounded-2xl flex items-center justify-center shadow-xl shadow-blue-200">
              <FileText size={32} />
            </div>
            <h2 className="text-4xl lg:text-5xl font-black tracking-tight text-slate-900">
              {t('features.invoiceTitle', { defaultValue: "Générateur de Factures PDF Professionnelles" })}
            </h2>
            <div className="prose prose-slate prose-lg max-w-none text-slate-600 font-medium leading-relaxed space-y-4">
              <p>
                Le générateur de facture <strong>gratuit</strong> d'InvoiceGEN redéfinit la manière dont les <strong>freelances</strong> gèrent leur comptabilité. Contrairement aux solutions lourdes, notre plateforme vous permet de générer des documents PDF haute définition <strong>sans aucune inscription obligatoire</strong>.
              </p>
              <p>
                En 2026, l'image de marque est plus importante que jamais : nos modèles (Minimalist, Corporate, Modern) sont optimisés pour une lecture claire sur tous les supports. Chaque facture générée inclut automatiquement toutes les mentions légales requises, vous évitant ainsi les erreurs administratives coûteuses.
              </p>
              <p>
                Que vous soyez graphiste, consultant ou développeur, notre outil s'adapte à vos besoins spécifiques avec une flexibilité totale sur les articles, les remises et les devises.
              </p>
            </div>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {['Export PDF HD', 'Modèles élégants', 'Mentions légales auto', 'Multi-devises'].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-slate-700 font-bold">
                  <CheckCircle2 size={20} className="text-blue-600" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative group">
            <div className="absolute inset-0 bg-blue-500/10 blur-[100px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            <div className="bg-slate-50 rounded-[64px] p-8 lg:p-16 border border-slate-100 shadow-inner flex items-center justify-center relative overflow-hidden">
              {/* Background Grid */}
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
              
              <motion.div 
                animate={{ 
                  y: [0, -20, 0],
                  rotateY: [-5, 5, -5]
                }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                style={{ perspective: 1000 }}
                className="bg-white rounded-[40px] shadow-[0_40px_80px_-15px_rgba(0,0,0,0.1)] p-10 space-y-8 aspect-[3/4] w-full max-w-[340px] flex flex-col border border-slate-100 relative z-10"
              >
                <div className="flex justify-between items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-200">
                    <FileText size={24} />
                  </div>
                  <div className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-[8px] font-black uppercase tracking-widest border border-blue-100">
                    HD Export
                  </div>
                </div>
                <div className="flex-1 border-y border-slate-50 py-8 space-y-6">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="flex justify-between items-center">
                      <div className="space-y-2">
                        <div className="h-2 w-32 bg-slate-100 rounded-full" />
                        <div className="h-1.5 w-20 bg-slate-50 rounded-full" />
                      </div>
                      <div className="h-2 w-10 bg-slate-100 rounded-full" />
                    </div>
                  ))}
                </div>
                <div className="flex justify-between items-end pt-4">
                  <div className="w-24 h-8 bg-slate-900 rounded-2xl" />
                  <div className="w-12 h-12 bg-blue-600 rounded-2xl shadow-xl shadow-blue-100 flex items-center justify-center text-white">
                    <Zap size={20} fill="currentColor" />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Feature 2: Quotes */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center py-12 border-b border-slate-100">
          <div className="order-2 lg:order-1 bg-slate-900 rounded-[64px] p-12 lg:p-20 text-white relative overflow-hidden group">
            {/* Animated Background Glow */}
            <motion.div 
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.2, 0.4, 0.2]
              }}
              transition={{ duration: 8, repeat: Infinity }}
              className="absolute -top-24 -right-24 w-96 h-96 bg-blue-600 blur-[120px] rounded-full"
            />
            
            <div className="relative z-10 space-y-12">
              <div className="flex gap-4">
                <div className="h-3 w-16 bg-blue-500 rounded-full" />
                <div className="h-3 w-10 bg-slate-700 rounded-full" />
              </div>
              <div className="space-y-6">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  className="text-8xl font-black tracking-tighter bg-gradient-to-br from-white to-slate-500 bg-clip-text text-transparent"
                >
                  98%
                </motion.div>
                <p className="text-xl text-slate-400 font-bold leading-relaxed max-w-md">De taux de conversion moyen pour nos utilisateurs envoyant des devis en moins de 10 minutes.</p>
              </div>
              <div className="pt-12 grid grid-cols-2 gap-12 border-t border-slate-800">
                <div className="space-y-2">
                  <div className="text-3xl font-black text-blue-400">Fast-Track</div>
                  <div className="text-xs font-black uppercase tracking-widest text-slate-500">Conversion Devis</div>
                </div>
                <div className="space-y-2">
                  <div className="text-3xl font-black text-emerald-400">Instant</div>
                  <div className="text-xs font-black uppercase tracking-widest text-slate-500">Signature Prête</div>
                </div>
              </div>
            </div>

            {/* Floating Particles */}
            <div className="absolute inset-0 pointer-events-none">
              {[1, 2, 3].map(i => (
                <motion.div
                  key={i}
                  animate={{ 
                    y: [0, -100, 0],
                    opacity: [0, 0.5, 0]
                  }}
                  transition={{ duration: 4 + i, repeat: Infinity, delay: i }}
                  className="absolute w-1 h-1 bg-blue-400 rounded-full"
                  style={{ left: `${20 * i}%`, bottom: '10%' }}
                />
              ))}
            </div>
          </div>
          <div className="order-1 lg:order-2 space-y-8">
            <div className="w-16 h-16 bg-amber-500 text-white rounded-2xl flex items-center justify-center shadow-xl shadow-amber-100">
              <Zap size={32} />
            </div>
            <h2 className="text-4xl lg:text-5xl font-black tracking-tight text-slate-900">
              {t('features.quoteTitle', { defaultValue: "Création de Devis Rapides pour Indépendants" })}
            </h2>
            <div className="prose prose-slate prose-lg max-w-none text-slate-600 font-medium leading-relaxed space-y-4">
              <p>
                Un devis professionnel est la première étape d'une collaboration réussie. Avec InvoiceGEN, la création de <strong>devis pour indépendants</strong> devient un jeu d'enfant. Vous pouvez lister vos prestations, détailler vos conditions de vente et envoyer le document en un clic.
              </p>
              <p>
                Notre interface intuitive vous permet de convertir instantanément un devis validé en facture, évitant ainsi la double saisie et les erreurs de copier-coller. Pour les <strong>auto-entrepreneurs</strong>, cette fluidité est essentielle pour maintenir une organisation rigoureuse sans y passer des heures.
              </p>
              <p>
                Notre outil est accessible partout, tout le temps, vous permettant de répondre à une demande client même en déplacement, sans avoir besoin de créer un compte.
              </p>
            </div>
          </div>
        </section>

        {/* Feature 3: VAT & Compliance */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center py-12 border-b border-slate-100">
          <div className="space-y-8">
            <div className="w-16 h-16 bg-emerald-600 text-white rounded-2xl flex items-center justify-center shadow-xl shadow-emerald-100">
              <ShieldCheck size={32} />
            </div>
            <h2 className="text-4xl lg:text-5xl font-black tracking-tight text-slate-900">
              {t('features.vatTitle', { defaultValue: "Gestion de la TVA Auto-Entrepreneur 2026" })}
            </h2>
            <div className="prose prose-slate prose-lg max-w-none text-slate-600 font-medium leading-relaxed space-y-4">
              <p>
                La réforme de la facturation électronique de <strong>2026</strong> change la donne pour toutes les entreprises françaises. InvoiceGEN a été conçu dès le départ pour être <strong>conforme 2026</strong>.
              </p>
              <p>
                Pour les auto-entrepreneurs, cela signifie une gestion simplifiée de la franchise en base de TVA ou du régime réel. L'outil calcule automatiquement les montants HT et TTC, applique les taux de TVA corrects et génère les fichiers structurés qui seront bientôt exigés par l'administration fiscale.
              </p>
              <p>
                Ne vous laissez pas surprendre par la loi : utilisez un outil qui anticipe les changements et vous guide pas à pas vers une conformité totale, sans frais cachés et sans abonnement.
              </p>
            </div>
          </div>
          <div className="relative group">
            <div className="absolute inset-0 bg-emerald-500/10 blur-[100px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            <div className="bg-emerald-50 rounded-[64px] p-12 lg:p-20 border border-emerald-100 relative overflow-hidden">
              {/* Holographic Grid Overlay */}
              <div className="absolute inset-0 opacity-[0.1] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #10b981 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
              
              <div className="relative z-10 space-y-10">
                <motion.div 
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="flex items-center gap-4 bg-white/80 backdrop-blur-sm w-fit px-6 py-3 rounded-2xl border border-emerald-200 shadow-sm"
                >
                  <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse" />
                  <span className="text-xs font-black text-emerald-700 uppercase tracking-widest">Mise à jour fiscale 2026 active</span>
                </motion.div>
                
                <div className="space-y-6 bg-white p-8 rounded-[32px] shadow-xl border border-emerald-100">
                  <div className="space-y-4">
                    <div className="flex justify-between text-sm font-bold text-slate-500">
                      <span>Base HT</span>
                      <span className="font-mono">1 250,00 €</span>
                    </div>
                    <div className="flex justify-between text-sm font-bold text-emerald-600">
                      <span>TVA (20%)</span>
                      <span className="font-mono">+ 250,00 €</span>
                    </div>
                  </div>
                  <div className="h-px bg-slate-100" />
                  <div className="flex justify-between items-end">
                    <div className="space-y-1">
                      <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total TTC</div>
                      <div className="text-4xl font-black text-slate-900 tracking-tighter">1 500,00 €</div>
                    </div>
                    <div className="w-14 h-14 bg-emerald-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-emerald-100">
                      <ShieldCheck size={32} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-8 -right-8 bg-slate-900 p-8 rounded-[32px] shadow-2xl border border-slate-800 max-w-[240px] text-white"
            >
              <p className="text-sm font-bold text-slate-300 leading-relaxed italic">
                "Grâce à InvoiceGEN, j'ai pu anticiper les nouvelles normes sans changer mes habitudes."
              </p>
              <div className="mt-4 flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-[10px] font-black">S</div>
                <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Sarah, Freelance</p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Feature 4: Security */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center py-12">
          <div className="order-2 lg:order-1 flex justify-center relative group">
            <div className="absolute inset-0 bg-blue-500/5 blur-[120px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            <div className="relative w-full max-w-lg aspect-square bg-slate-50 rounded-[64px] flex items-center justify-center border border-slate-100 overflow-hidden">
              {/* Animated Radar Rings */}
              {[1, 2, 3].map(i => (
                <motion.div
                  key={i}
                  animate={{ 
                    scale: [1, 2, 1],
                    opacity: [0.1, 0, 0.1]
                  }}
                  transition={{ duration: 4, repeat: Infinity, delay: i }}
                  className="absolute inset-0 border border-blue-500 rounded-full"
                />
              ))}
              
              <motion.div 
                animate={{ 
                  rotate: [0, 360],
                  scale: [1, 1.05, 1]
                }}
                transition={{ 
                  rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                  scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                }}
                className="w-64 h-64 bg-white rounded-[48px] shadow-2xl flex items-center justify-center relative z-10 border border-slate-100"
              >
                <div className="absolute inset-4 border-2 border-dashed border-slate-100 rounded-[32px]" />
                <Lock size={80} className="text-blue-600 drop-shadow-2xl" />
              </motion.div>

              {/* Floating Security Nodes */}
              <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-16 left-16 w-16 h-16 bg-white rounded-2xl shadow-xl flex items-center justify-center border border-slate-100"
              >
                <Database size={28} className="text-blue-500" />
              </motion.div>
              <motion.div
                animate={{ y: [0, 20, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-16 right-16 w-16 h-16 bg-white rounded-2xl shadow-xl flex items-center justify-center border border-slate-100"
              >
                <Globe size={28} className="text-indigo-500" />
              </motion.div>
            </div>
          </div>
          <div className="order-1 lg:order-2 space-y-8">
            <div className="w-16 h-16 bg-slate-900 text-white rounded-2xl flex items-center justify-center shadow-xl shadow-slate-200">
              <Lock size={32} />
            </div>
            <h2 className="text-4xl lg:text-5xl font-black tracking-tight text-slate-900">
              {t('features.securityTitle', { defaultValue: "Sécurité Local-First & Mode Hors-Ligne" })}
            </h2>
            <div className="prose prose-slate prose-lg max-w-none text-slate-600 font-medium leading-relaxed space-y-4">
              <p>
                La sécurité des données est au cœur de nos préoccupations. InvoiceGEN utilise une approche <strong>Local-First</strong> : toutes vos données de facturation sont stockées localement dans votre navigateur.
              </p>
              <p>
                Cela signifie que même sans connexion internet, vous pouvez continuer à travailler, créer des factures et gérer vos clients. C'est la garantie d'une confidentialité absolue : nous n'avons pas accès à vos chiffres, à vos clients ou à vos secrets commerciaux.
              </p>
              <p>
                Pour un <strong>freelance</strong>, c'est l'assurance que son activité reste privée et sécurisée, tout en bénéficiant de la puissance d'un outil cloud moderne. Pas de base de données centrale vulnérable, pas de risque de fuite de données massive.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <div className="bg-blue-600 rounded-[64px] p-12 lg:p-24 text-center space-y-12 text-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
          <div className="relative z-10 space-y-6">
            <h2 className="text-4xl lg:text-7xl font-black tracking-tighter leading-none">
              {t('features.ctaTitle', { defaultValue: "Prêt à simplifier votre facturation ?" })}
            </h2>
            <p className="max-w-2xl mx-auto text-xl text-blue-100 font-bold">
              Rejoignez des milliers d'indépendants qui utilisent déjà InvoiceGEN pour une gestion sereine et gratuite.
            </p>
          </div>
          <div className="relative z-10 flex flex-col sm:flex-row gap-6 justify-center">
            <button 
              onClick={() => window.location.href = '/'}
              className="px-12 py-6 bg-white text-blue-600 rounded-3xl text-xl font-black hover:scale-105 transition-transform flex items-center justify-center gap-3 shadow-2xl shadow-blue-900/20"
            >
              Démarrer gratuitement
              <ArrowRight size={24} />
            </button>
            <div className="flex items-center justify-center gap-4 text-blue-100 font-bold">
              <Clock size={20} />
              Sans inscription • Moins de 60s
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
