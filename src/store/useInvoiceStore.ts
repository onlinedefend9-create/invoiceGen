import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Invoice, UserProfile } from '../types';

interface InvoiceState {
  invoices: Invoice[];
  profile: UserProfile;
  _hasHydrated: boolean;
  setHasHydrated: (state: boolean) => void;
  setProfile: (profile: Partial<UserProfile>) => void;
  addInvoice: (invoice: Invoice) => void;
  updateInvoice: (invoice: Invoice) => void;
  deleteInvoice: (id: string) => void;
}

const INITIAL_PROFILE: UserProfile = {
  companyName: 'Ma Super Entreprise',
  email: 'contact@entreprise.fr',
  address: '123 Avenue de la République, 75011 Paris',
  phone: '01 23 45 67 89',
  siret: '123 456 789 00012',
  rib: 'FR76 1234 5678 9012 3456 7890 123',
  vatNumber: '',
  Activity: [], 
};

export const useInvoiceStore = create<InvoiceState>()(
  persist(
    (set) => ({
      invoices: [],
      profile: INITIAL_PROFILE,
      _hasHydrated: false,
      setHasHydrated: (state) => set({ _hasHydrated: state }),
      
      setProfile: (profile) => set((state) => ({ 
        profile: { 
          ...state.profile, 
          ...profile, 
          Activity: (profile as any).Activity || state.profile.Activity || [] 
        } 
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
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: (state) => {
        return (rehydratedState, error) => {
          if (error) {
            console.error('Rehydration error:', error);
          }
          if (rehydratedState) {
            // Sécurité absolue : injection de force si Activity est manquant
            if (!rehydratedState.profile) {
              rehydratedState.profile = { ...INITIAL_PROFILE };
            }
            if (!Array.isArray(rehydratedState.profile.Activity)) {
              rehydratedState.profile.Activity = [];
            }
            rehydratedState.setHasHydrated(true);
          }
        };
      },
    }
  )
);
