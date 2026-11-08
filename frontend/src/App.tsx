import React, { useState } from 'react';
import { BudgetProvider } from './context/BudgetContext';
import { Navbar } from './components/dashboard/Navbar';
import { BudgetCalculator } from './components/dashboard/BudgetCalculator';
import { QuickStats } from './components/dashboard/QuickStats';
import { TransactionFilters } from './components/dashboard/TransactionFilters';
import { TransactionTable } from './components/dashboard/TransactionTable';
import { CategoryBreakdown } from './components/dashboard/CategoryBreakdown';
import { AssistantBanner } from './components/dashboard/AssistantBanner';
import { ComparisonSection } from './components/dashboard/ComparisonSection';
import { DirectExpenditureCard } from './components/forms/DirectExpenditureCard';
import { TransactionForm } from './components/forms/TransactionForm';
import { BudgetGoalForm } from './components/forms/BudgetGoalForm';
import { Card } from './components/common/Card';
import { X, Plus, SlidersHorizontal } from 'lucide-react';

export const AppContent: React.FC = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isBudgetModalOpen, setIsBudgetModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-canvas text-ink flex flex-col font-sans selection:bg-card-tint-lavender selection:text-brand-purple-800">
      {/* 1. Clean Workspace Navigation */}
      <Navbar
        onOpenAddModal={() => setIsAddModalOpen(true)}
        onOpenBudgetModal={() => setIsBudgetModalOpen(true)}
      />

      {/* 2. Main Budget Management Dashboard Workspace */}
      <main className="flex-1 max-w-[1280px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8 space-y-6 md:space-y-8">
        {/* Core Financial Feature 1: Budget Calculator & Runway Forecaster */}
        <section aria-label="Budget Calculator">
          <BudgetCalculator />
        </section>

        {/* Core Financial Feature 2: Analytics & Summary Widgets */}
        <section aria-label="Financial Summary Stats">
          <QuickStats />
        </section>

        {/* AI Financial Recommendations / Assistant */}
        <section aria-label="AI Assistant Recommendations">
          <AssistantBanner />
        </section>

        {/* Core Financial Feature 3: Expenditure Tracking & Ledger Workspace */}
        <section aria-label="Expenditure Tracking and Financial Records" className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 items-start">
          {/* Left Column (8 cols): Interactive Expenditure Form + Transaction Records */}
          <div className="lg:col-span-8 space-y-6">
            {/* Quick Expenditure Capture Form */}
            <DirectExpenditureCard />

            {/* Filter Pill Tabs, Search, and Transaction Ledger Table */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h3 className="text-xl font-semibold text-ink">
                    Financial Records & Transactions
                  </h3>
                  <p className="text-sm text-steel">
                    Inspect categorized expenditures and recurring overheads.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(true)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-primary text-white text-xs font-semibold hover:bg-primary-pressed transition-colors cursor-pointer self-start sm:self-auto"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Modal Entry</span>
                </button>
              </div>

              {/* Filter Pill Tabs and Search */}
              <TransactionFilters />

              {/* Table */}
              <TransactionTable onOpenAdd={() => setIsAddModalOpen(true)} />
            </div>
          </div>

          {/* Right Column (4 cols): Category Budget Guardrails & Progress */}
          <aside className="lg:col-span-4 space-y-6">
            <CategoryBreakdown onOpenBudgetModal={() => setIsBudgetModalOpen(true)} />
          </aside>
        </section>

        {/* Core Financial Feature 4: Budget vs Actuals Analysis */}
        <section aria-label="Budget vs Actual Variance Comparison">
          <ComparisonSection />
        </section>
      </main>

      {/* Modal: Add Transaction */}
      {isAddModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink-deep/40 backdrop-blur-xs transition-opacity"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <Card variant="base" className="w-full max-w-lg p-6 relative bg-canvas shadow-elevation4 border border-hairline">
            <div className="flex items-center justify-between pb-3 border-b border-hairline">
              <h3 id="modal-title" className="text-lg font-semibold text-ink">
                Record New Transaction
              </h3>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 rounded text-steel hover:text-ink hover:bg-surface cursor-pointer"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="pt-4">
              <TransactionForm
                onSuccess={() => setIsAddModalOpen(false)}
                onCancel={() => setIsAddModalOpen(false)}
              />
            </div>
          </Card>
        </div>
      )}

      {/* Modal: Set Budget Limits */}
      {isBudgetModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink-deep/40 backdrop-blur-xs transition-opacity"
          role="dialog"
          aria-modal="true"
        >
          <Card variant="base" className="w-full max-w-md p-6 relative bg-canvas shadow-elevation4 border border-hairline">
            <div className="flex items-center justify-between pb-3 border-b border-hairline">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-primary" />
                <h3 className="text-lg font-semibold text-ink">
                  Category Monthly Targets
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsBudgetModalOpen(false)}
                className="p-1 rounded text-steel hover:text-ink hover:bg-surface cursor-pointer"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="pt-4">
              <BudgetGoalForm onClose={() => setIsBudgetModalOpen(false)} />
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default function App() {
  return (
    <BudgetProvider>
      <AppContent />
    </BudgetProvider>
  );
}
