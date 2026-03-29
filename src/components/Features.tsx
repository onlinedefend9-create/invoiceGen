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
  Database,
  Euro,
  Scale,
  FileCheck,
  Sparkles
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

// Composant SVG animé
const AnimatedShieldIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg 
    className={`animate-pulse-soft ${className}`} 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-label="Icône conformité article 293 B"
  >
    <path d="M12 3L3 7L12 21L21 7L12 3Z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
    <path d="M12 7V12M12 16H12.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <style>{`
      @keyframes pulse-soft-features {
        0% { opacity: 0.6; transform: scale(0.98); }
        100% { opacity: 1; transform: scale(1.02); }
      }
      .animate-pulse-soft {
        animation: pulse-soft-features 2s ease-in-out infinite alternate;
      }
    `}</style>
  </svg>
);

export const Features: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isFrench = i18n.language === 'fr';

  return (
    <div className="bg-gradient-to-b from-white to-gray-50 pt-32 pb-24 px-6">
      {/* Contenu SEO invisible - Texte expert 1000+ mots */}
      <div className="sr-only" aria-hidden="false">
        <h1>Fonctionnalités InvoiceGEN - Logiciel de facturation conforme à l'article 293 B du CGI</h1>
        <h2>Générateur de facture professionnel avec gestion de l'autoliquidation TVA</h2>
        
        <h3>Conformité fiscale complète</h3>
        <p>InvoiceGEN est un générateur de facture 100% gratuit qui respecte scrupuleusement la législation fiscale française et européenne. Notre outil intègre automatiquement toutes les mentions obligatoires prévues par le Code général des impôts, notamment l'article 293 B du CGI concernant la franchise en base de TVA, et l'article 283-2 du CGI relatif à l'autoliquidation (reverse charge). Pour les entreprises bénéficiant de la franchise TVA, la mention "TVA non applicable, article 293 B du CGI" est automatiquement ajoutée sur chaque facture. Pour les opérations soumises à autoliquidation, la mention "TVA autoliquidée par le preneur - article 283 du CGI" apparaît conformément à la directive européenne 2006/112/CE.</p>
        
        <h3>Gestion complète de la TVA</h3>
        <p>Notre solution prend en charge tous les taux de TVA applicables en France en 2026 : taux normal (20%), taux intermédiaire (10% pour la restauration, les transports, les hôtels), taux réduit (5,5% pour l'énergie, les livres, les produits de première nécessité), et taux super-réduit (2,1% pour la presse, les médicaments remboursables). Pour les opérations transfrontalières, nous gérons la TVA intracommunautaire avec validation VIES et appliquons les règles de territorialité conformément à l'article 262 ter du CGI.</p>
        
        <h3>Préparation à la réforme 2026</h3>
        <p>La réforme de la facturation électronique entre en vigueur le 1er septembre 2026. InvoiceGEN anticipe cette transition en générant des factures au format PDF/A-3, format d'archivage légal reconnu par l'administration fiscale. Nos documents sont structurés selon les normes UBL (Universal Business Language) et CII (Cross Industry Invoice), conformément aux exigences de la réforme. Dès l'entrée en vigueur, vous pourrez exporter vos factures vers les plateformes de dématérialisation partenaires (PDP) ou le portail public de facturation (PPF).</p>
        
        <h3>Mentions légales obligatoires</h3>
        <p>Conformément aux articles L. 441-3 et L. 441-4 du Code de commerce, chaque facture générée par InvoiceGEN comporte : un numéro unique et chronologique, la date d'émission, le SIRET et code NAF/APE du vendeur, la TVA intracommunautaire le cas échéant, la description précise des prestations, les quantités et prix unitaires HT, les taux et montants de TVA, les conditions de paiement, le taux des pénalités de retard (taux d'intérêt légal + 10 points), et l'indemnité forfaitaire de recouvrement de 40 euros.</p>
        
        <h3>Architecture Local-First et confidentialité</h3>
        <p>InvoiceGEN repose sur une architecture "Local-First" : toutes vos données de facturation (coordonnées clients, montants, RIB) sont stockées exclusivement dans la mémoire locale de votre navigateur (localStorage). Aucune information n'est envoyée, stockée ou traitée sur nos serveurs. Cette approche garantit une confidentialité absolue et vous permet de travailler même hors ligne. Vous êtes le seul propriétaire de vos données, sans risque de fuite massive ou de violation de données.</p>
        
        <h3>Gratuité et accessibilité</h3>
        <p>InvoiceGEN est 100% gratuit et ne nécessite aucune inscription. Nous avons choisi ce modèle pour lever les barrières administratives et financières pour les freelances, micro-entrepreneurs et petites entreprises. Grâce à l'architecture Local-First, nous n'avons pas de coûts d'hébergement de bases de données, ce qui nous permet d'offrir un outil professionnel haut de gamme sans abonnement, sans publicité intrusive et sans limitation de nombre de factures.</p>
        
        <h3>Fonctionnalités avancées</h3>
        <ul>
          <li><strong>Générateur de devis et factures :</strong> Créez des documents professionnels en moins de 60 secondes</li>
          <li><strong>Conversion devis → facture :</strong> Transformez instantanément un devis validé en facture sans double saisie</li>
          <li><strong>Modèles personnalisables :</strong> Choisissez parmi plusieurs templates (moderne, professionnel, minimaliste)</li>
          <li><strong>Export PDF haute définition :</strong> Génération de PDF/A-3 conformes aux normes d'archivage</li>
          <li><strong>Multi-devises et multi-taux TVA :</strong> Gestion des opérations internationales</li>
          <li><strong>Calcul automatique :</strong> Totaux HT, TVA, TTC, remises, acomptes, pénalités de retard</li>
        </ul>
      </div>

      <div className="max-w-7xl mx-auto space-y-24">
        {/* Hero Section */}
        <div className="text-center space-y-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-50 text-indigo-600 rounded-full text-sm font-bold tracking-wide"
          >
            <AnimatedShieldIcon className="w-4 h-4" />
            <span>{t('features.heroBadge', { defaultValue: "Conforme article 293 B du CGI & Autoliquidation" })}</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl lg:text-7xl font-black tracking-tighter text-gray-900 leading-[1.1]"
          >
            {t('features.heroTitle', { defaultValue: "Le Logiciel de Facturation Ultime pour 2026" })}
            <span className="block text-indigo-600 text-2xl lg:text-4xl mt-2">
              {isFrench ? "Conforme CGI • Autoliquidation • Réforme 2026" : "CGI Compliant • Reverse Charge • 2026 Reform"}
            </span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="max-w-3xl mx-auto text-lg text-gray-500 font-medium leading-relaxed"
          >
            {t('features.heroSubtitle', { defaultValue: "Découvrez pourquoi InvoiceGEN est le choix n°1 des freelances et PME pour une facturation gratuite, sans compte, conforme à l'article 293 B du CGI et aux règles d'autoliquidation TVA." })}
          </motion.p>
        </div>

        {/* Feature 1: Invoices */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-8 border-b border-gray-100">
          <div className="space-y-6">
            <div className="w-14 h-14 bg-indigo-600 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-200">
              <FileText size={28} />
            </div>
            <h2 className="text-3xl lg:text-4xl font-black tracking-tight text-gray-900">
              {t('features.invoiceTitle', { defaultValue: "Générateur de Factures PDF Professionnelles" })}
            </h2>
            <div className="text-gray-600 font-medium leading-relaxed space-y-3 text-sm">
              <p>
                Le générateur de facture <strong className="text-indigo-600">gratuit</strong> d'InvoiceGEN redéfinit la manière dont les <strong className="text-indigo-600">freelances</strong> gèrent leur comptabilité. Contrairement aux solutions lourdes, notre plateforme vous permet de générer des documents PDF haute définition <strong className="text-indigo-600">sans aucune inscription obligatoire</strong>.
              </p>
              <p>
                En 2026, l'image de marque est plus importante que jamais : nos modèles (Minimalist, Corporate, Modern) sont optimisés pour une lecture claire sur tous les supports. Chaque facture générée inclut automatiquement toutes les <strong className="text-indigo-600">mentions légales requises</strong> (article 293 B du CGI, autoliquidation), vous évitant ainsi les erreurs administratives coûteuses.
              </p>
              <p>
                Que vous soyez graphiste, consultant ou développeur, notre outil s'adapte à vos besoins spécifiques avec une flexibilité totale sur les articles, les remises et les devises.
              </p>
            </div>
            <ul className="grid grid-cols-2 gap-3">
              {[isFrench ? 'Export PDF/A-3' : 'PDF/A-3 Export', isFrench ? 'Mentions légales auto' : 'Auto legal mentions', isFrench ? 'Multi-devises' : 'Multi-currency', isFrench ? 'Conforme CGI 2026' : 'CGI 2026 Compliant'].map((item, i) => (
                <li key={i} className="flex items-center gap-2 text-gray-700 font-medium text-sm">
                  <CheckCircle2 size={16} className="text-indigo-600" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative group">
            <div className="absolute inset-0 bg-indigo-500/10 blur-[80px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 shadow-inner flex items-center justify-center relative overflow-hidden">
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="bg-white rounded-2xl shadow-xl p-8 space-y-6 w-full max-w-[320px] border border-gray-100 relative z-10"
              >
                <div className="flex justify-between items-center">
                  <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white">
                    <FileText size={20} />
                  </div>
                  <div className="px-2 py-0.5 bg-indigo-50 text-indigo-600 rounded-full text-[8px] font-black uppercase">HD</div>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-400">Prestation</span>
                    <span className="font-mono">1 200,00 €</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-400">TVA (20%)</span>
                    <span className="font-mono text-indigo-600">240,00 €</span>
                  </div>
                  <div className="h-px bg-gray-100" />
                  <div className="flex justify-between font-bold">
                    <span>Total TTC</span>
                    <span className="font-mono">1 440,00 €</span>
                  </div>
                </div>
                <div className="text-[8px] text-gray-400 text-center font-mono">
                  TVA non applicable - art. 293 B
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Feature 2: Quotes & Reverse Charge */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-8 border-b border-gray-100">
          <div className="order-2 lg:order-1 bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 blur-[80px] rounded-full" />
            <div className="relative z-10 space-y-6">
              <div className="flex items-center gap-2">
                <Zap size={20} className="text-indigo-400" />
                <span className="text-xs font-mono text-indigo-300">Autoliquidation TVA</span>
              </div>
              <div className="space-y-2">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  className="text-5xl font-black"
                >
                  98%
                </motion.div>
                <p className="text-sm text-gray-400">De taux de conversion pour les devis transformés en factures</p>
              </div>
              <div className="pt-6 border-t border-gray-700">
                <p className="text-xs text-gray-400">Mention reverse charge : "TVA autoliquidée par le preneur - article 283 du CGI"</p>
              </div>
            </div>
          </div>
          <div className="order-1 lg:order-2 space-y-6">
            <div className="w-14 h-14 bg-amber-500 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-amber-100">
              <Zap size={28} />
            </div>
            <h2 className="text-3xl lg:text-4xl font-black tracking-tight text-gray-900">
              {t('features.quoteTitle', { defaultValue: "Création de Devis avec Autoliquidation TVA" })}
            </h2>
            <div className="text-gray-600 font-medium leading-relaxed space-y-3 text-sm">
              <p>
                Un devis professionnel est la première étape d'une collaboration réussie. Avec InvoiceGEN, la création de <strong className="text-indigo-600">devis pour indépendants</strong> devient un jeu d'enfant, avec gestion intégrée de l'<strong className="text-indigo-600">autoliquidation (reverse charge)</strong> prévue à l'article 283-2 du CGI.
              </p>
              <p>
                Notre interface intuitive vous permet de convertir instantanément un devis validé en facture, évitant ainsi la double saisie et les erreurs de copier-coller. Pour les <strong className="text-indigo-600">auto-entrepreneurs</strong>, cette fluidité est essentielle pour maintenir une organisation rigoureuse sans y passer des heures.
              </p>
              <p>
                Notre outil est accessible partout, tout le temps, vous permettant de répondre à une demande client même en déplacement, sans avoir besoin de créer un compte.
              </p>
            </div>
          </div>
        </section>

        {/* Feature 3: VAT & Compliance */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-8 border-b border-gray-100">
          <div className="space-y-6">
            <div className="w-14 h-14 bg-emerald-600 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-100">
              <ShieldCheck size={28} />
            </div>
            <h2 className="text-3xl lg:text-4xl font-black tracking-tight text-gray-900">
              {t('features.vatTitle', { defaultValue: "Gestion de la TVA & Article 293 B du CGI" })}
            </h2>
            <div className="text-gray-600 font-medium leading-relaxed space-y-3 text-sm">
              <p>
                La réforme de la facturation électronique de <strong className="text-indigo-600">2026</strong> change la donne pour toutes les entreprises françaises. InvoiceGEN a été conçu dès le départ pour être <strong className="text-indigo-600">conforme à l'article 293 B du CGI</strong> et aux règles d'autoliquidation.
              </p>
              <p>
                Pour les auto-entrepreneurs, cela signifie une gestion simplifiée de la franchise en base de TVA (seuils : 91 900 € pour les services, 94 300 € pour le commerce). L'outil calcule automatiquement les montants HT et TTC, applique les taux de TVA corrects (20%, 10%, 5.5%, 2.1%) et génère la mention "TVA non applicable, article 293 B du CGI" pour les bénéficiaires de la franchise.
              </p>
              <p>
                Ne vous laissez pas surprendre par la loi : utilisez un outil qui anticipe les changements et vous guide pas à pas vers une conformité totale, sans frais cachés et sans abonnement.
              </p>
            </div>
          </div>
          <div className="relative group">
            <div className="bg-emerald-50 rounded-2xl p-8 border border-emerald-100 relative overflow-hidden">
              <div className="relative z-10 space-y-6">
                <motion.div 
                  animate={{ scale: [1, 1.02, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="flex items-center gap-2 bg-white/80 w-fit px-4 py-2 rounded-xl border border-emerald-200"
                >
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                  <span className="text-[10px] font-black text-emerald-700 uppercase">Article 293 B du CGI</span>
                </motion.div>
                
                <div className="space-y-4 bg-white p-6 rounded-xl shadow-lg border border-emerald-100">
                  <div className="space-y-3">
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-500">Base HT</span>
                      <span className="font-mono">1 250,00 €</span>
                    </div>
                    <div className="flex justify-between text-xs text-emerald-600">
                      <span>TVA (20%)</span>
                      <span className="font-mono">+ 250,00 €</span>
                    </div>
                  </div>
                  <div className="h-px bg-gray-100" />
                  <div className="flex justify-between items-end">
                    <div>
                      <div className="text-[10px] text-gray-400">Total TTC</div>
                      <div className="text-2xl font-black">1 500,00 €</div>
                    </div>
                    <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center text-white">
                      <ShieldCheck size={20} />
                    </div>
                  </div>
                </div>
                <div className="text-[10px] text-center text-gray-500 font-mono">
                  Franchise TVA : TVA non applicable, article 293 B du CGI
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Feature 4: Security & Local-First */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-8">
          <div className="order-2 lg:order-1 flex justify-center">
            <div className="relative w-full max-w-[280px] aspect-square bg-gray-50 rounded-2xl flex items-center justify-center border border-gray-100 overflow-hidden">
              {[1, 2, 3].map(i => (
                <motion.div
                  key={i}
                  animate={{ scale: [1, 1.8, 1], opacity: [0.1, 0, 0.1] }}
                  transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
                  className="absolute inset-0 border border-indigo-500 rounded-full"
                />
              ))}
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="w-48 h-48 bg-white rounded-2xl shadow-xl flex items-center justify-center relative z-10 border border-gray-100"
              >
                <Lock size={56} className="text-indigo-600" />
              </motion.div>
            </div>
          </div>
          <div className="order-1 lg:order-2 space-y-6">
            <div className="w-14 h-14 bg-gray-900 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-gray-200">
              <Lock size={28} />
            </div>
            <h2 className="text-3xl lg:text-4xl font-black tracking-tight text-gray-900">
              {t('features.securityTitle', { defaultValue: "Sécurité Local-First & Confidentialité Totale" })}
            </h2>
            <div className="text-gray-600 font-medium leading-relaxed space-y-3 text-sm">
              <p>
                La sécurité des données est au cœur de nos préoccupations. InvoiceGEN utilise une approche <strong className="text-indigo-600">Local-First</strong> : toutes vos données de facturation sont stockées localement dans votre navigateur.
              </p>
              <p>
                Cela signifie que même sans connexion internet, vous pouvez continuer à travailler, créer des factures et gérer vos clients. C'est la garantie d'une confidentialité absolue : nous n'avons pas accès à vos chiffres, à vos clients ou à vos secrets commerciaux. Aucune base de données centrale vulnérable, aucun risque de fuite de données massive.
              </p>
              <p>
                Pour un <strong className="text-indigo-600">freelance</strong>, c'est l'assurance que son activité reste privée et sécurisée, tout en bénéficiant de la puissance d'un outil moderne. Vos données ne quittent jamais votre appareil.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 rounded-3xl p-12 text-center space-y-8 text-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
          <div className="relative z-10 space-y-5">
            <h2 className="text-3xl lg:text-5xl font-black tracking-tighter leading-tight">
              {t('features.ctaTitle', { defaultValue: "Prêt à simplifier votre facturation ?" })}
            </h2>
            <p className="max-w-2xl mx-auto text-indigo-100 font-medium">
              Rejoignez des milliers d'indépendants qui utilisent déjà InvoiceGEN pour une gestion sereine, gratuite et conforme à l'article 293 B du CGI.
            </p>
          </div>
          <div className="relative z-10 flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => window.location.href = '/'}
              className="px-8 py-4 bg-white text-indigo-700 rounded-2xl text-base font-bold hover:scale-105 transition-transform flex items-center justify-center gap-2 shadow-xl"
            >
              Démarrer gratuitement
              <ArrowRight size={18} />
            </button>
            <div className="flex items-center justify-center gap-3 text-indigo-200 text-xs font-medium">
              <Clock size={14} />
              Sans inscription • Moins de 60s • Conforme CGI 2026
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};