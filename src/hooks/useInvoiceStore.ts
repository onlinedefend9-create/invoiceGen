import { useState, useEffect, useMemo } from 'react';
import { debounce } from 'lodash';
import { Invoice, UserProfile } from '../types';

const INITIAL_PROFILE: UserProfile = {
  companyName: 'Ma Super Entreprise',
  email: 'contact@entreprise.fr',
  address: '123 Avenue de la République, 75011 Paris',
  phone: '01 23 45 67 89',
  siret: '123 456 789 00012',
  rib: 'FR76 1234 5678 9012 3456 7890 123',
};

export function useInvoiceStore() {
  const [invoices, setInvoices] = useState<Invoice[]>(() => {
    const saved = localStorage.getItem('invoices');
    return saved ? JSON.parse(saved) : [];
  });

  const [profile, setProfile] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('userProfile');
    return saved ? JSON.parse(saved) : INITIAL_PROFILE;
  });

  const debouncedSaveInvoices = useMemo(() => debounce((invoices: Invoice[]) => {
    localStorage.setItem('invoices', JSON.stringify(invoices));
  }, 500), []);

  const debouncedSaveProfile = useMemo(() => debounce((profile: UserProfile) => {
    localStorage.setItem('userProfile', JSON.stringify(profile));
  }, 500), []);

  useEffect(() => {
    debouncedSaveInvoices(invoices);
    return () => debouncedSaveInvoices.cancel();
  }, [invoices, debouncedSaveInvoices]);

  useEffect(() => {
    debouncedSaveProfile(profile);
    return () => debouncedSaveProfile.cancel();
  }, [profile, debouncedSaveProfile]);

  const addInvoice = (invoice: Invoice) => setInvoices([invoice, ...invoices]);
  const updateInvoice = (invoice: Invoice) => setInvoices(invoices.map(i => i.id === invoice.id ? invoice : i));
  const deleteInvoice = (id: string) => setInvoices(invoices.filter(i => i.id !== id));

  return { invoices, profile, setProfile, addInvoice, updateInvoice, deleteInvoice };
}
