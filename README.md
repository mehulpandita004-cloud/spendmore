# SpendSmart 🪙
### Student Expense Tracking & Budget Management System
> **College Mini Project | Aligned with United Nations Sustainable Development Goal 12 (Responsible Consumption and Production)**

[![React](https://img.shields.io/badge/React-19.x-blue.svg)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.x-646CFF.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC.svg)](https://tailwindcss.com/)
[![Three.js](https://img.shields.io/badge/Three.js-R3F-black.svg)](https://docs.pmnd.rs/react-three-fiber)
[![SDG 12](https://img.shields.io/badge/UN%20SDG-12%20Responsible%20Consumption-brightgreen.svg)](https://sdgs.un.org/goals/goal12)

---

## 📖 Overview

**SpendSmart** is a client-side, zero-backend web application built specifically for college students, hostelers, and day-scholars. It helps students track daily transactions in **Indian Rupees (₹)**, manage monthly budgets, and avoid end-of-semester financial stress.

In alignment with **UN SDG 12 (Target 12.8: Sustainable Lifestyles and Consumption Awareness)**, SpendSmart introduces an intelligent **"Needs vs. Wants"** categorization framework to help students distinguish essential living expenses (mess food, books, commute, PG rent) from discretionary impulse splurges (excess takeout, entertainment, fast fashion).

---

## ✨ Key Features

### 1. 🌐 Interactive 3D Hero Scene
- Built with **Three.js**, **@react-three/fiber**, and **@react-three/drei**.
- Floating, slowly rotating metallic gold/emerald coins with soft glowing particles and a digital savings vault.
- Gentle mouse-parallax tracking and mobile-optimized particle counts for smooth 60 FPS performance.

### 2. 📊 Student Financial Dashboard
- **Top Metric Cards**: Monthly Budget, Total Spent, and Remaining Balance with animated count-up numbers.
- **Dynamic Guardrail Bar**: Automated 3-stage status (Emerald `< 80%`, Warning Amber `80%–100%`, Alert Red `> 100%`).
- **Interactive Recharts**:
  - *Daily Spending Pattern* (Area chart with emerald gradient).
  - *Category Distribution* (Donut chart with category colors).
  - *Weekly Outlay* (Bar chart spanning Weeks 1 through 4).
- **Projections & Forecasts**: Average daily burn rate, projected month-end outlay, and elapsed days counter.
- **SDG 12 Insights Panel**: Real-time ratio of essential needs vs. discretionary wants with context-aware smart tips.
- **Month Selector**: View current or previous month's ledgers seamlessly.

### 3. 📝 Complete Expense Logging (CRUD)
- **Add / Edit Modal**: Fast numeric input in Indian Rupees (₹), category selector with icons, description/notes, date picker, and payment mode (UPI, Cash, Card, Net Banking).
- **Live Search & Filter**: Instant search across titles and payment modes, category pill selectors, date filters (Last 7 Days, Last 30 Days, This Month), and multi-criteria sorting.
- **Framer Motion Micro-interactions**: Smooth entrance, exit, and layout transitions.

### 4. 🎯 Category-Level Budget Management
- Editable overall monthly spend cap with quick presets (`₹8k`, `₹12k`, `₹15k`, `₹20k`).
- Per-category budgets (Food, Commute, Academics, Entertainment, Shopping, Rent & Utilities, Other).
- Progress gauges with real-time percentage indicators and over-budget warning badges.
- **50-30-20 Campus Guideline**: Practical breakdown tailored for student allowances.

### 5. 🎨 Design System & Accessibility
- **Dark Premium Theme** by default with one-click **Light Mode Toggle**.
- Glassmorphism design tokens (backdrop-blur, translucent slate surfaces, subtle gradient borders).
- Font pairings: **Plus Jakarta Sans** and **Poppins** via Google Fonts.
- **Desktop Glass Sidebar** & **Mobile Bottom Tab Bar** for native app-like UX across all viewports.
- Non-destructive demo dataset with **Reset Demo Data** and **Clear All** capabilities.

### 6. 🚀 Planned Roadmap Preview Modals
- Multi-Device Cloud Sync & Student Login
- CSV & Statement Ledger Export
- Gemini AI Spending Recommendations & Habit Coach
- Monthly Financial Audit PDF Report

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| **React 19** | Core frontend UI library |
| **Vite 8** | High-performance build tool and dev server |
| **Tailwind CSS 3.4** | Utility-first styling with custom glassmorphism extensions |
| **Three.js & R3F / Drei** | 3D interactive graphics, shaders, and particle canvas |
| **Framer Motion** | Component animations, modal springs, and page transitions |
| **Recharts** | Declarative financial data visualizations |
| **Lucide React** | Consistent, modern iconography |
| **React Router v7** | Client-side page routing |
| **LocalStorage API** | Browser-local persistence with zero backend dependencies |

---

## 📂 Project Architecture

```
spends-mart/
├── index.html                   # HTML template with Google Fonts & metadata
├── package.json                 # Dependencies & scripts
├── tailwind.config.js           # Glassmorphism, colors, fonts configuration
├── postcss.config.js            # PostCSS configuration
├── vite.config.js               # Vite bundler configuration
└── src/
    ├── main.jsx                 # Application entry point
    ├── App.jsx                  # Master router & provider hierarchy
    ├── index.css                # Tailwind directives & glass utility classes
    ├── context/
    │   ├── ExpenseContext.jsx   # Expense CRUD, budget state & localStorage sync
    │   └── ThemeContext.jsx     # Dark/Light theme toggle & system preference
    ├── components/
    │   ├── ThreeHeroScene.jsx   # 3D Three.js canvas (coins, vault, sparkles)
    │   ├── Layout.jsx           # Master shell with page transitions
    │   ├── Navigation.jsx       # Desktop Sidebar & Mobile Bottom Tab Bar
    │   ├── AddExpenseModal.jsx  # Expense creation & edit form with validation
    │   ├── ComingSoonModal.jsx  # Roadmap preview dialog
    │   ├── ToastNotification.jsx# Floating animated toast feedback
    │   ├── AnimatedCounter.jsx  # Smooth number count-up in INR
    │   ├── CategoryIcon.jsx     # Dynamic category icon mapper
    │   └── SkeletonCard.jsx     # Loading shimmer placeholder
    ├── pages/
    │   ├── LandingPage.jsx      # 3D Hero, features, 3-step guide & SDG 12
    │   ├── DashboardPage.jsx    # Analytics, 3 Recharts, progress bar & insights
    │   ├── ExpensesPage.jsx     # Transaction list, search & filters
    │   └── BudgetPage.jsx       # Overall & category budget allocation
    └── utils/
        ├── constants.js         # Category metadata, types & student demo dataset
        └── formatters.js        # INR currency & relative date formatters
```

---

## 🚀 Setup & Execution Guide

### Prerequisites
- Node.js version `18.x` or higher (`node -v`)
- npm version `9.x` or higher (`npm -v`)

### 1. Installation
Clone or navigate to the project directory and install all dependencies:
```bash
cd "spends mart"
npm install
```

### 2. Development Mode
Start the local Vite development server:
```bash
npm run dev
```
Open your browser and navigate to:
```
http://localhost:5173/
```

### 3. Production Build
To create a minified, production-ready bundle:
```bash
npm run build
```

To preview the production build locally:
```bash
npm run preview
```

---

## 💾 Local Storage Schema

All application state is preserved locally in the client's browser under the following keys:
- `spendsmart_expenses`: Array of expense objects containing `id`, `amount`, `category`, `note`, `date`, and `paymentMode`.
- `spendsmart_budget`: Budget object storing `monthlyTotal` and `categoryBudgets`.
- `spendsmart_theme`: Active appearance mode (`'dark'` or `'light'`).

---

## 🎓 College Mini Project Details
- **Project Title**: SpendSmart — Student Expense Tracking and Budget Management System
- **Focus Area**: Personal Finance, Human-Computer Interaction (HCI), Sustainable Consumption (SDG 12)
- **Deployment**: Single-Page Application (SPA) / Frontend-Only (Client-Side Storage)
