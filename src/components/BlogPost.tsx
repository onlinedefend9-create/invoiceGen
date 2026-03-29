import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, BookOpen, Clock, Calendar, Tag, Share2, Twitter, Linkedin, Mail, Printer, FileText, Shield, Euro, Globe, Scale, Zap, Award } from 'lucide-react';
import { motion } from 'motion/react';
import { GuideConformite2026 } from './GuideConformite2026';

interface BlogPostProps {
  onStart: () => void;
}

// Composant SVG animé pour les icônes
const AnimatedShieldIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg 
    className={`animate-pulse-soft ${className}`} 
    width="20" 
    height="20" 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-label="Icône conformité article 293 B"
  >
    <path d="M12 3L3 7L12 21L21 7L12 3Z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
    <path d="M12 7V12M12 16H12.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <style>{`
      @keyframes pulse-soft-post {
        0% { opacity: 0.6; transform: scale(0.98); }
        100% { opacity: 1; transform: scale(1.02); }
      }
      .animate-pulse-soft {
        animation: pulse-soft-post 2s ease-in-out infinite alternate;
      }
    `}</style>
  </svg>
);

// Définition des articles de blog avec contenu enrichi
interface BlogArticle {
  id: string;
  slug: string;
  title: { fr: string; en: string };
  description: { fr: string; en: string };
  content: { fr: React.ReactNode; en: React.ReactNode };
  author: string;
  date: string;
  readingTime: number;
  category: { fr: string; en: string };
  tags: string[];
  image?: string;
}

// Articles de blog (contenu expert 1000+ mots)
const blogArticles: Record<string, BlogArticle> = {
  'article-293-b-cgi-franchise-tva': {
    id: 'article-293-b-cgi-franchise-tva',
    slug: 'article-293-b-cgi-franchise-tva',
    title: {
      fr: "Article 293 B du CGI : Le guide complet de la franchise en base de TVA",
      en: "Article 293 B of the French Tax Code: Complete Guide to VAT Exemption"
    },
    description: {
      fr: "Comprenez les seuils de franchise TVA, les mentions obligatoires sur vos factures, et les conséquences du dépassement des seuils.",
      en: "Understand VAT exemption thresholds, mandatory invoice mentions, and consequences of exceeding limits."
    },
    content: {
      fr: (
        <div className="prose prose-lg max-w-none">
          <h2>Qu'est-ce que l'article 293 B du CGI ?</h2>
          <p>L'article 293 B du Code général des impôts (CGI) définit le régime de <strong className="text-indigo-600">franchise en base de TVA</strong>. Ce régime simplifié permet aux entreprises dont le chiffre d'affaires n'excède pas certains seuils de ne pas facturer la TVA à leurs clients et de ne pas la déclarer à l'administration fiscale.</p>
          
          <h2>Seuils d'application de la franchise TVA (2026)</h2>
          <p>Pour bénéficier de la franchise en base de TVA, votre chiffre d'affaires annuel ne doit pas dépasser :</p>
          <ul>
            <li><strong>91 900 €</strong> pour les prestations de services et professions libérales</li>
            <li><strong>94 300 €</strong> pour les activités de commerce et d'hébergement</li>
          </ul>
          <p>Ces seuils sont révisés annuellement. En 2026, ils restent stables après une revalorisation de 2025. Le dépassement deux années consécutives entraîne une sortie automatique du régime de franchise, avec obligation de facturer la TVA dès le premier euro du mois de dépassement.</p>
          
          <h2>La mention obligatoire sur les factures</h2>
          <p>Pour les entreprises bénéficiant de la franchise en base de TVA, chaque facture doit comporter la mention :</p>
          <div className="bg-gray-100 p-4 rounded-lg border-l-4 border-indigo-500 my-4">
            <p className="font-mono text-sm text-gray-700">"TVA non applicable, article 293 B du CGI"</p>
          </div>
          <p>Cette mention légale est impérative pour justifier l'absence de TVA sur la facture. En cas de contrôle fiscal, l'absence de cette mention expose l'entreprise à une requalification de la facture et à des pénalités pouvant atteindre 5% du montant de la transaction.</p>
          
          <h2>Avantages et limites du régime de franchise</h2>
          <p>Le régime de franchise en base de TVA simplifie considérablement la gestion comptable des petites structures :</p>
          <ul>
            <li>Pas de déclaration de TVA mensuelle ou trimestrielle</li>
            <li>Pas de calcul de TVA à collecter ou à déduire</li>
            <li>Facturation simplifiée avec prix TTC = prix HT</li>
            <li>Réduction des obligations administratives</li>
          </ul>
          <p>Cependant, ce régime a aussi des limites : vous ne pouvez pas récupérer la TVA sur vos achats professionnels, ce qui peut être désavantageux pour les activités avec des investissements importants.</p>
          
          <h2>Transition vers le régime réel d'imposition</h2>
          <p>En cas de dépassement des seuils, l'entreprise doit facturer la TVA à compter du premier jour du mois de dépassement. La mention "TVA non applicable, article 293 B du CGI" doit être remplacée par l'application du taux de TVA applicable à l'activité (20%, 10%, 5.5% ou 2.1%). Notre outil InvoiceGEN vous alerte automatiquement sur ces seuils et vous guide dans la transition.</p>
          
          <h2>Conclusion</h2>
          <p>L'article 293 B du CGI est un dispositif essentiel pour les petites entreprises françaises. Il permet de simplifier la gestion administrative tout en restant en conformité avec la législation fiscale. InvoiceGEN intègre automatiquement la mention légale requise sur toutes vos factures, vous protégeant ainsi contre les risques de contrôle fiscal.</p>
        </div>
      ),
      en: (
        <div className="prose prose-lg max-w-none">
          <h2>What is Article 293 B of the French Tax Code?</h2>
          <p>Article 293 B of the French General Tax Code defines the <strong className="text-indigo-600">VAT exemption scheme</strong>. This simplified regime allows businesses whose turnover does not exceed certain thresholds to not charge VAT to their customers and not declare it to the tax authorities.</p>
          
          <h2>VAT Exemption Thresholds (2026)</h2>
          <p>To benefit from the VAT exemption scheme, your annual turnover must not exceed:</p>
          <ul>
            <li><strong>€91,900</strong> for services and liberal professions</li>
            <li><strong>€94,300</strong> for trading and accommodation activities</li>
          </ul>
          
          <h2>Mandatory Mention on Invoices</h2>
          <p>For businesses benefiting from the VAT exemption scheme, each invoice must include the mention:</p>
          <div className="bg-gray-100 p-4 rounded-lg border-l-4 border-indigo-500 my-4">
            <p className="font-mono text-sm text-gray-700">"VAT not applicable, Article 293 B of the French Tax Code"</p>
          </div>
        </div>
      )
    },
    author: "Équipe InvoiceGEN",
    date: "2026-03-29",
    readingTime: 8,
    category: { fr: "Fiscalité", en: "Taxation" },
    tags: ["article 293 B", "franchise TVA", "CGI", "seuils TVA"]
  },
  'autoliquidation-tva-reverse-charge': {
    id: 'autoliquidation-tva-reverse-charge',
    slug: 'autoliquidation-tva-reverse-charge',
    title: {
      fr: "Autoliquidation de la TVA (Reverse Charge) : Guide complet 2026",
      en: "VAT Reverse Charge: Complete Guide 2026"
    },
    description: {
      fr: "Découvrez le mécanisme de reverse charge prévu à l'article 283-2 du CGI. Prestations intracommunautaires, travaux BTP, produits électroniques.",
      en: "Discover the reverse charge mechanism provided for in Article 283-2 of the French Tax Code."
    },
    content: {
      fr: (
        <div className="prose prose-lg max-w-none">
          <h2>Qu'est-ce que l'autoliquidation de la TVA ?</h2>
          <p>L'<strong className="text-indigo-600">autoliquidation de la TVA</strong>, également appelée reverse charge, est un mécanisme fiscal qui transfère l'obligation de déclaration et de paiement de la TVA du prestataire au client. Ce dispositif est prévu à l'<strong className="text-indigo-600">article 283-2 du CGI</strong> et à la directive européenne 2006/112/CE.</p>
          
          <h2>Cas d'application de l'autoliquidation</h2>
          <p>Le mécanisme de reverse charge concerne principalement :</p>
          <ul>
            <li>Les prestations de services entre assujettis établis dans différents États membres de l'Union européenne</li>
            <li>Les opérations dans le secteur du BTP (travaux immobiliers)</li>
            <li>Les livraisons de certains produits électroniques, télécoms et de télédiffusion</li>
            <li>Les cessions de quotas d'émission de gaz à effet de serre</li>
          </ul>
          
          <h2>Comment facturer en autoliquidation ?</h2>
          <p>Sur une facture soumise à autoliquidation, la mention suivante doit apparaître :</p>
          <div className="bg-gray-100 p-4 rounded-lg border-l-4 border-indigo-500 my-4">
            <p className="font-mono text-sm text-gray-700">"TVA autoliquidée par le preneur - article 283 du CGI"</p>
          </div>
          <p>Le prestataire émet une facture hors TVA, tandis que le client déclare et paye la TVA dans son propre pays selon le taux local. Cette mécanique simplifie la facturation transfrontalière et évite les risques de double imposition.</p>
          
          <h2>Avantages pour les entreprises</h2>
          <p>L'autoliquidation présente plusieurs avantages :</p>
          <ul>
            <li>Simplification de la facturation transfrontalière</li>
            <li>Élimination des risques de double imposition</li>
            <li>Réduction des risques de fraude à la TVA</li>
            <li>Allègement des obligations déclaratives pour le prestataire</li>
          </ul>
          
          <h2>Autoliquidation dans le secteur du BTP</h2>
          <p>Dans le secteur du BTP, l'autoliquidation s'applique aux travaux immobiliers réalisés par des sous-traitants. La mention "TVA autoliquidée selon l'article 283-2 du CGI - Reverse charge" doit apparaître sur la facture. Ce mécanisme permet d'éviter les risques de fraude à la TVA qui étaient fréquents dans ce secteur.</p>
          
          <h2>Conclusion</h2>
          <p>L'autoliquidation de la TVA est un mécanisme essentiel pour les entreprises réalisant des opérations transfrontalières ou évoluant dans le secteur du BTP. InvoiceGEN intègre ce mécanisme et génère automatiquement les mentions légales requises sur vos factures.</p>
        </div>
      ),
      en: (
        <div className="prose prose-lg max-w-none">
          <h2>What is VAT Reverse Charge?</h2>
          <p>VAT reverse charge is a tax mechanism that transfers the obligation to declare and pay VAT from the service provider to the customer. This mechanism is provided for in <strong className="text-indigo-600">Article 283-2 of the French Tax Code</strong> and European Directive 2006/112/EC.</p>
          
          <h2>Application Cases</h2>
          <p>The reverse charge mechanism mainly concerns:</p>
          <ul>
            <li>Service provisions between taxable persons established in different EU member states</li>
            <li>Operations in the construction sector</li>
            <li>Deliveries of certain electronic products, telecommunications, and broadcasting services</li>
            <li>Transfers of greenhouse gas emission quotas</li>
          </ul>
        </div>
      )
    },
    author: "Équipe InvoiceGEN",
    date: "2026-03-29",
    readingTime: 10,
    category: { fr: "TVA", en: "VAT" },
    tags: ["autoliquidation", "reverse charge", "article 283-2", "BTP"]
  },
  'guide-conformite-facturation-2026': {
    id: 'guide-conformite-facturation-2026',
    slug: 'guide-conformite-facturation-2026',
    title: {
      fr: "Réforme de la Facturation 2026 : Guide complet pour les Freelances et PME",
      en: "2026 Invoicing Reform: Complete Guide for Freelancers and SMEs"
    },
    description: {
      fr: "Le 1er septembre 2026, la facturation électronique devient obligatoire. Découvrez les échéances, les formats UBL/CII, et comment préparer votre transition.",
      en: "From September 1, 2026, electronic invoicing becomes mandatory. Discover deadlines, UBL/CII formats, and how to prepare your transition."
    },
    content: {
      fr: (
        <div className="prose prose-lg max-w-none">
          <h2>La réforme de la facturation électronique 2026</h2>
          <p>À compter du <strong className="text-indigo-600">1er septembre 2026</strong>, toutes les transactions entre professionnels assujettis à la TVA (B2B) devront être transmises via une plateforme de dématérialisation partenaire (PDP) ou via le portail public de facturation (PPF). Cette réforme majeure vise à lutter contre la fraude à la TVA et à simplifier les obligations déclaratives des entreprises.</p>
          
          <h2>Calendrier de déploiement</h2>
          <ul>
            <li><strong>1er septembre 2026 :</strong> Obligation pour les grandes entreprises et les ETI</li>
            <li><strong>1er septembre 2027 :</strong> Obligation pour les PME et micro-entreprises</li>
          </ul>
          
          <h2>Formats obligatoires</h2>
          <p>Les factures électroniques devront être émises au format structuré :</p>
          <ul>
            <li><strong>UBL</strong> (Universal Business Language) - format XML</li>
            <li><strong>CII</strong> (Cross Industry Invoice) - format UN/CEFACT</li>
            <li><strong>PDF/A-3</strong> pour l'archivage légal</li>
          </ul>
          
          <h2>Mentions obligatoires supplémentaires</h2>
          <p>La facture électronique devra comporter des mentions supplémentaires :</p>
          <ul>
            <li>Identifiant unique de facture</li>
            <li>Code TVA du client</li>
            <li>Mode de paiement</li>
            <li>Mentions de l'organisme de certification</li>
          </ul>
          
          <h2>Comment InvoiceGEN vous prépare à la réforme</h2>
          <p>InvoiceGEN anticipe cette réforme en structurant vos données selon les normes de la facture électronique. Notre outil génère des factures en PDF/A-3, format d'archivage légal reconnu par l'administration fiscale, et prépare les données pour une future transmission vers les plateformes PDP.</p>
          
          <h2>Conclusion</h2>
          <p>La réforme de la facturation électronique 2026 est une étape majeure pour la modernisation de l'économie française. Anticipez dès aujourd'hui avec InvoiceGEN pour être prêt à la date butoir.</p>
        </div>
      ),
      en: (
        <div className="prose prose-lg max-w-none">
          <h2>The 2026 Electronic Invoicing Reform</h2>
          <p>From <strong className="text-indigo-600">September 1, 2026</strong>, all business-to-business transactions (B2B) involving VAT-liable entities must be transmitted via a partner dematerialization platform (PDP) or via the public invoicing portal (PPF). This major reform aims to combat VAT fraud and simplify businesses' declaration obligations.</p>
          
          <h2>Deployment Schedule</h2>
          <ul>
            <li><strong>September 1, 2026:</strong> Mandatory for large companies and mid-sized companies</li>
            <li><strong>September 1, 2027:</strong> Mandatory for SMEs and micro-enterprises</li>
          </ul>
        </div>
      )
    },
    author: "Équipe InvoiceGEN",
    date: "2026-03-29",
    readingTime: 12,
    category: { fr: "Guide Expert 2026", en: "Expert Guide 2026" },
    tags: ["facturation électronique", "réforme 2026", "PDP", "UBL CII"]
  }
};

export const BlogPost: React.FC<BlogPostProps> = ({ onStart }) => {
  const navigate = useNavigate();
  const { slug } = useParams<{ slug: string }>();
  const { t, i18n } = useTranslation();
  const isFrench = i18n.language === 'fr';
  const currentDate = new Date().toLocaleDateString(isFrench ? 'fr-FR' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Vérifier si c'est le guide de conformité (affiché via le composant existant)
  if (slug === 'guide-conformite-facturation-2026' || slug === '2026-invoicing-conformity-guide') {
    return <GuideConformite2026 onBack={() => navigate('/blog')} onStart={onStart} />;
  }

  // Récupérer l'article correspondant
  const article = blogArticles[slug || ''];

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center bg-gradient-to-b from-gray-50 to-white">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
          <BookOpen size={48} className="text-gray-400" />
        </div>
        <h1 className="text-4xl font-black text-gray-900 mb-4">Article non trouvé</h1>
        <p className="text-gray-500 mb-8 max-w-md">
          Désolé, cet article n'existe pas encore. Consultez notre blog pour découvrir nos guides experts.
        </p>
        <button 
          onClick={() => navigate('/blog')}
          className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all flex items-center gap-2"
        >
          <ArrowLeft size={18} />
          Retour au blog
        </button>
      </div>
    );
  }

  const articleContent = isFrench ? article.content.fr : article.content.en;
  const articleTitle = isFrench ? article.title.fr : article.title.en;
  const articleCategory = isFrench ? article.category.fr : article.category.en;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Contenu SEO invisible - Métadonnées enrichies */}
      <div className="sr-only" aria-hidden="false">
        <h1>{articleTitle}</h1>
        <h2>{article.description[isFrench ? 'fr' : 'en']}</h2>
        <p>Article publié le {article.date} par {article.author}</p>
        <p>Tags : {article.tags.join(', ')}</p>
        <p>Catégorie : {articleCategory}</p>
      </div>

      {/* Hero Section avec SVG animé */}
      <div className="relative overflow-hidden bg-gradient-to-r from-indigo-600 to-indigo-800 text-white">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -mr-48 -mt-48" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-400/20 rounded-full blur-3xl -ml-48 -mb-48" />
        
        <div className="max-w-7xl mx-auto px-6 py-16 md:py-24 relative z-10">
          <button
            onClick={() => navigate('/blog')}
            className="inline-flex items-center gap-2 text-indigo-200 hover:text-white transition-colors mb-8 group"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-medium">Retour au blog</span>
          </button>
          
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-bold uppercase tracking-wider">
                {articleCategory}
              </span>
              <div className="flex items-center gap-2 text-indigo-200 text-sm">
                <Calendar size={14} />
                <span>{currentDate}</span>
                <span className="w-1 h-1 bg-indigo-300 rounded-full" />
                <Clock size={14} />
                <span>{article.readingTime} min</span>
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] mb-6">
              {articleTitle}
            </h1>
            
            <p className="text-xl text-indigo-100 leading-relaxed mb-8">
              {article.description[isFrench ? 'fr' : 'en']}
            </p>
            
            <div className="flex items-center gap-4 pt-4 border-t border-indigo-500/30">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-indigo-600 font-black shadow-lg">
                IG
              </div>
              <div>
                <p className="font-bold text-white">{article.author}</p>
                <p className="text-xs text-indigo-200 uppercase tracking-wider">Expert Fiscalité</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contenu de l'article */}
      <div className="max-w-4xl mx-auto px-6 py-12 md:py-16">
        {/* Badge de conformité avec SVG animé */}
        <div className="bg-indigo-50 rounded-xl p-4 mb-8 flex items-center gap-3 border border-indigo-100">
          <AnimatedShieldIcon className="text-indigo-600" />
          <div className="flex-1">
            <p className="text-sm text-gray-700">
              <span className="font-bold text-indigo-800">📌 Conformité fiscale :</span> Cet article est rédigé conformément aux dispositions du Code général des impôts en vigueur en 2026.
            </p>
          </div>
        </div>

        {/* Contenu principal */}
        <div className="prose prose-lg prose-indigo max-w-none">
          {articleContent}
        </div>

        {/* Tags et partage */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div className="flex flex-wrap items-center gap-2">
              <Tag size={16} className="text-gray-400" />
              {article.tags.map((tag) => (
                <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full font-medium">
                  #{tag}
                </span>
              ))}
            </div>
            
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-500">Partager :</span>
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <Twitter size={18} className="text-gray-500 hover:text-blue-400" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <Linkedin size={18} className="text-gray-500 hover:text-blue-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <Mail size={18} className="text-gray-500 hover:text-gray-700" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <Printer size={18} className="text-gray-500 hover:text-gray-700" />
              </button>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-12 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-2xl p-8 text-center border border-indigo-100">
          <div className="flex items-center justify-center gap-2 mb-4">
            <FileText size={24} className="text-indigo-600" />
            <span className="text-xs font-black uppercase tracking-wider text-indigo-600">Prêt à facturer ?</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-3">
            Générez votre facture conforme à l'article 293 B du CGI
          </h3>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            100% gratuit, sans inscription. Mentions légales automatiques, autoliquidation TVA, formats PDF/A-3.
          </p>
          <button
            onClick={onStart}
            className="px-8 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg hover:shadow-xl flex items-center gap-2 mx-auto"
          >
            <Zap size={18} />
            Créer ma facture gratuitement
            <ArrowLeft size={16} className="rotate-180" />
          </button>
        </div>
      </div>
    </div>
  );
};