import React from 'react';
import { Card } from '../common/Card';
import { useBudget } from '../../context/BudgetContext';
import {
  TrendingUp,
  ArrowDownLeft,
  ArrowUpRight,
  PiggyBank
} from 'lucide-react';

export const QuickStats: React.FC = () => {
  const { summaryStats } = useBudget();

  return (
    // Responsive grid using DESIGN.md pastel card tints (peach, mint, lavender, sky)
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* 1. Net Balance: card-feature-sky */}
      <Card variant="sky" className="flex flex-col justify-between">
        <div className="flex items-center justify-between text-charcoal">
          <span className="text-[12px] font-semibold uppercase tracking-wider text-slate">
            Net Cash Balance
          </span>
          <div className="w-8 h-8 rounded-md bg-white/70 flex items-center justify-center text-primary shadow-xs">
            <TrendingUp className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-3">
          <div className="text-2xl sm:text-3xl font-semibold text-charcoal font-sans">
            ${summaryStats.netBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <p className="text-[12px] text-slate mt-1">
            {summaryStats.netBalance >= 0 ? 'Surplus across accounts' : 'Deficit this billing period'}
          </p>
        </div>
      </Card>

      {/* 2. Total Income: card-feature-mint */}
      <Card variant="mint" className="flex flex-col justify-between">
        <div className="flex items-center justify-between text-charcoal">
          <span className="text-[12px] font-semibold uppercase tracking-wider text-slate">
            Total Inflow / Income
          </span>
          <div className="w-8 h-8 rounded-md bg-white/70 flex items-center justify-center text-brand-green shadow-xs">
            <ArrowUpRight className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-3">
          <div className="text-2xl sm:text-3xl font-semibold text-charcoal font-sans">
            +${summaryStats.totalIncome.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <p className="text-[12px] text-slate mt-1">
            From salaries, gigs & investments
          </p>
        </div>
      </Card>

      {/* 3. Total Expenses: card-feature-peach */}
      <Card variant="peach" className="flex flex-col justify-between">
        <div className="flex items-center justify-between text-charcoal">
          <span className="text-[12px] font-semibold uppercase tracking-wider text-slate">
            Total Expenditures
          </span>
          <div className="w-8 h-8 rounded-md bg-white/70 flex items-center justify-center text-brand-orange-deep shadow-xs">
            <ArrowDownLeft className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-3">
          <div className="text-2xl sm:text-3xl font-semibold text-charcoal font-sans">
            -${summaryStats.totalExpenses.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <p className="text-[12px] text-slate mt-1">
            {summaryStats.budgetUtilization}% of ${summaryStats.totalBudgetLimit.toLocaleString()} monthly goal
          </p>
        </div>
      </Card>

      {/* 4. Savings Rate: card-feature-lavender */}
      <Card variant="lavender" className="flex flex-col justify-between">
        <div className="flex items-center justify-between text-charcoal">
          <span className="text-[12px] font-semibold uppercase tracking-wider text-slate">
            Savings Ratio
          </span>
          <div className="w-8 h-8 rounded-md bg-white/70 flex items-center justify-center text-brand-purple shadow-xs">
            <PiggyBank className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-3">
          <div className="text-2xl sm:text-3xl font-semibold text-charcoal font-sans">
            {summaryStats.savingsRate}%
          </div>
          <p className="text-[12px] text-slate mt-1">
            Target savings guideline: 20%+
          </p>
        </div>
      </Card>
    </div>
  );
};
