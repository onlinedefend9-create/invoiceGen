import React from 'react';
import { motion } from 'motion/react';
import { Info, Server, User, Mail, Globe, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export const LegalNotice = () => {
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
            <h1 className="text-4xl font-black tracking-tighter text-gray-900">Mentions Légales</h1>
            <p className="text-gray-500 font-medium">Conformément à l'article 6 de la loi n° 2004-575 du 21 juin 2004</p>
          </div>

          <section className="space-y-4">
            <div className="flex items-center gap-3 text-gray-900">
              <User className="text-indigo-600" size={24} />
              <h2 className="text-2xl font-bold">1. Éditeur du Site</h2>
            </div>
            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 space-y-2">
              <p><span className="font-bold">Nom :</span> InvoiceGEN Team</p>
              <p><span className="font-bold">Statut :</span> Projet indépendant de développement d'outils SaaS</p>
              <p><span className="font-bold">Contact :</span> contact@invoicegen.click</p>
            </div>
          </section>

          <section className="space-y-4">
            <div className="flex items-center gap-3 text-gray-900">
              <Server className="text-indigo-600" size={24} />
              <h2 className="text-2xl font-bold">2. Hébergement</h2>
            </div>
            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 space-y-2">
              <p><span className="font-bold">Hébergeur :</span> Vercel Inc.</p>
              <p><span className="font-bold">Adresse :</span> 340 S Lemon Ave #1192, Walnut, CA 91789, USA</p>
              <p><span className="font-bold">Site Web :</span> https://vercel.com</p>
            </div>
          </section>

          <section className="space-y-4">
            <div className="flex items-center gap-3 text-gray-900">
              <Globe className="text-indigo-600" size={24} />
              <h2 className="text-2xl font-bold">3. Propriété Intellectuelle</h2>
            </div>
            <p className="text-gray-600 leading-relaxed">
              L'ensemble de ce site relève de la législation française et internationale sur le droit d'auteur et la propriété intellectuelle. Tous les droits de reproduction sont réservés, y compris pour les documents téléchargeables et les représentations iconographiques et photographiques.
            </p>
          </section>

          <section className="space-y-4">
            <div className="flex items-center gap-3 text-gray-900">
              <Info className="text-indigo-600" size={24} />
              <h2 className="text-2xl font-bold">4. Limitation de Responsabilité</h2>
            </div>
            <p className="text-gray-600 leading-relaxed">
              InvoiceGEN s'efforce d'assurer au mieux de ses possibilités, l'exactitude et la mise à jour des informations diffusées sur ce site. Toutefois, InvoiceGEN décline toute responsabilité pour toute imprécision, inexactitude ou omission portant sur des informations disponibles sur le site.
            </p>
          </section>

          <div className="pt-12 border-t border-gray-100 text-center text-gray-400 text-sm">
            <p>© {currentYear} InvoiceGEN - Mentions Légales.</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
