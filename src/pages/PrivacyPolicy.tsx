import React from 'react';
import { motion } from 'motion/react';
import { Shield, Lock, Eye, Cookie, Bell, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export const PrivacyPolicy = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="bg-white min-h-screen py-16 px-6">
      <div className="max-w-4xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-medium mb-8 transition-colors">
          <ArrowLeft size={16} />
          Retour à l'accueil
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <div className="space-y-4">
            <h1 className="text-4xl font-black tracking-tighter text-gray-900">Politique de Confidentialité</h1>
            <p className="text-gray-500 font-medium">Dernière mise à jour : Mars 2026</p>
          </div>

          <section className="space-y-4">
            <div className="flex items-center gap-3 text-gray-900">
              <Shield className="text-indigo-600" size={24} />
              <h2 className="text-2xl font-bold">1. Introduction</h2>
            </div>
            <p className="text-gray-600 leading-relaxed">
              Chez InvoiceGEN, la protection de vos données est notre priorité absolue. Cette politique de confidentialité explique comment nous traitons vos informations lorsque vous utilisez notre générateur de factures gratuit. Nous nous engageons à respecter le Règlement Général sur la Protection des Données (RGPD) 2026.
            </p>
          </section>

          <section className="space-y-4">
            <div className="flex items-center gap-3 text-gray-900">
              <Lock className="text-indigo-600" size={24} />
              <h2 className="text-2xl font-bold">2. Collecte des Données (Local-First)</h2>
            </div>
            <p className="text-gray-600 leading-relaxed">
              InvoiceGEN utilise une architecture "Local-First". Cela signifie que toutes les données de facturation (noms des clients, adresses, montants, descriptions de services) que vous saisissez sont stockées exclusivement dans le <strong>Local Storage</strong> de votre propre navigateur. 
            </p>
            <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-100">
              <p className="text-indigo-800 text-sm font-medium">
                ⚠️ Aucune donnée de facturation n'est transmise, stockée ou traitée sur nos serveurs. Vous restez le seul maître de vos données.
              </p>
            </div>
          </section>

          <section className="space-y-4">
            <div className="flex items-center gap-3 text-gray-900">
              <Cookie className="text-indigo-600" size={24} />
              <h2 className="text-2xl font-bold">3. Cookies et Publicité (Google AdSense)</h2>
            </div>
            <p className="text-gray-600 leading-relaxed">
              Pour maintenir la gratuité de notre outil, nous diffusons des publicités via <strong>Google AdSense</strong>. 
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
              <li>Google utilise des cookies pour diffuser des annonces basées sur vos visites antérieures sur ce site ou sur d'autres sites web.</li>
              <li>Les cookies publicitaires permettent à Google et à ses partenaires de diffuser des annonces basées sur votre navigation.</li>
              <li>Vous pouvez choisir de désactiver la publicité personnalisée dans les <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" className="text-indigo-600 underline">Paramètres des annonces Google</a>.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <div className="flex items-center gap-3 text-gray-900">
              <Eye className="text-indigo-600" size={24} />
              <h2 className="text-2xl font-bold">4. Analyses d'audience (Vercel Analytics)</h2>
            </div>
            <p className="text-gray-600 leading-relaxed">
              Nous utilisons <strong>Vercel Analytics</strong> pour comprendre comment notre site est utilisé et améliorer l'expérience utilisateur. Ces données sont anonymisées et ne permettent pas de vous identifier personnellement. Elles concernent principalement les pages visitées, le type d'appareil utilisé et la provenance géographique globale.
            </p>
          </section>

          <section className="space-y-4">
            <div className="flex items-center gap-3 text-gray-900">
              <Bell className="text-indigo-600" size={24} />
              <h2 className="text-2xl font-bold">5. Vos Droits</h2>
            </div>
            <p className="text-gray-600 leading-relaxed">
              Puisque nous ne stockons pas vos données de facturation, vous pouvez exercer votre "droit à l'oubli" simplement en vidant le cache de votre navigateur ou en supprimant les données du site dans vos paramètres de navigation. Pour toute question concernant vos données personnelles, vous pouvez nous contacter à : <span className="font-bold">privacy@invoicegen.click</span>.
            </p>
          </section>

          <div className="pt-12 border-t border-gray-100 text-center text-gray-400 text-sm">
            <p>© {currentYear} InvoiceGEN - Protection des données garantie par conception.</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
