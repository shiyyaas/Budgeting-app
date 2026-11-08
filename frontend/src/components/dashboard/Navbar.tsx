import React, { useState } from 'react';
import { Button } from '../common/Button';
import { Plus, Menu, X, SlidersHorizontal, RotateCcw } from 'lucide-react';
import { useBudget } from '../../context/BudgetContext';

interface NavbarProps {
  onOpenAddModal: () => void;
  onOpenBudgetModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenAddModal,
  onOpenBudgetModal,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { resetToDefaults } = useBudget();

  return (
    <header className="sticky top-0 z-40 w-full bg-canvas/95 backdrop-blur-md border-b border-hairline transition-all">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Left: Notion "N" Logo & Brand */}
        <div className="flex items-center gap-8">
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-md bg-ink-deep text-white flex items-center justify-center font-bold text-lg tracking-tighter shadow-sm group-hover:scale-105 transition-transform">
              N
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-[15px] tracking-tight text-ink flex items-center gap-1.5">
                Notion Budget
                <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-card-tint-lavender text-brand-purple-800">
                  Workspace
                </span>
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-6 text-[14px] text-steel font-medium">
            <a href="#overview" className="hover:text-ink transition-colors">
              Overview
            </a>
            <a href="#transactions" className="hover:text-ink transition-colors">
              Transactions
            </a>
            <a href="#categories" className="hover:text-ink transition-colors">
              Categories
            </a>
            <a href="#comparison" className="hover:text-ink transition-colors">
              Comparison Table
            </a>
          </nav>
        </div>

        {/* Right Action Buttons */}
        <div className="hidden sm:flex items-center gap-2.5">
          <Button
            variant="ghost"
            size="sm"
            onClick={resetToDefaults}
            title="Reset to sample dataset"
            leftIcon={<RotateCcw className="w-3.5 h-3.5 text-steel" />}
          >
            Reset Demo
          </Button>

          <Button
            variant="secondary"
            size="sm"
            onClick={onOpenBudgetModal}
            leftIcon={<SlidersHorizontal className="w-3.5 h-3.5" />}
          >
            Set Targets
          </Button>

          {/* Signature Notion purple primary button */}
          <Button
            variant="primary"
            size="sm"
            onClick={onOpenAddModal}
            leftIcon={<Plus className="w-4 h-4" />}
          >
            Add Entry
          </Button>
        </div>

        {/* Mobile menu toggle */}
        <div className="flex sm:hidden items-center gap-2">
          <Button
            variant="primary"
            size="sm"
            onClick={onOpenAddModal}
            aria-label="Add transaction"
          >
            <Plus className="w-4 h-4" />
          </Button>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-ink hover:bg-surface rounded-md border border-hairline cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-b border-hairline bg-canvas px-4 py-4 space-y-3">
          <nav className="flex flex-col gap-2.5 text-[14px] font-medium text-charcoal">
            <a
              href="#overview"
              onClick={() => setMobileMenuOpen(false)}
              className="px-2 py-1.5 rounded hover:bg-surface"
            >
              Overview
            </a>
            <a
              href="#transactions"
              onClick={() => setMobileMenuOpen(false)}
              className="px-2 py-1.5 rounded hover:bg-surface"
            >
              Transactions
            </a>
            <a
              href="#categories"
              onClick={() => setMobileMenuOpen(false)}
              className="px-2 py-1.5 rounded hover:bg-surface"
            >
              Categories & Goals
            </a>
            <a
              href="#comparison"
              onClick={() => setMobileMenuOpen(false)}
              className="px-2 py-1.5 rounded hover:bg-surface"
            >
              Comparison Table
            </a>
          </nav>

          <div className="pt-3 border-t border-hairline flex flex-col gap-2">
            <Button
              variant="secondary"
              fullWidth
              size="sm"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBudgetModal();
              }}
              leftIcon={<SlidersHorizontal className="w-4 h-4" />}
            >
              Set Budget Limits
            </Button>
            <Button
              variant="ghost"
              fullWidth
              size="sm"
              onClick={() => {
                setMobileMenuOpen(false);
                resetToDefaults();
              }}
              leftIcon={<RotateCcw className="w-4 h-4" />}
            >
              Reset Sample Data
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};
