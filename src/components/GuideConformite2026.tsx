import React, { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { ArrowLeft, Clock, Calendar, User, CheckCircle2, AlertCircle, Zap, ArrowRight, ShieldCheck } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const GuideConformite2026: React.FC<{ onBack: () => void, onStart: () => void }> = ({ onBack, onStart }) => {
  const { t } = useTranslation();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [readingTime, setReadingTime] = useState(0);

  useEffect(() => {
    const text = document.getElementById('article-content')?.innerText || '';
    const words = text.trim().split(/\s+/).length;
    setReadingTime(Math.ceil(words / 200));
  }, []);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Réforme de la Facturation 2026 : Tout ce que les Freelances et PME doivent savoir pour rester conformes",
    "image": "https://invoicegen.click/og-image-blog.png",
    "author": {
      "@type": "Organization",
      "name": "InvoiceGEN Team"
    },
    "publisher": {
      "@type": "Organization",
      "name": "InvoiceGEN",
      "logo": {
        "@type": "ImageObject",
        "url": "https://invoicegen.click/logo.png"
      }
    },
    "datePublished": "2026-03-27",
    "description": "Guide complet sur la réforme de la facturation électronique 2026 pour les freelances et PME en France. Mentions obligatoires, calendrier et solutions gratuites."
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Accueil",
        "item": "https://invoicegen.click"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Blog",
        "item": "https://invoicegen.click/blog"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Guide Conformité 2026",
        "item": "https://invoicegen.click/blog/guide-conformite-facturation-2026"
      }
    ]
  };

  return (
    <div className="bg-white min-h-screen font-serif">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1.5 bg-blue-600 z-50 origin-left"
        style={{ scaleX }}
      />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 h-20 bg-white/80 backdrop-blur-md z-40 border-b border-slate-100 px-6 flex items-center justify-between font-sans">
        <button onClick={onBack} className="flex items-center gap-2 text-slate-500 hover:text-blue-600 transition-colors font-bold">
          <ArrowLeft size={20} /> Retour au blog
        </button>
        <div className="hidden md:flex items-center gap-4">
          <span className="text-xs font-black uppercase tracking-widest text-slate-400">Lecture en cours</span>
          <div className="w-px h-4 bg-slate-200" />
          <span className="text-xs font-black uppercase tracking-widest text-blue-600">Guide Conformité 2026</span>
        </div>
        <button onClick={onStart} className="bg-blue-600 text-white px-6 py-2.5 rounded-xl text-sm font-black hover:bg-blue-700 transition-all shadow-lg shadow-blue-100">
          Essayer l'outil
        </button>
      </nav>

      <article id="article-content" className="pt-40 pb-32 px-6 max-w-3xl mx-auto">
        {/* Header */}
        <header className="space-y-12 mb-20 font-sans">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full text-[10px] font-black uppercase tracking-widest">
              <ShieldCheck size={14} /> Guide Expert 2026
            </div>
            <h1 className="text-5xl lg:text-7xl font-black tracking-tighter leading-[0.95] text-slate-900">
              Réforme de la Facturation 2026 : Tout ce que les Freelances et PME doivent savoir pour rester conformes.
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-8 text-slate-400 font-bold text-sm border-y border-slate-100 py-6">
            <div className="flex items-center gap-2">
              <User size={18} className="text-blue-600" /> Par l'équipe InvoiceGEN
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={18} /> 27 Mars 2026
            </div>
            <div className="flex items-center gap-2">
              <Clock size={18} /> {readingTime} min de lecture
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="prose prose-slate prose-2xl max-w-none prose-headings:font-sans prose-headings:font-black prose-headings:tracking-tighter prose-p:leading-relaxed prose-p:text-slate-700 prose-li:text-slate-700">
          <p className="text-3xl font-medium text-slate-500 italic border-l-4 border-blue-600 pl-8 mb-16">
            "Le 1er septembre 2026 marquera un tournant historique pour l'économie française. La facturation électronique ne sera plus une option, mais le standard légal pour toutes les entreprises, des micro-entrepreneurs aux grands groupes."
          </p>

          <h2 id="changement">Qu'est-ce qui change concrètement le 1er septembre 2026 ?</h2>
          <p>
            La réforme de la facturation électronique, initialement prévue pour 2024, a été repoussée pour permettre aux entreprises de mieux se préparer. Mais cette fois, l'échéance est ferme. À partir du 1er septembre 2026, toutes les entreprises assujetties à la TVA en France devront être en mesure de **recevoir** des factures électroniques.
          </p>
          <p>
            Pour les grandes entreprises et les ETI, l'obligation d'**émission** commence également à cette date. Pour les PME et les micro-entreprises (freelances), l'obligation d'émission suivra le 1er septembre 2027. Cependant, l'écosystème change dès 2026 : vos clients (s'ils sont de grandes entreprises) exigeront des formats spécifiques.
          </p>
          <p>
            La réforme repose sur deux piliers :
          </p>
          <ul>
            <li><strong>L'e-invoicing :</strong> L'envoi et la réception de factures sous forme électronique structurée (Factur-X, UBL, CII).</li>
            <li><strong>L'e-reporting :</strong> La transmission automatique à l'administration fiscale des données de transaction non couvertes par l'e-invoicing (ventes B2C, transactions internationales).</li>
          </ul>

          {/* CTA Block 1 */}
          <div className="my-20 p-12 bg-blue-600 rounded-[48px] text-white font-sans not-prose shadow-2xl shadow-blue-200 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl group-hover:scale-110 transition-transform duration-700" />
            <div className="relative z-10 space-y-8">
              <h3 className="text-4xl font-black tracking-tighter leading-none">Pas besoin d'un logiciel complexe.</h3>
              <p className="text-xl font-bold opacity-90">Générez votre première facture conforme 2026 en 10 secondes ici.</p>
              <button onClick={onStart} className="px-10 py-5 bg-white text-blue-600 rounded-2xl font-black text-xl hover:scale-105 transition-transform flex items-center gap-3">
                Créer ma facture <Zap size={24} fill="currentColor" />
              </button>
            </div>
          </div>

          <h2 id="mentions">Les 5 mentions obligatoires à ne pas oublier sur vos factures</h2>
          <p>
            En plus des mentions classiques (nom, adresse, SIREN, date), la réforme 2026 introduit de nouvelles exigences de données pour faciliter le traitement automatisé par l'administration fiscale (DGFiP).
          </p>
          <ol>
            <li><strong>Le numéro SIREN du client :</strong> Indispensable pour identifier l'acheteur de manière unique dans l'annuaire central.</li>
            <li><strong>L'adresse de livraison :</strong> Si elle est différente de l'adresse de facturation, elle devient une mention obligatoire.</li>
            <li><strong>La catégorie de l'opération :</strong> Vous devez préciser s'il s'agit d'une livraison de biens, d'une prestation de services ou d'une opération mixte.</li>
            <li><strong>L'option pour le paiement de la TVA d'après les débits :</strong> Si vous avez opté pour ce régime, cette mention doit figurer explicitement.</li>
            <li><strong>Le numéro de facture d'origine :</strong> En cas de facture rectificative ou d'avoir, le lien avec le document initial doit être clair.</li>
          </ol>
          <p>
            L'oubli de l'une de ces mentions peut entraîner des amendes allant jusqu'à 15€ par mention manquante, plafonnées à 25% du montant de la facture. Plus grave encore, cela peut bloquer le paiement de votre client si son système rejette automatiquement la facture non conforme.
          </p>

          <h2 id="pourquoi">Pourquoi les factures papier/Excel ne suffiront plus</h2>
          <p>
            Beaucoup d'indépendants utilisent encore des modèles Excel ou Word. Si ces outils permettent de créer des documents visuellement corrects, ils échouent sur l'aspect "données structurées".
          </p>
          <p>
            Une facture électronique conforme n'est pas juste un PDF. C'est un fichier qui contient des données lisibles par une machine. Le standard français est le format **Factur-X**. Il s'agit d'un PDF (pour l'humain) qui embarque un fichier XML (pour la machine).
          </p>
          <p>
            Excel ne peut pas générer nativement ce type de fichier hybride. De plus, la réforme impose de passer par des plateformes certifiées (PDP) ou le Portail Public (PPF) pour garantir la traçabilité et l'intégrité des échanges. Envoyer un simple PDF par email ne sera plus considéré comme de la facturation électronique légale.
          </p>

          <h2 id="invoicegen">Comment InvoiceGEN vous prépare gratuitement à cette transition</h2>
          <p>
            Chez InvoiceGEN, nous avons anticipé ces changements. Notre mission est de rendre la conformité accessible à tous, sans frais cachés et sans complexité inutile.
          </p>
          <p>
            Voici comment nous vous accompagnons :
          </p>
          <ul>
            <li><strong>Templates mis à jour :</strong> Nos modèles de factures incluent déjà les champs pour les nouvelles mentions obligatoires (SIREN client, type d'opération).</li>
            <li><strong>Format PDF/A :</strong> Nous générons des fichiers PDF haute définition conformes aux normes d'archivage à long terme.</li>
            <li><strong>Architecture Local-First :</strong> Vos données restent chez vous. C'est la garantie d'une sécurité maximale face aux cyberattaques qui visent souvent les bases de données centralisées de facturation.</li>
            <li><strong>Zéro Coût :</strong> Nous croyons que la conformité légale ne devrait pas être une charge financière pour les petits entrepreneurs.</li>
          </ul>

          {/* CTA Block 2 */}
          <div className="my-20 p-12 bg-slate-900 rounded-[48px] text-white font-sans not-prose shadow-2xl relative overflow-hidden">
            <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-blue-600/20 to-transparent" />
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
              <div className="space-y-6">
                <h3 className="text-4xl font-black tracking-tighter leading-none">Prêt pour 2026 ?</h3>
                <p className="text-xl text-slate-400 font-bold">Rejoignez des milliers d'indépendants qui utilisent déjà InvoiceGEN pour leur gestion quotidienne.</p>
              </div>
              <button onClick={onStart} className="shrink-0 px-12 py-6 bg-blue-600 text-white rounded-3xl font-black text-2xl hover:bg-blue-700 transition-all shadow-2xl shadow-blue-900/50 flex items-center gap-3">
                Commencer <ArrowRight size={28} />
              </button>
            </div>
          </div>

          <h2 id="conclusion">Conclusion : N'attendez pas le dernier moment</h2>
          <p>
            La réforme 2026 est une opportunité de moderniser votre gestion. En adoptant dès maintenant les bons réflexes et les bons outils, vous vous assurez une transition sereine.
          </p>
          <p>
            Rappelez-vous que la facturation est le dernier point de contact avec votre client. Une facture propre, conforme et professionnelle est le meilleur moyen de garantir un paiement rapide et de fidéliser vos partenaires.
          </p>
          <p>
            InvoiceGEN reste à vos côtés pour faire de cette contrainte légale un simple formalisme de quelques secondes.
          </p>
        </div>

        {/* Footer */}
        <footer className="mt-32 pt-12 border-t border-slate-100 font-sans">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 bg-slate-900 rounded-[28px] flex items-center justify-center text-white font-black text-3xl shadow-xl">IG</div>
              <div>
                <p className="text-xl font-black text-slate-900">Équipe InvoiceGEN</p>
                <p className="text-sm text-slate-400 font-bold uppercase tracking-widest">Experts en Fintech & Conformité</p>
              </div>
            </div>
            <div className="flex gap-4">
              <button className="p-4 bg-slate-50 hover:bg-blue-50 hover:text-blue-600 rounded-2xl transition-all text-slate-400">
                Partager sur LinkedIn
              </button>
              <button className="p-4 bg-slate-50 hover:bg-blue-50 hover:text-blue-600 rounded-2xl transition-all text-slate-400">
                Partager sur Twitter
              </button>
            </div>
          </div>
        </footer>
      </article>
    </div>
  );
};
