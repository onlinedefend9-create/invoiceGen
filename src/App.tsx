/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * InvoiceGEN - Générateur de facture gratuit professionnel
 * Conforme à l'article 293 B du CGI & autoliquidation TVA
 * Version: 2.0.0 - 2026
 */

import React, { useState, useMemo, useTransition, useEffect } from 'react';
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
import { Routes, Route, Outlet, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import { cn, formatCurrency } from './lib/utils';
import { Invoice, DashboardStats, TemplateType } from './types';
import { useInvoiceStore } from './store/useInvoiceStore';

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

// Composant d'en-tête avec métadonnées SEO dynamiques
const SEOHead: React.FC<{ title?: string; description?: string; canonical?: string }> = ({ 
  title, 
  description, 
  canonical 
}) => {
  const { t } = useTranslation();
  const location = useLocation();
  
  return (
    <Helmet>
      <title>{title || t('seo.title')}</title>
      <meta name="description" content={description || t('seo.description')} />
      <meta name="keywords" content={t('seo.keywords')} />
      <link rel="canonical" href={canonical || `https://invoicegen.click${location.pathname}`} />
      <meta property="og:title" content={title || t('seo.ogTitle')} />
      <meta property="og:description" content={description || t('seo.ogDescription')} />
      <meta property="og:url" content={`https://invoicegen.click${location.pathname}`} />
      <meta name="twitter:title" content={title || t('seo.title')} />
      <meta name="twitter:description" content={description || t('seo.description')} />
    </Helmet>
  );
};

// Composant d'illustration avec SVG animé pour les sections
const SEOIllustration: React.FC<{ icon: React.ReactNode; title: string; children: React.ReactNode; className?: string }> = ({ 
  icon, 
  title, 
  children, 
  className 
}) => (
  <div className={cn("group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100", className)}>
    <div className="flex items-start gap-4">
      <div className="flex-shrink-0 text-indigo-600 group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <div className="flex-1">
        <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
        <div className="text-gray-600 leading-relaxed text-sm md:text-base">
          {children}
        </div>
      </div>
    </div>
  </div>
);

function PublicLayout() {
  const { t } = useTranslation();
  
  return (
    <div className="min-h-screen bg-white font-sans selection:bg-indigo-100 selection:text-indigo-900">
      <SEOHead />
      <PublicHeader onNavigate={() => {}} />
      <main>
        <Outlet />
      </main>
      <PublicFooter />
    </div>
  );
}

function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { t } = useTranslation();
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col lg:flex-row text-slate-900 font-sans selection:bg-indigo-100 selection:text-indigo-900">
      <SEOHead />
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const { invoices, profile, setProfile, addInvoice, updateInvoice, deleteInvoice } = useInvoiceStore();
  const [currentInvoice, setCurrentInvoice] = useState<Invoice | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  // Mise à jour dynamique du titre de la page en fonction de la route
  useEffect(() => {
    const path = location.pathname;
    if (path === '/') {
      document.title = t('seo.title');
    } else if (path === '/editer') {
      document.title = `Créer une facture conforme 2026 - ${t('seo.title')}`;
    } else if (path === '/dashboard') {
      document.title = `Tableau de bord - ${t('seo.title')}`;
    } else if (path.includes('/blog')) {
      document.title = `Blog - Guide facturation ${t('seo.title')}`;
    }
  }, [location, t]);

  const toggleLanguage = () => {
    const newLang = i18n.language === 'fr' ? 'en' : 'fr';
    i18n.changeLanguage(newLang);
    document.documentElement.lang = newLang;
    document.title = t('seo.title');
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
      invoiceNumber: `FACT-${new Date().getFullYear()}-${(invoices.length + 1).toString().padStart(3, '0')}`,
      date: format(new Date(), 'yyyy-MM-dd'),
      dueDate: format(addDays(new Date(), 30), 'yyyy-MM-dd'),
      client: { name: '', email: '', address: '', vatNumber: '' },
      items: [{ id: '1', description: '', quantity: 1, unitPrice: 0, vatRate: 20 }],
      taxRate: 20,
      discount: 0,
      currency: 'EUR',
      status: 'draft',
      type: 'invoice',
      template: 'modern',
      vatExempt: false,
      reverseCharge: false
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
    
    const originalStyle = element.style.cssText;
    const originalClassName = element.className;
    element.style.width = '794px';
    element.style.maxWidth = 'none';
    element.style.boxShadow = 'none';
    element.className = originalClassName.replace('shadow-2xl', '');
    
    try {
      const imgData = await toPng(element, { 
        quality: 1, 
        pixelRatio: 3,
        backgroundColor: '#ffffff',
        style: {
          transform: 'scale(1)',
          transformOrigin: 'top left'
        }
      });
      
      element.style.cssText = originalStyle;
      element.className = originalClassName;
      
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const imgProps = pdf.getImageProperties(imgData);
      const imgHeight = (imgProps.height * pdfWidth) / imgProps.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, imgHeight, undefined, 'FAST');
      pdf.save(`${invoice.invoiceNumber}.pdf`);
      setIsExporting(false);
      return imgData;
    } catch (error) {
      element.style.cssText = originalStyle;
      element.className = originalClassName;
      setIsExporting(false);
      console.error("Error generating PDF:", error);
      alert(t('invoice.exportError', { defaultValue: "Erreur lors de la génération du PDF. Veuillez réessayer." }));
      throw error;
    }
  };

  const handleSendEmail = async (invoice: Invoice) => {
    setIsSending(true);
    try {
      await handleExportPDF(invoice);
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      alert(t('invoice.sentSuccess', { defaultValue: "Facture envoyée avec succès !" }));
      updateInvoice({ ...invoice, status: 'sent' });
    } catch (error) {
      console.error("Error sending email:", error);
      alert(t('invoice.sendError', { defaultValue: "Erreur lors de l'envoi de l'email." }));
    } finally {
      setIsSending(false);
    }
  };

  return (
    <>
      <Routes>
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<LandingPage onStart={() => navigate('/editer')} />} />
          <Route path="features" element={<Features />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="faq" element={<FAQ />} />
          <Route path="blog" element={<Blog onStart={() => navigate('/editer')} />} />
          <Route path="blog/:slug" element={<BlogPost onStart={() => navigate('/editer')} />} />
          <Route path="legal" element={<Legal />} />
          <Route path="generateur/facture-auto-entrepreneur" element={
            <>
              <Helmet>
                <title>Facture Auto-Entrepreneur : Modèle Conforme Article 293 B | InvoiceGEN</title>
                <meta name="description" content="Générez vos factures auto-entrepreneur conformes à l'article 293 B du CGI. Mentions légales automatiques, franchise TVA, autoliquidation. 100% gratuit." />
              </Helmet>
              <MiniLandingPage niche="auto-entrepreneur" onStart={() => navigate('/editer')} />
            </>
          } />
          <Route path="generateur/facture-prestation-service" element={
            <>
              <Helmet>
                <title>Facture Prestation de Service : Modèle Professionnel | InvoiceGEN</title>
                <meta name="description" content="Facture prestation de service conforme aux règles de territorialité TVA. Autoliquidation intracommunautaire, mentions légales obligatoires." />
              </Helmet>
              <MiniLandingPage niche="prestation-service" onStart={() => navigate('/editer')} />
            </>
          } />
          <Route path="generateur/facture-internationale" element={
            <>
              <Helmet>
                <title>Facture Internationale : TVA Intracommunautaire & Reverse Charge | InvoiceGEN</title>
                <meta name="description" content="Facture internationale conforme à la directive européenne 2006/112/CE. Gestion de l'autoliquidation, validation VIES, mentions obligatoires." />
              </Helmet>
              <MiniLandingPage niche="internationale" onStart={() => navigate('/editer')} />
            </>
          } />
        </Route>
        
        <Route path="/" element={<AppLayout onCreate={handleCreateNew}><Outlet /></AppLayout>}>
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
                    }}
                    isExporting={isExporting}
                    isSending={isSending}
                  />
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center p-8">
                <FileText size={80} className="text-indigo-500 mb-6" />
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Aucune facture en cours</h2>
                <p className="text-gray-600 mb-6">Créez votre première facture conforme à l'article 293 B du CGI</p>
                <button onClick={handleCreateNew} className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg hover:shadow-xl">
                  + Créer une nouvelle facture
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
    </>
  );
}