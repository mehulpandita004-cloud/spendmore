// Format number in Indian Rupee format (e.g. ₹4,500)
export const formatINR = (amount, showDecimals = false) => {
  if (amount === undefined || amount === null || isNaN(amount)) return '₹0';
  const num = Number(amount);
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: showDecimals ? 2 : 0,
    minimumFractionDigits: showDecimals ? 2 : 0,
  }).format(num);
};

// Compact format for charts or badges (e.g., ₹2.4K)
export const formatCompactINR = (amount) => {
  if (amount === undefined || amount === null || isNaN(amount)) return '₹0';
  const num = Number(amount);
  if (num >= 100000) {
    return `₹${(num / 100000).toFixed(1)}L`;
  }
  if (num >= 1000) {
    return `₹${(num / 1000).toFixed(1)}k`;
  }
  return `₹${num}`;
};

// Format a date string (YYYY-MM-DD) into readable Indian date (e.g. 14 Oct 2026)
export const formatDisplayDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;

  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  const isToday =
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear();

  const isYesterday =
    date.getDate() === yesterday.getDate() &&
    date.getMonth() === yesterday.getMonth() &&
    date.getFullYear() === yesterday.getFullYear();

  if (isToday) return 'Today';
  if (isYesterday) return 'Yesterday';

  return date.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
};

// Get Month Key "YYYY-MM"
export const getMonthKey = (date = new Date()) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  return `${year}-${month}`;
};

// Format Month Key "2026-10" to "October 2026"
export const formatMonthLabel = (monthKey) => {
  if (!monthKey) return '';
  const [year, month] = monthKey.split('-');
  const date = new Date(Number(year), Number(month) - 1, 1);
  return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
};
