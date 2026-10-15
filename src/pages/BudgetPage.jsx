import React, { useState, useEffect, useMemo } from 'react';
import {
  PiggyBank,
  Check,
  TrendingUp,
  Sparkles,
  RotateCcw,
  Leaf,
  Plus,
  Minus,
  Save,
  CheckCircle2,
  AlertTriangle,
  Flame,
  ShieldCheck,
  CreditCard,
  Percent,
  Wallet,
} from 'lucide-react';
import { useExpenses } from '../context/ExpenseContext';
import { CATEGORIES } from '../utils/constants';
import { formatINR } from '../utils/formatters';
import CategoryIcon from '../components/CategoryIcon';
import AnimatedCounter from '../components/AnimatedCounter';

export default function BudgetPage() {
  const {
    monthlyBudget,
    setMonthlyBudget,
    budget,
    updateMultipleBudgets,
    categorySummary,
    totalSpent,
    restoreDemoData,
    showToast,
  } = useExpenses();

  // Local state for direct manual editing
  const [totalIncomeInput, setTotalIncomeInput] = useState(monthlyBudget || 15000);
  const [categoryInputs, setCategoryInputs] = useState(() => {
    const initial = {};
    CATEGORIES.forEach((cat) => {
      initial[cat.id] = budget.categoryBudgets?.[cat.id] ?? 0;
    });
    return initial;
  });

  // Keep local inputs in sync if context changes from elsewhere
  useEffect(() => {
    setTotalIncomeInput(monthlyBudget || 15000);
    const updated = {};
    CATEGORIES.forEach((cat) => {
      updated[cat.id] = budget.categoryBudgets?.[cat.id] ?? 0;
    });
    setCategoryInputs(updated);
  }, [monthlyBudget, budget.categoryBudgets]);

  // Handle Income change
  const handleIncomeChange = (val) => {
    const num = Math.max(0, Number(val) || 0);
    setTotalIncomeInput(num);
    updateMultipleBudgets(num, categoryInputs);
  };

  // Handle individual category budget change
  const handleCategoryChange = (catId, val) => {
    const num = Math.max(0, Number(val) || 0);
    const updated = {
      ...categoryInputs,
      [catId]: num,
    };
    setCategoryInputs(updated);
    updateMultipleBudgets(totalIncomeInput, updated);
  };

  // Stepper increment/decrement
  const stepCategory = (catId, delta) => {
    const current = Number(categoryInputs[catId]) || 0;
    const nextVal = Math.max(0, current + delta);
    handleCategoryChange(catId, nextVal);
  };

  // Quick preset from the user's audio prompt!
  // "I have a monthly budget of 15,000, 5,000 is rent, 3,000 is traveling, and 2,000 is personal expense. Calculate how much to spend and how much left for saving."
  const applyUserExamplePreset = () => {
    const exampleBudget = 15000;
    const exampleCategories = {
      'Rent & Bills': 5000,
      Travel: 3000,
      Shopping: 2000, // Personal expense / shopping
      Food: 3000,
      Study: 1000,
      Entertainment: 500,
      Other: 500,
    };
    setTotalIncomeInput(exampleBudget);
    setCategoryInputs(exampleCategories);
    updateMultipleBudgets(exampleBudget, exampleCategories);
    showToast('Applied your custom ₹15,000 plan: ₹5k Rent, ₹3k Travel, ₹2k Personal!');
  };

  // Minimal student example
  const applyAudioExactOnly = () => {
    const exampleBudget = 15000;
    const exampleCategories = {
      'Rent & Bills': 5000,
      Travel: 3000,
      Shopping: 2000,
      Food: 0,
      Study: 0,
      Entertainment: 0,
      Other: 0,
    };
    setTotalIncomeInput(exampleBudget);
    setCategoryInputs(exampleCategories);
    updateMultipleBudgets(exampleBudget, exampleCategories);
    showToast('Applied exact audio scenario (₹5k Rent, ₹3k Travel, ₹2k Personal, ₹5k Savings!)');
  };

  // Calculations:
  // 1. Total money to spend (sum of planned category budgets)
  const totalMoneyToSpend = useMemo(() => {
    return Object.values(categoryInputs).reduce((sum, val) => sum + (Number(val) || 0), 0);
  }, [categoryInputs]);

  // 2. Money left for myself / for saving (Total Income - Total to Spend)
  const moneyLeftForSaving = totalIncomeInput - totalMoneyToSpend;

  // 3. Percentages
  const spendPercentage = totalIncomeInput > 0 ? Math.round((totalMoneyToSpend / totalIncomeInput) * 100) : 0;
  const savingsRate = totalIncomeInput > 0 ? Math.round((moneyLeftForSaving / totalIncomeInput) * 100) : 0;

  // Status flags
  const isSurplus = moneyLeftForSaving > 0;
  const isExact = moneyLeftForSaving === 0;
  const isDeficit = moneyLeftForSaving < 0;

  return (
    <div className="space-y-8 pb-10">
      {/* Page Title & Audio Example Loader */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Student Budget & Savings Planner</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-white dark:text-white light:text-slate-900 tracking-tight">
            Budget & Savings Calculator
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Put your monthly allowance and expense amounts manually to calculate what you have to spend and what is left for your savings.
          </p>
        </div>

        {/* 1-Click Example Preset from the User's Voice Prompt */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={applyAudioExactOnly}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-emerald-300 bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 shadow-sm transition-all"
            title="Load ₹15,000 Budget: ₹5k Rent, ₹3k Travel, ₹2k Personal, ₹5k Savings"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>Load Your Example (₹15k)</span>
          </button>

          <button
            onClick={restoreDemoData}
            className="inline-flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-white border border-white/10 hover:bg-slate-800 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Top 3 Interactive Calculation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Card 1: Monthly Budget / Allowance (Directly Editable) */}
        <div className="glass-card p-6 rounded-3xl border border-white/10 dark:border-white/10 light:border-slate-200 bg-slate-900/60 shadow-xl flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Wallet className="w-4 h-4 text-indigo-400" /> Total Monthly Allowance
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 font-semibold border border-indigo-500/30">
              Manual Input
            </span>
          </div>

          <div className="space-y-3">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-emerald-400 font-bold text-xl">
                ₹
              </div>
              <input
                type="number"
                min="0"
                step="500"
                value={totalIncomeInput}
                onChange={(e) => handleIncomeChange(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 rounded-2xl glass-input text-2xl font-black font-display text-white light:text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/60"
                aria-label="Monthly Budget Allowance in Rupees"
              />
            </div>

            {/* Quick quick increment buttons */}
            <div className="flex items-center gap-1.5 pt-1">
              {[10000, 15000, 20000].map((preset) => (
                <button
                  key={preset}
                  onClick={() => handleIncomeChange(preset)}
                  className={`flex-1 py-1 text-[11px] font-bold rounded-lg transition-all ${
                    totalIncomeInput === preset
                      ? 'bg-indigo-500 text-white'
                      : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  ₹{(preset / 1000).toFixed(0)}k
                </button>
              ))}
            </div>
          </div>

          <p className="text-[11px] text-slate-400 mt-3 pt-2 border-t border-white/5">
            Your total stipend, pocket money, or monthly support
          </p>
        </div>

        {/* Card 2: Total Money to Spend ("How much money I have to spend") */}
        <div className="glass-card p-6 rounded-3xl border border-white/10 dark:border-white/10 light:border-slate-200 bg-slate-900/60 shadow-xl flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <CreditCard className="w-4 h-4 text-cyan-400" /> Money You Have to Spend
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-semibold border border-cyan-500/30">
              {spendPercentage}% of Allowance
            </span>
          </div>

          <div className="space-y-1">
            <div className="text-3xl font-black font-display text-cyan-400 tracking-tight">
              <AnimatedCounter value={totalMoneyToSpend} />
            </div>
            <p className="text-xs text-slate-300">
              Sum of your planned expenses (Rent, Travel, Personal, etc.)
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-400">
            <span>Actual spent so far:</span>
            <strong className="text-slate-200 font-bold">{formatINR(totalSpent)}</strong>
          </div>
        </div>

        {/* Card 3: Money Left for Myself / For Saving ("How much money left for my saving") */}
        <div
          className={`glass-card p-6 rounded-3xl border shadow-xl flex flex-col justify-between transition-all ${
            isSurplus
              ? 'border-emerald-500/40 bg-gradient-to-br from-slate-900/80 via-emerald-950/20 to-slate-900/90 shadow-emerald-950/40'
              : isDeficit
              ? 'border-rose-500/40 bg-rose-950/20'
              : 'border-amber-500/40 bg-amber-950/20'
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <PiggyBank className="w-4 h-4 text-emerald-400" /> Money Left for Saving
            </span>
            <span
              className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold border ${
                isSurplus
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                  : isDeficit
                  ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                  : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
              }`}
            >
              {isSurplus ? `+${savingsRate}% Savings Rate` : isDeficit ? 'Deficit!' : 'Exact 0 Buffer'}
            </span>
          </div>

          <div className="space-y-1">
            <div
              className={`text-3xl font-black font-display tracking-tight ${
                isSurplus ? 'text-emerald-400' : isDeficit ? 'text-rose-400' : 'text-amber-400'
              }`}
            >
              {isDeficit ? '-' : ''}
              <AnimatedCounter value={Math.abs(moneyLeftForSaving)} />
            </div>
            <p className="text-xs text-slate-300">
              {isSurplus
                ? 'Available for savings, emergency fund, or future goals'
                : isDeficit
                ? 'You are planning to spend more than your monthly budget!'
                : 'Zero-based budget: Every single rupee is allocated'}
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px]">
            <span className="text-slate-400">Status:</span>
            <span
              className={`font-bold ${
                isSurplus ? 'text-emerald-400' : isDeficit ? 'text-rose-400' : 'text-amber-400'
              }`}
            >
              {isSurplus ? '✓ Healthy Surplus' : isDeficit ? '⚠ Cut Down Spends' : 'Balanced'}
            </span>
          </div>
        </div>
      </div>

      {/* Visual Balance Bar (Planned Expenses vs. Money Left for Savings) */}
      <div className="glass-card p-6 rounded-3xl border border-white/10 dark:border-white/10 light:border-slate-200 bg-slate-900/50 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs sm:text-sm font-semibold">
          <span className="text-white dark:text-white light:text-slate-900">
            Budget Distribution Breakdown
          </span>
          <span className="text-slate-400 text-xs">
            {formatINR(totalMoneyToSpend)} Planned Expenses ({spendPercentage}%) +{' '}
            {formatINR(Math.max(0, moneyLeftForSaving))} Savings ({Math.max(0, savingsRate)}%) ={' '}
            {formatINR(totalIncomeInput)} Total
          </span>
        </div>

        {/* Multi-segmented bar */}
        <div className="w-full h-4 bg-slate-950 rounded-full overflow-hidden p-0.5 border border-white/10 flex">
          {/* Planned Spend segment */}
          <div
            className="h-full bg-gradient-to-r from-cyan-500 to-indigo-500 transition-all duration-500"
            style={{ width: `${Math.min(100, Math.max(0, spendPercentage))}%` }}
            title={`Planned Expenses: ${formatINR(totalMoneyToSpend)}`}
          />
          {/* Savings / Remaining segment */}
          {moneyLeftForSaving > 0 && (
            <div
              className="h-full bg-gradient-to-r from-emerald-400 to-teal-400 transition-all duration-500"
              style={{ width: `${Math.min(100 - spendPercentage, savingsRate)}%` }}
              title={`Money Left for Savings: ${formatINR(moneyLeftForSaving)}`}
            />
          )}
        </div>

        <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
            <span>Planned Spends: <strong className="text-slate-200">{formatINR(totalMoneyToSpend)}</strong></span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
            <span>Savings Left: <strong className="text-emerald-400">{formatINR(Math.max(0, moneyLeftForSaving))}</strong></span>
          </div>
        </div>
      </div>

      {/* Manual Category Allocator Section */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-xl font-bold font-display text-white dark:text-white light:text-slate-900">
              Put Category Amounts Manually
            </h2>
            <p className="text-xs text-slate-400">
              Type or adjust each expense category (e.g. ₹5,000 Rent, ₹3,000 Travel, ₹2,000 Personal). The calculations above update instantly!
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {CATEGORIES.map((cat) => {
            const currentAmount = categoryInputs[cat.id] ?? 0;
            const categoryData = categorySummary.find((c) => c.id === cat.id);
            const actualSpent = categoryData ? categoryData.spent : 0;
            const consumptionPercent = currentAmount > 0 ? Math.round((actualSpent / currentAmount) * 100) : 0;
            const remaining = currentAmount - actualSpent;

            // Status badge logic
            const statusBadge =
              consumptionPercent > 100
                ? { label: 'Over Budget', color: 'bg-rose-500/20 text-rose-300 border-rose-500/30' }
                : consumptionPercent >= 80
                ? { label: '80% Threshold', color: 'bg-amber-500/20 text-amber-300 border-amber-500/30' }
                : { label: 'Within Limit', color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' };

            return (
              <div
                key={cat.id}
                className="glass-card glass-card-hover p-5 rounded-2xl border border-white/10 dark:border-white/10 light:border-slate-200 bg-slate-900/50 space-y-4"
              >
                {/* Header with icon and name */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-sm"
                      style={{ backgroundColor: `${cat.color}25`, color: cat.color }}
                    >
                      <CategoryIcon name={cat.icon} className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white dark:text-white light:text-slate-900">
                        {cat.name}
                      </h3>
                      <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
                        {cat.type}
                      </span>
                    </div>
                  </div>

                  <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${statusBadge.color}`}>
                    {statusBadge.label}
                  </span>
                </div>

                {/* Direct Manual Input & Steppers */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Allocated Budget (₹)
                  </label>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => stepCategory(cat.id, -500)}
                      title="Decrease by ₹500"
                      className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-white/5 active:scale-95 transition-all"
                    >
                      <Minus className="w-4 h-4" />
                    </button>

                    <div className="relative flex-1">
                      <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-emerald-400 font-bold text-sm">
                        ₹
                      </span>
                      <input
                        type="number"
                        min="0"
                        step="100"
                        placeholder="0"
                        value={currentAmount}
                        onChange={(e) => handleCategoryChange(cat.id, e.target.value)}
                        className="w-full pl-8 pr-3 py-2 rounded-xl glass-input text-base font-bold text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                      />
                    </div>

                    <button
                      type="button"
                      onClick={() => stepCategory(cat.id, 500)}
                      title="Increase by ₹500"
                      className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-white/5 active:scale-95 transition-all"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Progress bar against actual spend */}
                <div className="space-y-1.5 pt-1">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>
                      Spent so far: <strong className="text-white">{formatINR(actualSpent)}</strong>
                    </span>
                    <span>
                      {remaining >= 0 ? `${formatINR(remaining)} left` : `${formatINR(Math.abs(remaining))} over`}
                    </span>
                  </div>

                  <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        consumptionPercent > 100
                          ? 'bg-rose-500'
                          : consumptionPercent >= 80
                          ? 'bg-amber-400'
                          : 'bg-emerald-400'
                      }`}
                      style={{ width: `${Math.min(100, Math.max(3, consumptionPercent))}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Savings Goal & SDG 12 Rule Card */}
      <div className="glass-card p-6 sm:p-8 rounded-3xl border border-emerald-500/30 bg-gradient-to-r from-emerald-950/30 via-slate-900/60 to-teal-950/30 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-start gap-4">
          <div className="p-3.5 rounded-2xl bg-emerald-500/20 text-emerald-400 shrink-0">
            <Leaf className="w-7 h-7" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-bold text-white font-display">
              SDG 12 Mindful Student Savings Impact
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
              By reserving <strong className="text-emerald-400">{formatINR(Math.max(0, moneyLeftForSaving))}</strong> for your monthly savings, you can accumulate{' '}
              <strong className="text-emerald-300">{formatINR(Math.max(0, moneyLeftForSaving) * 12)}</strong> over a year! This protects you against semester-end emergencies and prevents resource wastage.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="text-center px-4 py-2 rounded-2xl bg-slate-900/80 border border-white/10">
            <span className="text-[10px] text-slate-400 uppercase font-bold block">Annual Savings</span>
            <span className="text-lg font-black text-emerald-400">
              {formatINR(Math.max(0, moneyLeftForSaving) * 12)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
