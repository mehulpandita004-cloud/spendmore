import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { useExpenses } from '../context/ExpenseContext';

export default function ToastNotification() {
  const { toast } = useExpenses();

  return (
    <div className="fixed bottom-20 md:bottom-6 right-6 z-50 pointer-events-none">
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            className="pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-2xl glass-card shadow-2xl border border-emerald-500/30 bg-slate-900/90 text-white min-w-[280px] max-w-md backdrop-blur-xl"
          >
            {toast.type === 'info' ? (
              <Info className="w-5 h-5 text-cyan-400 shrink-0" />
            ) : toast.type === 'warning' ? (
              <AlertCircle className="w-5 h-5 text-amber-400 shrink-0" />
            ) : (
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            )}
            <p className="text-sm font-medium text-slate-100 flex-1">{toast.message}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
