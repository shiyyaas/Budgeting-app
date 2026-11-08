import React from 'react';
import { Card } from '../common/Card';
import { Sparkles, ArrowRight } from 'lucide-react';
import { useBudget } from '../../context/BudgetContext';

export const AssistantBanner: React.FC = () => {
  const { summaryStats } = useBudget();

  const getTip = () => {
    if (summaryStats.savingsRate >= 30) {
      return "Exceptional financial runway: You are saving over 30% of total revenue. Consider directing surplus funds toward short-term treasuries or emergency savings reserves.";
    }
    if (summaryStats.budgetUtilization > 90) {
      return "Budget utilization exceeds 90% of planned monthly limits. Review your discretionary spending categories (Dining, Subscriptions) to safeguard liquidity.";
    }
    return "Consolidated workspace insight: Recurring subscriptions represent steady overhead. Periodic vendor reviews can recover an average of 14% on SaaS and utilities.";
  };

  return (
    // Card using card-feature styling with pastel peach/rose tint
    <Card variant="peach" className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-md bg-white/80 flex items-center justify-center text-brand-orange-deep shrink-0 shadow-xs">
          <Sparkles className="w-4 h-4" />
        </div>
        <div className="space-y-1">
          <span className="text-[12px] font-semibold uppercase tracking-wider text-brand-orange-deep">
            Notion AI Financial Assistant
          </span>
          <p className="text-sm text-charcoal leading-relaxed font-normal">
            {getTip()}
          </p>
        </div>
      </div>
      <a
        href="#comparison"
        className="inline-flex items-center gap-1 text-xs font-semibold text-charcoal hover:underline shrink-0 bg-white/50 px-3 py-1.5 rounded-md border border-brand-orange/20"
      >
        <span>View Cash Breakdown</span>
        <ArrowRight className="w-3.5 h-3.5" />
      </a>
    </Card>
  );
};
