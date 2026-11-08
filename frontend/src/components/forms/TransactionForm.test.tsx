import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import type { ReactNode } from 'react';
import { TransactionForm } from './TransactionForm';
import { BudgetProvider } from '../../context/BudgetContext';

const wrapper = ({ children }: { children: ReactNode }) => (
  <BudgetProvider>{children}</BudgetProvider>
);

describe('TransactionForm', () => {
  it('renders form inputs correctly', () => {
    render(<TransactionForm />, { wrapper });

    expect(screen.getByLabelText(/Description \/ Payee/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Amount \(\$ USD\)/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Date/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Add Expense/i })).toBeInTheDocument();
  });

  it('validates required fields on blur', async () => {
    render(<TransactionForm />, { wrapper });

    const titleInput = screen.getByLabelText(/Description \/ Payee/i);
    fireEvent.focus(titleInput);
    fireEvent.blur(titleInput);

    await waitFor(() => {
      expect(screen.getByText(/Description\/Title is required/i)).toBeInTheDocument();
    });

    const amountInput = screen.getByLabelText(/Amount \(\$ USD\)/i);
    fireEvent.focus(amountInput);
    fireEvent.blur(amountInput);

    await waitFor(() => {
      expect(screen.getByText(/Please enter a valid amount greater than \$0.00/i)).toBeInTheDocument();
    });
  });

  it('successfully submits valid transactions', async () => {
    const onSuccess = vi.fn();
    render(<TransactionForm onSuccess={onSuccess} />, { wrapper });

    fireEvent.change(screen.getByLabelText(/Description \/ Payee/i), {
      target: { value: 'Organic Grocery Delivery' },
    });
    fireEvent.change(screen.getByLabelText(/Amount \(\$ USD\)/i), {
      target: { value: '95.50' },
    });

    const submitBtn = screen.getByRole('button', { name: /Add Expense/i });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(onSuccess).toHaveBeenCalled();
    }, { timeout: 1000 });
  });
});
