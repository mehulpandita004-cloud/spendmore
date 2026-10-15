import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, User, FileSpreadsheet, Bot, FileText, Bell } from 'lucide-react';
import { useExpenses } from '../context/ExpenseContext';

const featureDetails = {
  login: {
    title: 'Student Cloud Sync & Multi-Device Login',
    icon: User,
    color: 'from-emerald-500 to-teal-500',
    description: 'Sync your college expense data securely across your phone, tablet, and laptop with campus .edu email authentication.',
    badge: 'Phase 2 Roadmap',
    bullets: ['Cross-device cloud backup', 'Offline-first automatic sync', 'Campus group expense splitting'],
  },
  csv: {
    title: 'CSV & Excel Statement Export',
    icon: FileSpreadsheet,
    color: 'from-teal-500 to-cyan-500',
    description: 'Download detailed monthly ledgers formatted for tax savings, parent allowances, and personal budgeting records.',
    badge: 'Coming in v1.2',
    bullets: ['Custom date range filters', 'Category breakdown spreadsheets', 'One-click PDF receipt bundles'],
  },
  ai: {
    title: 'AI Spending Recommendations & Habit Coach',
    icon: Bot,
    color: 'from-cyan-500 to-indigo-500',
    description: 'Gemini-powered personalized insights designed specifically for university students to cut wasteful spends and increase savings.',
    badge: 'In Active Development',
    bullets: ['Predictive month-end cashflow alerts', 'SDG 12 sustainable consumption score', 'Tailored student discount finder'],
  },
  report: {
    title: 'Monthly Expense Audit & PDF Report',
    icon: FileText,
    color: 'from-indigo-500 to-purple-500',
    description: 'Generate polished, presentation-ready monthly financial summaries complete with donut charts, category trends, and budget health scores.',
    badge: 'Coming Soon',
    bullets: ['Visual spending distribution charts', 'Comparison with previous 3 months', 'Campus life affordability index'],
  },
};

export default function ComingSoonModal({ isOpen, featureKey, onClose }) {
  const { showToast } = useExpenses();
  const feature = featureDetails[featureKey] || featureDetails.ai;
  const Icon = feature.icon;

  const handleNotify = () => {
    showToast(`You're on the priority waitlist for ${feature.title}!`);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="w-full max-w-lg glass-card border border-white/10 bg-slate-900/95 p-6 md:p-8 relative overflow-hidden shadow-2xl text-slate-100"
          >
            {/* Top glowing ambient effect */}
            <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${feature.color}`} />
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`p-3 rounded-2xl bg-gradient-to-br ${feature.color} text-white shadow-lg`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    {feature.badge}
                  </span>
                  <h3 className="text-xl font-bold font-display text-white mt-1">
                    {feature.title}
                  </h3>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-sm text-slate-300 mb-5 leading-relaxed">
              {feature.description}
            </p>

            <div className="bg-slate-950/60 rounded-xl p-4 border border-white/5 mb-6">
              <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" /> Planned Highlights
              </h4>
              <ul className="space-y-2">
                {feature.bullets.map((bullet, idx) => (
                  <li key={idx} className="text-xs text-slate-300 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl text-sm font-medium text-slate-300 hover:bg-slate-800 transition-colors"
              >
                Dismiss
              </button>
              <button
                type="button"
                onClick={handleNotify}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 shadow-lg shadow-emerald-500/20 active:scale-95 transition-all"
              >
                <Bell className="w-4 h-4" /> Notify Me on Launch
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
