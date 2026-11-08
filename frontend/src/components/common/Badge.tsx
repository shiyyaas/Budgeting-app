import React from 'react';
import { cn } from '../../utils/cn';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?:
    | 'purple'
    | 'pink'
    | 'orange'
    | 'tag-purple'
    | 'tag-orange'
    | 'tag-green'
    | 'popular';
  children: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'purple',
  className,
  children,
  ...props
}) => {
  // DESIGN.md:
  // Status badges: rounded.full, caption-bold (13px, font-semibold)
  // Tag chips: rounded.sm (6px), caption-bold, padding 2px 8px
  const variantStyles = {
    // badge-purple: bg primary, text on-primary, rounded.full, padding 4px 10px
    purple: 'bg-primary text-white text-[12px] font-semibold rounded-full px-2.5 py-0.5',
    // badge-pink: bg brand-pink, text on-primary, rounded.full, padding 4px 10px
    pink: 'bg-brand-pink text-white text-[12px] font-semibold rounded-full px-2.5 py-0.5',
    // badge-orange: bg brand-orange, text on-primary, rounded.full, padding 4px 10px
    orange: 'bg-brand-orange text-white text-[12px] font-semibold rounded-full px-2.5 py-0.5',
    // badge-tag-purple: bg card-tint-lavender, text brand-purple-800, rounded.sm, padding 2px 8px
    'tag-purple': 'bg-card-tint-lavender text-brand-purple-800 text-[12px] font-semibold rounded-sm px-2 py-0.5',
    // badge-tag-orange: bg card-tint-peach, text brand-orange-deep, rounded.sm, padding 2px 8px
    'tag-orange': 'bg-card-tint-peach text-brand-orange-deep text-[12px] font-semibold rounded-sm px-2 py-0.5',
    // badge-tag-green: bg card-tint-mint, text brand-green, rounded.sm, padding 2px 8px
    'tag-green': 'bg-card-tint-mint text-brand-green text-[12px] font-semibold rounded-sm px-2 py-0.5',
    // badge-popular: bg primary, text on-primary, rounded.full
    popular: 'bg-primary text-white text-[11px] uppercase tracking-wider font-semibold rounded-full px-2.5 py-0.5',
  };

  return (
    <span
      className={cn('inline-flex items-center gap-1 select-none whitespace-nowrap', variantStyles[variant], className)}
      {...props}
    >
      {children}
    </span>
  );
};
