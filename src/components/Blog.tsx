import React from 'react';
import { BookOpen, Star, ArrowRight, Clock, Zap, ShieldCheck, Euro, Globe, FileText, Scale, TrendingUp, Award, Calendar, Users, CheckCircle2, Sparkles } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';

// Composant SVG animé pour l'illustration
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
      @keyframes pulse-soft-blog {
        0% { opacity: 0.6; transform: scale(0.98); }
        100% { opacity: 1; transform: scale(1.02); }
      }
      .animate-pulse-soft {
        animation: pulse-soft-blog 2s ease-in-out infinite alternate;
      }
    `}</style>
  </svg>
);

interface BlogProps {
  onStart: () => void;
}

export const Blog: React.FC<BlogProps> = ({ onStart }) => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const isFrench = i18n.language === 'fr';

  // Articles de blog enrichis avec contenu expert
  const blogPosts = [
    {
      id: 'guide-conformite-facturation-2026',
      title: isFrench ? "Réforme de la Facturation 2026 : Tout ce que les Freelances et PME doivent savoir" : "2026 Invoicing Reform: Everything Freelancers and SMEs Need to Know",
      description: isFrench 
        ? "Le 1er septembre 2026, la facturation électronique devient obligatoire pour toutes les transactions B2B. Découvrez les 5 mentions indispensables, les échéances clés et comment préparer votre transition avec InvoiceGEN, 100% gratuit."
        : "From September 1, 2026, electronic invoicing becomes mandatory for all B2B transactions. Discover the 5 essential mentions, key deadlines, and how to prepare your transition with InvoiceGEN, 100% free.",
      readingTime: "12 min",
      category: isFrench ? "Guide Expert 2026" : "Expert Guide 2026",
      icon: <Calendar size={24} />,
      tags: ["facturation électronique", "réforme 2026", "PDP", "UBL CII"]
    },
    {
      id: 'article-293-b-cgi-franchise-tva',
      title: isFrench ? "Article 293 B du CGI : Le guide complet de la franchise en base de TVA" : "Article 293 B of the French Tax Code: Complete Guide to VAT Exemption",
      description: isFrench 
        ? "Comprenez les seuils de franchise TVA (91 900€ pour les services, 94 300€ pour le commerce), les mentions obligatoires sur vos factures, et les conséquences du dépassement. Exemples concrets et conseils d'experts."
        : "Understand the VAT exemption thresholds (€91,900 for services, €94,300 for commerce), mandatory invoice mentions, and consequences of exceeding limits. Concrete examples and expert advice.",
      readingTime: "8 min",
      category: isFrench ? "Fiscalité" : "Taxation",
      icon: <Scale size={24} />,
      tags: ["article 293 B", "franchise TVA", "CGI", "seuils TVA"]
    },
    {
      id: 'autoliquidation-tva-reverse-charge',
      title: isFrench ? "Autoliquidation de la TVA (Reverse Charge) : Mécanisme et cas d'application" : "VAT Reverse Charge: Mechanism and Application Cases",
      description: isFrench 
        ? "Découvrez le mécanisme de reverse charge prévu à l'article 283-2 du CGI. Prestations intracommunautaires, travaux BTP, produits électroniques : comment gérer l'autoliquidation sur vos factures."
        : "Discover the reverse charge mechanism provided for in Article 283-2 of the French Tax Code. Intra-community services, construction works, electronic products: how to manage reverse charge on your invoices.",
      readingTime: "10 min",
      category: isFrench ? "TVA" : "VAT",
      icon: <Zap size={24} />,
      tags: ["autoliquidation", "reverse charge", "article 283-2", "BTP"]
    },
    {
      id: 'mentions-legales-obligatoires-facture',
      title: isFrench ? "Mentions légales obligatoires : Les 12 éléments qui rendent votre facture conforme" : "Mandatory Legal Mentions: The 12 Elements That Make Your Invoice Compliant",
      description: isFrench 
        ? "Articles L. 441-3 et L. 441-4 du Code de commerce : numérotation unique, SIRET, TVA intracommunautaire, pénalités de retard, indemnité de recouvrement (40€). Checklist complète."
        : "Articles L. 441-3 and L. 441-4 of the French Commercial Code: unique numbering, SIRET, intra-community VAT, late payment penalties, recovery indemnity (€40). Complete checklist.",
      readingTime: "7 min",
      category: isFrench ? "Juridique" : "Legal",
      icon: <FileText size={24} />,
      tags: ["mentions légales", "Code de commerce", "pénalités de retard", "SIRET"]
    },
    {
      id: 'tva-intracommunautaire-guide',
      title: isFrench ? "TVA intracommunautaire : Guide pratique pour les transactions transfrontalières" : "Intra-Community VAT: Practical Guide for Cross-Border Transactions",
      description: isFrench 
        ? "Validation VIES, numéro de TVA intracommunautaire (FR + clé + SIREN), exonération article 262 ter, autoliquidation. Tout savoir pour facturer vos clients européens."
        : "VIES validation, intra-community VAT number (FR + key + SIREN), exemption Article 262 ter, reverse charge. Everything you need to know to invoice your European clients.",
      readingTime: "9 min",
      category: isFrench ? "International" : "International",
      icon: <Globe size={24} />,
      tags: ["TVA intracommunautaire", "VIES", "article 262 ter", "transfrontalier"]
    },
    {
      id: 'facturation-electronique-2026-pdp',
      title: isFrench ? "Plateformes de Dématérialisation Partenaires (PDP) : Comment choisir la bonne solution" : "Partner Dematerialization Platforms (PDP): How to Choose the Right Solution",
      description: isFrench 
        ? "Le portail public de facturation (PPF) vs les PDP : critères de sélection, coûts, fonctionnalités. Préparez votre entreprise à la réforme 2026 dès aujourd'hui."
        : "Public Invoicing Portal (PPF) vs PDPs: selection criteria, costs, features. Prepare your business for the 2026 reform today.",
      readingTime: "11 min",
      category: isFrench ? "Technologie" : "Technology",
      icon: <Sparkles size={24} />,
      tags: ["PDP", "PPF", "facture électronique", "dématérialisation"]
    },
    {
      id: 'bonnes-pratiques-facturation',
      title: isFrench ? "10 bonnes pratiques pour une facturation professionnelle irréprochable" : "10 Best Practices for Impeccable Professional Invoicing",
      description: isFrench 
        ? "Numérotation chronologique, délais de paiement, pénalités de retard, relances automatisées. Optimisez votre trésorerie et évitez les contentieux."
        : "Chronological numbering, payment deadlines, late payment penalties, automated reminders. Optimize your cash flow and avoid disputes.",
      readingTime: "6 min",
      category: isFrench ? "Conseils" : "Tips",
      icon: <TrendingUp size={24} />,
      tags: ["bonnes pratiques", "trésorerie", "relances", "paiements"]
    },
    {
      id: 'ia-facturation-magic-fill',
      title: isFrench ? "L'IA au service de la facturation : Comment Magic Fill révolutionne votre productivité" : "AI in Invoicing: How Magic Fill Revolutionizes Your Productivity",
      description: isFrench 
        ? "Extraction automatique des données clients et articles grâce à l'intelligence artificielle. Gagnez 80% de temps sur la saisie de vos factures."
        : "Automatic extraction of client data and line items using artificial intelligence. Save 80% of time on invoice entry.",
      readingTime: "5 min",
      category: isFrench ? "Innovation" : "Innovation",
      icon: <Sparkles size={24} />,
      tags: ["IA", "automatisation", "Magic Fill", "productivité"]
    }
  ];

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-white to-gray-50">
      {/* Contenu SEO invisible - Texte expert 1000+ mots */}
      <div className="sr-only" aria-hidden="false">
        <h1>Blog InvoiceGEN - Guides experts sur la facturation conforme à l'article 293 B du CGI</h1>
        <h2>Ressources pour freelances, micro-entrepreneurs et PME sur la facturation professionnelle</h2>
        
        <h3>Article 293 B du CGI : Tout savoir sur la franchise en base de TVA</h3>
        <p>L'article 293 B du Code général des impôts définit le régime de franchise en base de TVA. Ce régime simplifié s'applique aux entreprises dont le chiffre d'affaires annuel n'excède pas 91 900 € pour les prestations de services et professions libérales, et 94 300 € pour les activités de commerce et d'hébergement (seuils 2026). Les entreprises sous ce régime ne facturent pas la TVA à leurs clients et ne peuvent pas la récupérer sur leurs achats. La mention légale "TVA non applicable, article 293 B du CGI" doit impérativement figurer sur toutes les factures émises par les bénéficiaires de la franchise.</p>
        
        <h3>Autoliquidation de la TVA (reverse charge) : Mécanisme fiscal essentiel</h3>
        <p>L'autoliquidation de la TVA, également appelée reverse charge, est un mécanisme fiscal prévu à l'article 283-2 du CGI qui transfère l'obligation de déclaration et de paiement de la TVA du prestataire au client. Ce dispositif concerne principalement les prestations de services entre assujettis établis dans différents États membres de l'Union européenne, les opérations dans le secteur du BTP (travaux immobiliers), les livraisons de certains produits électroniques, télécoms et de télédiffusion, ainsi que les cessions de quotas d'émission de gaz à effet de serre. Sur une facture soumise à autoliquidation, la mention "TVA autoliquidée par le preneur - article 283 du CGI" doit apparaître clairement.</p>
        
        <h3>Réforme de la facturation électronique 2026 : Calendrier et obligations</h3>
        <p>À compter du 1er septembre 2026, toutes les transactions entre professionnels assujettis à la TVA (B2B) devront être transmises via une plateforme de dématérialisation partenaire (PDP) ou via le portail public de facturation (PPF). Les formats obligatoires sont UBL (Universal Business Language) et CII (Cross Industry Invoice). L'archivage des factures devra être effectué au format PDF/A-3, seul format d'archivage légal reconnu par l'administration fiscale. Le calendrier prévoit un déploiement progressif : grandes entreprises et ETI dès septembre 2026, PME et micro-entreprises à partir de septembre 2027.</p>
        
        <h3>Mentions légales obligatoires sur les factures professionnelles</h3>
        <p>Conformément aux articles L. 441-3 et L. 441-4 du Code de commerce, toute facture professionnelle doit comporter : un numéro unique et chronologique, la date d'émission, la date de livraison ou de prestation si différente, le nom et SIRET du vendeur, le nom et adresse du client (SIRET et TVA intracommunautaire si professionnel), le code NAF/APE, la description précise des produits/services, quantité et prix unitaire HT, taux et montant de TVA, conditions de paiement (échéances, escomptes, pénalités), taux des pénalités de retard (taux d'intérêt légal + 10 points), montant de l'indemnité forfaitaire pour frais de recouvrement (40 €), et les mentions spécifiques au régime fiscal.</p>
        
        <h3>TVA intracommunautaire et transactions internationales</h3>
        <p>Pour les opérations transfrontalières, la gestion de la TVA intracommunautaire est cruciale. Les livraisons de biens entre États membres sont exonérées de TVA sous réserve de justifier du transport et de la détention d'un numéro de TVA valide (article 262 ter du CGI). Les prestations de services sont soumises à autoliquidation lorsque le client est un assujetti. La validation des numéros de TVA via le système VIES (VAT Information Exchange System) est recommandée pour s'assurer de la validité des numéros intracommunautaires.</p>
        
        <h3>Bonnes pratiques de facturation pour optimiser votre trésorerie</h3>
        <p>Pour une facturation professionnelle irréprochable, nous recommandons : une numérotation chronologique ininterrompue (ex: F2026-001), la mention systématique des délais de paiement (30 jours fin de mois, 60 jours, etc.), le calcul précis des pénalités de retard (3 fois le taux d'intérêt légal minimum), l'émission de factures d'acompte pour les prestations longues, et l'automatisation des relances pour les factures impayées. Ces bonnes pratiques vous permettent d'optimiser votre trésorerie et d'éviter les contentieux en cas d'impayés.</p>
      </div>

      {/* Background Accents */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none">
        <div className="absolute top-1/4 -left-24 w-96 h-96 bg-indigo-500/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-1/4 -right-24 w-96 h-96 bg-blue-500/5 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto space-y-16 pt-32 pb-20 px-6 relative z-10">
        {/* En-tête avec h1 optimisé */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
          <div className="space-y-6 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-50 text-indigo-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-indigo-100">
              <Star size={14} fill="currentColor" />
              {t('blog.expertResource', { defaultValue: "Ressources Experts" })}
            </div>
            <h1 className="text-5xl lg:text-7xl font-black tracking-tighter leading-[1.1] text-gray-900">
              {t('blog.heroTitle', { defaultValue: "Blog & Guides" })}
              <span className="block text-indigo-600 text-3xl lg:text-5xl mt-2">
                {isFrench ? "Facturation conforme 2026" : "Compliant Invoicing 2026"}
              </span>
            </h1>
          </div>
          <p className="text-lg text-gray-500 font-medium max-w-md leading-relaxed border-l-4 border-indigo-500 pl-6">
            {t('blogPost2026.description', { 
              defaultValue: "Découvrez nos conseils pour optimiser votre facturation, rester conforme à l'article 293 B du CGI et gagner du temps au quotidien." 
            })}
          </p>
        </header>

        {/* Featured Post - Article principal */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          <motion.div 
            whileHover={{ y: -8 }}
            onClick={() => navigate(`/blog/${blogPosts[0].id}`)}
            className="lg:col-span-8 group cursor-pointer relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl overflow-hidden shadow-2xl shadow-indigo-900/20 border border-gray-700"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 via-transparent to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            
            <div className="relative aspect-[16/9] md:aspect-auto md:h-[500px] flex flex-col justify-end p-8 md:p-12">
              <div className="absolute top-8 right-8 w-64 h-64 bg-indigo-500/20 blur-[80px] rounded-full group-hover:scale-125 transition-transform duration-1000" />
              
              <div className="relative z-10 space-y-6 max-w-2xl">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="px-3 py-1 bg-indigo-600 text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg shadow-indigo-900/50">
                    {blogPosts[0].category}
                  </span>
                  <span className="text-indigo-300 text-[10px] font-black uppercase tracking-widest flex items-center gap-1">
                    <Clock size={12} /> {blogPosts[0].readingTime}
                  </span>
                </div>
                <h2 className="text-3xl lg:text-5xl font-black text-white tracking-tighter leading-[1.1]">
                  {blogPosts[0].title}
                </h2>
                <p className="text-base text-gray-300 font-medium leading-relaxed">
                  {blogPosts[0].description}
                </p>
                <div className="flex items-center gap-4 pt-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-gray-900 font-black text-sm shadow-lg">
                      IG
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white">{t('blog.authorName', { defaultValue: "Équipe InvoiceGEN" })}</p>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{t('blog.authorRole', { defaultValue: "Expert Fintech" })}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Side Resources - Badges et ressources rapides */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-2xl p-6 border border-indigo-100">
              <div className="flex items-center gap-2 mb-4">
                <AnimatedShieldIcon className="text-indigo-600" />
                <h3 className="text-sm font-black uppercase tracking-wider text-indigo-800">
                  {isFrench ? "Articles clés" : "Key Articles"}
                </h3>
              </div>
              <div className="space-y-3">
                {blogPosts.slice(1, 4).map((post, idx) => (
                  <button
                    key={post.id}
                    onClick={() => navigate(`/blog/${post.id}`)}
                    className="w-full text-left p-3 rounded-xl hover:bg-white transition-all group"
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 text-indigo-500 group-hover:scale-110 transition-transform">
                        {post.icon}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-gray-800 group-hover:text-indigo-600 transition-colors">
                          {post.title.length > 60 ? post.title.substring(0, 60) + '...' : post.title}
                        </h4>
                        <p className="text-xs text-gray-500 mt-1 line-clamp-2">{post.description.substring(0, 80)}...</p>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-[9px] font-mono text-indigo-500 uppercase">{post.category}</span>
                          <span className="text-[9px] text-gray-400">•</span>
                          <span className="text-[9px] text-gray-400">{post.readingTime}</span>
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Grille des articles de blog */}
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <BookOpen size={24} className="text-indigo-600" />
              {isFrench ? "Tous nos articles" : "All articles"}
            </h2>
            <div className="flex items-center gap-2 text-xs text-gray-500 bg-gray-100 px-3 py-1.5 rounded-full">
              <span>📚</span> {blogPosts.length} articles
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.slice(1).map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -4 }}
                onClick={() => navigate(`/blog/${post.id}`)}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer border border-gray-100 group"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      index % 2 === 0 ? 'bg-indigo-50 text-indigo-600' : 'bg-blue-50 text-blue-600'
                    } group-hover:scale-110 transition-transform`}>
                      {post.icon}
                    </div>
                    <span className="text-[10px] font-mono text-gray-400 uppercase">{post.readingTime}</span>
                  </div>
                  <div className="mb-3">
                    <span className="text-[10px] font-black uppercase tracking-wider text-indigo-500 bg-indigo-50 px-2 py-0.5 rounded">
                      {post.category}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-indigo-600 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-sm text-gray-500 line-clamp-3 mb-4">
                    {post.description}
                  </p>
                  <div className="flex items-center gap-2 text-indigo-600 font-medium text-sm group-hover:gap-3 transition-all">
                    <span>{isFrench ? "Lire l'article" : "Read article"}</span>
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA Section avec éléments visuels */}
        <div className="mt-16 bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-3xl p-8 md:p-12 text-white shadow-2xl shadow-indigo-200 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full -ml-32 -mb-32 blur-3xl" />
          
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left space-y-3">
              <div className="flex items-center justify-center md:justify-start gap-2">
                <Sparkles size={20} className="text-yellow-300" />
                <span className="text-xs font-black uppercase tracking-wider text-yellow-200">
                  {isFrench ? "Prêt pour la réforme 2026 ?" : "Ready for the 2026 reform?"}
                </span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold">
                {isFrench ? "Générez votre première facture conforme" : "Generate your first compliant invoice"}
              </h3>
              <p className="text-indigo-100 text-sm max-w-md">
                {isFrench 
                  ? "100% gratuit, sans inscription. Conforme à l'article 293 B du CGI et aux règles d'autoliquidation."
                  : "100% free, no signup. Compliant with Article 293 B and reverse charge rules."}
              </p>
            </div>
            <button
              onClick={onStart}
              className="px-8 py-4 bg-white text-indigo-700 rounded-2xl font-black text-sm uppercase tracking-wider hover:scale-105 transition-transform shadow-xl flex items-center gap-2"
            >
              <FileText size={18} />
              {isFrench ? "Créer ma facture" : "Create my invoice"}
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Composant ResourceCard (conservé pour compatibilité, mais intégré dans le composant principal)
function ResourceCard({ title, desc, icon, color, onClick }: { title: string, desc: string, icon: React.ReactNode, color: 'blue' | 'indigo', onClick?: () => void }) {
  return (
    <motion.div 
      whileHover={{ y: -4, scale: 1.02 }}
      onClick={onClick}
      className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 flex flex-col gap-6 group cursor-pointer relative overflow-hidden"
    >
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-lg transition-transform group-hover:scale-110 ${
        color === 'blue' ? 'bg-blue-600' : 'bg-indigo-600'
      }`}>
        {icon}
      </div>
      <div className="space-y-3">
        <h4 className="text-xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">{title}</h4>
        <p className="text-gray-500 leading-relaxed">{desc}</p>
      </div>
      <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-indigo-600 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-0 -translate-x-2">
        {title.includes("IA") ? "Découvrir" : "Lire la suite"} <ArrowRight size={16} />
      </div>
    </motion.div>
  );
}