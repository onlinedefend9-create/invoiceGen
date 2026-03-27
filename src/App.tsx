/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
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

import { cn, formatCurrency } from './lib/utils';
import { Invoice, DashboardStats, TemplateType } from './types';
import { useInvoiceStore } from './hooks/useInvoiceStore';

// Components
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

type View = 'landing' | 'features' | 'pricing' | 'faq' | 'blog' | 'blog-post-2026' | 'blog-post-2026-en' | 'legal' | 'dashboard' | 'list' | 'create' | 'edit' | 'preview' | 'settings';

export default function App() {
  const { t, i18n } = useTranslation();
  const { invoices, profile, setProfile, addInvoice, updateInvoice, deleteInvoice } = useInvoiceStore();
  const [view, setView] = useState<View>('landing');
  const [blogSlug, setBlogSlug] = useState<string>('');
  const [currentInvoice, setCurrentInvoice] = useState<Invoice | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isPublicView = ['landing', 'features', 'pricing', 'faq', 'blog', 'blog-post-2026', 'blog-post-2026-en', 'legal'].includes(view);

  const handleNavigate = (newView: View, slug?: string) => {
    setView(newView);
    if (slug) setBlogSlug(slug);
    window.scrollTo(0, 0);
  };

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
    setView('create');
  };

  const handleSaveInvoice = (invoice: Invoice) => {
    if (view === 'create') {
      addInvoice(invoice);
    } else {
      updateInvoice(invoice);
    }
    setView('list');
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

  if (isPublicView) {
    return (
      <div className="min-h-screen bg-white font-sans selection:bg-blue-100 selection:text-blue-900">
        <PublicHeader onNavigate={setView} currentView={view} />
        <main>
          <AnimatePresence mode="wait">
            {view === 'landing' && <LandingPage key="landing" onStart={() => setView('dashboard')} onNavigate={setView} />}
            {view === 'features' && <Features key="features" />}
            {view === 'pricing' && <Pricing key="pricing" />}
            {view === 'faq' && <FAQ key="faq" />}
            {view === 'blog' && <Blog key="blog" onNavigate={(v, s) => handleNavigate(v as View, s)} />}
            {view === 'blog-post-2026' && (
              <BlogPost 
                key="blog-post-2026" 
                slug={blogSlug || 'guide-conformite-facturation-2026'} 
                onBack={() => setView('blog')} 
                onStart={() => setView('dashboard')} 
              />
            )}
            {view === 'blog-post-2026-en' && (
              <BlogPost 
                key="blog-post-2026-en" 
                slug={blogSlug || '2026-invoicing-conformity-guide'} 
                onBack={() => setView('blog')} 
                onStart={() => setView('dashboard')} 
              />
            )}
            {view === 'legal' && <Legal key="legal" />}
          </AnimatePresence>
        </main>
        <PublicFooter onNavigate={setView} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col lg:flex-row text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex w-72 bg-white border-r border-slate-100 flex-col sticky top-0 h-screen z-20">
        <div className="p-8 border-b border-slate-50">
          <div 
            onClick={() => setView('landing')}
            className="flex items-center gap-3 text-blue-600 cursor-pointer"
          >
            <div className="w-10 h-10 bg-blue-600 rounded-2xl flex items-center justify-center text-white font-black text-2xl shadow-lg shadow-blue-100">I</div>
            <h1 className="text-xl font-black tracking-tighter">InvoiceGEN</h1>
          </div>
        </div>
        
        <nav className="flex-1 p-6 space-y-2">
          <SidebarLink active={view === 'dashboard'} onClick={() => setView('dashboard')} icon={<LayoutDashboard size={20} />} label={t('common.dashboard')} />
          <SidebarLink active={view === 'list' || view === 'create' || view === 'edit' || view === 'preview'} onClick={() => setView('list')} icon={<FileText size={20} />} label={t('common.invoices')} />
          <SidebarLink active={view === 'settings'} onClick={() => setView('settings')} icon={<Settings size={20} />} label={t('common.settings')} />
        </nav>

        <div className="p-6 mt-auto">
          <button 
            onClick={handleCreateNew}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-black flex items-center justify-center gap-2 transition-all shadow-xl shadow-blue-100 group"
          >
            <Plus size={20} className="group-hover:rotate-90 transition-transform" />
            {t('common.newInvoice')}
          </button>
        </div>
      </aside>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 lg:hidden"
            />
            <motion.aside 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              className="fixed inset-y-0 left-0 w-72 bg-white z-50 lg:hidden flex flex-col shadow-2xl"
            >
              <div className="p-8 border-b border-slate-50 flex items-center justify-between">
                <div className="flex items-center gap-3 text-blue-600">
                  <div className="w-10 h-10 bg-blue-600 rounded-2xl flex items-center justify-center text-white font-black text-2xl">I</div>
                  <h1 className="text-xl font-black tracking-tighter">InvoiceGEN</h1>
                </div>
                <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 hover:bg-slate-50 rounded-xl text-slate-400">
                  <X size={24} />
                </button>
              </div>
              <nav className="flex-1 p-6 space-y-2">
                <SidebarLink active={view === 'dashboard'} onClick={() => { setView('dashboard'); setIsMobileMenuOpen(false); }} icon={<LayoutDashboard size={20} />} label={t('common.dashboard')} />
                <SidebarLink active={view === 'list' || view === 'create' || view === 'edit' || view === 'preview'} onClick={() => { setView('list'); setIsMobileMenuOpen(false); }} icon={<FileText size={20} />} label={t('common.invoices')} />
                <SidebarLink active={view === 'settings'} onClick={() => { setView('settings'); setIsMobileMenuOpen(false); }} icon={<Settings size={20} />} label={t('common.settings')} />
              </nav>
              <div className="p-6">
                <button 
                  onClick={() => { handleCreateNew(); setIsMobileMenuOpen(false); }}
                  className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black flex items-center justify-center gap-2"
                >
                  <Plus size={20} />
                  {t('common.newInvoice')}
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <header className="h-20 bg-white/80 backdrop-blur-xl border-b border-slate-50 flex items-center justify-between px-4 lg:px-10 sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button onClick={() => setIsMobileMenuOpen(true)} className="lg:hidden p-2 hover:bg-slate-50 rounded-xl text-slate-600">
              <Menu size={24} />
            </button>
            <h2 className="text-lg lg:text-xl font-black tracking-tight capitalize truncate max-w-[150px] lg:max-w-none">
              {view === 'list' ? t('common.myInvoices') : t(`common.${view}`, { defaultValue: view })}
            </h2>
            {view === 'list' && <span className="hidden sm:inline-block px-3 py-1 bg-slate-100 rounded-full text-[10px] font-black uppercase tracking-widest text-slate-500">{invoices.length} {t('common.total')}</span>}
          </div>
          <div className="flex items-center gap-2 lg:gap-6">
            <div className="relative group hidden sm:block">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={18} />
              <input 
                type="text" 
                placeholder={t('common.search')} 
                className="pl-12 pr-6 py-2.5 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-blue-500 w-48 lg:w-72 transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <button 
              onClick={toggleLanguage}
              className="p-2.5 bg-slate-50 hover:bg-slate-100 rounded-xl text-slate-600 transition-colors flex items-center gap-2 font-black text-[10px] lg:text-xs uppercase tracking-widest"
            >
              <Globe size={18} />
              <span className="hidden xs:inline">{i18n.language === 'fr' ? 'EN' : 'FR'}</span>
            </button>

            <div className="flex items-center gap-3 pl-2 lg:pl-6 border-l border-slate-100">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-black tracking-tight truncate max-w-[100px]">{profile.companyName}</p>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{t('common.administrator')}</p>
              </div>
              <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-black text-sm border-2 border-white shadow-sm shrink-0">
                {profile.companyName.charAt(0)}
              </div>
            </div>
          </div>
        </header>

        <div className="p-4 lg:p-10 max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            {view === 'dashboard' && <Dashboard key="dashboard" stats={stats} invoices={invoices} onViewAll={() => setView('list')} />}
            
            {view === 'list' && (
              <motion.div key="list" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="bg-white rounded-[32px] border border-slate-100 shadow-xl overflow-hidden">
                <div className="p-8 border-b border-slate-50 flex items-center justify-between">
                  <h3 className="font-black text-xl tracking-tight">{t('invoice.history', { defaultValue: "Invoice History" })}</h3>
                  <div className="flex gap-3">
                    <button className="p-3 hover:bg-slate-50 rounded-2xl text-slate-400 transition-colors"><Filter size={20} /></button>
                    <button onClick={handleCreateNew} className="bg-blue-600 text-white px-6 py-3 rounded-2xl text-sm font-black flex items-center gap-2 hover:bg-blue-700 transition-all shadow-lg shadow-blue-100">
                      <Plus size={18} /> {t('invoice.createNew')}
                    </button>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="bg-slate-50/50 text-[10px] uppercase text-slate-400 font-black tracking-widest">
                      <tr>
                        <th className="px-8 py-5">{t('invoice.invoiceNumber')}</th>
                        <th className="px-8 py-5">Type</th>
                        <th className="px-8 py-5">{t('invoice.client')}</th>
                        <th className="px-8 py-5">{t('invoice.date')}</th>
                        <th className="px-8 py-5">{t('invoice.amount')}</th>
                        <th className="px-8 py-5">{t('invoice.status')}</th>
                        <th className="px-8 py-5 text-right">{t('invoice.actions')}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {filteredInvoices.map(inv => (
                        <tr key={inv.id} className="hover:bg-slate-50/50 transition-colors group">
                          <td className="px-8 py-6 font-black text-blue-600 tracking-tight cursor-pointer" onClick={() => { setCurrentInvoice(inv); setView('edit'); }}>{inv.invoiceNumber}</td>
                          <td className="px-8 py-6">
                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                              {inv.type === 'invoice' ? t('invoice.type_invoice', { defaultValue: 'Invoice' }) : 
                               inv.type === 'credit_note' ? t('invoice.type_credit_note', { defaultValue: 'Credit Note' }) : 
                               inv.type === 'quote' ? t('invoice.type_quote', { defaultValue: 'Quote' }) : t('invoice.type_order', { defaultValue: 'Purchase Order' })}
                            </span>
                          </td>
                          <td className="px-8 py-6">
                            <p className="font-bold text-sm">{inv.client.name}</p>
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{inv.client.email}</p>
                          </td>
                          <td className="px-8 py-6 text-sm font-bold text-slate-500">{format(parseISO(inv.date), 'dd MMM yyyy')}</td>
                          <td className="px-8 py-6 font-black text-lg tracking-tighter">
                            {formatCurrency(inv.items.reduce((s, i) => s + (i.quantity * i.unitPrice), 0) * (1 + inv.taxRate / 100) - inv.discount)}
                          </td>
                          <td className="px-8 py-6">
                            <span className={cn(
                              "px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest",
                              inv.status === 'paid' && "bg-emerald-100 text-emerald-700",
                              inv.status === 'sent' && "bg-blue-100 text-blue-700",
                              inv.status === 'draft' && "bg-slate-100 text-slate-700",
                              inv.status === 'overdue' && "bg-rose-100 text-rose-700"
                            )}>
                              {t(`invoice.${inv.status}`)}
                            </span>
                          </td>
                          <td className="px-8 py-6 text-right">
                            <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button onClick={() => { setCurrentInvoice(inv); setView('preview'); }} className="p-2 hover:bg-blue-50 text-blue-600 rounded-xl transition-colors"><Printer size={18} /></button>
                              <button onClick={() => deleteInvoice(inv.id)} className="p-2 hover:bg-rose-50 text-rose-600 rounded-xl transition-colors"><Trash2 size={18} /></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}

            {(view === 'create' || view === 'edit') && currentInvoice && (
              <InvoiceForm 
                key="form" 
                invoice={currentInvoice} 
                onChange={setCurrentInvoice} 
                onSave={handleSaveInvoice} 
                onPreview={() => setView('preview')} 
                onBack={() => setView('list')} 
              />
            )}

            {view === 'preview' && currentInvoice && (
              <motion.div key="preview" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-8">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <button onClick={() => setView('edit')} className="flex items-center gap-2 text-slate-500 hover:text-slate-800 font-bold text-sm transition-colors">
                    <ArrowLeft size={20} /> {t('invoice.backToEdit')}
                  </button>
                  <div className="flex flex-wrap gap-4 w-full sm:w-auto">
                    <button 
                      onClick={() => window.print()}
                      className="flex-1 sm:flex-none px-6 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold flex items-center justify-center gap-2 hover:bg-slate-50 transition-all shadow-sm"
                    >
                      <Printer size={18} />
                      {t('invoice.print', { defaultValue: 'Print' })}
                    </button>
                    <button 
                      onClick={() => handleSendEmail(currentInvoice)}
                      disabled={isSending}
                      className="flex-1 sm:flex-none px-6 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold flex items-center justify-center gap-2 hover:bg-slate-50 transition-all shadow-sm disabled:opacity-50"
                    >
                      {isSending ? <Loader2 className="animate-spin" size={18} /> : <Mail size={18} />}
                      {t('invoice.sendEmail')}
                    </button>
                    <button 
                      onClick={() => handleExportPDF(currentInvoice)}
                      disabled={isExporting}
                      className="flex-1 sm:flex-none px-8 py-2 bg-blue-600 text-white rounded-xl text-sm font-black flex items-center justify-center gap-2 hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 disabled:opacity-50"
                    >
                      {isExporting ? <Loader2 className="animate-spin" size={18} /> : <Download size={18} />}
                      {t('invoice.downloadPDF')}
                    </button>
                  </div>
                </div>
                <div className="bg-white p-2 lg:p-4 rounded-[20px] lg:rounded-[40px] shadow-2xl border border-slate-100 overflow-x-auto print:shadow-none print:border-none print:p-0">
                  <div className="min-w-[800px] lg:min-w-0 print:min-w-0">
                    <InvoicePreview invoice={currentInvoice} userProfile={profile} id="invoice-render" />
                  </div>
                </div>
              </motion.div>
            )}

            {view === 'settings' && <ProfileSettings key="settings" profile={profile} onSave={(p) => { setProfile(p); setView('dashboard'); }} />}
          </AnimatePresence>
        </div>
        <AppFooter />
      </main>
    </div>
  );
}

function SidebarLink({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string }) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-sm font-bold transition-all relative group",
        active 
          ? "bg-blue-600 text-white shadow-lg shadow-blue-100" 
          : "text-slate-400 hover:bg-slate-50 hover:text-slate-900"
      )}
    >
      <span className={cn("transition-transform group-hover:scale-110", active ? "text-white" : "text-slate-400 group-hover:text-blue-600")}>{icon}</span>
      {label}
      {active && <motion.div layoutId="active-pill" className="absolute right-4 w-1.5 h-1.5 bg-white rounded-full" />}
    </button>
  );
}
