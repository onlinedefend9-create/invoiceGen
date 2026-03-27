import React from 'react';
import { useTranslation } from 'react-i18next';
import ReactMarkdown from 'react-markdown';
import { Helmet } from 'react-helmet';
import { landingPagesContent } from '../content/landingPages';

interface Props {
  niche: 'auto-entrepreneur' | 'prestation-service' | 'internationale';
  onStart: () => void;
}

export const MiniLandingPage: React.FC<Props> = ({ niche, onStart }) => {
  const { i18n } = useTranslation();
  const lang = i18n.language as 'fr' | 'en';
  const content = landingPagesContent[niche][lang];
  
  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8">
      <Helmet>
        <title>{content.h1}</title>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "InvoiceGEN",
            "operatingSystem": "Web",
            "applicationCategory": "BusinessApplication",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "EUR"
            }
          })}
        </script>
      </Helmet>
      
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-black mb-12 tracking-tight text-slate-900">{content.h1}</h1>
        <div className="prose prose-slate prose-lg max-w-none">
          <ReactMarkdown>{content.content}</ReactMarkdown>
        </div>
        <button onClick={onStart} className="mt-12 px-8 py-4 bg-blue-600 text-white rounded-2xl font-black shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all">
          {i18n.language === 'fr' ? 'Créer ma facture' : 'Create my invoice'}
        </button>
      </div>
    </div>
  );
};
