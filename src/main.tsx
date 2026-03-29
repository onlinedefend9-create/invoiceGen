/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * InvoiceGEN - Générateur de facture gratuit professionnel
 * Point d'entrée principal de l'application
 * 
 * Version: 2.0.0 - 2026
 * Conforme à l'article 293 B du CGI & autoliquidation TVA
 * 
 * Ce fichier initialise l'application React avec :
 * - Le routage (React Router)
 * - La gestion des métadonnées SEO (Helmet)
 * - La configuration i18n multilingue
 * - Les styles globaux Tailwind CSS
 * 
 * Optimisations SEO :
 * - Balises meta dynamiques via Helmet
 * - Support multilingue (fr/en)
 * - Structure sémantique pour les moteurs de recherche
 * - Données structurées JSON-LD
 * - Sitemap et robots.txt
 * 
 * Conformité fiscale :
 * - Article 293 B du CGI (franchise en base de TVA)
 * - Article 283-2 du CGI (autoliquidation / reverse charge)
 * - Articles L. 441-3 et L. 441-4 du Code de commerce
 * - Réforme de la facturation électronique 2026
 */

import React, { StrictMode, Component, ErrorInfo, ReactNode, useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import App from './App';
import './index.css';
import './i18n';
import { useInvoiceStore } from './store/useInvoiceStore';

// Error Boundary minimaliste pour éviter la page blanche totale
class ErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
          <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
            <h1 className="text-2xl font-bold text-red-600 mb-4">Oups ! Une erreur est survenue.</h1>
            <p className="text-gray-600 mb-6">L'application a rencontré un problème inattendu. Veuillez rafraîchir la page.</p>
            <button 
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all"
            >
              Rafraîchir la page
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

// Composant de chargement sécurisé avec hydratation différée
const RootApp = () => {
  const _hasHydrated = useInvoiceStore((state) => state._hasHydrated);

  if (!_hasHydrated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
          <p className="text-sm font-medium text-gray-500 animate-pulse">Initialisation sécurisée...</p>
        </div>
      </div>
    );
  }

  return <App />;
};

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(
    <StrictMode>
      <ErrorBoundary>
        <HelmetProvider>
          <BrowserRouter>
            <RootApp />
          </BrowserRouter>
        </HelmetProvider>
      </ErrorBoundary>
    </StrictMode>
  );
}
