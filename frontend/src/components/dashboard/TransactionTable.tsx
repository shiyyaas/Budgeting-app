import React from 'react';
import { useBudget } from '../../context/BudgetContext';
import { Badge } from '../common/Badge';
import { Card } from '../common/Card';
import { Trash2, Repeat, Receipt, Plus } from 'lucide-react';
import type { Transaction } from '../../types/budget';

interface TransactionTableProps {
  onOpenAdd: () => void;
}

export const TransactionTable: React.FC<TransactionTableProps> = ({ onOpenAdd }) => {
  const { filteredTransactions, deleteTransaction } = useBudget();

  if (filteredTransactions.length === 0) {
    return (
      <Card variant="base" className="text-center py-12 px-4 space-y-3">
        <div className="w-12 h-12 mx-auto rounded-full bg-surface flex items-center justify-center text-steel">
          <Receipt className="w-6 h-6" />
        </div>
        <h4 className="text-base font-semibold text-charcoal">No transactions matched your filters</h4>
        <p className="text-sm text-steel max-w-sm mx-auto">
          Try adjusting your search criteria or tab filters to find specific entries.
        </p>
        <button
          type="button"
          onClick={onOpenAdd}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-primary text-white text-xs font-semibold hover:bg-primary-pressed cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          Add First Entry
        </button>
      </Card>
    );
  }

  const getCategoryBadgeVariant = (tx: Transaction) => {
    if (tx.type === 'income') return 'tag-green';
    switch (tx.category) {
      case 'Housing':
      case 'Food & Dining':
        return 'tag-orange';
      case 'Subscriptions':
      case 'Entertainment':
        return 'tag-purple';
      default:
        return 'tag-green';
    }
  };

  return (
    // comparison-table token: bg canvas, rounded.md, border 1px solid hairline
    <div className="w-full overflow-hidden rounded-md border border-hairline bg-canvas shadow-xs">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-[14px]">
          <thead className="bg-surface text-steel text-[12px] font-semibold uppercase tracking-wider border-b border-hairline select-none">
            <tr>
              <th className="py-3 px-4">Transaction / Payee</th>
              <th className="py-3 px-3">Category</th>
              <th className="py-3 px-3 hidden sm:table-cell">Date</th>
              <th className="py-3 px-4 text-right">Amount</th>
              <th className="py-3 px-3 text-center w-12">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-hairline-soft">
            {filteredTransactions.map((tx) => {
              const isIncome = tx.type === 'income';

              return (
                // comparison-row token: bg canvas, text ink, padding md lg, border 1px solid hairline-soft
                <tr
                  key={tx.id}
                  className="hover:bg-surface/50 transition-colors group"
                >
                  {/* Title & Notes */}
                  <td className="py-3 px-4">
                    <div className="flex flex-col">
                      <div className="flex items-center gap-1.5">
                        <span className="font-medium text-ink">{tx.title}</span>
                        {tx.isRecurring && (
                          <span
                            title="Monthly recurring transaction"
                            className="inline-flex text-primary"
                          >
                            <Repeat className="w-3.5 h-3.5" />
                          </span>
                        )}
                      </div>
                      {tx.notes && (
                        <span className="text-xs text-steel line-clamp-1 mt-0.5">
                          {tx.notes}
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Category Badge */}
                  <td className="py-3 px-3 whitespace-nowrap">
                    <Badge variant={getCategoryBadgeVariant(tx)}>
                      {tx.category}
                    </Badge>
                  </td>

                  {/* Date */}
                  <td className="py-3 px-3 text-steel text-xs font-mono hidden sm:table-cell whitespace-nowrap">
                    {tx.date}
                  </td>

                  {/* Amount */}
                  <td className="py-3 px-4 text-right font-mono font-semibold whitespace-nowrap">
                    <span className={isIncome ? 'text-brand-green' : 'text-charcoal'}>
                      {isIncome ? '+' : '-'}${tx.amount.toFixed(2)}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="py-3 px-3 text-center">
                    <button
                      type="button"
                      onClick={() => deleteTransaction(tx.id)}
                      className="p-1.5 text-stone hover:text-semantic-error rounded hover:bg-surface transition-colors cursor-pointer"
                      title="Delete record"
                      aria-label={`Delete ${tx.title}`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
