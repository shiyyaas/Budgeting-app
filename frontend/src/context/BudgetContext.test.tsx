import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import type { ReactNode } from 'react';
import { BudgetProvider, useBudget } from './BudgetContext';

const wrapper = ({ children }: { children: ReactNode }) => (
  <BudgetProvider>{children}</BudgetProvider>
);

describe('BudgetContext', () => {
  it('calculates initial summary stats accurately', () => {
    const { result } = renderHook(() => useBudget(), { wrapper });

    expect(result.current.summaryStats.totalIncome).toBeGreaterThan(0);
    expect(result.current.summaryStats.totalExpenses).toBeGreaterThan(0);
    expect(result.current.summaryStats.netBalance).toBe(
      result.current.summaryStats.totalIncome - result.current.summaryStats.totalExpenses
    );
  });

  it('adds a new expense and updates stats dynamically', () => {
    const { result } = renderHook(() => useBudget(), { wrapper });

    const initialExpenses = result.current.summaryStats.totalExpenses;

    act(() => {
      result.current.addTransaction({
        title: 'New Bookshelf',
        amount: 200,
        type: 'expense',
        category: 'Housing',
        date: '2025-05-15',
        notes: 'Furniture test item',
        isRecurring: false,
      });
    });

    expect(result.current.summaryStats.totalExpenses).toBe(initialExpenses + 200);
    expect(result.current.transactions[0].title).toBe('New Bookshelf');
  });

  it('filters transactions by type and search query', () => {
    const { result } = renderHook(() => useBudget(), { wrapper });

    act(() => {
      result.current.setFilters((prev) => ({
        ...prev,
        type: 'income',
      }));
    });

    expect(result.current.filteredTransactions.every((tx) => tx.type === 'income')).toBe(true);

    act(() => {
      result.current.setFilters((prev) => ({
        ...prev,
        searchQuery: 'Freelance',
      }));
    });

    expect(result.current.filteredTransactions.length).toBeGreaterThan(0);
    expect(result.current.filteredTransactions[0].category).toBe('Freelance');
  });

  it('updates budget goal limit', () => {
    const { result } = renderHook(() => useBudget(), { wrapper });

    act(() => {
      result.current.updateBudgetGoal('Housing', 2000);
    });

    const housingGoal = result.current.budgetGoals.find((g) => g.category === 'Housing');
    expect(housingGoal?.monthlyLimit).toBe(2000);
  });
});
