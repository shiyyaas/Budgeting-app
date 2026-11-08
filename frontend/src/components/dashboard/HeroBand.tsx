import React from 'react';
import { Button } from '../common/Button';
import { WorkspaceMockup } from './WorkspaceMockup';
import { ArrowRight, Plus, ShieldCheck } from 'lucide-react';

interface HeroBandProps {
  onOpenAdd: () => void;
  onOpenBudgetModal: () => void;
}

export const HeroBand: React.FC<HeroBandProps> = ({
  onOpenAdd,
  onOpenBudgetModal,
}) => {
  return (
    // hero-band-dark token: bg brand-navy (#0a1530), text on-dark (#ffffff), centered hero
    <section className="relative w-full bg-brand-navy text-white pt-16 pb-24 md:pt-24 md:pb-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Decorative Notion-style sticky-note dots & mesh wire SVGs per DESIGN.md */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        {/* Floating sticky-note colored dots */}
        <div className="absolute top-12 left-[10%] w-3 h-3 rounded-full bg-brand-yellow blur-[1px]" />
        <div className="absolute top-28 left-[18%] w-4 h-4 rounded-full bg-brand-pink blur-[1px]" />
        <div className="absolute top-16 right-[14%] w-3.5 h-3.5 rounded-full bg-brand-teal blur-[1px]" />
        <div className="absolute top-36 right-[22%] w-2.5 h-2.5 rounded-full bg-brand-orange blur-[1px]" />
        <div className="absolute top-48 left-[8%] w-3 h-3 rounded-full bg-brand-purple-300 blur-[1px]" />

        {/* Ambient mesh grid / wire curves */}
        <svg
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] text-white/5"
          viewBox="0 0 1200 600"
          fill="none"
        >
          <path
            d="M50 100 C 300 250, 700 50, 1150 180"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeDasharray="6 6"
          />
          <path
            d="M100 450 C 400 300, 800 500, 1100 350"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />
          <circle cx="300" cy="250" r="4" fill="#f5d75e" />
          <circle cx="700" cy="50" r="4" fill="#ff64c8" />
          <circle cx="800" cy="500" r="4" fill="#2a9d99" />
        </svg>
      </div>

      <div className="relative max-w-[1280px] mx-auto text-center flex flex-col items-center">
        {/* Subtitle tag */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/15 text-xs sm:text-sm text-stone mb-6 font-medium">
          <ShieldCheck className="w-3.5 h-3.5 text-brand-green" />
          <span>Real-time Financial Orchestration Engine</span>
        </div>

        {/* Hero headline with tight leading and negative tracking per DESIGN.md */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-[76px] font-semibold tracking-[-1.5px] lg:tracking-[-2px] leading-[1.08] max-w-4xl text-white">
          Meet the night shift for your money.
        </h1>

        {/* Subtitle */}
        <p className="mt-5 text-base sm:text-lg md:text-xl text-on-dark-muted max-w-2xl font-normal leading-relaxed">
          The all-in-one workspace to plan budgets, monitor expenses, track cashflow,
          and hit monthly savings milestones with total clarity.
        </p>

        {/* Centered CTA Row: Purple primary button + secondary-on-dark */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 w-full sm:w-auto">
          <Button
            variant="primary"
            size="lg"
            onClick={onOpenAdd}
            leftIcon={<Plus className="w-5 h-5" />}
            className="w-full sm:w-auto"
          >
            Add Transaction
          </Button>

          <Button
            variant="secondary-on-dark"
            size="lg"
            onClick={onOpenBudgetModal}
            rightIcon={<ArrowRight className="w-4 h-4" />}
            className="w-full sm:w-auto"
          >
            Adjust Budget Limits
          </Button>
        </div>

        {/* Embedded Workspace Mockup Card with deep drop shadow */}
        <div className="w-full mt-12 md:mt-16 max-w-5xl">
          <WorkspaceMockup onOpenAdd={onOpenAdd} />
        </div>
      </div>
    </section>
  );
};
