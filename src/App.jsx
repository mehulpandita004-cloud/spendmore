import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { ExpenseProvider } from './context/ExpenseContext';
import Layout from './components/Layout';
import LandingPage from './pages/LandingPage';
import DashboardPage from './pages/DashboardPage';
import ExpensesPage from './pages/ExpensesPage';
import BudgetPage from './pages/BudgetPage';

export default function App() {
  return (
    <ThemeProvider>
      <ExpenseProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<LandingPage />} />
              <Route path="dashboard" element={<DashboardPage />} />
              <Route path="expenses" element={<ExpensesPage />} />
              <Route path="budget" element={<BudgetPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ExpenseProvider>
    </ThemeProvider>
  );
}
