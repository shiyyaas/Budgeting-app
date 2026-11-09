import React from 'react';
import { Card } from '../common/Card';
import { TransactionForm } from './TransactionForm';
import { PlusCircle, Zap } from 'lucide-react';

export const DirectExpenditureCard: React.FC = () => {
  return (
    <Card variant="base" className="space-y-4 p-5 md:p-6 shadow-elevation1">
      <div className="flex items-center justify-between pb-3 border-b border-hairline">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-md bg-card-tint-lavender text-brand-purple-800 flex items-center justify-center">
            <Zap className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-[15px] font-semibold text-ink">
              Quick Transaction Logging
            </h3>
            <p className="text-xs text-steel">
              Add and categorize expenditures or income immediately.
            </p>
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-1 text-[11px] font-medium text-steel">
          <PlusCircle className="w-3.5 h-3.5 text-primary" />
          <span>Real-time Ledger Sync</span>
        </div>
      </div>

      <TransactionForm />
    </Card>
  );
};
