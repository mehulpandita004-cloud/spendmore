import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, PlusCircle, Check, Calendar, FileText, IndianRupee } from 'lucide-react';
import { CATEGORIES } from '../utils/constants';
import { useExpenses } from '../context/ExpenseContext';
import CategoryIcon from './CategoryIcon';

export default function AddExpenseModal({ isOpen, onClose, editingExpense = null }) {
  const { addExpense, updateExpense } = useExpenses();

  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Food');
  const [note, setNote] = useState('');
  const [date, setDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [paymentMode, setPaymentMode] = useState('UPI');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingExpense) {
      setAmount(editingExpense.amount.toString());
      setCategory(editingExpense.category || 'Food');
      setNote(editingExpense.note || '');
      setDate(editingExpense.date || new Date().toISOString().split('T')[0]);
      setPaymentMode(editingExpense.paymentMode || 'UPI');
    } else {
      setAmount('');
      setCategory('Food');
      setNote('');
      setDate(new Date().toISOString().split('T')[0]);
      setPaymentMode('UPI');
    }
    setErrors({});
  }, [editingExpense, isOpen]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const validate = () => {
    const newErrors = {};
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      newErrors.amount = 'Please enter a valid amount greater than ₹0';
    }
    if (!note.trim()) {
      newErrors.note = 'Please enter a brief description or note';
    }
    if (!date) {
      newErrors.date = 'Please pick a date';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const payload = {
      amount: parseFloat(amount),
      category,
      note: note.trim(),
      date,
      paymentMode,
    };

    if (editingExpense) {
      updateExpense(editingExpense.id, payload);
    } else {
      addExpense(payload);
    }

    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="w-full max-w-lg glass-card border border-white/10 bg-slate-900/95 dark:bg-slate-900/95 light:bg-white/95 p-6 md:p-8 relative shadow-2xl rounded-3xl"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10 dark:border-white/10 light:border-slate-200">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  <PlusCircle className="w-6 h-6" />
                </div>
                <div>
                  <h3 id="modal-title" className="text-xl font-bold font-display text-white light:text-slate-900">
                    {editingExpense ? 'Edit Expense' : 'Record New Expense'}
                  </h3>
                  <p className="text-xs text-slate-400 light:text-slate-500">
                    Keep your student budget accurate and on track
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="p-2 rounded-xl text-slate-400 hover:text-white dark:hover:text-white light:hover:text-slate-800 hover:bg-slate-800/80 light:hover:bg-slate-100 transition-colors"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="mt-5 space-y-4">
              {/* Amount input in INR */}
              <div>
                <label htmlFor="expense-amount" className="block text-xs font-semibold text-slate-300 light:text-slate-700 uppercase tracking-wider mb-1.5">
                  Amount (₹) *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-emerald-400">
                    <span className="text-lg font-bold">₹</span>
                  </div>
                  <input
                    id="expense-amount"
                    type="number"
                    step="any"
                    min="1"
                    placeholder="e.g. 250"
                    value={amount}
                    onChange={(e) => {
                      setAmount(e.target.value);
                      if (errors.amount) setErrors(prev => ({ ...prev, amount: null }));
                    }}
                    className={`w-full pl-9 pr-4 py-3 rounded-2xl glass-input text-lg font-bold text-white light:text-slate-900 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all ${
                      errors.amount ? 'border-rose-500/80 ring-1 ring-rose-500/50' : ''
                    }`}
                    autoFocus
                  />
                </div>
                {errors.amount && (
                  <p className="mt-1 text-xs text-rose-400 font-medium">{errors.amount}</p>
                )}
              </div>

              {/* Category picker */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 light:text-slate-700 uppercase tracking-wider mb-2">
                  Category *
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-48 overflow-y-auto pr-1">
                  {CATEGORIES.map((cat) => {
                    const isSelected = category === cat.id;
                    return (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => setCategory(cat.id)}
                        className={`flex items-center gap-2 p-2.5 rounded-xl border text-xs font-medium text-left transition-all ${
                          isSelected
                            ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 shadow-sm shadow-emerald-500/20'
                            : 'border-white/10 dark:border-white/10 light:border-slate-200 text-slate-300 light:text-slate-700 hover:bg-slate-800/60 light:hover:bg-slate-100'
                        }`}
                      >
                        <span
                          className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                          style={{ backgroundColor: `${cat.color}25`, color: cat.color }}
                        >
                          <CategoryIcon name={cat.icon} className="w-4 h-4" />
                        </span>
                        <span className="truncate">{cat.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Description / Note */}
              <div>
                <label htmlFor="expense-note" className="block text-xs font-semibold text-slate-300 light:text-slate-700 uppercase tracking-wider mb-1.5">
                  Note / Description *
                </label>
                <div className="relative">
                  <div className="absolute top-3.5 left-3.5 text-slate-400 pointer-events-none">
                    <FileText className="w-4 h-4" />
                  </div>
                  <input
                    id="expense-note"
                    type="text"
                    maxLength={100}
                    placeholder="e.g. South Campus stationery & copies"
                    value={note}
                    onChange={(e) => {
                      setNote(e.target.value);
                      if (errors.note) setErrors(prev => ({ ...prev, note: null }));
                    }}
                    className={`w-full pl-10 pr-4 py-2.5 rounded-2xl glass-input text-sm text-white light:text-slate-900 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all ${
                      errors.note ? 'border-rose-500/80 ring-1 ring-rose-500/50' : ''
                    }`}
                  />
                </div>
                {errors.note && (
                  <p className="mt-1 text-xs text-rose-400 font-medium">{errors.note}</p>
                )}
              </div>

              {/* Date and Payment Mode */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="expense-date" className="block text-xs font-semibold text-slate-300 light:text-slate-700 uppercase tracking-wider mb-1.5">
                    Date *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                      <Calendar className="w-4 h-4" />
                    </div>
                    <input
                      id="expense-date"
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 rounded-2xl glass-input text-sm text-white light:text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="payment-mode" className="block text-xs font-semibold text-slate-300 light:text-slate-700 uppercase tracking-wider mb-1.5">
                    Payment Method
                  </label>
                  <select
                    id="payment-mode"
                    value={paymentMode}
                    onChange={(e) => setPaymentMode(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-2xl glass-input text-sm text-white light:text-slate-900 bg-slate-900 light:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
                  >
                    <option value="UPI">UPI (GPay, PhonePe, Paytm)</option>
                    <option value="Cash">Cash</option>
                    <option value="Card">Debit / Credit Card</option>
                    <option value="Net Banking">Net Banking</option>
                    <option value="Metro Card">Metro / Campus Card</option>
                  </select>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 rounded-xl text-sm font-medium text-slate-300 light:text-slate-600 hover:bg-slate-800 light:hover:bg-slate-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 shadow-lg shadow-emerald-500/25 active:scale-95 transition-all"
                >
                  <Check className="w-4 h-4" />
                  {editingExpense ? 'Save Changes' : 'Add Expense'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
