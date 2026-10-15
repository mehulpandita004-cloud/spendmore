import React from 'react';
import { useOutletContext, Link } from 'react-router-dom';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  BarChart,
  Bar,
} from 'recharts';
import {
  Wallet,
  TrendingDown,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Calendar,
  Sparkles,
  PlusCircle,
  Flame,
  ArrowUpRight,
  ShieldCheck,
  Leaf,
} from 'lucide-react';
import { useExpenses } from '../context/ExpenseContext';
import { formatINR, formatCompactINR, formatMonthLabel } from '../utils/formatters';
import AnimatedCounter from '../components/AnimatedCounter';
import CategoryIcon from '../components/CategoryIcon';

export default function DashboardPage() {
  const { openAddExpense, openComingSoon } = useOutletContext() || {};
  const {
    monthlyBudget,
    totalSpent,
    remainingBudget,
    budgetPercent,
    budgetStatus,
    categorySummary,
    topCategory,
    dailySpendData,
    weeklySpendData,
    projections,
    needsWantsAnalysis,
    selectedMonth,
    setSelectedMonth,
    availableMonths,
    monthExpenses,
  } = useExpenses();

  // Color config for budget progress bar
  const progressColor =
    budgetStatus === 'danger'
      ? 'from-rose-500 to-red-600'
      : budgetStatus === 'warning'
      ? 'from-amber-400 to-amber-500'
      : 'from-emerald-400 to-teal-500';

  const badgeBg =
    budgetStatus === 'danger'
      ? 'bg-rose-500/15 text-rose-400 border-rose-500/30'
      : budgetStatus === 'warning'
      ? 'bg-amber-500/15 text-amber-400 border-amber-500/30'
      : 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30';

  // Filter out categories with 0 spend for the donut chart
  const activeCategoryData = categorySummary.filter(c => c.spent > 0);

  // Custom Chart Tooltips
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass-card px-3 py-2 bg-slate-900/95 border border-white/10 text-xs shadow-xl rounded-xl">
          <p className="font-semibold text-slate-300">{label || payload[0].name}</p>
          <p className="text-emerald-400 font-bold text-sm">
            {formatINR(payload[0].value)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-8">
      {/* Page Header with Month Selector & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-white dark:text-white light:text-slate-900 tracking-tight">
            Financial Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Real-time monthly overview of your college spending and limits
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Month Selector */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <Calendar className="w-4 h-4" />
            </div>
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              aria-label="Select Billing Month"
              className="pl-9 pr-8 py-2 rounded-xl text-xs sm:text-sm font-semibold glass-card border border-white/10 dark:border-white/10 light:border-slate-200 text-slate-100 dark:text-slate-100 light:text-slate-800 bg-slate-900/80 dark:bg-slate-900/80 light:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 cursor-pointer"
            >
              {availableMonths.map((m) => (
                <option key={m} value={m} className="bg-slate-900 text-slate-100">
                  {formatMonthLabel(m)}
                </option>
              ))}
            </select>
          </div>

          <button
            type="button"
            onClick={openAddExpense}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 shadow-lg shadow-emerald-500/20 active:scale-95 transition-all"
          >
            <PlusCircle className="w-4 h-4" />
            <span className="hidden sm:inline">Add Expense</span>
            <span className="sm:hidden">Add</span>
          </button>
        </div>
      </div>

      {/* Top 3 Summary Cards with Animated Count-up */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {/* Monthly Budget Card */}
        <div className="glass-card p-5 sm:p-6 rounded-3xl border border-white/10 dark:border-white/10 light:border-slate-200 bg-slate-900/50 dark:bg-slate-900/50 light:bg-white/80 shadow-xl flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Monthly Budget
            </span>
            <div className="p-2.5 rounded-2xl bg-indigo-500/15 text-indigo-400 border border-indigo-500/20">
              <Wallet className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold font-display text-white dark:text-white light:text-slate-900 tracking-tight">
              <AnimatedCounter value={monthlyBudget} />
            </div>
            <div className="flex items-center justify-between text-xs text-slate-400 mt-2">
              <span>Allowance target</span>
              <Link to="/budget" className="text-emerald-400 hover:underline font-semibold">
                Adjust →
              </Link>
            </div>
          </div>
        </div>

        {/* Total Spent Card */}
        <div className="glass-card p-5 sm:p-6 rounded-3xl border border-white/10 dark:border-white/10 light:border-slate-200 bg-slate-900/50 dark:bg-slate-900/50 light:bg-white/80 shadow-xl flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Total Spent
            </span>
            <div className="p-2.5 rounded-2xl bg-rose-500/15 text-rose-400 border border-rose-500/20">
              <TrendingDown className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold font-display text-rose-400 tracking-tight">
              <AnimatedCounter value={totalSpent} />
            </div>
            <div className="flex items-center justify-between text-xs text-slate-400 mt-2">
              <span>{monthExpenses.length} transaction{monthExpenses.length === 1 ? '' : 's'} recorded</span>
              <span className="font-semibold text-slate-300">
                {Math.round(budgetPercent)}% of budget
              </span>
            </div>
          </div>
        </div>

        {/* Remaining Budget Card */}
        <div className="glass-card p-5 sm:p-6 rounded-3xl border border-white/10 dark:border-white/10 light:border-slate-200 bg-slate-900/50 dark:bg-slate-900/50 light:bg-white/80 shadow-xl flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Remaining Balance
            </span>
            <div
              className={`p-2.5 rounded-2xl border ${
                remainingBudget >= 0
                  ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/20'
                  : 'bg-rose-500/15 text-rose-400 border-rose-500/20'
              }`}
            >
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div
              className={`text-2xl sm:text-3xl font-extrabold font-display tracking-tight ${
                remainingBudget >= 0 ? 'text-emerald-400' : 'text-rose-400'
              }`}
            >
              <AnimatedCounter value={Math.abs(remainingBudget)} prefix={remainingBudget < 0 ? '-₹' : '₹'} />
            </div>
            <div className="flex items-center justify-between text-xs text-slate-400 mt-2">
              <span>{remainingBudget >= 0 ? 'Available to spend' : 'Over budget!'}</span>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${badgeBg}`}>
                {budgetStatus === 'safe'
                  ? 'On Track'
                  : budgetStatus === 'warning'
                  ? '80% Threshold'
                  : 'Budget Exceeded'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Budget Progress Bar */}
      <div className="glass-card p-6 rounded-3xl border border-white/10 dark:border-white/10 light:border-slate-200 bg-slate-900/40 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-sm font-semibold">
          <div className="flex items-center gap-2">
            <span className="text-white dark:text-white light:text-slate-900">
              Monthly Budget Utilization
            </span>
            <span className={`text-xs px-2.5 py-0.5 rounded-full border ${badgeBg}`}>
              {Math.round(budgetPercent)}% Used
            </span>
          </div>
          <span className="text-xs text-slate-400">
            {formatINR(totalSpent)} spent out of {formatINR(monthlyBudget)}
          </span>
        </div>

        {/* Progress track */}
        <div className="w-full h-3.5 bg-slate-800/80 rounded-full overflow-hidden p-0.5 border border-white/5 relative">
          <div
            className={`h-full rounded-full bg-gradient-to-r ${progressColor} transition-all duration-700`}
            style={{ width: `${Math.min(100, Math.max(2, budgetPercent))}%` }}
          />
          {/* 80% mark indicator line */}
          <div
            className="absolute top-0 bottom-0 w-0.5 bg-amber-400/80 z-10"
            style={{ left: '80%' }}
            title="80% Warning Threshold"
          />
        </div>

        <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
          <span>₹0</span>
          <span className="text-amber-400 font-semibold">80% Alert Zone</span>
          <span>Budget: {formatINR(monthlyBudget)}</span>
        </div>
      </div>

      {/* Main Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Daily Spending Trend (Area Chart) - 7 cols */}
        <div className="lg:col-span-7 glass-card p-6 rounded-3xl border border-white/10 dark:border-white/10 light:border-slate-200 bg-slate-900/40 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold font-display text-white dark:text-white light:text-slate-900">
                Daily Spending Pattern
              </h3>
              <p className="text-xs text-slate-400">Day-by-day cash outlays for {formatMonthLabel(selectedMonth)}</p>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-xl bg-slate-800 text-slate-300">
              {dailySpendData.length} Days
            </span>
          </div>

          <div className="w-full h-[260px]">
            {dailySpendData.some(d => d.amount > 0) ? (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={dailySpendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="spendGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.05)" />
                  <XAxis
                    dataKey="day"
                    stroke="#64748b"
                    fontSize={11}
                    tickLine={false}
                    interval={Math.max(1, Math.floor(dailySpendData.length / 7))}
                  />
                  <YAxis
                    stroke="#64748b"
                    fontSize={11}
                    tickLine={false}
                    tickFormatter={(val) => `₹${val}`}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Area
                    type="monotone"
                    dataKey="amount"
                    stroke="#10b981"
                    strokeWidth={2.5}
                    fillOpacity={1}
                    fill="url(#spendGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-slate-400 text-xs">
                No recorded expenses for this month yet.
              </div>
            )}
          </div>
        </div>

        {/* Category Distribution (Donut Chart) - 5 cols */}
        <div className="lg:col-span-5 glass-card p-6 rounded-3xl border border-white/10 dark:border-white/10 light:border-slate-200 bg-slate-900/40 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h3 className="text-base font-bold font-display text-white dark:text-white light:text-slate-900">
                Category Split
              </h3>
              <p className="text-xs text-slate-400">Expense breakdown by category</p>
            </div>
          </div>

          <div className="w-full h-[220px] relative flex items-center justify-center">
            {activeCategoryData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={activeCategoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={85}
                    paddingAngle={3}
                    dataKey="spent"
                    nameKey="name"
                  >
                    {activeCategoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} stroke="transparent" />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="text-xs text-slate-400 text-center">No category data recorded</div>
            )}
            {activeCategoryData.length > 0 && (
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-[10px] text-slate-400 uppercase font-semibold">Total</span>
                <span className="text-sm font-extrabold text-white">
                  {formatCompactINR(totalSpent)}
                </span>
              </div>
            )}
          </div>

          {/* Mini Legend */}
          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/5 max-h-24 overflow-y-auto">
            {activeCategoryData.slice(0, 6).map((c) => (
              <div key={c.id} className="flex items-center gap-1.5 text-xs text-slate-300">
                <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: c.color }} />
                <span className="truncate">{c.id}</span>
                <span className="ml-auto text-slate-400 text-[11px]">{c.percentOfTotal}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Weekly Outlay Bar Chart & Insights Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Weekly Bar Chart - 6 cols */}
        <div className="lg:col-span-6 glass-card p-6 rounded-3xl border border-white/10 dark:border-white/10 light:border-slate-200 bg-slate-900/40">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold font-display text-white dark:text-white light:text-slate-900">
                Weekly Spending Distribution
              </h3>
              <p className="text-xs text-slate-400">Pacing across weeks 1 to 4</p>
            </div>
          </div>

          <div className="w-full h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklySpendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.05)" />
                <XAxis dataKey="week" stroke="#64748b" fontSize={11} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={11} tickLine={false} tickFormatter={(val) => `₹${val}`} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="amount" fill="#06b6d4" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Insights & Projections Panel - 6 cols */}
        <div className="lg:col-span-6 glass-card p-6 rounded-3xl border border-white/10 dark:border-white/10 light:border-slate-200 bg-slate-900/40 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <h3 className="text-base font-bold font-display text-white dark:text-white light:text-slate-900">
                Student Financial Insights & Forecast
              </h3>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-4">
              <div className="p-3 rounded-2xl bg-slate-900/70 border border-white/5">
                <span className="text-[10px] uppercase font-bold text-slate-400">Top Spend</span>
                <p className="text-xs sm:text-sm font-bold text-emerald-400 truncate mt-1">
                  {topCategory ? topCategory.id : 'N/A'}
                </p>
                <span className="text-[10px] text-slate-400">
                  {topCategory ? formatINR(topCategory.spent) : '₹0'}
                </span>
              </div>

              <div className="p-3 rounded-2xl bg-slate-900/70 border border-white/5">
                <span className="text-[10px] uppercase font-bold text-slate-400">Daily Average</span>
                <p className="text-xs sm:text-sm font-bold text-cyan-400 mt-1">
                  {formatINR(projections.avgDaily)}
                </p>
                <span className="text-[10px] text-slate-400">
                  {projections.elapsedDays} days passed
                </span>
              </div>

              <div className="p-3 rounded-2xl bg-slate-900/70 border border-white/5">
                <span className="text-[10px] uppercase font-bold text-slate-400">Projected Run</span>
                <p className="text-xs sm:text-sm font-bold text-violet-400 mt-1">
                  {formatINR(projections.projectedMonthEnd)}
                </p>
                <span className="text-[10px] text-slate-400">
                  {projections.totalDays} days in month
                </span>
              </div>
            </div>
          </div>

          {/* SDG 12 Needs vs. Wants Smart Alert Card */}
          <div
            className={`p-4 rounded-2xl border transition-all ${
              needsWantsAnalysis.isHighWants
                ? 'bg-amber-500/10 border-amber-500/30 text-amber-200'
                : 'bg-emerald-500/10 border-emerald-500/25 text-emerald-200'
            }`}
          >
            <div className="flex items-center gap-2 mb-1.5">
              <Leaf className="w-4 h-4 shrink-0 text-emerald-400" />
              <span className="text-xs font-bold uppercase tracking-wider">
                SDG 12 Smart Tip: Needs vs. Wants
              </span>
            </div>
            <p className="text-xs leading-relaxed text-slate-300">
              {needsWantsAnalysis.tip}
            </p>
            <div className="flex items-center gap-4 mt-2.5 pt-2 border-t border-white/5 text-[11px] font-medium text-slate-400">
              <span>Essential Needs: <strong className="text-emerald-400">{needsWantsAnalysis.needsPercent}%</strong></span>
              <span>Discretionary Wants: <strong className="text-amber-400">{needsWantsAnalysis.wantsPercent}%</strong></span>
            </div>
          </div>

          {/* Smart Recommendations Quick Action */}
          <div className="flex items-center justify-between pt-1">
            <span className="text-xs text-slate-400">Looking for AI budget optimization?</span>
            <button
              onClick={() => openComingSoon('ai')}
              className="text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
            >
              Ask AI Coach <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
