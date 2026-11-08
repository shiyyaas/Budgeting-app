import React from 'react';
import { cn } from '../../utils/cn';

export type CardVariant =
  | 'base'
  | 'feature'
  | 'yellow-bold'
  | 'peach'
  | 'rose'
  | 'mint'
  | 'sky'
  | 'lavender'
  | 'yellow'
  | 'cream'
  | 'pricing-featured'
  | 'mockup';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({
  variant = 'base',
  className,
  children,
  ...props
}) => {
  // Notion design system:
  // Cards use rounded.lg (12px) consistently
  const radius = 'rounded-lg';

  const variantStyles: Record<CardVariant, string> = {
    // card-base: bg canvas, border 1px solid hairline, padding xl (24px)
    base: 'bg-canvas border border-hairline p-6 shadow-[0_1px_2px_rgba(15,15,15,0.02)]',
    // card-feature: bg canvas, padding xxl (32px), border 1px solid hairline
    feature: 'bg-canvas border border-hairline p-8 shadow-elevation2',
    // card-feature-yellow-bold: bg #f9e79f, text #37352f
    'yellow-bold': 'bg-card-tint-yellow-bold text-charcoal p-6 md:p-8 border border-[#ecd986]',
    // Pastel feature cards
    peach: 'bg-card-tint-peach text-charcoal p-6 border border-[#f9d7be]',
    rose: 'bg-card-tint-rose text-charcoal p-6 border border-[#f5cddf]',
    mint: 'bg-card-tint-mint text-charcoal p-6 border border-[#c4ebd0]',
    sky: 'bg-card-tint-sky text-charcoal p-6 border border-[#cbe1f5]',
    lavender: 'bg-card-tint-lavender text-charcoal p-6 border border-[#d6cbf0]',
    yellow: 'bg-card-tint-yellow text-charcoal p-6 border border-[#faeebc]',
    cream: 'bg-card-tint-cream text-charcoal p-6 border border-[#ede7d3]',
    // pricing-card-featured: border 2px solid primary, bg surface
    'pricing-featured': 'bg-surface border-2 border-primary p-8 shadow-elevation2',
    // workspace-mockup-card: bg canvas, shadow elevation 3, border 1px solid hairline
    mockup: 'bg-canvas border border-hairline shadow-elevation3 overflow-hidden',
  };

  return (
    <div
      className={cn(radius, variantStyles[variant], className)}
      {...props}
    >
      {children}
    </div>
  );
};
