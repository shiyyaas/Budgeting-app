import React, { createContext, useContext, useState, useEffect, useMemo, type ReactNode } from 'react';
import type {
  Transaction,
  BudgetGoal,
  FilterState,
  SummaryStats,
  CategorySpending,
  ExpenseCategory,
  BudgetCalculatorConfig,
  BudgetCalculatorMetrics
} from '../types/budget';

interface BudgetContextType {
  transactions: Transaction[];
  filteredTransactions: Transaction[];
  budgetGoals: BudgetGoal[];
  calculatorConfig: BudgetCalculatorConfig;
  setCalculatorConfig: React.Dispatch<React.SetStateAction<BudgetCalculatorConfig>>;
  updateCalculatorConfig: (updates: Partial<BudgetCalculatorConfig>) => void;
  calculatorMetrics: BudgetCalculatorMetrics;
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  updateTransaction: (id: string, transaction: Partial<Omit<Transaction, 'id'>>) => void;
  deleteTransaction: (id: string) => void;
  updateBudgetGoal: (category: ExpenseCategory, monthlyLimit: number) => void;
  summaryStats: SummaryStats;
  categorySpendingList: CategorySpending[];
  resetToDefaults: () => void;
}

const DEFAULT_BUDGET_GOALS: BudgetGoal[] = [
  { category: 'Housing', monthlyLimit: 1600 },
  { category: 'Food & Dining', monthlyLimit: 600 },
  { category: 'Transportation', monthlyLimit: 250 },
  { category: 'Utilities', monthlyLimit: 200 },
  { category: 'Entertainment', monthlyLimit: 200 },
  { category: 'Healthcare', monthlyLimit: 150 },
  { category: 'Shopping', monthlyLimit: 300 },
  { category: 'Subscriptions', monthlyLimit: 100 },
  { category: 'Other', monthlyLimit: 200 },
];

const INITIAL_TRANSACTIONS: Transaction[] = [
  {
    id: 'tx-1',
    title: 'Bi-Weekly Paycheck',
    amount: 3250.00,
    type: 'income',
    category: 'Salary',
    date: '2025-05-01',
    notes: 'Direct deposit primary employer',
    isRecurring: true,
  },
  {
    id: 'tx-2',
    title: 'Apartment Rent',
    amount: 1450.00,
    type: 'expense',
    category: 'Housing',
    date: '2025-05-02',
    notes: 'May rent payment',
    isRecurring: true,
  },
  {
    id: 'tx-3',
    title: 'UI Design Consulting',
    amount: 850.00,
    type: 'income',
    category: 'Freelance',
    date: '2025-05-04',
    notes: 'Fintech dashboard sprint deliverable',
    isRecurring: false,
  },
  {
    id: 'tx-4',
    title: 'Whole Foods Market',
    amount: 142.30,
    type: 'expense',
    category: 'Food & Dining',
    date: '2025-05-05',
    notes: 'Weekly organic groceries',
    isRecurring: false,
  },
  {
    id: 'tx-5',
    title: 'Metro Monthly Transit Pass',
    amount: 85.00,
    type: 'expense',
    category: 'Transportation',
    date: '2025-05-06',
    notes: 'Commute reload',
    isRecurring: true,
  },
  {
    id: 'tx-6',
    title: 'Electric & Gas Utility',
    amount: 114.75,
    type: 'expense',
    category: 'Utilities',
    date: '2025-05-08',
    notes: 'Monthly power statement',
    isRecurring: true,
  },
  {
    id: 'tx-7',
    title: 'Notion & Workspace Tools',
    amount: 48.00,
    type: 'expense',
    category: 'Subscriptions',
    date: '2025-05-10',
    notes: 'Productivity suite plus AI assistant tier',
    isRecurring: true,
  },
  {
    id: 'tx-8',
    title: 'Artisan Espresso & Bakery',
    amount: 18.50,
    type: 'expense',
    category: 'Food & Dining',
    date: '2025-05-11',
    notes: 'Team coffee break',
    isRecurring: false,
  },
];

const DEFAULT_CALCULATOR_CONFIG: BudgetCalculatorConfig = {
  incomeLimit: 4500,
  timeframe: 'monthly',
  savingsTargetRate: 20,
};

const STORAGE_KEYS = {
  TRANSACTIONS: 'notion_budget_transactions_v1',
  GOALS: 'notion_budget_goals_v1',
  CALCULATOR: 'notion_budget_calculator_v1',
};

const BudgetContext = createContext<BudgetContextType | undefined>(undefined);

export const BudgetProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.TRANSACTIONS);
      return stored ? JSON.parse(stored) : INITIAL_TRANSACTIONS;
    } catch {
      return INITIAL_TRANSACTIONS;
    }
  });

  const [budgetGoals, setBudgetGoals] = useState<BudgetGoal[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.GOALS);
      return stored ? JSON.parse(stored) : DEFAULT_BUDGET_GOALS;
    } catch {
      return DEFAULT_BUDGET_GOALS;
    }
  });

  const [calculatorConfig, setCalculatorConfig] = useState<BudgetCalculatorConfig>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.CALCULATOR);
      return stored ? JSON.parse(stored) : DEFAULT_CALCULATOR_CONFIG;
    } catch {
      return DEFAULT_CALCULATOR_CONFIG;
    }
  });

  const [filters, setFilters] = useState<FilterState>({
    type: 'all',
    searchQuery: '',
    category: '',
    sortBy: 'date-desc',
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(transactions));
    } catch (e) {
      console.error('Failed to save transactions to localStorage', e);
    }
  }, [transactions]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.GOALS, JSON.stringify(budgetGoals));
    } catch (e) {
      console.error('Failed to save budget goals to localStorage', e);
    }
  }, [budgetGoals]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CALCULATOR, JSON.stringify(calculatorConfig));
    } catch (e) {
      console.error('Failed to save calculator config to localStorage', e);
    }
  }, [calculatorConfig]);

  const updateCalculatorConfig = (updates: Partial<BudgetCalculatorConfig>) => {
    setCalculatorConfig((prev) => ({ ...prev, ...updates }));
  };

  const addTransaction = (newTxData: Omit<Transaction, 'id'>) => {
    const newTx: Transaction = {
      ...newTxData,
      id: `tx-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    };
    setTransactions((prev) => [newTx, ...prev]);
  };

  const updateTransaction = (id: string, updatedFields: Partial<Omit<Transaction, 'id'>>) => {
    setTransactions((prev) =>
      prev.map((tx) => (tx.id === id ? { ...tx, ...updatedFields } : tx))
    );
  };

  const deleteTransaction = (id: string) => {
    setTransactions((prev) => prev.filter((tx) => tx.id !== id));
  };

  const updateBudgetGoal = (category: ExpenseCategory, monthlyLimit: number) => {
    setBudgetGoals((prev) => {
      const exists = prev.some((g) => g.category === category);
      if (exists) {
        return prev.map((g) => (g.category === category ? { ...g, monthlyLimit } : g));
      }
      return [...prev, { category, monthlyLimit }];
    });
  };

  const resetToDefaults = () => {
    setTransactions(INITIAL_TRANSACTIONS);
    setBudgetGoals(DEFAULT_BUDGET_GOALS);
    setCalculatorConfig(DEFAULT_CALCULATOR_CONFIG);
    setFilters({
      type: 'all',
      searchQuery: '',
      category: '',
      sortBy: 'date-desc',
    });
  };

  const calculatorMetrics = useMemo<BudgetCalculatorMetrics>(() => {
    const { incomeLimit, timeframe, savingsTargetRate } = calculatorConfig;
    const currentExpenses = transactions.reduce(
      (sum, tx) => (tx.type === 'expense' ? sum + tx.amount : sum),
      0
    );

    // Normalize monthly vs weekly calculations
    const normalizedMonthlyIncome = timeframe === 'weekly' ? incomeLimit * 4.333 : incomeLimit;
    const targetSavingsAmount = (normalizedMonthlyIncome * (savingsTargetRate / 100));
    const maxSpendingAllowance = Math.max(0, normalizedMonthlyIncome - targetSavingsAmount);
    const dailySpendingAllowance = maxSpendingAllowance / 30;
    const weeklySpendingAllowance = maxSpendingAllowance / 4.333;

    const remainingSafeSpend = maxSpendingAllowance - currentExpenses;
    const isOverSpendingAllowance = remainingSafeSpend < 0;
    const currentIncome = transactions.reduce(
      (sum, tx) => (tx.type === 'income' ? sum + tx.amount : sum),
      0
    );
    const actualSavingsSurplus = currentIncome - currentExpenses - targetSavingsAmount;

    return {
      incomeLimit,
      timeframe,
      savingsTargetRate,
      targetSavingsAmount,
      maxSpendingAllowance,
      dailySpendingAllowance,
      weeklySpendingAllowance,
      currentExpenses,
      remainingSafeSpend,
      isOverSpendingAllowance,
      actualSavingsSurplus,
    };
  }, [calculatorConfig, transactions]);

  const summaryStats = useMemo<SummaryStats>(() => {
    let totalIncome = 0;
    let totalExpenses = 0;

    transactions.forEach((tx) => {
      if (tx.type === 'income') {
        totalIncome += tx.amount;
      } else {
        totalExpenses += tx.amount;
      }
    });

    const netBalance = totalIncome - totalExpenses;
    const savingsRate = totalIncome > 0 ? Math.max(0, Math.round(((totalIncome - totalExpenses) / totalIncome) * 100)) : 0;
    const totalBudgetLimit = budgetGoals.reduce((sum, g) => sum + g.monthlyLimit, 0);
    const budgetUtilization = totalBudgetLimit > 0 ? Math.min(100, Math.round((totalExpenses / totalBudgetLimit) * 100)) : 0;

    return {
      totalIncome,
      totalExpenses,
      netBalance,
      savingsRate,
      totalBudgetLimit,
      budgetUtilization,
    };
  }, [transactions, budgetGoals]);

  const categorySpendingList = useMemo<CategorySpending[]>(() => {
    const map: Record<string, number> = {};

    transactions.forEach((tx) => {
      if (tx.type === 'expense') {
        map[tx.category] = (map[tx.category] || 0) + tx.amount;
      }
    });

    const badgeTypes: Array<'purple' | 'orange' | 'green' | 'pink'> = ['purple', 'orange', 'green', 'pink'];

    return budgetGoals.map((goal, index) => {
      const spent = map[goal.category] || 0;
      const percentage = goal.monthlyLimit > 0 ? Math.round((spent / goal.monthlyLimit) * 100) : 0;
      return {
        category: goal.category,
        spent,
        limit: goal.monthlyLimit,
        percentage,
        color: percentage >= 100 ? '#e03131' : percentage >= 80 ? '#dd5b00' : '#5645d4',
        badgeType: badgeTypes[index % badgeTypes.length],
      };
    });
  }, [transactions, budgetGoals]);

  const filteredTransactions = useMemo(() => {
    return transactions
      .filter((tx) => {
        if (filters.type === 'income' && tx.type !== 'income') return false;
        if (filters.type === 'expense' && tx.type !== 'expense') return false;
        if (filters.type === 'recurring' && !tx.isRecurring) return false;

        if (filters.category && tx.category !== filters.category) return false;

        if (filters.searchQuery.trim()) {
          const q = filters.searchQuery.toLowerCase();
          const matchTitle = tx.title.toLowerCase().includes(q);
          const matchCategory = tx.category.toLowerCase().includes(q);
          const matchNotes = tx.notes?.toLowerCase().includes(q) || false;
          const matchAmount = tx.amount.toString().includes(q);
          if (!matchTitle && !matchCategory && !matchNotes && !matchAmount) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (filters.sortBy === 'date-desc') return new Date(b.date).getTime() - new Date(a.date).getTime();
        if (filters.sortBy === 'date-asc') return new Date(a.date).getTime() - new Date(b.date).getTime();
        if (filters.sortBy === 'amount-desc') return b.amount - a.amount;
        if (filters.sortBy === 'amount-asc') return a.amount - b.amount;
        return 0;
      });
  }, [transactions, filters]);

  const value = {
    transactions,
    filteredTransactions,
    budgetGoals,
    calculatorConfig,
    setCalculatorConfig,
    updateCalculatorConfig,
    calculatorMetrics,
    filters,
    setFilters,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    updateBudgetGoal,
    summaryStats,
    categorySpendingList,
    resetToDefaults,
  };

  return <BudgetContext.Provider value={value}>{children}</BudgetContext.Provider>;
};

export const useBudget = (): BudgetContextType => {
  const context = useContext(BudgetContext);
  if (!context) {
    throw new Error('useBudget must be used within a BudgetProvider');
  }
  return context;
};
