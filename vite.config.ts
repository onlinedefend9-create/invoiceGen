/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * InvoiceGEN - Générateur de facture gratuit professionnel
 * Configuration Vite pour l'optimisation SEO et performance
 * 
 * Version: 2.0.0 - 2026
 * Conforme à l'article 293 B du CGI & autoliquidation TVA
 * 
 * Ce fichier configure le bundler Vite pour optimiser :
 * - Les performances de chargement (Core Web Vitals)
 * - Le bundle final (tree-shaking, minification)
 * - Les alias pour une meilleure maintenabilité
 * - Les variables d'environnement pour l'IA (Gemini)
 * 
 * Optimisations SEO :
 * - Minification du code JavaScript/CSS
 * - Génération de chunks optimisés pour le lazy loading
 * - Compression des assets
 * - Support du multilingue
 * 
 * Conformité fiscale :
 * - Article 293 B du CGI (franchise en base de TVA)
 * - Article 283-2 du CGI (autoliquidation / reverse charge)
 * - Articles L. 441-3 et L. 441-4 du Code de commerce
 * - Réforme de la facturation électronique 2026
 */

import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import { visualizer } from 'rollup-plugin-visualizer';
import viteCompression from 'vite-plugin-compression';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  const isProduction = mode === 'production';
  const isDevelopment = mode === 'development';

  return {
    /**
     * Plugins Vite
     * ============================================
     * Configure les plugins pour l'optimisation du bundle
     * et les fonctionnalités SEO.
     */
    plugins: [
      // Plugin React avec configuration optimisée pour la production
      react(),

      // Tailwind CSS avec purge automatique des styles inutilisés
      tailwindcss(),

      // Compression des assets (gzip/brotli) pour améliorer le Core Web Vitals
      viteCompression({
        algorithm: 'gzip',
        ext: '.gz',
        threshold: 1024, // Compresser les fichiers > 1KB
        deleteOriginFile: false,
      }),

      // Compression brotli (meilleur taux de compression)
      viteCompression({
        algorithm: 'brotliCompress',
        ext: '.br',
        threshold: 1024,
        deleteOriginFile: false,
      }),

      // Analyseur de bundle (optionnel, activé avec --mode analyze)
      ...(process.env.ANALYZE === 'true'
        ? [
            visualizer({
              open: true,
              filename: 'dist/stats.html',
              gzipSize: true,
              brotliSize: true,
            }),
          ]
        : []),
    ],

    /**
     * Variables d'environnement
     * ============================================
     * Injecte les variables d'environnement nécessaires
     * au fonctionnement de l'application.
     * 
     * Variables :
     * - GEMINI_API_KEY : clé API pour l'IA Magic Fill
     *   (utilisée pour l'extraction automatique des données)
     */
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
      // Version de l'application pour le cache busting
      'import.meta.env.VITE_APP_VERSION': JSON.stringify('2.0.0'),
      'import.meta.env.VITE_APP_YEAR': JSON.stringify('2026'),
      // Conformité fiscale
      'import.meta.env.VITE_VAT_EXEMPTION_THRESHOLD_SERVICES': JSON.stringify('91900'),
      'import.meta.env.VITE_VAT_EXEMPTION_THRESHOLD_COMMERCE': JSON.stringify('94300'),
    },

    /**
     * Alias de résolution
     * ============================================
     * Simplifie les imports avec le préfixe @/
     * Améliore la maintenabilité et la lisibilité du code.
     * 
     * Exemples :
     * - import { cn } from '@/lib/utils'
     * - import { Invoice } from '@/types'
     * - import { useInvoiceStore } from '@/hooks/useInvoiceStore'
     */
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
        '@/components': path.resolve(__dirname, 'src/components'),
        '@/hooks': path.resolve(__dirname, 'src/hooks'),
        '@/lib': path.resolve(__dirname, 'src/lib'),
        '@/types': path.resolve(__dirname, 'src/types'),
        '@/locales': path.resolve(__dirname, 'src/locales'),
        '@/content': path.resolve(__dirname, 'src/content'),
      },
    },

    /**
     * Configuration du serveur de développement
     * ============================================
     * Optimise l'expérience de développement tout en
     * préparant la configuration de production.
     */
    server: {
      port: 3000,
      host: '0.0.0.0',
      open: true,
      // HMR est désactivé dans AI Studio via DISABLE_HMR env var.
      // Ne pas modifier - le file watching est désactivé pour éviter
      // les flickers pendant les modifications agent.
      hmr: process.env.DISABLE_HMR !== 'true',
    },

    /**
     * Configuration du build
     * ============================================
     * Optimise le bundle final pour les performances SEO.
     */
    build: {
      // Répertoire de sortie
      outDir: 'dist',
      
      // Génère des sourcemaps en développement uniquement
      sourcemap: isDevelopment,
      
      // Taille minimale pour le chunking (en octets)
      chunkSizeWarningLimit: 500,
      
      // Options de minification pour optimiser la taille du bundle
      minify: isProduction ? 'esbuild' : false,
      
      // Cible de compatibilité navigateur
      target: 'es2022',
      
      // Options de chunking pour optimiser le lazy loading
      rollupOptions: {
        output: {
          /**
           * Stratégie de nommage des chunks
           * Permet un cache busting efficace
           */
          entryFileNames: 'assets/[name].[hash].js',
          chunkFileNames: 'assets/[name].[hash].js',
          assetFileNames: 'assets/[name].[hash].[ext]',
          
          /**
           * Séparation manuelle des chunks pour optimiser le chargement
           * - vendor : bibliothèques tierces (React, i18next, etc.)
           * - utils : utilitaires partagés
           * - locales : traductions multilingues
           */
          manualChunks: (id) => {
            // Chunk pour React et les bibliothèques principales
            if (id.includes('node_modules')) {
              if (id.includes('react') || id.includes('react-dom') || id.includes('react-router')) {
                return 'vendor-react';
              }
              if (id.includes('i18next') || id.includes('react-i18next')) {
                return 'vendor-i18n';
              }
              if (id.includes('lucide-react') || id.includes('clsx') || id.includes('tailwind-merge')) {
                return 'vendor-ui';
              }
              if (id.includes('date-fns') || id.includes('lodash')) {
                return 'vendor-utils';
              }
              if (id.includes('recharts') || id.includes('d3-')) {
                return 'vendor-charts';
              }
              if (id.includes('jspdf') || id.includes('html2canvas') || id.includes('html-to-image')) {
                return 'vendor-pdf';
              }
              return 'vendor';
            }
            
            // Chunk pour les locales (traductions)
            if (id.includes('src/locales')) {
              return 'locales';
            }
            
            // Chunk pour les composants partagés
            if (id.includes('src/components')) {
              if (id.includes('InvoiceForm') || id.includes('InvoicePreview')) {
                return 'components-invoice';
              }
              if (id.includes('Dashboard') || id.includes('ProfileSettings')) {
                return 'components-dashboard';
              }
              return 'components';
            }
          },
        },
      },
      
      /**
       * Options de minification supplémentaires
       * Réduit la taille du bundle pour améliorer le LCP
       */
      terserOptions: isProduction
        ? {
            compress: {
              drop_console: true, // Supprime les console.log en production
              drop_debugger: true, // Supprime les debugger
              pure_funcs: ['console.log'], // Nettoie les appels console
            },
            format: {
              comments: false, // Supprime les commentaires
            },
          }
        : {},
      
      /**
       * Optimisations supplémentaires
       */
      // Active le rapport de taille des chunks
      reportCompressedSize: true,
      
      // Désactive le manifeste (non nécessaire pour SPA)
      manifest: false,
      
      // Active le polyfill pour les modules
      modulePreload: {
        polyfill: true
      },
    },

    /**
     * Optimisations de préchargement
     * ============================================
     * Améliore le chargement des ressources critiques
     * pour optimiser le Largest Contentful Paint (LCP).
     */
    optimizeDeps: {
      // Inclut les dépendances critiques pour le préchargement
      include: [
        'react',
        'react-dom',
        'react-router-dom',
        'i18next',
        'react-i18next',
        'clsx',
        'tailwind-merge',
        'date-fns',
        'lucide-react',
      ],
      // Exclut les dépendances volumineuses non critiques
      exclude: [],
    },

    /**
     * Configuration CSS
     * ============================================
     * Optimise le traitement des styles pour le SEO.
     */
    css: {
      modules: {
        // Génère des noms de classe localisés pour éviter les conflits
        localsConvention: 'camelCase',
        generateScopedName: isProduction
          ? '[hash:base64:5]'
          : '[name]_[local]_[hash:base64:3]',
      },
      // Préprocesseurs
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/styles/variables.scss";',
        },
      },
    },

    /**
     * Configuration de l'historique (SPA)
     * ============================================
     * Assure que le routage côté client fonctionne correctement.
     * Important pour le SEO des applications React.
     */
    preview: {
      port: 4173,
      strictPort: true,
    },

    /**
     * Variables d'environnement exposées au client
     * ============================================
     * Permet d'accéder à certaines variables côté client
     * via import.meta.env.
     */
    envPrefix: 'VITE_',
  };
});