import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { INITIAL_DEMO_EXPENSES, INITIAL_BUDGET_CONFIG, CATEGORIES, getCategoryMeta } from '../utils/constants';
import { getMonthKey } from '../utils/formatters';

const ExpenseContext = createContext();

export const ExpenseProvider = ({ children }) => {
  // Load expenses from localStorage or fallback to realistic initial demo data
  const [expenses, setExpenses] = useState(() => {
    try {
      const saved = localStorage.getItem('spendsmart_expenses');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Failed to read expenses from localStorage', e);
    }
    return INITIAL_DEMO_EXPENSES;
  });

  // Load budget config from localStorage
  const [budget, setBudget] = useState(() => {
    try {
      const saved = localStorage.getItem('spendsmart_budget');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to read budget from localStorage', e);
    }
    return INITIAL_BUDGET_CONFIG;
  });

  // Selected Month filter (default to current month: YYYY-MM)
  const [selectedMonth, setSelectedMonth] = useState(() => getMonthKey());

  // Toast notification state
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ id: Date.now(), message, type });
    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  // Sync expenses to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('spendsmart_expenses', JSON.stringify(expenses));
    } catch (e) {
      console.error('Failed to save expenses to localStorage', e);
    }
  }, [expenses]);

  // Sync budget to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('spendsmart_budget', JSON.stringify(budget));
    } catch (e) {
      console.error('Failed to save budget to localStorage', e);
    }
  }, [budget]);

  // CRUD Operations
  const addExpense = (newExpense) => {
    const expenseWithId = {
      ...newExpense,
      id: 'exp-' + Date.now() + '-' + Math.random().toString(36).substr(2, 4),
      amount: Number(newExpense.amount),
      date: newExpense.date || new Date().toISOString().split('T')[0],
      createdAt: new Date().toISOString(),
    };
    setExpenses(prev => [expenseWithId, ...prev]);
    showToast('Expense of ₹' + expenseWithId.amount + ' recorded successfully!');
    return expenseWithId;
  };

  const updateExpense = (id, updatedFields) => {
    setExpenses(prev =>
      prev.map(item =>
        item.id === id
          ? {
              ...item,
              ...updatedFields,
              amount: Number(updatedFields.amount !== undefined ? updatedFields.amount : item.amount),
            }
          : item
      )
    );
    showToast('Expense updated successfully');
  };

  const deleteExpense = (id) => {
    setExpenses(prev => prev.filter(item => item.id !== id));
    showToast('Expense removed', 'info');
  };

  const setMonthlyBudget = (newTotal) => {
    const num = Math.max(0, Number(newTotal));
    setBudget(prev => ({
      ...prev,
      monthlyTotal: num,
    }));
    showToast(`Monthly budget set to ₹${num.toLocaleString('en-IN')}`);
  };

  const updateCategoryBudget = (category, amount) => {
    const num = Math.max(0, Number(amount));
    setBudget(prev => ({
      ...prev,
      categoryBudgets: {
        ...prev.categoryBudgets,
        [category]: num,
      },
    }));
  };

  const updateMultipleBudgets = (monthlyTotal, categoryBudgets) => {
    setBudget(prev => ({
      monthlyTotal: monthlyTotal !== undefined ? Math.max(0, Number(monthlyTotal)) : prev.monthlyTotal,
      categoryBudgets: categoryBudgets ? { ...prev.categoryBudgets, ...categoryBudgets } : prev.categoryBudgets,
    }));
    showToast('Budget plan and savings updated!');
  };

  const restoreDemoData = () => {
    setExpenses(INITIAL_DEMO_EXPENSES);
    setBudget(INITIAL_BUDGET_CONFIG);
    setSelectedMonth(getMonthKey());
    showToast('Restored realistic demo student data');
  };

  const clearAllExpenses = () => {
    setExpenses([]);
    showToast('Cleared all expenses. Fresh start!', 'info');
  };

  // Available unique months from all expenses
  const availableMonths = useMemo(() => {
    const monthsSet = new Set();
    // Always include current month
    monthsSet.add(getMonthKey());
    expenses.forEach(e => {
      if (e.date) {
        monthsSet.add(e.date.substring(0, 7));
      }
    });
    return Array.from(monthsSet).sort().reverse();
  }, [expenses]);

  // Expenses filtered for selected month
  const monthExpenses = useMemo(() => {
    return expenses.filter(e => e.date && e.date.startsWith(selectedMonth));
  }, [expenses, selectedMonth]);

  // Derived financial metrics for the month
  const totalSpent = useMemo(() => {
    return monthExpenses.reduce((sum, item) => sum + (Number(item.amount) || 0), 0);
  }, [monthExpenses]);

  const monthlyBudget = budget.monthlyTotal || 15000;
  const remainingBudget = monthlyBudget - totalSpent;
  const budgetPercent = monthlyBudget > 0 ? (totalSpent / monthlyBudget) * 100 : 0;

  // Status for progress indicator: green below 80%, amber at 80-100%, red when over budget
  const budgetStatus = useMemo(() => {
    if (budgetPercent > 100) return 'danger';
    if (budgetPercent >= 80) return 'warning';
    return 'safe';
  }, [budgetPercent]);

  // Category breakdown for donut chart & cards
  const categorySummary = useMemo(() => {
    const map = {};
    CATEGORIES.forEach(c => {
      map[c.id] = {
        ...c,
        spent: 0,
        count: 0,
        budget: budget.categoryBudgets?.[c.id] || 0,
      };
    });

    monthExpenses.forEach(exp => {
      const catKey = exp.category || 'Other';
      if (!map[catKey]) {
        map[catKey] = {
          ...getCategoryMeta(catKey),
          spent: 0,
          count: 0,
          budget: budget.categoryBudgets?.[catKey] || 0,
        };
      }
      map[catKey].spent += Number(exp.amount) || 0;
      map[catKey].count += 1;
    });

    return Object.values(map).map(cat => ({
      ...cat,
      percentOfTotal: totalSpent > 0 ? Math.round((cat.spent / totalSpent) * 100) : 0,
      percentOfBudget: cat.budget > 0 ? Math.round((cat.spent / cat.budget) * 100) : 0,
    }));
  }, [monthExpenses, totalSpent, budget]);

  // Top spending category
  const topCategory = useMemo(() => {
    const active = categorySummary.filter(c => c.spent > 0);
    if (active.length === 0) return null;
    return [...active].sort((a, b) => b.spent - a.spent)[0];
  }, [categorySummary]);

  // Needs vs Wants (SDG 12 Responsible Consumption)
  const needsWantsAnalysis = useMemo(() => {
    let needsTotal = 0;
    let wantsTotal = 0;
    let flexibleTotal = 0;

    monthExpenses.forEach(exp => {
      const meta = getCategoryMeta(exp.category);
      const amt = Number(exp.amount) || 0;
      if (meta.type === 'need') needsTotal += amt;
      else if (meta.type === 'want') wantsTotal += amt;
      else flexibleTotal += amt;
    });

    const total = totalSpent || 1;
    const wantsPercent = Math.round((wantsTotal / total) * 100);
    const needsPercent = Math.round((needsTotal / total) * 100);

    // Dynamic smart tip for SDG 12
    let tip = 'Your spending habits are balanced. Great job prioritizing education and essentials!';
    let isHighWants = false;

    if (wantsPercent > 35) {
      isHighWants = true;
      tip = `High discretionary spending (${wantsPercent}% on Entertainment & Shopping). Try asking yourself "Do I really need this today?" to conserve funds for semester essentials.`;
    } else if (budgetPercent > 90) {
      tip = `You've utilized ${Math.round(budgetPercent)}% of your monthly budget. Limit dining out and impulse shopping for the remaining days.`;
    } else if (needsPercent >= 70) {
      tip = '70%+ allocated to core essentials (Food, Books, Commute, PG). You are practicing mindful student budgeting!';
    }

    return {
      needsTotal,
      wantsTotal,
      flexibleTotal,
      needsPercent,
      wantsPercent,
      tip,
      isHighWants,
    };
  }, [monthExpenses, totalSpent, budgetPercent]);

  // Daily spending data for AreaChart
  const dailySpendData = useMemo(() => {
    const [year, month] = selectedMonth.split('-').map(Number);
    // Number of days in selected month
    const totalDays = new Date(year, month, 0).getDate();

    // Today's day of month if current month is selected
    const now = new Date();
    const isCurrentMonth = now.getFullYear() === year && (now.getMonth() + 1) === month;
    const maxDay = isCurrentMonth ? now.getDate() : totalDays;

    const dayMap = {};
    for (let day = 1; day <= maxDay; day++) {
      const dateStr = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      dayMap[dateStr] = {
        date: dateStr,
        day: `${day} ${new Date(year, month - 1, day).toLocaleString('en-US', { month: 'short' })}`,
        amount: 0,
      };
    }

    monthExpenses.forEach(exp => {
      if (exp.date && dayMap[exp.date]) {
        dayMap[exp.date].amount += Number(exp.amount) || 0;
      }
    });

    return Object.values(dayMap);
  }, [monthExpenses, selectedMonth]);

  // Weekly spending data for BarChart
  const weeklySpendData = useMemo(() => {
    const weeks = [
      { week: 'Week 1 (1-7)', amount: 0 },
      { week: 'Week 2 (8-14)', amount: 0 },
      { week: 'Week 3 (15-21)', amount: 0 },
      { week: 'Week 4 (22-end)', amount: 0 },
    ];

    monthExpenses.forEach(exp => {
      if (exp.date) {
        const day = parseInt(exp.date.split('-')[2], 10);
        const amt = Number(exp.amount) || 0;
        if (day <= 7) weeks[0].amount += amt;
        else if (day <= 14) weeks[1].amount += amt;
        else if (day <= 21) weeks[2].amount += amt;
        else weeks[3].amount += amt;
      }
    });

    return weeks;
  }, [monthExpenses]);

  // Average daily spend and projected month-end spend
  const projections = useMemo(() => {
    const [year, month] = selectedMonth.split('-').map(Number);
    const totalDays = new Date(year, month, 0).getDate();
    const now = new Date();
    const isCurrentMonth = now.getFullYear() === year && (now.getMonth() + 1) === month;
    const elapsedDays = isCurrentMonth ? Math.max(1, now.getDate()) : totalDays;

    const avgDaily = Math.round(totalSpent / elapsedDays);
    const projectedMonthEnd = Math.round(avgDaily * totalDays);

    return {
      avgDaily,
      projectedMonthEnd,
      elapsedDays,
      totalDays,
    };
  }, [totalSpent, selectedMonth]);

  return (
    <ExpenseContext.Provider
      value={{
        expenses,
        monthExpenses,
        budget,
        selectedMonth,
        setSelectedMonth,
        availableMonths,
        totalSpent,
        monthlyBudget,
        remainingBudget,
        budgetPercent,
        budgetStatus,
        categorySummary,
        topCategory,
        needsWantsAnalysis,
        dailySpendData,
        weeklySpendData,
        projections,
        addExpense,
        updateExpense,
        deleteExpense,
        setMonthlyBudget,
        updateCategoryBudget,
        updateMultipleBudgets,
        restoreDemoData,
        clearAllExpenses,
        toast,
        showToast,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};

export const useExpenses = () => {
  const context = useContext(ExpenseContext);
  if (!context) {
    throw new Error('useExpenses must be used within an ExpenseProvider');
  }
  return context;
};
