import React from 'react';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { useBudget } from '../../context/BudgetContext';
import { PieChart, Sliders, AlertTriangle } from 'lucide-react';

export const CategoryBreakdown: React.FC<{ onOpenBudgetModal: () => void }> = ({
  onOpenBudgetModal,
}) => {
  const { categorySpendingList, summaryStats } = useBudget();

  // Active categories that have actual expenses
  const activeSpendCategories = categorySpendingList.filter((item) => item.spent > 0);

  return (
    <div className="space-y-4">
      {/* High-emphasis yellow banner card per DESIGN.md: card-feature-yellow-bold */}
      <Card variant="yellow-bold" className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded bg-charcoal text-card-tint-yellow-bold">
              <PieChart className="w-4 h-4" />
            </span>
            <h3 className="text-lg font-semibold text-charcoal">
              Monthly Budget Guardrails
            </h3>
          </div>
          <button
            type="button"
            onClick={onOpenBudgetModal}
            className="text-xs font-semibold text-charcoal hover:underline flex items-center gap-1 cursor-pointer"
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Manage Limits</span>
          </button>
        </div>

        <p className="text-xs text-charcoal/80 leading-relaxed">
          You have utilized <strong>{summaryStats.budgetUtilization}%</strong> of your
          overall <strong>${summaryStats.totalBudgetLimit.toLocaleString()}</strong> monthly budget cap.
        </p>

        {/* Global Progress Bar */}
        <div className="space-y-1.5">
          <div className="w-full h-2.5 bg-black/10 rounded-full overflow-hidden p-0.5">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${summaryStats.budgetUtilization}%`,
                backgroundColor: summaryStats.budgetUtilization > 90 ? '#e03131' : '#37352f',
              }}
            />
          </div>
          <div className="flex justify-between text-[11px] font-mono font-medium text-charcoal/80">
            <span>Spent: ${summaryStats.totalExpenses.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
            <span>Limit: ${summaryStats.totalBudgetLimit.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
          </div>
        </div>
      </Card>

      {/* Category breakdown item cards */}
      <Card variant="base" className="space-y-4 p-5">
        <div className="flex items-center justify-between border-b border-hairline pb-3">
          <h4 className="text-[14px] font-semibold text-charcoal">
            Category Allocations
          </h4>
          <span className="text-xs text-steel">
            {activeSpendCategories.length} active categories
          </span>
        </div>

        <div className="space-y-3.5">
          {categorySpendingList.map((item) => {
            const isOverBudget = item.spent > item.limit;
            const isNearLimit = item.percentage >= 80 && !isOverBudget;

            return (
              <div key={item.category} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-charcoal">{item.category}</span>
                    {isOverBudget && (
                      <Badge variant="orange" className="text-[10px] py-0 px-1.5">
                        <AlertTriangle className="w-2.5 h-2.5" /> Exceeded
                      </Badge>
                    )}
                    {isNearLimit && (
                      <Badge variant="tag-orange" className="text-[10px] py-0 px-1.5">
                        Near Cap
                      </Badge>
                    )}
                  </div>
                  <div className="font-mono text-charcoal font-medium">
                    <span className={isOverBudget ? 'text-semantic-error font-semibold' : ''}>
                      ${item.spent.toFixed(0)}
                    </span>
                    <span className="text-steel font-normal"> / ${item.limit}</span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="w-full h-2 bg-surface rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-300"
                    style={{
                      width: `${Math.min(100, item.percentage)}%`,
                      backgroundColor: item.color,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
};
