import React, { Suspense, lazy } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Sparkles,
  PieChart,
  ShieldCheck,
  TrendingDown,
  Leaf,
  PlusCircle,
  CheckCircle2,
  Zap,
  Globe2,
  Award,
} from 'lucide-react';

// Lazy-load Three.js 3D hero scene for performance
const ThreeHeroScene = lazy(() => import('../components/ThreeHeroScene'));

export default function LandingPage() {
  const { openAddExpense } = useOutletContext() || {};

  const features = [
    {
      title: 'Smart Expense Logging',
      desc: 'Record food, commute, stationery, and outings in seconds. Tailored for hostelers and day-scholars.',
      icon: Zap,
      gradient: 'from-emerald-500/20 to-teal-500/20',
      border: 'hover:border-emerald-500/40',
      tag: 'Speed & Ease',
    },
    {
      title: 'Dynamic Budget Guardrails',
      desc: 'Automatic visual alert stages: safe emerald, warning amber at 80%, and alert red when exceeding allowance.',
      icon: ShieldCheck,
      gradient: 'from-amber-500/20 to-orange-500/20',
      border: 'hover:border-amber-500/40',
      tag: 'Budget Security',
    },
    {
      title: 'SDG 12 Habit Coach',
      desc: 'Track "Needs vs. Wants" ratio to eliminate impulse splurges and promote conscious, sustainable consumption.',
      icon: Leaf,
      gradient: 'from-teal-500/20 to-cyan-500/20',
      border: 'hover:border-teal-500/40',
      tag: 'Responsible Living',
    },
    {
      title: 'Student Analytics Suite',
      desc: 'High-contrast donut distributions, daily spending curves, and projected month-end burn rates.',
      icon: PieChart,
      gradient: 'from-cyan-500/20 to-indigo-500/20',
      border: 'hover:border-cyan-500/40',
      tag: 'Visual Insights',
    },
  ];

  const steps = [
    {
      step: '01',
      title: 'Define Monthly Allowance',
      desc: 'Enter your monthly pocket money, stipend, or part-time earnings, and set category targets.',
    },
    {
      step: '02',
      title: 'Log Daily Student Expenses',
      desc: 'Record canteen lunches, metro tickets, books, and hangout bills with a few taps.',
    },
    {
      step: '03',
      title: 'Master Spending Habits',
      desc: 'Monitor your Needs vs Wants breakdown, stay under budget, and build lifelong financial discipline.',
    },
  ];

  return (
    <div className="space-y-24 py-4 md:py-8">
      {/* Hero Section */}
      <section className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[580px]">
        {/* Left column: Typography & CTAs */}
        <div className="lg:col-span-7 space-y-6 z-10">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-card border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-semibold"
          >
            <Leaf className="w-3.5 h-3.5" />
            <span>Aligned with UN SDG 12: Responsible Consumption</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-6xl font-extrabold font-display tracking-tight text-white dark:text-white light:text-slate-900 leading-[1.12]"
          >
            Spend Smart. <br />
            <span className="gradient-text-emerald">Live Better.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg text-slate-300 dark:text-slate-300 light:text-slate-600 max-w-xl leading-relaxed"
          >
            The dedicated expense tracking & budget management system created for university students.
            Understand where every rupee goes, prevent month-end cash shortages, and build mindful financial habits.
          </motion.p>

          {/* Action buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap items-center gap-4 pt-2"
          >
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl font-semibold text-sm sm:text-base text-white bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 shadow-xl shadow-emerald-500/25 hover:shadow-emerald-500/40 active:scale-95 transition-all"
            >
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <button
              type="button"
              onClick={openAddExpense}
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-2xl font-semibold text-sm sm:text-base text-slate-200 dark:text-slate-200 light:text-slate-800 glass-card border border-white/10 dark:border-white/10 light:border-slate-200 hover:bg-slate-800/80 light:hover:bg-slate-100 active:scale-95 transition-all"
            >
              <PlusCircle className="w-4 h-4 text-emerald-400" />
              <span>Record Expense</span>
            </button>
          </motion.div>

          {/* Micro badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap items-center gap-6 pt-4 text-xs text-slate-400 font-medium"
          >
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> 100% Client-Side Privacy
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Instant LocalStorage Sync
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Formatted in Indian Rupees (₹)
            </div>
          </motion.div>
        </div>

        {/* Right column: 3D Three.js canvas */}
        <div className="lg:col-span-5 h-[380px] sm:h-[460px] relative rounded-3xl overflow-hidden glass-card border border-white/10 bg-slate-950/40 flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/10 via-transparent to-cyan-500/10 pointer-events-none" />
          <Suspense
            fallback={
              <div className="flex flex-col items-center justify-center gap-3 text-slate-400">
                <div className="w-10 h-10 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
                <span className="text-xs font-medium">Initializing 3D Vault...</span>
              </div>
            }
          >
            <ThreeHeroScene />
          </Suspense>

          {/* Interactive instruction label */}
          <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-[11px] text-slate-400 font-medium px-3 py-1.5 rounded-xl bg-slate-900/60 backdrop-blur-md border border-white/5 pointer-events-none">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <Sparkles className="w-3.5 h-3.5" /> Interactive 3D Canvas
            </span>
            <span>Drag or move cursor to inspect</span>
          </div>
        </div>
      </section>

      {/* Features Section (3D Tilt Cards) */}
      <section className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs uppercase tracking-widest font-extrabold text-emerald-400">
            Tailored For Student Life
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-white dark:text-white light:text-slate-900">
            Everything you need to survive & thrive on a student budget
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            No convoluted banking spreadsheets. Just fast entries, smart category buckets, and clear guardrails.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                whileHover={{ y: -6, scale: 1.02 }}
                className={`glass-card p-6 flex flex-col justify-between rounded-3xl border border-white/10 dark:border-white/10 light:border-slate-200 bg-slate-900/50 dark:bg-slate-900/50 light:bg-white/80 transition-all ${feat.border}`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-2xl bg-gradient-to-br ${feat.gradient} text-emerald-400 border border-emerald-500/20`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-white/5">
                      {feat.tag}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold font-display text-white dark:text-white light:text-slate-900 mb-2">
                    {feat.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 dark:text-slate-400 light:text-slate-600 leading-relaxed">
                    {feat.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* How It Works (3 Steps) */}
      <section className="glass-card p-8 sm:p-12 rounded-3xl border border-white/10 bg-slate-900/40 relative overflow-hidden">
        <div className="max-w-3xl mb-10">
          <span className="text-xs uppercase tracking-widest font-extrabold text-teal-400">
            Simple 3-Step Flow
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold font-display text-white dark:text-white light:text-slate-900 mt-2">
            How SpendSmart keeps your wallet healthy
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((st, i) => (
            <div key={st.step} className="space-y-3 relative z-10">
              <div className="text-4xl font-black font-display text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                {st.step}
              </div>
              <h3 className="text-lg font-bold text-white dark:text-white light:text-slate-900">
                {st.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                {st.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* SDG 12 Section: Responsible Consumption and Production */}
      <section className="glass-card p-8 sm:p-12 rounded-3xl border border-emerald-500/30 bg-gradient-to-br from-emerald-950/30 via-slate-900/80 to-slate-950/80 relative overflow-hidden">
        <div className="absolute -right-16 -bottom-16 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
              <Globe2 className="w-3.5 h-3.5" /> United Nations Sustainable Development Goal 12
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold font-display text-white dark:text-white light:text-slate-900">
              Responsible Consumption & Production (SDG 12)
            </h2>
            <p className="text-sm sm:text-base text-slate-300 dark:text-slate-300 light:text-slate-600 leading-relaxed">
              Target 12.8 calls upon society to ensure people everywhere have the relevant information and awareness for sustainable development and lifestyles in harmony with nature.
            </p>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Every unnecessary impulse purchase contributes to upstream packaging, resource extraction, and disposal waste. SpendSmart’s <strong className="text-emerald-400">"Needs vs. Wants"</strong> framework gives students real-time feedback to curb wasteful habits, reduce food waste, and make intentional purchasing decisions.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-slate-900/60 border border-white/5">
                <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1">
                  Targeted Student Impact
                </h4>
                <p className="text-xs text-slate-300">
                  Cut down impulse food deliveries, fast fashion hauls, and redundant gadgets through mindful 30-day budget checkpoints.
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-900/60 border border-white/5">
                <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-wider mb-1">
                  Sustainable Campus Habits
                </h4>
                <p className="text-xs text-slate-300">
                  Encourages shared textbooks, campus cycle commutes, thrifted gear, and responsible hostel dining.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 flex flex-col items-center justify-center p-6 rounded-2xl bg-emerald-950/40 border border-emerald-500/20 text-center space-y-3">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Award className="w-8 h-8" />
            </div>
            <h3 className="font-display font-bold text-lg text-white">
              Student Impact Metric
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Students who monitor their daily discretionary spends save an average of <strong className="text-emerald-400">22% to 35%</strong> of their monthly allowance.
            </p>
            <Link
              to="/dashboard"
              className="mt-2 text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 underline"
            >
              Check Your Spending Balance →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Bottom Banner */}
      <section className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white shadow-2xl shadow-emerald-500/20 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <h2 className="text-2xl sm:text-3xl font-extrabold font-display">
            Ready to take control of your student budget?
          </h2>
          <p className="text-sm text-emerald-50 max-w-lg">
            No signup required. Launch the interactive dashboard, explore realistic demo records, and start recording your expenses right now.
          </p>
        </div>
        <Link
          to="/dashboard"
          className="px-8 py-3.5 rounded-2xl font-bold text-slate-950 bg-white hover:bg-slate-100 shadow-lg active:scale-95 transition-all shrink-0"
        >
          Open Dashboard
        </Link>
      </section>
    </div>
  );
}
