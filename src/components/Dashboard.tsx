import React from 'react';
import { 
  LayoutDashboard, 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  FileText, 
  Send, 
  ChevronRight 
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
  onViewAll: () => void;
}

export const Dashboard: React.FC<Props> = ({ stats, invoices, onViewAll }) => {
  const { t } = useTranslation();
  const chartData = [
    { name: t('dashboard.months.jan', { defaultValue: 'Jan' }), revenue: 4000 },
    { name: t('dashboard.months.feb', { defaultValue: 'Feb' }), revenue: 3000 },
    { name: t('dashboard.months.mar', { defaultValue: 'Mar' }), revenue: 2000 },
    { name: t('dashboard.months.apr', { defaultValue: 'Apr' }), revenue: 2780 },
    { name: t('dashboard.months.may', { defaultValue: 'May' }), revenue: 1890 },
    { name: t('dashboard.months.jun', { defaultValue: 'Jun' }), revenue: 2390 },
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-8 rounded-3xl border border-slate-100 shadow-xl">
          <h3 className="font-black text-xl mb-8 tracking-tight">{t('dashboard.revenueOverview', { defaultValue: 'Revenue Overview' })}</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94A3B8', fontWeight: 700 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94A3B8', fontWeight: 700 }} />
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

        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xl">
          <h3 className="font-black text-xl mb-8 tracking-tight">{t('dashboard.recentActivity', { defaultValue: 'Recent Activity' })}</h3>
          <div className="space-y-6">
            {invoices.slice(0, 5).map(inv => (
              <div key={inv.id} className="flex items-center gap-4 group cursor-pointer">
                <div className={cn(
                  "w-10 h-10 rounded-xl flex items-center justify-center transition-colors",
                  inv.status === 'paid' ? "bg-emerald-50 text-emerald-600" : "bg-blue-50 text-blue-600"
                )}>
                  {inv.status === 'paid' ? <CheckCircle size={18} /> : <Send size={18} />}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold truncate">{inv.client.name}</p>
                  <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">{inv.invoiceNumber}</p>
                </div>
                <p className="text-sm font-black">{formatCurrency(inv.items.reduce((s, i) => s + (i.quantity * i.unitPrice), 0))}</p>
              </div>
            ))}
          </div>
          <button onClick={onViewAll} className="w-full mt-8 text-xs text-blue-600 font-black uppercase tracking-widest hover:underline flex items-center justify-center gap-1">
            {t('dashboard.viewAll', { defaultValue: 'View All' })} <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

function StatCard({ label, value, icon, trend }: { label: string, value: string, icon: React.ReactNode, trend: string }) {
  return (
    <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xl hover:shadow-2xl transition-all group">
      <div className="flex items-center justify-between mb-6">
        <div className="p-3 bg-slate-50 rounded-2xl group-hover:scale-110 transition-transform">{icon}</div>
        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{label}</span>
      </div>
      <p className="text-3xl font-black mb-2 tracking-tighter">{value}</p>
      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{trend}</p>
    </div>
  );
}
