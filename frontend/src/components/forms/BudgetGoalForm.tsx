import React, { useState } from 'react';
import { useBudget } from '../../context/BudgetContext';
import { Button } from '../common/Button';
import { TextInput } from '../common/Input';
import type { ExpenseCategory } from '../../types/budget';
import { DollarSign, Check, SlidersHorizontal } from 'lucide-react';

export const BudgetGoalForm: React.FC<{ onClose?: () => void }> = ({ onClose }) => {
  const { budgetGoals, updateBudgetGoal } = useBudget();
  const [selectedCategory, setSelectedCategory] = useState<ExpenseCategory>(budgetGoals[0].category);
  const [limit, setLimit] = useState<string>(() => {
    return budgetGoals[0]?.monthlyLimit.toString() || '500';
  });
  const [success, setSuccess] = useState(false);

  const handleCategoryChange = (cat: ExpenseCategory) => {
    setSelectedCategory(cat);
    const existing = budgetGoals.find((g) => g.category === cat);
    if (existing) {
      setLimit(existing.monthlyLimit.toString());
    }
  };

  const numLimit = parseFloat(limit);
  const isValid = !isNaN(numLimit) && numLimit >= 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;

    updateBudgetGoal(selectedCategory, numLimit);
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      if (onClose) onClose();
    }, 500);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex items-center gap-2 pb-2 border-b border-hairline">
        <SlidersHorizontal className="w-4 h-4 text-primary" />
        <h4 className="text-[15px] font-semibold text-charcoal">Update Category Budget Target</h4>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-[13px] font-semibold text-charcoal">Category</label>
        <select
          value={selectedCategory}
          onChange={(e) => handleCategoryChange(e.target.value as ExpenseCategory)}
          className="w-full h-[44px] px-3.5 bg-canvas text-ink text-[14px] rounded-md border border-hairline-strong focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary appearance-none cursor-pointer"
        >
          {budgetGoals.map((g) => (
            <option key={g.category} value={g.category}>
              {g.category} (Current: ${g.monthlyLimit})
            </option>
          ))}
        </select>
      </div>

      <TextInput
        label="Monthly Target Limit ($ USD)"
        type="number"
        min="0"
        step="10"
        value={limit}
        onChange={(e) => setLimit(e.target.value)}
        error={!isValid ? 'Limit must be a valid positive amount.' : undefined}
        leftIcon={<DollarSign className="w-4 h-4" />}
      />

      <div className="flex items-center justify-end gap-2 pt-2 border-t border-hairline">
        {onClose && (
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
        )}
        <Button
          type="submit"
          variant="primary"
          disabled={!isValid}
          leftIcon={success ? <Check className="w-4 h-4" /> : undefined}
        >
          {success ? 'Limit Updated' : 'Save Monthly Budget'}
        </Button>
      </div>
    </form>
  );
};
