import React, { useState, useMemo } from 'react';
import { useOutletContext } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Filter,
  PlusCircle,
  Calendar,
  Edit2,
  Trash2,
  Receipt,
  RotateCcw,
  SlidersHorizontal,
  CreditCard,
  ArrowUpDown,
  Tag,
} from 'lucide-react';
import { useExpenses } from '../context/ExpenseContext';
import { CATEGORIES, getCategoryMeta } from '../utils/constants';
import { formatINR, formatDisplayDate } from '../utils/formatters';
import CategoryIcon from '../components/CategoryIcon';
import AddExpenseModal from '../components/AddExpenseModal';

export default function ExpensesPage() {
  const { openAddExpense } = useOutletContext() || {};
  const { expenses, deleteExpense, restoreDemoData } = useExpenses();

  // Search & Filters state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [dateFilter, setDateFilter] = useState('ALL'); // ALL, 7DAYS, 30DAYS, THIS_MONTH
  const [sortBy, setSortBy] = useState('DATE_DESC'); // DATE_DESC, DATE_ASC, AMOUNT_DESC, AMOUNT_ASC

  // Edit Expense modal state
  const [editingExpense, setEditingExpense] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleEdit = (expense) => {
    setEditingExpense(expense);
    setIsEditModalOpen(true);
  };

  const handleCloseEdit = () => {
    setIsEditModalOpen(false);
    setEditingExpense(null);
  };

  // Filtered and sorted expenses
  const filteredExpenses = useMemo(() => {
    return expenses
      .filter((item) => {
        // Search query filter
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchNote = item.note?.toLowerCase().includes(q);
          const matchCat = item.category?.toLowerCase().includes(q);
          const matchPay = item.paymentMode?.toLowerCase().includes(q);
          if (!matchNote && !matchCat && !matchPay) return false;
        }

        // Category filter
        if (selectedCategory !== 'ALL' && item.category !== selectedCategory) {
          return false;
        }

        // Date filter
        if (dateFilter !== 'ALL' && item.date) {
          const expDate = new Date(item.date);
          const now = new Date();
          const diffDays = (now - expDate) / (1000 * 60 * 60 * 24);

          if (dateFilter === '7DAYS' && diffDays > 7) return false;
          if (dateFilter === '30DAYS' && diffDays > 30) return false;
          if (dateFilter === 'THIS_MONTH') {
            const currentMonthKey = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
            if (!item.date.startsWith(currentMonthKey)) return false;
          }
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'DATE_DESC') return new Date(b.date) - new Date(a.date);
        if (sortBy === 'DATE_ASC') return new Date(a.date) - new Date(b.date);
        if (sortBy === 'AMOUNT_DESC') return (b.amount || 0) - (a.amount || 0);
        if (sortBy === 'AMOUNT_ASC') return (a.amount || 0) - (b.amount || 0);
        return 0;
      });
  }, [expenses, searchQuery, selectedCategory, dateFilter, sortBy]);

  // Total amount of currently filtered expenses
  const filteredTotal = useMemo(() => {
    return filteredExpenses.reduce((sum, item) => sum + (Number(item.amount) || 0), 0);
  }, [filteredExpenses]);

  return (
    <div className="space-y-6">
      {/* Header and Quick Stats */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-white dark:text-white light:text-slate-900 tracking-tight">
            Expense Records
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Search, filter, edit, and keep track of your transactions
          </p>
        </div>

        <button
          type="button"
          onClick={openAddExpense}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 shadow-lg shadow-emerald-500/25 active:scale-95 transition-all self-start sm:self-auto"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Add Expense</span>
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="glass-card p-4 sm:p-5 rounded-3xl border border-white/10 dark:border-white/10 light:border-slate-200 bg-slate-900/50 dark:bg-slate-900/50 light:bg-white/80 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          {/* Search Input */}
          <div className="md:col-span-5 relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              placeholder="Search by note, canteen, books, UPI..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl glass-input text-xs sm:text-sm text-white light:text-slate-900 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-xs text-slate-400 hover:text-white"
              >
                Clear
              </button>
            )}
          </div>

          {/* Category Filter Dropdown */}
          <div className="md:col-span-3">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              aria-label="Filter by Category"
              className="w-full px-3 py-2.5 rounded-2xl glass-input text-xs sm:text-sm text-white light:text-slate-900 bg-slate-900 dark:bg-slate-900 light:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 cursor-pointer"
            >
              <option value="ALL">All Categories</option>
              {CATEGORIES.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Date Filter */}
          <div className="md:col-span-2">
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              aria-label="Filter by Date Range"
              className="w-full px-3 py-2.5 rounded-2xl glass-input text-xs sm:text-sm text-white light:text-slate-900 bg-slate-900 dark:bg-slate-900 light:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 cursor-pointer"
            >
              <option value="ALL">All Dates</option>
              <option value="THIS_MONTH">This Month</option>
              <option value="7DAYS">Last 7 Days</option>
              <option value="30DAYS">Last 30 Days</option>
            </select>
          </div>

          {/* Sort Filter */}
          <div className="md:col-span-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              aria-label="Sort Order"
              className="w-full px-3 py-2.5 rounded-2xl glass-input text-xs sm:text-sm text-white light:text-slate-900 bg-slate-900 dark:bg-slate-900 light:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 cursor-pointer"
            >
              <option value="DATE_DESC">Newest First</option>
              <option value="DATE_ASC">Oldest First</option>
              <option value="AMOUNT_DESC">Highest Amount</option>
              <option value="AMOUNT_ASC">Lowest Amount</option>
            </select>
          </div>
        </div>

        {/* Quick Category Pill Filters for Fast Mobile Selection */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-1 no-scrollbar text-xs">
          <button
            onClick={() => setSelectedCategory('ALL')}
            className={`px-3 py-1 rounded-xl font-medium shrink-0 transition-colors ${
              selectedCategory === 'ALL'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                : 'text-slate-400 hover:text-white bg-slate-800/40 border border-white/5'
            }`}
          >
            All ({expenses.length})
          </button>
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-xl font-medium shrink-0 transition-colors ${
                  isSelected
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    : 'text-slate-400 hover:text-white bg-slate-800/40 border border-white/5'
                }`}
              >
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: cat.color }} />
                <span>{cat.id}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Filter summary bar */}
      <div className="flex items-center justify-between text-xs text-slate-400 px-2">
        <span>
          Showing <strong className="text-white">{filteredExpenses.length}</strong> of{' '}
          <strong className="text-white">{expenses.length}</strong> transactions
        </span>
        <span>
          Sum Total: <strong className="text-emerald-400 font-bold">{formatINR(filteredTotal)}</strong>
        </span>
      </div>

      {/* Expense List */}
      <div className="space-y-3">
        <AnimatePresence mode="popLayout">
          {filteredExpenses.length > 0 ? (
            filteredExpenses.map((exp) => {
              const meta = getCategoryMeta(exp.category);
              return (
                <motion.div
                  key={exp.id}
                  layout
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="glass-card glass-card-hover p-4 sm:p-5 rounded-2xl border border-white/10 dark:border-white/10 light:border-slate-200 bg-slate-900/50 dark:bg-slate-900/50 light:bg-white/90 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  {/* Left: Icon, Note, Category, Date */}
                  <div className="flex items-start sm:items-center gap-3.5">
                    <div
                      className="w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 shadow-sm"
                      style={{ backgroundColor: meta.bgLight, color: meta.color }}
                    >
                      <CategoryIcon name={meta.icon} className="w-5 h-5" />
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="font-bold text-sm sm:text-base text-white dark:text-white light:text-slate-900">
                          {exp.note || meta.name}
                        </h4>
                        <span
                          className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${meta.borderColor}`}
                          style={{ backgroundColor: meta.bgLight, color: meta.color }}
                        >
                          {meta.name}
                        </span>
                        {meta.type && (
                          <span
                            className={`text-[9px] uppercase font-bold px-1.5 py-0.5 rounded ${
                              meta.type === 'need'
                                ? 'bg-emerald-500/10 text-emerald-400'
                                : 'bg-rose-500/10 text-rose-400'
                            }`}
                          >
                            {meta.type}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-3 text-xs text-slate-400">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-slate-400" />
                          {formatDisplayDate(exp.date)}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <CreditCard className="w-3.5 h-3.5 text-slate-400" />
                          {exp.paymentMode || 'UPI'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right: Amount in INR, Edit & Delete buttons */}
                  <div className="flex items-center justify-between sm:justify-end gap-4 pt-2 sm:pt-0 border-t sm:border-t-0 border-white/5">
                    <div className="text-right">
                      <span className="text-lg sm:text-xl font-extrabold font-display text-white dark:text-white light:text-slate-900">
                        {formatINR(exp.amount)}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => handleEdit(exp)}
                        title="Edit expense"
                        aria-label="Edit expense"
                        className="p-2 rounded-xl text-slate-400 hover:text-emerald-400 hover:bg-slate-800/80 transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteExpense(exp.id)}
                        title="Delete expense"
                        aria-label="Delete expense"
                        className="p-2 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })
          ) : (
            /* Empty State */
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="glass-card p-12 rounded-3xl border border-white/10 text-center space-y-4 max-w-lg mx-auto"
            >
              <div className="w-16 h-16 rounded-full bg-slate-800/80 flex items-center justify-center mx-auto text-slate-400">
                <Receipt className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-white dark:text-white light:text-slate-900">
                  No matching expenses found
                </h3>
                <p className="text-xs sm:text-sm text-slate-400">
                  {expenses.length === 0
                    ? 'You have cleared all expense records. Would you like to restore demo data or create a new entry?'
                    : 'Try loosening your search query or switching the category filter.'}
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                {expenses.length === 0 ? (
                  <button
                    type="button"
                    onClick={restoreDemoData}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Restore Realistic Demo Data</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('ALL');
                      setDateFilter('ALL');
                    }}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:bg-slate-800 border border-white/10 transition-colors"
                  >
                    Clear Filters
                  </button>
                )}
                <button
                  type="button"
                  onClick={openAddExpense}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 shadow-md transition-all"
                >
                  <PlusCircle className="w-3.5 h-3.5" />
                  <span>Record New Expense</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Edit Modal */}
      <AddExpenseModal
        isOpen={isEditModalOpen}
        onClose={handleCloseEdit}
        editingExpense={editingExpense}
      />
    </div>
  );
}
