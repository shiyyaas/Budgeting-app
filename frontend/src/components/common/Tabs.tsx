import React from 'react';
import { cn } from '../../utils/cn';

export interface TabItem {
  id: string;
  label: string;
  count?: number;
}

export interface PillTabsProps {
  items: TabItem[];
  activeId: string;
  onChange: (id: string) => void;
  className?: string;
}

export const PillTabs: React.FC<PillTabsProps> = ({
  items,
  activeId,
  onChange,
  className,
}) => {
  return (
    <div className={cn('inline-flex items-center gap-2 overflow-x-auto p-0.5 no-scrollbar', className)}>
      {items.map((item) => {
        const isActive = item.id === activeId;
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onChange(item.id)}
            className={cn(
              // pill-tab: bg transparent, text steel, rounded.full, border 1px solid hairline, padding xs md
              // pill-tab-active: bg ink-deep, text on-dark, border 1px solid ink-deep
              'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[13px] font-medium transition-all cursor-pointer whitespace-nowrap',
              isActive
                ? 'bg-ink-deep text-white border border-ink-deep shadow-sm'
                : 'bg-transparent text-steel border border-hairline hover:border-hairline-strong hover:text-ink'
            )}
          >
            <span>{item.label}</span>
            {item.count !== undefined && (
              <span
                className={cn(
                  'text-[11px] px-1.5 py-0.2 rounded-full font-semibold',
                  isActive ? 'bg-white/20 text-white' : 'bg-surface text-steel'
                )}
              >
                {item.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};

export interface SegmentedTabsProps {
  items: TabItem[];
  activeId: string;
  onChange: (id: string) => void;
  className?: string;
}

export const SegmentedTabs: React.FC<SegmentedTabsProps> = ({
  items,
  activeId,
  onChange,
  className,
}) => {
  return (
    <div className={cn('flex items-center border-b border-hairline', className)}>
      {items.map((item) => {
        const isActive = item.id === activeId;
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onChange(item.id)}
            className={cn(
              // segmented-tab: padding sm md, text steel, border 2px transparent
              // segmented-tab-active: text ink, border-bottom 2px ink
              'relative py-2.5 px-4 text-[14px] font-medium transition-colors cursor-pointer border-b-2 -mb-[1px]',
              isActive
                ? 'text-ink border-ink font-semibold'
                : 'text-steel border-transparent hover:text-ink'
            )}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
};
