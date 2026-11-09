import React from 'react';
import { Button } from '../common/Button';
import { Plus, SlidersHorizontal, RotateCcw } from 'lucide-react';
import { useBudget } from '../../context/BudgetContext';

interface NavbarProps {
  onOpenAddModal: () => void;
  onOpenBudgetModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenAddModal,
  onOpenBudgetModal,
}) => {
  const { resetToDefaults } = useBudget();

  return (
    <header className="sticky top-0 z-40 w-full bg-canvas/95 backdrop-blur-md border-b border-hairline">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Left: Notion "N" Logo & Workspace Brand */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-md bg-ink-deep text-white flex items-center justify-center font-bold text-lg tracking-tighter shadow-sm">
            N
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-[15px] tracking-tight text-ink flex items-center gap-1.5">
              Budget Management Dashboard
              <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-card-tint-lavender text-brand-purple-800">
                Workspace
              </span>
            </span>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          <Button
            variant="ghost"
            size="sm"
            onClick={resetToDefaults}
            title="Reset to initial dataset"
            leftIcon={<RotateCcw className="w-3.5 h-3.5 text-steel" />}
            className="hidden sm:inline-flex"
          >
            Reset Demo
          </Button>

          <Button
            variant="secondary"
            size="sm"
            onClick={onOpenBudgetModal}
            leftIcon={<SlidersHorizontal className="w-3.5 h-3.5" />}
          >
            <span className="hidden xs:inline">Category Targets</span>
            <span className="xs:hidden">Targets</span>
          </Button>

          {/* Signature Notion purple rectangular primary button */}
          <Button
            variant="primary"
            size="sm"
            onClick={onOpenAddModal}
            leftIcon={<Plus className="w-4 h-4" />}
          >
            <span className="hidden xs:inline">Add Transaction</span>
            <span className="xs:hidden">Add</span>
          </Button>
        </div>
      </div>
    </header>
  );
};
