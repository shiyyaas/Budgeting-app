export type TransactionType = 'income' | 'expense';

export type ExpenseCategory =
  | 'Housing'
  | 'Food & Dining'
  | 'Transportation'
  | 'Utilities'
  | 'Entertainment'
  | 'Healthcare'
  | 'Shopping'
  | 'Subscriptions'
  | 'Other';

export type IncomeCategory =
  | 'Salary'
  | 'Freelance'
  | 'Investments'
  | 'Side Hustle'
  | 'Gifts'
  | 'Other Income';

export type Category = ExpenseCategory | IncomeCategory;

export interface Transaction {
  id: string;
  title: string;
  amount: number;
  type: TransactionType;
  category: Category;
  date: string; // ISO date string YYYY-MM-DD
  notes?: string;
  isRecurring?: boolean;
}

export interface BudgetGoal {
  category: ExpenseCategory;
  monthlyLimit: number;
}

export interface FilterState {
  type: 'all' | 'income' | 'expense' | 'recurring';
  searchQuery: string;
  category: string;
  sortBy: 'date-desc' | 'date-asc' | 'amount-desc' | 'amount-asc';
}

export type BudgetTimeframe = 'monthly' | 'weekly';

export interface BudgetCalculatorConfig {
  incomeLimit: number;
  timeframe: BudgetTimeframe;
  savingsTargetRate: number; // percentage 0-100
}

export interface BudgetCalculatorMetrics {
  incomeLimit: number;
  timeframe: BudgetTimeframe;
  savingsTargetRate: number;
  targetSavingsAmount: number;
  maxSpendingAllowance: number;
  dailySpendingAllowance: number;
  weeklySpendingAllowance: number;
  currentExpenses: number;
  remainingSafeSpend: number;
  isOverSpendingAllowance: boolean;
  actualSavingsSurplus: number;
}

export interface SummaryStats {
  totalIncome: number;
  totalExpenses: number;
  netBalance: number;
  savingsRate: number; // percentage 0-100
  totalBudgetLimit: number;
  budgetUtilization: number; // percentage
}

export interface CategorySpending {
  category: ExpenseCategory;
  spent: number;
  limit: number;
  percentage: number;
  color: string;
  badgeType: 'purple' | 'orange' | 'green' | 'pink';
}
