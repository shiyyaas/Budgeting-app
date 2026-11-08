import React from 'react';
import { useBudget } from '../../context/BudgetContext';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { TextInput } from '../common/Input';
import {
  Calculator,
  DollarSign,
  Percent,
  Calendar,
  AlertTriangle,
  CheckCircle2,
  TrendingUp,
  Wallet
} from 'lucide-react';
import type { BudgetTimeframe } from '../../types/budget';

export const BudgetCalculator: React.FC = () => {
  const { calculatorConfig, updateCalculatorConfig, calculatorMetrics } = useBudget();

  const handleTimeframeChange = (timeframe: BudgetTimeframe) => {
    updateCalculatorConfig({ timeframe });
  };

  const handleIncomeChange = (val: string) => {
    const num = parseFloat(val);
    updateCalculatorConfig({ incomeLimit: isNaN(num) || num < 0 ? 0 : num });
  };

  const handleSavingsRateChange = (val: string) => {
    const num = parseFloat(val);
    const clamped = isNaN(num) ? 0 : Math.min(100, Math.max(0, num));
    updateCalculatorConfig({ savingsTargetRate: clamped });
  };

  const isOver = calculatorMetrics.isOverSpendingAllowance;

  return (
    <Card
      variant="yellow-bold"
      className="p-6 md:p-8 space-y-6 shadow-elevation2 relative overflow-hidden"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-charcoal/15">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-md bg-charcoal text-card-tint-yellow-bold flex items-center justify-center shrink-0 shadow-xs">
            <Calculator className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-semibold text-charcoal tracking-tight flex items-center gap-2">
              Budget Calculator & Runway Forecaster
            </h2>
            <p className="text-xs sm:text-sm text-charcoal/80 font-normal">
              Establish monthly or weekly income baselines and target savings reserves.
            </p>
          </div>
        </div>

        <Badge variant={isOver ? 'orange' : 'popular'}>
          {isOver ? 'Exceeding Allowance' : 'Target Runway On-Track'}
        </Badge>
      </div>

      {/* Controlled Input Controls */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Timeframe selector */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[13px] font-semibold text-charcoal flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-charcoal/70" />
            <span>Income Timeframe</span>
          </label>
          <div className="flex p-1 bg-white/70 rounded-md border border-hairline-strong h-[44px] items-center">
            <button
              type="button"
              onClick={() => handleTimeframeChange('monthly')}
              className={`flex-1 h-full rounded text-[13px] font-medium transition-colors cursor-pointer ${
                calculatorConfig.timeframe === 'monthly'
                  ? 'bg-charcoal text-white font-semibold shadow-xs'
                  : 'text-charcoal/80 hover:text-charcoal'
              }`}
            >
              Monthly Limit
            </button>
            <button
              type="button"
              onClick={() => handleTimeframeChange('weekly')}
              className={`flex-1 h-full rounded text-[13px] font-medium transition-colors cursor-pointer ${
                calculatorConfig.timeframe === 'weekly'
                  ? 'bg-charcoal text-white font-semibold shadow-xs'
                  : 'text-charcoal/80 hover:text-charcoal'
              }`}
            >
              Weekly Limit
            </button>
          </div>
        </div>

        {/* Income baseline limit */}
        <TextInput
          label={`${calculatorConfig.timeframe === 'monthly' ? 'Monthly' : 'Weekly'} Income Baseline`}
          type="number"
          step="50"
          min="0"
          value={calculatorConfig.incomeLimit.toString()}
          onChange={(e) => handleIncomeChange(e.target.value)}
          leftIcon={<DollarSign className="w-4 h-4 text-charcoal/70" />}
          className="bg-white/80"
        />

        {/* Savings target percentage */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <label className="text-[13px] font-semibold text-charcoal flex items-center gap-1.5">
              <Percent className="w-3.5 h-3.5 text-charcoal/70" />
              <span>Target Savings Rate</span>
            </label>
            <span className="text-xs font-mono font-semibold text-charcoal">
              {calculatorConfig.savingsTargetRate}%
            </span>
          </div>

          <div className="flex items-center gap-3 h-[44px] px-3 bg-white/80 rounded-md border border-hairline-strong">
            <input
              type="range"
              min="0"
              max="60"
              step="5"
              value={calculatorConfig.savingsTargetRate}
              onChange={(e) => handleSavingsRateChange(e.target.value)}
              className="w-full accent-primary cursor-pointer"
            />
            <span className="text-xs font-mono font-medium text-charcoal/80 shrink-0">
              ${calculatorMetrics.targetSavingsAmount.toFixed(0)}/mo
            </span>
          </div>
        </div>
      </div>

      {/* Real-time Dynamic Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
        {/* Card 1: Safe Spending Allowance */}
        <div className="p-4 rounded-lg bg-white/85 border border-charcoal/10 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-charcoal/70">
            <span>Spending Ceiling</span>
            <Wallet className="w-3.5 h-3.5 text-primary" />
          </div>
          <div className="mt-2">
            <div className="text-xl sm:text-2xl font-bold font-mono text-charcoal">
              ${calculatorMetrics.maxSpendingAllowance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <span className="text-[11px] text-charcoal/70 font-medium">
              After {calculatorConfig.savingsTargetRate}% savings reserve
            </span>
          </div>
        </div>

        {/* Card 2: Safe Daily Runway */}
        <div className="p-4 rounded-lg bg-white/85 border border-charcoal/10 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-charcoal/70">
            <span>Daily Safe Runway</span>
            <Calendar className="w-3.5 h-3.5 text-brand-teal" />
          </div>
          <div className="mt-2">
            <div className="text-xl sm:text-2xl font-bold font-mono text-charcoal">
              ${calculatorMetrics.dailySpendingAllowance.toFixed(2)}
            </div>
            <span className="text-[11px] text-charcoal/70 font-medium">
              ~${calculatorMetrics.weeklySpendingAllowance.toFixed(2)}/wk allowance
            </span>
          </div>
        </div>

        {/* Card 3: Target Savings Goal */}
        <div className="p-4 rounded-lg bg-white/85 border border-charcoal/10 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-charcoal/70">
            <span>Target Savings</span>
            <TrendingUp className="w-3.5 h-3.5 text-brand-green" />
          </div>
          <div className="mt-2">
            <div className="text-xl sm:text-2xl font-bold font-mono text-brand-green">
              +${calculatorMetrics.targetSavingsAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <span className="text-[11px] text-charcoal/70 font-medium">
              Monthly wealth preservation
            </span>
          </div>
        </div>

        {/* Card 4: Remaining Safe Spend / Variance */}
        <div className="p-4 rounded-lg bg-white/85 border border-charcoal/10 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-charcoal/70">
            <span>Safe Spend Remaining</span>
            {isOver ? (
              <AlertTriangle className="w-3.5 h-3.5 text-semantic-error" />
            ) : (
              <CheckCircle2 className="w-3.5 h-3.5 text-brand-green" />
            )}
          </div>
          <div className="mt-2">
            <div
              className={`text-xl sm:text-2xl font-bold font-mono ${
                isOver ? 'text-semantic-error' : 'text-charcoal'
              }`}
            >
              {isOver ? '-' : ''}${Math.abs(calculatorMetrics.remainingSafeSpend).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <span className="text-[11px] font-medium text-charcoal/70">
              {isOver ? 'Outflows over limit' : 'Available for discretion'}
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
};
