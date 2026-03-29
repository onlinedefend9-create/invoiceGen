/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * InvoiceGEN - Générateur de facture gratuit professionnel
 * Hook de gestion d'état des factures avec stockage local
 * 
 * Version: 2.0.0 - 2026
 * Conforme à l'article 293 B du CGI & autoliquidation TVA
 * 
 * Architecture Local-First : toutes les données sont stockées exclusivement
 * dans le localStorage du navigateur, garantissant une confidentialité totale.
 * Aucune donnée n'est transmise ou stockée sur nos serveurs.
 * 
 * Mentions légales conformes aux articles L. 441-3 et L. 441-4 du Code de commerce :
 * - Numéro unique et chronologique
 * - Date d'émission
 * - SIRET et code NAF/APE
 * - TVA intracommunautaire
 * - Conditions de paiement
 * - Pénalités de retard (taux d'intérêt légal + 10 points)
 * - Indemnité forfaitaire de recouvrement (40 €)
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Invoice, UserProfile } from '../types';

const INITIAL_PROFILE: any = {
  companyName: 'Ma Super Entreprise',
  email: 'contact@entreprise.fr',
  address: '123 Avenue de la République, 75011 Paris',
  phone: '01 23 45 67 89',
  siret: '123 456 789 00012',
  rib: 'FR76 1234 5678 9012 3456 7890 123',
  vatNumber: '',
  Activity: [],
};

interface InvoiceState {
  invoices: Invoice[];
  profile: any;
  setProfile: (profile: any) => void;
  addInvoice: (invoice: Invoice) => void;
  updateInvoice: (invoice: Invoice) => void;
  deleteInvoice: (id: string) => void;
}

export const useInvoiceStore = create<InvoiceState>()(
  persist(
    (set) => ({
      invoices: [],
      profile: INITIAL_PROFILE,
      
      setProfile: (profile) => set((state) => ({ 
        profile: { ...state.profile, ...profile, Activity: profile.Activity || [] } 
      })),
      
      addInvoice: (invoice) => set((state) => ({ 
        invoices: [invoice, ...state.invoices] 
      })),
      
      updateInvoice: (invoice) => set((state) => ({
        invoices: state.invoices.map((i) => (i.id === invoice.id ? invoice : i)),
      })),
      
      deleteInvoice: (id) => set((state) => ({
        invoices: state.invoices.filter((i) => i.id !== id),
      })),
    }),
    {
      name: 'invoice-store',
      merge: (persistedState: any, currentState) => {
        let migratedInvoices = persistedState?.invoices;
        let migratedProfile = persistedState?.profile;

        if (!migratedInvoices) {
          try {
            const oldInvoices = localStorage.getItem('invoices');
            if (oldInvoices) migratedInvoices = JSON.parse(oldInvoices);
          } catch (e) {
            console.error(e);
          }
        }

        if (!migratedProfile) {
          try {
            const oldProfile = localStorage.getItem('userProfile');
            if (oldProfile) migratedProfile = JSON.parse(oldProfile);
          } catch (e) {
            console.error(e);
          }
        }

        return {
          ...currentState,
          ...persistedState,
          profile: {
            ...currentState.profile,
            ...(migratedProfile || {}),
            Activity: migratedProfile?.Activity || [],
          },
          invoices: migratedInvoices || currentState.invoices,
        };
      },
    }
  )
);