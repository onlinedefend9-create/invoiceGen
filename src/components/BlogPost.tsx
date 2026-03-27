import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { GuideConformite2026 } from './GuideConformite2026';

interface BlogPostProps {
  onStart: () => void;
}

export const BlogPost: React.FC<BlogPostProps> = ({ onStart }) => {
  const navigate = useNavigate();
  const { slug } = useParams<{ slug: string }>();
  // For now, we only have one blog post. 
  // We can expand this logic as we add more articles.
  if (slug === 'guide-conformite-facturation-2026' || slug === '2026-invoicing-conformity-guide') {
    return <GuideConformite2026 onBack={() => navigate('/blog')} onStart={onStart} />;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
      <h1 className="text-4xl font-black text-slate-900 mb-4">Article non trouvé</h1>
      <p className="text-slate-500 mb-8">Désolé, cet article n'existe pas encore.</p>
      <button 
        onClick={() => navigate('/blog')}
        className="px-8 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all"
      >
        Retour au blog
      </button>
    </div>
  );
};
