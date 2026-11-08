import React from 'react';
import { Button } from '../common/Button';
import { Card } from '../common/Card';
import { Sparkles, ArrowRight } from 'lucide-react';

export const LightCtaBanner: React.FC<{ onOpenAdd: () => void }> = ({ onOpenAdd }) => {
  return (
    // cta-banner-light token: bg surface, text ink, rounded.lg, padding section
    <Card variant="base" className="bg-surface border border-hairline py-12 px-6 sm:px-12 text-center rounded-lg my-12">
      <div className="max-w-2xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-card-tint-lavender text-brand-purple-800 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Connected Personal & Business Finance</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-semibold text-ink tracking-tight">
          Keep your money moving 24/7.
        </h2>
        <p className="text-sm sm:text-base text-slate leading-relaxed">
          Log incomes, configure automated guardrails, and visualize your runway.
          Eliminate finance spreadsheet clutter forever.
        </p>
        <div className="pt-2 flex items-center justify-center gap-3">
          <Button variant="primary" size="lg" onClick={onOpenAdd}>
            Log New Transaction
          </Button>
          <a
            href="#comparison"
            className="text-sm font-semibold text-link-blue hover:text-link-blue-pressed inline-flex items-center gap-1"
          >
            <span>Audit full variance</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </Card>
  );
};
