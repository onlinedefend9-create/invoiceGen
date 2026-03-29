import React from 'react';
import { motion } from 'motion/react';
import { Scale, FileText, AlertTriangle, CheckCircle, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export const TermsOfService = () => {
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
            <h1 className="text-4xl font-black tracking-tighter text-gray-900">Conditions Générales d'Utilisation</h1>
            <p className="text-gray-500 font-medium">Version 2.0 - Mars 2026</p>
          </div>

          <section className="space-y-4">
            <div className="flex items-center gap-3 text-gray-900">
              <Scale className="text-indigo-600" size={24} />
              <h2 className="text-2xl font-bold">1. Objet du Service</h2>
            </div>
            <p className="text-gray-600 leading-relaxed">
              InvoiceGEN met à disposition des utilisateurs un outil gratuit de génération de factures au format PDF. Le service est accessible sans inscription et repose sur une technologie de traitement local des données.
            </p>
          </section>

          <section className="space-y-4">
            <div className="flex items-center gap-3 text-gray-900">
              <AlertTriangle className="text-indigo-600" size={24} />
              <h2 className="text-2xl font-bold">2. Responsabilité de l'Utilisateur</h2>
            </div>
            <p className="text-gray-600 leading-relaxed">
              L'utilisateur est seul responsable de l'exactitude des informations saisies dans le générateur. InvoiceGEN ne procède à aucune vérification de la véracité des données (SIRET, montants, coordonnées clients).
            </p>
            <div className="bg-amber-50 p-4 rounded-xl border border-amber-100">
              <p className="text-amber-800 text-sm font-medium">
                ⚠️ InvoiceGEN ne saurait être tenu responsable des erreurs de saisie, des omissions de mentions légales spécifiques à votre activité, ou des conséquences fiscales d'une facture erronée.
              </p>
            </div>
          </section>

          <section className="space-y-4">
            <div className="flex items-center gap-3 text-gray-900">
              <CheckCircle className="text-indigo-600" size={24} />
              <h2 className="text-2xl font-bold">3. Conformité Fiscale</h2>
            </div>
            <p className="text-gray-600 leading-relaxed">
              Bien que l'outil propose des modèles conformes à l'article 293 B du CGI et à la réforme 2026, il appartient à l'utilisateur de s'assurer que ses factures respectent la législation en vigueur au moment de leur émission. L'utilisation de l'outil ne dispense pas de la consultation d'un expert-comptable ou d'un conseiller fiscal.
            </p>
          </section>

          <section className="space-y-4">
            <div className="flex items-center gap-3 text-gray-900">
              <FileText className="text-indigo-600" size={24} />
              <h2 className="text-2xl font-bold">4. Propriété Intellectuelle</h2>
            </div>
            <p className="text-gray-600 leading-relaxed">
              Le code source, le design et les logos d'InvoiceGEN sont la propriété exclusive de ses créateurs. Toute reproduction ou exploitation commerciale du service sans autorisation préalable est interdite.
            </p>
          </section>

          <div className="pt-12 border-t border-gray-100 text-center text-gray-400 text-sm">
            <p>© {currentYear} InvoiceGEN - Outil de facturation gratuit.</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
