import React from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Receipt,
  PiggyBank,
  Home,
  PlusCircle,
  Sun,
  Moon,
  Sparkles,
  RotateCcw,
  Trash2,
  Leaf,
  Layers,
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useExpenses } from '../context/ExpenseContext';

const NAV_ITEMS = [
  { path: '/', label: 'Home', icon: Home },
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/expenses', label: 'Expenses', icon: Receipt },
  { path: '/budget', label: 'Budget', icon: PiggyBank },
];

export function Sidebar({ onOpenAddExpense, onOpenComingSoon }) {
  const { isDark, toggleTheme } = useTheme();
  const { restoreDemoData, clearAllExpenses } = useExpenses();
  const location = useLocation();

  return (
    <aside className="hidden lg:flex flex-col w-64 h-screen sticky top-0 border-r border-white/10 dark:border-white/10 light:border-slate-200 bg-slate-950/80 dark:bg-slate-950/80 light:bg-white/80 backdrop-blur-2xl z-40 transition-colors">
      {/* Brand logo */}
      <div className="p-6 pb-4 flex items-center justify-between border-b border-white/5 dark:border-white/5 light:border-slate-100">
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-500 via-teal-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform">
            <span className="text-white font-black text-xl tracking-tight">S</span>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-display font-extrabold text-lg text-white dark:text-white light:text-slate-900 tracking-tight">
                Spend<span className="text-emerald-400">Smart</span>
              </span>
            </div>
            <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/20 flex items-center gap-1 w-max">
              <Leaf className="w-2.5 h-2.5" /> SDG 12
            </span>
          </div>
        </Link>
      </div>

      {/* Main navigation links */}
      <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
        <div className="px-3 pb-2 text-[11px] font-bold uppercase tracking-wider text-slate-500">
          Menu
        </div>
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3.5 px-4 py-3 rounded-2xl text-sm font-semibold transition-all duration-200 ${
                isActive
                  ? 'bg-gradient-to-r from-emerald-500/20 to-teal-500/10 text-emerald-400 border border-emerald-500/30 shadow-md shadow-emerald-950/40'
                  : 'text-slate-400 hover:text-white dark:hover:text-white light:hover:text-slate-900 hover:bg-slate-800/40 light:hover:bg-slate-100'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-emerald-400' : 'text-slate-400'}`} />
              <span>{item.label}</span>
              {isActive && (
                <span className="ml-auto w-1.5 h-5 rounded-full bg-emerald-400" />
              )}
            </NavLink>
          );
        })}

        {/* Quick Add Expense Action */}
        <div className="pt-4">
          <button
            onClick={onOpenAddExpense}
            className="w-full flex items-center justify-center gap-2.5 py-3 px-4 rounded-2xl font-semibold text-sm text-white bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 shadow-lg shadow-emerald-500/25 active:scale-98 transition-all"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Add Expense</span>
          </button>
        </div>

        {/* Student Feature Hub Preview */}
        <div className="pt-6">
          <div className="px-3 pb-2 text-[11px] font-bold uppercase tracking-wider text-slate-500">
            Smart Features
          </div>
          <button
            onClick={() => onOpenComingSoon('ai')}
            className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium text-slate-400 hover:text-emerald-300 hover:bg-emerald-500/10 transition-colors"
          >
            <span className="flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" /> AI Coach
            </span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300">Soon</span>
          </button>

          <button
            onClick={() => onOpenComingSoon('csv')}
            className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium text-slate-400 hover:text-emerald-300 hover:bg-emerald-500/10 transition-colors"
          >
            <span className="flex items-center gap-2">
              <Layers className="w-3.5 h-3.5 text-indigo-400" /> CSV Export
            </span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300">Soon</span>
          </button>
        </div>
      </nav>

      {/* Footer controls: theme & data reset */}
      <div className="p-4 border-t border-white/5 dark:border-white/5 light:border-slate-100 space-y-2 bg-slate-950/40 dark:bg-slate-950/40 light:bg-slate-50/60">
        <div className="flex items-center justify-between px-1">
          <span className="text-xs text-slate-400 font-medium">Appearance</span>
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme mode"
            className="flex items-center gap-1.5 p-2 rounded-xl border border-white/10 dark:border-white/10 light:border-slate-200 text-slate-300 light:text-slate-700 hover:bg-slate-800 light:hover:bg-slate-200 transition-colors text-xs font-semibold"
          >
            {isDark ? (
              <>
                <Sun className="w-4 h-4 text-amber-400" /> Light
              </>
            ) : (
              <>
                <Moon className="w-4 h-4 text-cyan-500" /> Dark
              </>
            )}
          </button>
        </div>

        <div className="flex items-center gap-2 pt-1">
          <button
            onClick={restoreDemoData}
            title="Reset to realistic college demo data"
            className="flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2 text-[11px] font-medium rounded-lg text-slate-400 hover:text-emerald-400 hover:bg-emerald-500/10 transition-colors"
          >
            <RotateCcw className="w-3 h-3" /> Reset Demo
          </button>
          <button
            onClick={clearAllExpenses}
            title="Clear all expense records"
            className="flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2 text-[11px] font-medium rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
          >
            <Trash2 className="w-3 h-3" /> Clear All
          </button>
        </div>
      </div>
    </aside>
  );
}

// Mobile Bottom Navigation Bar
export function BottomTabBar({ onOpenAddExpense }) {
  const location = useLocation();

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-950/90 dark:bg-slate-950/90 light:bg-white/90 backdrop-blur-2xl border-t border-white/10 dark:border-white/10 light:border-slate-200 px-4 py-2 flex items-center justify-around">
      {NAV_ITEMS.map((item) => {
        const Icon = item.icon;
        const isActive = location.pathname === item.path;
        return (
          <NavLink
            key={item.path}
            to={item.path}
            className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-colors ${
              isActive
                ? 'text-emerald-400'
                : 'text-slate-400 hover:text-white dark:hover:text-white light:hover:text-slate-800'
            }`}
          >
            <Icon className="w-5 h-5" />
            <span className="text-[10px] font-medium">{item.label}</span>
          </NavLink>
        );
      })}

      {/* Floating Center Add Button */}
      <button
        onClick={onOpenAddExpense}
        aria-label="Add Expense"
        className="w-12 h-12 -mt-6 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 flex items-center justify-center text-white shadow-lg shadow-emerald-500/30 active:scale-90 transition-transform"
      >
        <PlusCircle className="w-6 h-6" />
      </button>
    </nav>
  );
}

// Mobile Header with Theme and Demo Data toggle
export function MobileHeader({ onOpenComingSoon }) {
  const { isDark, toggleTheme } = useTheme();
  const { restoreDemoData } = useExpenses();

  return (
    <header className="lg:hidden sticky top-0 z-40 bg-slate-950/85 dark:bg-slate-950/85 light:bg-white/85 backdrop-blur-xl border-b border-white/10 dark:border-white/10 light:border-slate-200 px-4 py-3 flex items-center justify-between">
      <Link to="/" className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-500 to-cyan-400 flex items-center justify-center text-white font-black text-sm">
          S
        </div>
        <span className="font-display font-extrabold text-base text-white dark:text-white light:text-slate-900">
          Spend<span className="text-emerald-400">Smart</span>
        </span>
      </Link>

      <div className="flex items-center gap-2">
        <button
          onClick={restoreDemoData}
          title="Reset Demo Data"
          className="p-2 rounded-xl text-slate-400 hover:text-emerald-400 border border-white/10 light:border-slate-200"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
        <button
          onClick={toggleTheme}
          aria-label="Toggle Theme"
          className="p-2 rounded-xl text-slate-300 light:text-slate-700 border border-white/10 light:border-slate-200 hover:bg-slate-800/50"
        >
          {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-cyan-600" />}
        </button>
      </div>
    </header>
  );
}
