import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Sidebar, BottomTabBar, MobileHeader } from './Navigation';
import AddExpenseModal from './AddExpenseModal';
import ComingSoonModal from './ComingSoonModal';
import ToastNotification from './ToastNotification';

export default function Layout() {
  const [isAddExpenseOpen, setIsAddExpenseOpen] = useState(false);
  const [comingSoonKey, setComingSoonKey] = useState(null);
  const location = useLocation();

  const handleOpenAddExpense = () => setIsAddExpenseOpen(true);
  const handleCloseAddExpense = () => setIsAddExpenseOpen(false);

  const handleOpenComingSoon = (key) => setComingSoonKey(key);
  const handleCloseComingSoon = () => setComingSoonKey(null);

  return (
    <div className="flex min-h-screen bg-slate-950 dark:bg-slate-950 light:bg-slate-50 text-slate-100 dark:text-slate-100 light:text-slate-900 transition-colors">
      {/* Desktop Sidebar */}
      <Sidebar
        onOpenAddExpense={handleOpenAddExpense}
        onOpenComingSoon={handleOpenComingSoon}
      />

      <div className="flex-1 flex flex-col min-w-0 pb-20 lg:pb-8">
        {/* Mobile Header */}
        <MobileHeader onOpenComingSoon={handleOpenComingSoon} />

        {/* Dynamic page content with smooth page transitions */}
        <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.24, ease: 'easeOut' }}
              className="h-full"
            >
              <Outlet
                context={{
                  openAddExpense: handleOpenAddExpense,
                  openComingSoon: handleOpenComingSoon,
                }}
              />
            </motion.div>
          </AnimatePresence>
        </main>

        {/* Mobile Bottom Navigation */}
        <BottomTabBar onOpenAddExpense={handleOpenAddExpense} />
      </div>

      {/* Global Modals & Notifications */}
      <AddExpenseModal
        isOpen={isAddExpenseOpen}
        onClose={handleCloseAddExpense}
      />

      <ComingSoonModal
        isOpen={Boolean(comingSoonKey)}
        featureKey={comingSoonKey}
        onClose={handleCloseComingSoon}
      />

      <ToastNotification />
    </div>
  );
}
