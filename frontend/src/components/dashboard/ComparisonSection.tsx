import React from 'react';
import { useBudget } from '../../context/BudgetContext';
import { Badge } from '../common/Badge';

export const ComparisonSection: React.FC = () => {
  const { categorySpendingList, summaryStats } = useBudget();

  return (
    <div id="comparison" className="space-y-4 pt-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h3 className="text-xl font-semibold text-ink">
            Category Budget vs Actuals Analysis
          </h3>
          <p className="text-sm text-steel">
            Detailed breakdown comparing actual outflows against target limits.
          </p>
        </div>
        <Badge variant="popular">
          Active Month
        </Badge>
      </div>

      <div className="w-full overflow-hidden rounded-md border border-hairline bg-canvas">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-surface text-steel text-xs font-semibold uppercase tracking-wider border-b border-hairline">
              <tr>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4 text-right">Budget Limit</th>
                <th className="py-3 px-4 text-right">Actual Spent</th>
                <th className="py-3 px-4 text-right">Remaining Variance</th>
                <th className="py-3 px-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hairline-soft">
              {categorySpendingList.map((item) => {
                const variance = item.limit - item.spent;
                const isUnder = variance >= 0;

                return (
                  <tr key={item.category} className="hover:bg-surface/40 transition-colors">
                    <td className="py-3 px-4 font-medium text-ink">
                      {item.category}
                    </td>
                    <td className="py-3 px-4 text-right font-mono text-steel">
                      ${item.limit.toLocaleString()}
                    </td>
                    <td className="py-3 px-4 text-right font-mono font-medium text-charcoal">
                      ${item.spent.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </td>
                    <td
                      className={`py-3 px-4 text-right font-mono font-semibold ${
                        isUnder ? 'text-brand-green' : 'text-semantic-error'
                      }`}
                    >
                      {isUnder ? '+' : '-'}${Math.abs(variance).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <Badge variant={isUnder ? 'tag-green' : 'orange'}>
                        {isUnder ? 'Within Budget' : 'Over Limit'}
                      </Badge>
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot className="bg-surface/70 font-semibold text-charcoal border-t border-hairline">
              <tr>
                <td className="py-3 px-4">Total Aggregate</td>
                <td className="py-3 px-4 text-right font-mono">
                  ${summaryStats.totalBudgetLimit.toLocaleString()}
                </td>
                <td className="py-3 px-4 text-right font-mono">
                  ${summaryStats.totalExpenses.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </td>
                <td
                  className={`py-3 px-4 text-right font-mono ${
                    summaryStats.totalBudgetLimit >= summaryStats.totalExpenses
                      ? 'text-brand-green'
                      : 'text-semantic-error'
                  }`}
                >
                  ${(summaryStats.totalBudgetLimit - summaryStats.totalExpenses).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </td>
                <td className="py-3 px-4 text-center">
                  <Badge variant="tag-purple">
                    {summaryStats.budgetUtilization}% Cap
                  </Badge>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
};
