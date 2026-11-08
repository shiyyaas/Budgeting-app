import React, { useState } from 'react';
import { useBudget } from '../../context/BudgetContext';
import { Button } from '../common/Button';
import { TextInput } from '../common/Input';
import { Badge } from '../common/Badge';
import type {
  TransactionType,
  ExpenseCategory,
  IncomeCategory,
  Category
} from '../../types/budget';
import { PlusCircle, CheckCircle2, DollarSign, Calendar, Tag, FileText } from 'lucide-react';

const EXPENSE_CATEGORIES: ExpenseCategory[] = [
  'Housing',
  'Food & Dining',
  'Transportation',
  'Utilities',
  'Entertainment',
  'Healthcare',
  'Shopping',
  'Subscriptions',
  'Other',
];

const INCOME_CATEGORIES: IncomeCategory[] = [
  'Salary',
  'Freelance',
  'Investments',
  'Side Hustle',
  'Gifts',
  'Other Income',
];

interface TransactionFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

export const TransactionForm: React.FC<TransactionFormProps> = ({
  onSuccess,
  onCancel,
}) => {
  const { addTransaction } = useBudget();

  const [type, setType] = useState<TransactionType>('expense');
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState<Category>(EXPENSE_CATEGORIES[0]);
  const [date, setDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [notes, setNotes] = useState('');
  const [isRecurring, setIsRecurring] = useState(false);

  // Field touch state for real-time validation
  const [touched, setTouched] = useState<{
    title: boolean;
    amount: boolean;
    date: boolean;
  }>({
    title: false,
    amount: false,
    date: false,
  });

  const [submitted, setSubmitted] = useState(false);

  // Real-time validations
  const titleError = touched.title && !title.trim()
    ? 'Description/Title is required.'
    : title.length > 80
    ? 'Title must be 80 characters or fewer.'
    : '';

  const parsedAmount = parseFloat(amount);
  const amountError = touched.amount && (!amount || isNaN(parsedAmount) || parsedAmount <= 0)
    ? 'Please enter a valid amount greater than $0.00.'
    : '';

  const dateError = touched.date && !date
    ? 'Transaction date is required.'
    : '';

  const isFormValid =
    title.trim().length > 0 &&
    title.length <= 80 &&
    !isNaN(parsedAmount) &&
    parsedAmount > 0 &&
    date.length > 0;

  const handleTypeChange = (newType: TransactionType) => {
    setType(newType);
    setCategory(newType === 'expense' ? EXPENSE_CATEGORIES[0] : INCOME_CATEGORIES[0]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ title: true, amount: true, date: true });

    if (!isFormValid) {
      return;
    }

    addTransaction({
      title: title.trim(),
      amount: parsedAmount,
      type,
      category,
      date,
      notes: notes.trim() || undefined,
      isRecurring,
    });

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setTitle('');
      setAmount('');
      setNotes('');
      setIsRecurring(false);
      setTouched({ title: false, amount: false, date: false });
      if (onSuccess) onSuccess();
    }, 400);
  };

  const categories = type === 'expense' ? EXPENSE_CATEGORIES : INCOME_CATEGORIES;

  return (
    <form onSubmit={handleSubmit} className="space-y-4" data-testid="transaction-form">
      {/* Type Selector: Expense vs Income */}
      <div className="flex p-1 bg-surface rounded-md border border-hairline">
        <button
          type="button"
          onClick={() => handleTypeChange('expense')}
          className={`flex-1 py-1.5 text-[13px] font-medium rounded-sm transition-all cursor-pointer ${
            type === 'expense'
              ? 'bg-canvas text-ink font-semibold shadow-sm border border-hairline-soft'
              : 'text-steel hover:text-ink'
          }`}
        >
          Expense (Outflow)
        </button>
        <button
          type="button"
          onClick={() => handleTypeChange('income')}
          className={`flex-1 py-1.5 text-[13px] font-medium rounded-sm transition-all cursor-pointer ${
            type === 'income'
              ? 'bg-canvas text-ink font-semibold shadow-sm border border-hairline-soft'
              : 'text-steel hover:text-ink'
          }`}
        >
          Income (Inflow)
        </button>
      </div>

      {/* Description / Title */}
      <TextInput
        label="Description / Payee"
        placeholder={type === 'expense' ? 'e.g. Trader Joe’s Groceries' : 'e.g. Monthly Client Retainer'}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onBlur={() => setTouched((prev) => ({ ...prev, title: true }))}
        error={titleError}
        leftIcon={<FileText className="w-4 h-4" />}
        required
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Amount */}
        <TextInput
          label="Amount ($ USD)"
          type="number"
          step="0.01"
          placeholder="0.00"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          onBlur={() => setTouched((prev) => ({ ...prev, amount: true }))}
          error={amountError}
          leftIcon={<DollarSign className="w-4 h-4" />}
          required
        />

        {/* Date */}
        <TextInput
          label="Date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          onBlur={() => setTouched((prev) => ({ ...prev, date: true }))}
          error={dateError}
          leftIcon={<Calendar className="w-4 h-4" />}
          required
        />
      </div>

      {/* Category selection */}
      <div className="flex flex-col gap-1.5">
        <label className="text-[13px] font-semibold text-charcoal flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <Tag className="w-3.5 h-3.5 text-steel" />
            <span>Category</span>
          </span>
          <Badge variant={type === 'income' ? 'tag-green' : 'tag-purple'}>
            {type === 'income' ? 'Income Stream' : 'Expense Category'}
          </Badge>
        </label>
        <div className="relative">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as Category)}
            className="w-full h-[44px] px-3.5 bg-canvas text-ink text-[14px] rounded-md border border-hairline-strong transition-all focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary appearance-none cursor-pointer"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-steel">
            <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
              <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Notes */}
      <div className="flex flex-col gap-1.5">
        <label className="text-[13px] font-semibold text-charcoal">
          Notes (Optional)
        </label>
        <textarea
          rows={2}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Add tags, receipts, or project notes..."
          className="w-full p-3 bg-canvas text-ink text-[14px] rounded-md border border-hairline-strong transition-all placeholder:text-muted focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary resize-none"
        />
      </div>

      {/* Recurring Checkbox */}
      <label className="flex items-center gap-2 cursor-pointer select-none text-[13px] text-charcoal py-1">
        <input
          type="checkbox"
          checked={isRecurring}
          onChange={(e) => setIsRecurring(e.target.checked)}
          className="w-4 h-4 rounded border-hairline-strong text-primary focus:ring-primary"
        />
        <span>Mark as recurring monthly transaction</span>
      </label>

      {/* Form Buttons */}
      <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-hairline">
        {onCancel && (
          <Button type="button" variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
        )}
        <Button
          type="submit"
          variant="primary"
          disabled={!isFormValid && (touched.title || touched.amount)}
          leftIcon={submitted ? <CheckCircle2 className="w-4 h-4" /> : <PlusCircle className="w-4 h-4" />}
        >
          {submitted ? 'Saved Transaction' : `Add ${type === 'income' ? 'Income' : 'Expense'}`}
        </Button>
      </div>
    </form>
  );
};
