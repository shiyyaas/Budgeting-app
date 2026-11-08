import React from 'react';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { useBudget } from '../../context/BudgetContext';
import {
  ArrowUpRight,
  ArrowDownRight,
  TrendingUp,
  DollarSign,
  CheckCircle2,
  Layers,
  CalendarDays
} from 'lucide-react';

export const WorkspaceMockup: React.FC<{ onOpenAdd: () => void }> = ({ onOpenAdd }) => {
  const { summaryStats, categorySpendingList, transactions } = useBudget();

  const recentTransactions = transactions.slice(0, 4);

  return (
    // workspace-mockup-card token: bg canvas, rounded.lg, border 1px solid hairline, shadow elevation3
    <Card variant="mockup" className="w-full text-left">
      {/* Mockup Notion Workspace Top Bar */}
      <div className="bg-surface px-4 py-3 border-b border-hairline flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2">
          {/* Mac style window dots */}
          <div className="flex items-center gap-1.5 mr-2">
            <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
            <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
            <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
          </div>
          <div className="flex items-center gap-2 text-charcoal font-semibold text-[13px]">
            <span className="w-5 h-5 rounded bg-card-tint-peach text-brand-orange-deep flex items-center justify-center text-xs font-bold">
              💰
            </span>
            <span>Ramp HQ Finance & Budget Operating Workspace</span>
          </div>
          <Badge variant="tag-purple">Live View</Badge>
        </div>

        <div className="flex items-center gap-2 text-xs text-steel">
          <CalendarDays className="w-3.5 h-3.5" />
          <span>Updated Real-Time</span>
        </div>
      </div>

      {/* Main Mockup Workspace Body */}
      <div className="p-4 sm:p-6 bg-canvas space-y-6">
        {/* KPI Row inside Mockup */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="p-3.5 rounded-lg bg-surface-soft border border-hairline">
            <span className="text-[11px] font-semibold uppercase text-steel tracking-wide">Net Balance</span>
            <div className="text-xl sm:text-2xl font-semibold text-ink mt-0.5">
              ${summaryStats.netBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <span className="text-[11px] text-brand-green font-medium flex items-center gap-0.5 mt-1">
              <TrendingUp className="w-3 h-3" /> Healthy Margin
            </span>
          </div>

          <div className="p-3.5 rounded-lg bg-surface-soft border border-hairline">
            <span className="text-[11px] font-semibold uppercase text-steel tracking-wide">Total Income</span>
            <div className="text-xl sm:text-2xl font-semibold text-brand-green mt-0.5">
              +${summaryStats.totalIncome.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </div>
            <span className="text-[11px] text-steel font-medium flex items-center gap-0.5 mt-1">
              <ArrowUpRight className="w-3 h-3 text-brand-green" /> Total Inflow
            </span>
          </div>

          <div className="p-3.5 rounded-lg bg-surface-soft border border-hairline">
            <span className="text-[11px] font-semibold uppercase text-steel tracking-wide">Total Spent</span>
            <div className="text-xl sm:text-2xl font-semibold text-charcoal mt-0.5">
              -${summaryStats.totalExpenses.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </div>
            <span className="text-[11px] text-steel font-medium flex items-center gap-0.5 mt-1">
              <ArrowDownRight className="w-3 h-3 text-semantic-warning" /> Total Outflow
            </span>
          </div>

          <div className="p-3.5 rounded-lg bg-surface-soft border border-hairline">
            <span className="text-[11px] font-semibold uppercase text-steel tracking-wide">Savings Rate</span>
            <div className="text-xl sm:text-2xl font-semibold text-primary mt-0.5">
              {summaryStats.savingsRate}%
            </div>
            <span className="text-[11px] text-steel font-medium flex items-center gap-0.5 mt-1">
              <CheckCircle2 className="w-3 h-3 text-primary" /> Target: 20%+
            </span>
          </div>
        </div>

        {/* Kanban / Mini Database View within Mockup */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 pt-2">
          {/* Col 1: Category Budget Health */}
          <div className="p-4 rounded-lg bg-card-tint-gray/50 border border-hairline space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 font-semibold text-[13px] text-charcoal">
                <Layers className="w-4 h-4 text-steel" />
                <span>Budget Allocations</span>
              </div>
              <Badge variant="popular">Active</Badge>
            </div>
            <div className="space-y-2.5">
              {categorySpendingList.slice(0, 3).map((item) => (
                <div key={item.category} className="p-2.5 rounded-md bg-canvas border border-hairline text-xs space-y-1.5">
                  <div className="flex items-center justify-between font-medium">
                    <span className="text-charcoal">{item.category}</span>
                    <span className="text-steel font-mono">
                      ${item.spent.toFixed(0)} / ${item.limit}
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-surface rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-300"
                      style={{
                        width: `${Math.min(100, item.percentage)}%`,
                        backgroundColor: item.color,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Col 2 & 3: Live Transaction Records */}
          <div className="lg:col-span-2 p-4 rounded-lg bg-card-tint-gray/50 border border-hairline space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 font-semibold text-[13px] text-charcoal">
                <DollarSign className="w-4 h-4 text-steel" />
                <span>Recent Ledger Activity</span>
              </div>
              <button
                type="button"
                onClick={onOpenAdd}
                className="text-xs text-primary hover:underline font-semibold cursor-pointer"
              >
                + Quick Entry
              </button>
            </div>

            <div className="space-y-2">
              {recentTransactions.map((tx) => (
                <div
                  key={tx.id}
                  className="flex items-center justify-between p-2.5 bg-canvas rounded-md border border-hairline text-xs"
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <span className={`w-2 h-2 rounded-full shrink-0 ${tx.type === 'income' ? 'bg-brand-green' : 'bg-brand-orange'}`} />
                    <span className="font-medium text-ink truncate">{tx.title}</span>
                    <span className="text-[11px] text-steel font-mono hidden sm:inline">{tx.date}</span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <Badge variant={tx.type === 'income' ? 'tag-green' : 'tag-purple'}>
                      {tx.category}
                    </Badge>
                    <span
                      className={`font-semibold font-mono ${
                        tx.type === 'income' ? 'text-brand-green' : 'text-charcoal'
                      }`}
                    >
                      {tx.type === 'income' ? '+' : '-'}${tx.amount.toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
