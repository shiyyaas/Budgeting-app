import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import type { ReactNode } from 'react';
import { BudgetCalculator } from './BudgetCalculator';
import { BudgetProvider } from '../../context/BudgetContext';

const wrapper = ({ children }: { children: ReactNode }) => (
  <BudgetProvider>{children}</BudgetProvider>
);

describe('BudgetCalculator', () => {
  it('renders budget calculator with income limit and savings target', () => {
    render(<BudgetCalculator />, { wrapper });

    expect(
      screen.getByText(/Budget Calculator & Runway Forecaster/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/Income Timeframe/i)).toBeInTheDocument();
    expect(screen.getByText(/Monthly Limit/i)).toBeInTheDocument();
    expect(screen.getByText(/Weekly Limit/i)).toBeInTheDocument();
    expect(screen.getByText(/Target Savings Rate/i)).toBeInTheDocument();
    expect(screen.getByText(/Spending Ceiling/i)).toBeInTheDocument();
  });

  it('allows toggling timeframe and updating baseline limits', () => {
    render(<BudgetCalculator />, { wrapper });

    const weeklyBtn = screen.getByRole('button', { name: /Weekly Limit/i });
    fireEvent.click(weeklyBtn);

    const input = screen.getByLabelText(/Weekly Income Baseline/i);
    expect(input).toBeInTheDocument();

    fireEvent.change(input, { target: { value: '1200' } });
    expect(input).toHaveValue(1200);
  });
});
