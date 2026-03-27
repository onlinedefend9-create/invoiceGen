import { useState, useEffect } from 'react';
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

  useEffect(() => {
    localStorage.setItem('invoices', JSON.stringify(invoices));
  }, [invoices]);

  useEffect(() => {
    localStorage.setItem('userProfile', JSON.stringify(profile));
  }, [profile]);

  const addInvoice = (invoice: Invoice) => setInvoices([invoice, ...invoices]);
  const updateInvoice = (invoice: Invoice) => setInvoices(invoices.map(i => i.id === invoice.id ? invoice : i));
  const deleteInvoice = (id: string) => setInvoices(invoices.filter(i => i.id !== id));

  return { invoices, profile, setProfile, addInvoice, updateInvoice, deleteInvoice };
}
