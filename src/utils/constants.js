export const CATEGORIES = [
  {
    id: 'Food',
    name: 'Food & Dining',
    color: '#10b981', // emerald
    bgLight: 'rgba(16, 185, 129, 0.15)',
    textColor: 'text-emerald-400',
    borderColor: 'border-emerald-500/30',
    type: 'need',
    icon: 'UtensilsCrossed',
  },
  {
    id: 'Travel',
    name: 'Travel & Commute',
    color: '#06b6d4', // cyan
    bgLight: 'rgba(6, 182, 212, 0.15)',
    textColor: 'text-cyan-400',
    borderColor: 'border-cyan-500/30',
    type: 'need',
    icon: 'Bus',
  },
  {
    id: 'Study',
    name: 'Study & Academics',
    color: '#6366f1', // indigo
    bgLight: 'rgba(99, 102, 241, 0.15)',
    textColor: 'text-indigo-400',
    borderColor: 'border-indigo-500/30',
    type: 'need',
    icon: 'GraduationCap',
  },
  {
    id: 'Entertainment',
    name: 'Entertainment',
    color: '#f43f5e', // rose
    bgLight: 'rgba(244, 63, 94, 0.15)',
    textColor: 'text-rose-400',
    borderColor: 'border-rose-500/30',
    type: 'want',
    icon: 'Film',
  },
  {
    id: 'Shopping',
    name: 'Shopping & Apparel',
    color: '#f59e0b', // amber
    bgLight: 'rgba(245, 158, 11, 0.15)',
    textColor: 'text-amber-400',
    borderColor: 'border-amber-500/30',
    type: 'want',
    icon: 'ShoppingBag',
  },
  {
    id: 'Rent & Bills',
    name: 'Rent & Utilities',
    color: '#8b5cf6', // purple
    bgLight: 'rgba(139, 92, 246, 0.15)',
    textColor: 'text-violet-400',
    borderColor: 'border-violet-500/30',
    type: 'need',
    icon: 'Home',
  },
  {
    id: 'Other',
    name: 'Other Essentials',
    color: '#64748b', // slate
    bgLight: 'rgba(100, 116, 139, 0.15)',
    textColor: 'text-slate-400',
    borderColor: 'border-slate-500/30',
    type: 'flexible',
    icon: 'MoreHorizontal',
  },
];

// Helper to get category details
export const getCategoryMeta = (categoryId) => {
  return CATEGORIES.find(c => c.id === categoryId) || {
    id: categoryId || 'Other',
    name: categoryId || 'Other',
    color: '#10b981',
    bgLight: 'rgba(16, 185, 129, 0.15)',
    textColor: 'text-emerald-400',
    borderColor: 'border-emerald-500/30',
    type: 'flexible',
    icon: 'MoreHorizontal',
  };
};

// Generate demo expenses relative to current date (October 2026)
const today = new Date();
const currentYear = today.getFullYear();
const currentMonth = today.getMonth(); // 0-indexed

const getDateStr = (dayOffset = 0) => {
  const d = new Date(currentYear, currentMonth, today.getDate() - dayOffset);
  return d.toISOString().split('T')[0];
};

export const INITIAL_DEMO_EXPENSES = [
  {
    id: 'exp-1',
    amount: 280,
    category: 'Food',
    note: 'Campus Canteen Thali & Juice',
    date: getDateStr(0),
    paymentMode: 'UPI',
  },
  {
    id: 'exp-2',
    amount: 150,
    category: 'Travel',
    note: 'Metro card top-up',
    date: getDateStr(0),
    paymentMode: 'Metro Card',
  },
  {
    id: 'exp-3',
    amount: 650,
    category: 'Study',
    note: 'Data Structures Textbook & Spiral Notes',
    date: getDateStr(1),
    paymentMode: 'UPI',
  },
  {
    id: 'exp-4',
    amount: 320,
    category: 'Entertainment',
    note: 'College weekend cinema with friends',
    date: getDateStr(2),
    paymentMode: 'Card',
  },
  {
    id: 'exp-5',
    amount: 1250,
    category: 'Shopping',
    note: 'Campus sports shoes on clearance',
    date: getDateStr(3),
    paymentMode: 'UPI',
  },
  {
    id: 'exp-6',
    amount: 450,
    category: 'Food',
    note: 'Hostel late-night study pizza slice & coffee',
    date: getDateStr(4),
    paymentMode: 'UPI',
  },
  {
    id: 'exp-7',
    amount: 3500,
    category: 'Rent & Bills',
    note: 'PG accommodation share & Wi-Fi',
    date: getDateStr(5),
    paymentMode: 'Net Banking',
  },
  {
    id: 'exp-8',
    amount: 120,
    category: 'Study',
    note: 'Lab manual printouts & binding',
    date: getDateStr(6),
    paymentMode: 'Cash',
  },
  {
    id: 'exp-9',
    amount: 180,
    category: 'Food',
    note: 'Morning South Indian breakfast at mess',
    date: getDateStr(7),
    paymentMode: 'UPI',
  },
  {
    id: 'exp-10',
    amount: 80,
    category: 'Travel',
    note: 'Shared auto to college campus',
    date: getDateStr(8),
    paymentMode: 'Cash',
  },
  {
    id: 'exp-11',
    amount: 420,
    category: 'Entertainment',
    note: 'Streaming subscription renewal (student discount)',
    date: getDateStr(9),
    paymentMode: 'UPI',
  },
  {
    id: 'exp-12',
    amount: 340,
    category: 'Food',
    note: 'Project group lunch at university cafeteria',
    date: getDateStr(10),
    paymentMode: 'UPI',
  },
  {
    id: 'exp-13',
    amount: 550,
    category: 'Shopping',
    note: 'Scientific calculator battery & notebook refills',
    date: getDateStr(12),
    paymentMode: 'UPI',
  },
  {
    id: 'exp-14',
    amount: 250,
    category: 'Other',
    note: 'Hostel laundry service charge',
    date: getDateStr(13),
    paymentMode: 'Cash',
  },
];

export const INITIAL_BUDGET_CONFIG = {
  monthlyTotal: 15000,
  categoryBudgets: {
    Food: 4500,
    Travel: 1800,
    Study: 2500,
    Entertainment: 1500,
    Shopping: 1500,
    'Rent & Bills': 4000,
    Other: 1000,
  },
};
