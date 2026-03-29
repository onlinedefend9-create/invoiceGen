import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Cookie, X, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

export const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 2000);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-6 left-6 right-6 md:left-auto md:right-6 md:max-w-md z-[100]"
        >
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-6 flex flex-col gap-4">
            <div className="flex items-start justify-between gap-4">
              <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 flex-shrink-0">
                <Cookie size={20} />
              </div>
              <button 
                onClick={() => setIsVisible(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="space-y-2">
              <h3 className="font-bold text-gray-900 flex items-center gap-2">
                Respect de votre vie privée
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Nous utilisons des cookies pour analyser le trafic et personnaliser les annonces via Google AdSense. 
                Cela nous permet de maintenir cet outil gratuit pour tous les indépendants.
              </p>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={handleAccept}
                className="flex-1 bg-indigo-600 text-white py-2.5 rounded-xl text-sm font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100"
              >
                Accepter
              </button>
              <Link
                to="/politique-confidentialite"
                className="flex-1 bg-gray-50 text-gray-700 py-2.5 rounded-xl text-sm font-bold hover:bg-gray-100 transition-all border border-gray-100 text-center"
              >
                En savoir plus
              </Link>
            </div>
            
            <div className="flex items-center gap-1.5 text-[10px] text-gray-400 font-medium">
              <ShieldCheck size={12} className="text-emerald-500" />
              Conforme RGPD & Google Consent Mode v2
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
