/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useTransition } from 'react';
import { 
  Plus, 
  FileText, 
  Users, 
  LayoutDashboard, 
  Download, 
  Trash2, 
  Send, 
  Search,
  Filter,
  ChevronRight,
  Printer,
  ArrowLeft,
  Settings,
  BookOpen,
  Mail,
  CheckCircle,
  Loader2,
  Globe,
  Menu,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { format, addDays, isAfter, parseISO } from 'date-fns';
import jsPDF from 'jspdf';
import { toPng } from 'html-to-image';
import { useTranslation } from 'react-i18next';
import { Routes, Route, Outlet, Navigate, useNavigate } from 'react-router-dom';

import { cn, formatCurrency } from './lib/utils';
import { Invoice, DashboardStats, TemplateType } from './types';
import { useInvoiceStore } from './hooks/useInvoiceStore';

// Components
import { MiniLandingPage } from './components/MiniLandingPage';
import { Dashboard } from './components/Dashboard';
import { InvoiceForm } from './components/InvoiceForm';
import { InvoicePreview } from './components/InvoicePreview';
import { ProfileSettings } from './components/ProfileSettings';
import { Blog } from './components/Blog';
import { BlogPost } from './components/BlogPost';
import { LandingPage } from './components/LandingPage';
import { Features } from './components/Features';
import { Pricing } from './components/Pricing';
import { FAQ } from './components/FAQ';
import { Legal } from './components/Legal';
import { PublicHeader } from './components/PublicHeader';
import { PublicFooter } from './components/PublicFooter';
import { AppFooter } from './components/AppFooter';
import { AppLayout } from './components/AppLayout';

function PublicLayout() {
  return (
    <div className="min-h-screen bg-white font-sans selection:bg-blue-100 selection:text-blue-900">
      <PublicHeader />
      <main>
        <Outlet />
      </main>
      <AppFooter />
    </div>
  );
}

function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col lg:flex-row text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-900">
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}

export default function App() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const { invoices, profile, setProfile, addInvoice, updateInvoice, deleteInvoice } = useInvoiceStore();
  const [currentInvoice, setCurrentInvoice] = useState<Invoice | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'fr' ? 'en' : 'fr';
    i18n.changeLanguage(newLang);
  };

  const stats = useMemo((): DashboardStats => {
    return invoices.reduce((acc, inv) => {
      const subtotal = inv.items.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);
      const tax = subtotal * (inv.taxRate / 100);
      const total = subtotal + tax - inv.discount;

      if (inv.status === 'paid') {
        acc.totalRevenue += total;
        acc.paidInvoices += 1;
      } else if (inv.status === 'sent') {
        acc.pendingAmount += total;
      }
      
      if (inv.status !== 'paid' && isAfter(new Date(), parseISO(inv.dueDate))) {
        acc.overdueInvoices += 1;
      }

      return acc;
    }, { totalRevenue: 0, pendingAmount: 0, paidInvoices: 0, overdueInvoices: 0 });
  }, [invoices]);

  const filteredInvoices = invoices.filter(inv => 
    inv.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
    inv.client.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateNew = () => {
    const newInvoice: Invoice = {
      id: Math.random().toString(36).substr(2, 9),
      invoiceNumber: `INV-${new Date().getFullYear()}-${(invoices.length + 1).toString().padStart(3, '0')}`,
      date: format(new Date(), 'yyyy-MM-dd'),
      dueDate: format(addDays(new Date(), 14), 'yyyy-MM-dd'),
      client: { name: '', email: '', address: '' },
      items: [{ id: '1', description: '', quantity: 1, unitPrice: 0 }],
      taxRate: 20,
      discount: 0,
      currency: 'EUR',
      status: 'draft',
      type: 'invoice',
      template: 'modern'
    };
    setCurrentInvoice(newInvoice);
    navigate('/editer');
  };

  const handleSaveInvoice = (invoice: Invoice) => {
    const isExisting = invoices.some(inv => inv.id === invoice.id);
    if (isExisting) {
      updateInvoice(invoice);
    } else {
      addInvoice(invoice);
    }
    navigate('/dashboard');
  };

  const [isExporting, setIsExporting] = useState(false);

  const handleExportPDF = async (invoice: Invoice) => {
    const element = document.getElementById('invoice-render');
    if (!element) return;
    
    setIsExporting(true);
    
    // Temporarily remove shadow and set fixed width for perfect A4 capture
    const originalStyle = element.style.cssText;
    const originalClassName = element.className;
    element.style.width = '794px'; // A4 width at 96 DPI
    element.style.maxWidth = 'none';
    element.style.boxShadow = 'none';
    element.className = originalClassName.replace('shadow-2xl', '');
    
    try {
      const imgData = await toPng(element, { 
        quality: 1, 
        pixelRatio: 3, // Higher resolution for professional look
        backgroundColor: '#ffffff',
        style: {
          transform: 'scale(1)',
          transformOrigin: 'top left'
        }
      });
      
      // Restore original styles
      element.style.cssText = originalStyle;
      element.className = originalClassName;
      
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      // Calculate dimensions to fit A4
      const imgProps = pdf.getImageProperties(imgData);
      const imgWidth = pdfWidth;
      const imgHeight = (imgProps.height * imgWidth) / imgProps.width;
      
      // If content is longer than one page, we might need to handle multi-page
      // but for now let's ensure it fits or at least fills the width perfectly
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight, undefined, 'FAST');
      pdf.save(`${invoice.invoiceNumber}.pdf`);
      setIsExporting(false);
      return imgData;
    } catch (error) {
      // Restore original styles in case of error
      element.style.cssText = originalStyle;
      element.className = originalClassName;
      setIsExporting(false);
      console.error("Error generating PDF:", error);
      alert(t('invoice.exportError', { defaultValue: "Error generating PDF. Please try again." }));
      throw error;
    }
  };

  const handleSendEmail = async (invoice: Invoice) => {
    setIsSending(true);
    try {
      await handleExportPDF(invoice);
      // Simulating network delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      alert(t('invoice.sentSuccess', { defaultValue: "Invoice sent successfully! (Simulation)" }));
      updateInvoice({ ...invoice, status: 'sent' });
    } catch (error) {
      console.error("Error sending email:", error);
      alert(t('invoice.sendError', { defaultValue: "Error sending email." }));
    } finally {
      setIsSending(false);
    }
  };

  return (
    <Routes>
      <Route path="/" element={<PublicLayout />}>
        <Route index element={<LandingPage onStart={() => navigate('/editer')} />} />
        <Route path="features" element={<Features />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="faq" element={<FAQ />} />
        <Route path="blog" element={<Blog onStart={() => navigate('/editer')} />} />
        <Route path="blog/:slug" element={<BlogPost onStart={() => navigate('/editer')} />} />
        <Route path="legal" element={<Legal />} />
        <Route path="generateur/facture-auto-entrepreneur" element={<MiniLandingPage niche="auto-entrepreneur" onStart={() => navigate('/editer')} />} />
        <Route path="generateur/facture-prestation-service" element={<MiniLandingPage niche="prestation-service" onStart={() => navigate('/editer')} />} />
        <Route path="generateur/facture-internationale" element={<MiniLandingPage niche="internationale" onStart={() => navigate('/editer')} />} />
      </Route>
      
      <Route path="/" element={<AppLayout onCreate={handleCreateNew} />}>
        <Route path="dashboard" element={
          <Dashboard 
            stats={stats}
            invoices={invoices}
            onPreviewInvoice={(id) => {
              const invoice = invoices.find(i => i.id === id);
              if (invoice) {
                setCurrentInvoice(invoice);
                navigate(`/dashboard/invoices/${id}/preview`);
              }
            }}
          />
        } />
        <Route path="editer" element={
          currentInvoice ? (
            <div className="flex flex-col xl:flex-row gap-8 h-[calc(100vh-8rem)]">
              <div className="flex-1 overflow-y-auto pr-2 xl:pr-4 pb-20">
                <InvoiceForm 
                  invoice={currentInvoice} 
                  onSave={handleSaveInvoice} 
                  onCancel={() => navigate('/dashboard')} 
                  onChange={setCurrentInvoice}
                  onPreview={() => navigate(`/dashboard/invoices/${currentInvoice.id}/preview`)}
                />
              </div>
              <div className="flex-1 overflow-y-auto hidden xl:block pb-20">
                <InvoicePreview 
                  invoice={currentInvoice} 
                  profile={profile}
                  onExportPDF={() => handleExportPDF(currentInvoice)}
                  onSendEmail={() => handleSendEmail(currentInvoice)}
                  onTemplateChange={(template) => {
                    const updatedInvoice = { ...currentInvoice, template };
                    setCurrentInvoice(updatedInvoice);
                    // We don't call updateInvoice here because it's a new unsaved invoice
                  }}
                  isExporting={isExporting}
                  isSending={isSending}
                />
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <button onClick={handleCreateNew} className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold">
                Créer une nouvelle facture
              </button>
            </div>
          )
        } />
        <Route path="dashboard/invoices/:id/edit" element={
          <div className="flex flex-col xl:flex-row gap-8 h-[calc(100vh-8rem)]">
            <div className="flex-1 overflow-y-auto pr-2 xl:pr-4 pb-20">
              <InvoiceForm 
                invoice={currentInvoice!} 
                onSave={handleSaveInvoice} 
                onCancel={() => navigate('/dashboard')} 
                onChange={setCurrentInvoice}
                onPreview={() => navigate(`/dashboard/invoices/${currentInvoice!.id}/preview`)}
              />
            </div>
            <div className="flex-1 overflow-y-auto hidden xl:block pb-20">
              <InvoicePreview 
                invoice={currentInvoice!} 
                profile={profile}
                onExportPDF={() => handleExportPDF(currentInvoice!)}
                onSendEmail={() => handleSendEmail(currentInvoice!)}
                onTemplateChange={(template) => {
                  const updatedInvoice = { ...currentInvoice!, template };
                  setCurrentInvoice(updatedInvoice);
                  updateInvoice(updatedInvoice);
                }}
                isExporting={isExporting}
                isSending={isSending}
              />
            </div>
          </div>
        } />
        <Route path="dashboard/invoices/:id/preview" element={
          <InvoicePreview 
            invoice={currentInvoice!} 
            profile={profile}
            onBack={() => navigate('/dashboard')}
            onExportPDF={() => handleExportPDF(currentInvoice!)}
            onSendEmail={() => handleSendEmail(currentInvoice!)}
            onTemplateChange={(template) => {
              const updatedInvoice = { ...currentInvoice!, template };
              setCurrentInvoice(updatedInvoice);
              updateInvoice(updatedInvoice);
            }}
            isExporting={isExporting}
            isSending={isSending}
          />
        } />
        <Route path="dashboard/settings" element={
          <ProfileSettings 
            profile={profile} 
            onSave={(p) => {
              setProfile(p);
              navigate('/dashboard');
            }} 
          />
        } />
      </Route>
    </Routes>
  );
}
