import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  FileText, 
  Send, 
  ChevronRight,
  Sparkles 
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Cell 
} from 'recharts';
import { Invoice, DashboardStats } from '../types';
import { cn, formatCurrency } from '../lib/utils';
import { useTranslation } from 'react-i18next';

interface Props {
  stats: DashboardStats;
  invoices: Invoice[];
  onPreviewInvoice: (id: string) => void;
}

export const Dashboard: React.FC<Props> = ({ stats, invoices, onPreviewInvoice }) => {
  const { t } = useTranslation();
  const [showAll, setShowAll] = useState(false);
  
  const chartData = [
    { name: t('dashboard.months.jan', { defaultValue: 'Jan' }), revenue: 4000 },
    { name: t('dashboard.months.feb', { defaultValue: 'Feb' }), revenue: 3000 },
    { name: t('dashboard.months.mar', { defaultValue: 'Mar' }), revenue: 2000 },
    { name: t('dashboard.months.apr', { defaultValue: 'Apr' }), revenue: 2780 },
    { name: t('dashboard.months.may', { defaultValue: 'May' }), revenue: 1890 },
    { name: t('dashboard.months.jun', { defaultValue: 'Jun' }), revenue: 2390 },
  ];

  return (
    <div className="space-y-6 lg:space-y-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
        <StatCard 
          label={t('dashboard.stats.totalRevenue', { defaultValue: 'Total Revenue' })} 
          value={formatCurrency(stats.totalRevenue)} 
          icon={<CheckCircle className="text-emerald-500" />} 
          trend={t('dashboard.stats.vsLastMonth', { defaultValue: '+12% vs last month' })} 
        />
        <StatCard 
          label={t('dashboard.stats.pending', { defaultValue: 'Pending' })} 
          value={formatCurrency(stats.pendingAmount)} 
          icon={<Clock className="text-amber-500" />} 
          trend={t('dashboard.stats.invoicesCount', { count: invoices.filter(i => i.status === 'sent').length, defaultValue: '{{count}} invoices' })} 
        />
        <StatCard 
          label={t('dashboard.stats.paidInvoices', { defaultValue: 'Paid Invoices' })} 
          value={stats.paidInvoices.toString()} 
          icon={<FileText className="text-blue-500" />} 
          trend={t('dashboard.stats.paymentRate', { defaultValue: 'High payment rate' })} 
        />
        <StatCard 
          label={t('dashboard.stats.overdue', { defaultValue: 'Overdue' })} 
          value={stats.overdueInvoices.toString()} 
          icon={<AlertCircle className="text-rose-500" />} 
          trend={t('dashboard.stats.actionRequired', { defaultValue: 'Action required' })} 
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">
        <div className="xl:col-span-2 bg-white p-6 sm:p-10 rounded-[32px] sm:rounded-[40px] border border-slate-100 shadow-xl space-y-8 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full -mr-16 -mt-16 blur-3xl opacity-50 group-hover:bg-purple-50 transition-colors duration-700" />
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative z-10">
            <div className="space-y-1">
              <h3 className="font-black text-xl sm:text-2xl tracking-tight flex items-center gap-2">
                {t('dashboard.revenueOverview', { defaultValue: 'Revenue Overview' })}
                <Sparkles size={20} className="text-blue-600 animate-pulse" />
              </h3>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{t('dashboard.last6Months', { defaultValue: 'Performance over the last 6 months' })}</p>
            </div>
          </div>
          
          <div className="h-64 sm:h-80 w-full relative z-10">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94A3B8', fontWeight: 700 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94A3B8', fontWeight: 700 }} />
                <Tooltip cursor={{ fill: '#F8FAFC' }} contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }} />
                <Bar dataKey="revenue" radius={[6, 6, 0, 0]}>
                  {chartData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={index === chartData.length - 1 ? '#2563EB' : '#E2E8F0'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 sm:p-10 rounded-[32px] sm:rounded-[40px] border border-slate-100 shadow-xl space-y-8">
          <div className="flex items-center justify-between">
            <h3 className="font-black text-xl sm:text-2xl tracking-tight">{t('dashboard.recentActivity', { defaultValue: 'Recent Activity' })}</h3>
            {invoices.length > 5 && (
              <button onClick={() => setShowAll(!showAll)} className="text-[10px] font-black uppercase tracking-widest text-blue-600 hover:text-blue-700 transition-colors">
                {showAll ? t('common.showLess', { defaultValue: 'Show Less' }) : t('common.viewAll', { defaultValue: 'View All' })}
              </button>
            )}
          </div>
          
          <div className="space-y-6">
            {invoices.slice(0, showAll ? undefined : 5).map(inv => (
              <div key={inv.id} onClick={() => onPreviewInvoice(inv.id)} className="flex items-center gap-4 group cursor-pointer hover:bg-slate-50 p-2 -mx-2 rounded-2xl transition-colors">
                <div className={cn(
                  "w-10 h-10 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 shrink-0",
                  inv.status === 'paid' ? "bg-emerald-50 text-emerald-600" : "bg-blue-50 text-blue-600"
                )}>
                  {inv.status === 'paid' ? <CheckCircle size={20} /> : <Send size={20} />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-black truncate">{inv.client.name}</p>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{inv.invoiceNumber}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm font-black">{formatCurrency(inv.items.reduce((s, i) => s + (i.quantity * i.unitPrice), 0))}</p>
                  <p className={cn(
                    "text-[10px] font-black uppercase tracking-widest",
                    inv.status === 'paid' ? "text-emerald-600" : "text-blue-600"
                  )}>{t(`invoice.status.${inv.status}`, { defaultValue: inv.status })}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

function StatCard({ label, value, icon, trend }: { label: string, value: string, icon: React.ReactNode, trend: string }) {
  return (
    <div className="bg-white p-6 sm:p-8 rounded-[32px] border border-slate-100 shadow-xl hover:shadow-2xl transition-all group">
      <div className="flex items-center justify-between mb-6">
        <div className="p-3 bg-slate-50 rounded-2xl group-hover:scale-110 transition-transform">{icon}</div>
        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{label}</span>
      </div>
      <p className="text-2xl sm:text-3xl font-black mb-2 tracking-tighter">{value}</p>
      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{trend}</p>
    </div>
  );
}
