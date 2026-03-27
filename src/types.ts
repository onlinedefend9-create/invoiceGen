export type TemplateType = 'minimalist' | 'corporate' | 'modern' | 'credit_note';
export type DocumentType = 'invoice' | 'credit_note' | 'quote' | 'purchase_order';

export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
}

export interface Client {
  name: string;
  email: string;
  address: string;
}

export interface UserProfile {
  companyName: string;
  email: string;
  address: string;
  phone: string;
  siret: string;
  rib: string;
  logoUrl?: string;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  date: string;
  dueDate: string;
  client: Client;
  items: InvoiceItem[];
  taxRate: number;
  discount: number;
  currency: string;
  status: 'draft' | 'sent' | 'paid' | 'overdue';
  type: DocumentType;
  template: TemplateType;
  notes?: string;
}

export interface DashboardStats {
  totalRevenue: number;
  pendingAmount: number;
  paidInvoices: number;
  overdueInvoices: number;
}
