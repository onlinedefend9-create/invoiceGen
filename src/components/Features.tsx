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
          <div className="bg-slate-50 rounded-[48px] p-8 lg:p-12 border border-slate-100 shadow-inner">
            <div className="bg-white rounded-3xl shadow-2xl p-6 space-y-6 aspect-[3/4] flex flex-col">
              <div className="h-8 w-32 bg-slate-100 rounded-lg" />
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <div className="h-4 w-48 bg-slate-100 rounded" />
                  <div className="h-4 w-32 bg-slate-50 rounded" />
                </div>
                <div className="h-12 w-12 bg-blue-50 rounded-full" />
              </div>
              <div className="flex-1 border-y border-slate-100 py-8 space-y-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="flex justify-between">
                    <div className="h-4 w-40 bg-slate-50 rounded" />
                    <div className="h-4 w-12 bg-slate-100 rounded" />
                  </div>
                ))}
              </div>
              <div className="flex justify-end pt-4">
                <div className="h-10 w-32 bg-blue-600 rounded-xl" />
              </div>
            </div>
          </div>
        </section>

        {/* Feature 2: Quotes */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center py-12 border-b border-slate-100">
          <div className="order-2 lg:order-1 bg-slate-900 rounded-[48px] p-12 text-white relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-600/20 to-transparent" />
            <div className="relative z-10 space-y-8">
              <div className="flex gap-4">
                <div className="h-2 w-12 bg-blue-500 rounded-full" />
                <div className="h-2 w-8 bg-slate-700 rounded-full" />
              </div>
              <div className="space-y-4">
                <div className="text-6xl font-black tracking-tighter">98%</div>
                <p className="text-slate-400 font-bold">De taux de conversion moyen pour nos utilisateurs envoyant des devis en moins de 10 minutes.</p>
              </div>
              <div className="pt-8 grid grid-cols-2 gap-8">
                <div>
                  <div className="text-2xl font-black">Fast-Track</div>
                  <div className="text-sm text-slate-500">Conversion Devis vers Facture</div>
                </div>
                <div>
                  <div className="text-2xl font-black">Instant</div>
                  <div className="text-sm text-slate-500">Signature électronique prête</div>
                </div>
              </div>
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
          <div className="relative">
            <div className="bg-emerald-50 rounded-[48px] p-12 border border-emerald-100">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse" />
                  <span className="text-sm font-black text-emerald-700 uppercase tracking-widest">Mise à jour fiscale 2026 active</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm font-bold text-slate-500">
                    <span>Base HT</span>
                    <span>1 250,00 €</span>
                  </div>
                  <div className="flex justify-between text-sm font-bold text-emerald-600">
                    <span>TVA (20%)</span>
                    <span>+ 250,00 €</span>
                  </div>
                  <div className="h-px bg-emerald-200 my-4" />
                  <div className="flex justify-between text-2xl font-black text-slate-900">
                    <span>Total TTC</span>
                    <span>1 500,00 €</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-3xl shadow-xl border border-slate-100 max-w-[200px]">
              <p className="text-xs font-bold text-slate-500 leading-tight">
                "Grâce à InvoiceGEN, j'ai pu anticiper les nouvelles normes sans changer mes habitudes."
              </p>
              <p className="text-[10px] font-black text-blue-600 mt-2">— Sarah, Freelance</p>
            </div>
          </div>
        </section>

        {/* Feature 4: Security */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center py-12">
          <div className="order-2 lg:order-1 flex justify-center">
            <div className="relative w-full max-w-md aspect-square bg-slate-50 rounded-full flex items-center justify-center border border-slate-100">
              <div className="absolute inset-0 border-2 border-dashed border-slate-200 rounded-full animate-[spin_20s_linear_infinite]" />
              <div className="w-48 h-48 bg-white rounded-[40px] shadow-2xl flex items-center justify-center relative z-10">
                <Lock size={64} className="text-blue-600" />
              </div>
              <div className="absolute top-12 left-12 w-12 h-12 bg-white rounded-xl shadow-lg flex items-center justify-center">
                <Database size={24} className="text-slate-400" />
              </div>
              <div className="absolute bottom-12 right-12 w-12 h-12 bg-white rounded-xl shadow-lg flex items-center justify-center">
                <Globe size={24} className="text-slate-400" />
              </div>
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
