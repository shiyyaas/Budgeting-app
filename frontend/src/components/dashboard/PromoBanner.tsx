import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';

export const PromoBanner: React.FC = () => {
  return (
    // promo-banner token: bg surface, text ink, typography body-sm-medium, padding sm md
    <aside aria-label="Announcement" className="w-full bg-surface border-b border-hairline py-2 px-4 text-center text-[13px] md:text-[14px] text-ink font-medium">
      <div className="max-w-[1280px] mx-auto flex items-center justify-center gap-2 flex-wrap">
        <span className="inline-flex items-center gap-1 text-primary font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>New</span>
        </span>
        <span className="text-charcoal">
          Connected Budget Intelligence & Real-time Runway Forecasting is now live in Notion.
        </span>
        <a
          href="#features"
          className="inline-flex items-center gap-0.5 text-link-blue hover:text-link-blue-pressed font-semibold ml-1 cursor-pointer"
        >
          <span>Explore features</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </a>
      </div>
    </aside>
  );
};
