import React, { useState } from 'react';
import { Sparkles, Loader2 } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { InvoiceItem, Client } from '../types';
import { useTranslation } from 'react-i18next';

interface Props {
  onDataExtracted: (data: { client: Partial<Client>, items: InvoiceItem[] }) => void;
}

export const AIInput: React.FC<Props> = ({ onDataExtracted }) => {
  const { t } = useTranslation();
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);

  const handleMagicFill = async () => {
    if (!text.trim()) return;
    setLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Extrais les données de facturation suivantes de ce texte brut en JSON:
        Texte: "${text}"
        Format JSON attendu: { "client": { "name": "...", "email": "...", "address": "..." }, "items": [{ "description": "...", "quantity": 1, "unitPrice": 0 }] }
        Ne réponds QUE par le JSON.`,
        config: { responseMimeType: "application/json" }
      });

      const data = JSON.parse(response.text || '{}');
      onDataExtracted({
        client: data.client || {},
        items: (data.items || []).map((i: any) => ({ ...i, id: Math.random().toString() }))
      });
      setText('');
    } catch (error) {
      console.error("AI Error:", error);
      alert("Erreur lors de l'extraction AI. Vérifiez votre clé API.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-100 shadow-xl p-8 space-y-4 relative overflow-hidden group">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="flex items-center gap-2 text-blue-600">
        <Sparkles size={18} className="animate-pulse" />
        <h4 className="text-[10px] font-black uppercase tracking-widest bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Magic Fill AI</h4>
      </div>
      <p className="text-xs text-slate-400 font-bold leading-relaxed">
        Collez un texte brut (ex: email, notes) pour extraire automatiquement les articles et le client.
      </p>
      <textarea 
        className="w-full bg-slate-50 border-none rounded-2xl p-4 text-sm focus:ring-2 focus:ring-blue-500 resize-none font-medium"
        rows={4}
        placeholder="Ex: Facture pour Jean Dupont, 12 rue de la Paix. 2 logos à 500€ et 1 site web à 2000€..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button 
        onClick={handleMagicFill}
        disabled={loading}
        className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 rounded-xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-100 disabled:opacity-50 group"
      >
        {loading ? <Loader2 className="animate-spin" size={16} /> : <Sparkles size={16} className="group-hover:rotate-12 transition-transform" />}
        {t('invoice.magicFillAction', { defaultValue: 'Magic Fill' })}
      </button>
    </div>
  );
};
