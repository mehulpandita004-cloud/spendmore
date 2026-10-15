import React from 'react';

export default function SkeletonCard({ className = '', height = 'h-32' }) {
  return (
    <div
      className={`glass-card p-6 animate-pulse bg-slate-900/40 dark:bg-slate-900/40 light:bg-slate-100/60 border border-white/5 dark:border-white/5 light:border-slate-200 ${height} ${className}`}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="h-4 bg-slate-800 dark:bg-slate-800 light:bg-slate-200 rounded w-1/3" />
        <div className="w-8 h-8 bg-slate-800 dark:bg-slate-800 light:bg-slate-200 rounded-xl" />
      </div>
      <div className="h-7 bg-slate-800 dark:bg-slate-800 light:bg-slate-200 rounded w-1/2 mb-3" />
      <div className="h-2 bg-slate-800 dark:bg-slate-800 light:bg-slate-200 rounded-full w-full" />
    </div>
  );
}
