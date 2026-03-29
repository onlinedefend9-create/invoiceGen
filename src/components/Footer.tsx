import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, Shield, Mail, ArrowRight, Globe, Zap } from 'lucide-react';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 text-slate-300 pt-20 pb-10 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          {/* Colonne 1 - L'Outil */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-black">I</div>
              <h3 className="text-lg font-black tracking-tighter text-white">InvoiceGEN</h3>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Générateur de facture gratuit conforme à l'article 293 B du CGI. Simplifiez votre gestion administrative en quelques clics.
            </p>
            <ul className="space-y-3">
              <li>
                <Link to="/editer" className="text-sm hover:text-indigo-400 transition-colors flex items-center gap-2">
                  <ArrowRight size={14} /> Créer une facture
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-sm hover:text-indigo-400 transition-colors flex items-center gap-2">
                  <ArrowRight size={14} /> Guide Conformité 2026
                </Link>
              </li>
            </ul>
          </div>

          {/* Colonne 2 - Légal */}
          <div className="space-y-6">
            <h4 className="text-white font-bold uppercase tracking-widest text-xs flex items-center gap-2">
              <Shield size={14} className="text-indigo-500" /> Légal & Confiance
            </h4>
            <ul className="space-y-3">
              <li>
                <Link to="/mentions-legales" className="text-sm hover:text-indigo-400 transition-colors">Mentions Légales</Link>
              </li>
              <li>
                <Link to="/politique-confidentialite" className="text-sm hover:text-indigo-400 transition-colors">Politique de Confidentialité</Link>
              </li>
              <li>
                <Link to="/cgu" className="text-sm hover:text-indigo-400 transition-colors">Conditions d'Utilisation (CGU)</Link>
              </li>
            </ul>
            <div className="flex gap-2">
              <div className="px-2 py-1 bg-slate-900 rounded border border-slate-800 text-[10px] font-mono text-slate-500">RGPD 2026</div>
              <div className="px-2 py-1 bg-slate-900 rounded border border-slate-800 text-[10px] font-mono text-slate-500">SSL Secure</div>
            </div>
          </div>

          {/* Colonne 3 - Contact */}
          <div className="space-y-6">
            <h4 className="text-white font-bold uppercase tracking-widest text-xs flex items-center gap-2">
              <Mail size={14} className="text-indigo-500" /> Support & Contact
            </h4>
            <p className="text-sm text-slate-400">
              Une question ? Un besoin spécifique ? Notre équipe vous répond sous 48h.
            </p>
            <a href="mailto:contact@invoicegen.click" className="inline-flex items-center gap-3 p-4 bg-slate-900 rounded-2xl border border-slate-800 hover:border-indigo-500 transition-colors group">
              <div className="w-10 h-10 bg-indigo-600/10 rounded-xl flex items-center justify-center text-indigo-500 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                <Mail size={20} />
              </div>
              <div>
                <p className="text-xs text-slate-500 font-bold uppercase tracking-tighter">Email de contact</p>
                <p className="text-sm text-white font-medium">contact@invoicegen.click</p>
              </div>
            </a>
          </div>
        </div>

        <div className="pt-10 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-[11px] text-slate-500 font-medium">
            © {currentYear} InvoiceGEN. Tous droits réservés. Conforme Article 293 B du CGI.
          </p>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-[10px] text-slate-600">
              <Zap size={10} /> Autoliquidation
            </div>
            <div className="flex items-center gap-1.5 text-[10px] text-slate-600">
              <Globe size={10} /> TVA Intra
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
