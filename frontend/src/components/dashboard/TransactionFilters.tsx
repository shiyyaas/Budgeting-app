import React from 'react';
import { useBudget } from '../../context/BudgetContext';
import { SearchPill } from '../common/Input';
import { PillTabs } from '../common/Tabs';
import { ArrowUpDown } from 'lucide-react';

export const TransactionFilters: React.FC = () => {
  const { filters, setFilters, transactions } = useBudget();

  const tabItems = [
    { id: 'all', label: 'All Items', count: transactions.length },
    {
      id: 'expense',
      label: 'Expenses',
      count: transactions.filter((t) => t.type === 'expense').length,
    },
    {
      id: 'income',
      label: 'Income',
      count: transactions.filter((t) => t.type === 'income').length,
    },
    {
      id: 'recurring',
      label: 'Recurring',
      count: transactions.filter((t) => t.isRecurring).length,
    },
  ];

  return (
    <div className="flex flex-col gap-3 py-3 border-b border-hairline">
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Search Input using search-pill token */}
        <div className="w-full sm:max-w-md">
          <SearchPill
            placeholder="Search transactions by title, category, or notes..."
            value={filters.searchQuery}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, searchQuery: e.target.value }))
            }
          />
        </div>

        {/* Sorting Dropdown */}
        <div className="flex items-center gap-2 shrink-0">
          <ArrowUpDown className="w-4 h-4 text-steel" />
          <select
            value={filters.sortBy}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                sortBy: e.target.value as any,
              }))
            }
            className="h-[44px] px-3 bg-surface text-ink text-[13px] rounded-md border border-hairline font-medium focus:outline-none focus:border-primary cursor-pointer"
          >
            <option value="date-desc">Newest First</option>
            <option value="date-asc">Oldest First</option>
            <option value="amount-desc">Highest Amount</option>
            <option value="amount-asc">Lowest Amount</option>
          </select>
        </div>
      </div>

      {/* Pill tabs row per DESIGN.md */}
      <div className="flex items-center justify-between overflow-x-auto pt-1">
        <PillTabs
          items={tabItems}
          activeId={filters.type}
          onChange={(id) =>
            setFilters((prev) => ({
              ...prev,
              type: id as any,
            }))
          }
        />

        {filters.searchQuery && (
          <button
            type="button"
            onClick={() => setFilters((prev) => ({ ...prev, searchQuery: '' }))}
            className="text-xs text-primary hover:underline font-semibold shrink-0 cursor-pointer"
          >
            Clear Search
          </button>
        )}
      </div>
    </div>
  );
};
