import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Home, Plus, LayoutDashboard, Settings } from 'lucide-react';
import { cn } from '../lib/utils';

interface Props {
  onCreate: () => void;
}

export const AppLayout: React.FC<Props> = ({ onCreate }) => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Accueil', icon: Home, onClick: undefined },
    { path: '/editer', label: 'Nouveau', icon: Plus, onClick: onCreate },
    { path: '/dashboard', label: 'Tableau de bord', icon: LayoutDashboard, onClick: undefined },
    { path: '/dashboard/settings', label: 'Paramètres', icon: Settings, onClick: undefined },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col lg:flex-row">
      <nav className="bg-white border-b lg:border-b-0 lg:border-r border-slate-200 p-4 lg:w-64 flex lg:flex-col gap-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return item.onClick ? (
            <button
              key={item.path}
              onClick={item.onClick}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all w-full text-left",
                isActive 
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-200" 
                  : "text-slate-500 hover:bg-slate-100"
              )}
            >
              <Icon size={20} />
              <span className="hidden lg:inline">{item.label}</span>
            </button>
          ) : (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all w-full text-left",
                isActive 
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-200" 
                  : "text-slate-500 hover:bg-slate-100"
              )}
            >
              <Icon size={20} />
              <span className="hidden lg:inline">{item.label}</span>
            </Link>
          );
        })}
      </nav>
      <main className="flex-1 p-6 lg:p-12 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};
