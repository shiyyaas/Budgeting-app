import React from 'react';
import { cn } from '../../utils/cn';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'dark' | 'secondary' | 'secondary-on-dark' | 'on-dark' | 'ghost' | 'link';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  leftIcon,
  rightIcon,
  className,
  disabled,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1 select-none active:scale-[0.98] transition-transform duration-75 cursor-pointer disabled:cursor-not-allowed disabled:active:scale-100';

  // Notion design system specifications:
  // Buttons use rounded.md (8px) - NOT pills!
  const radiusStyle = 'rounded-md';

  const sizeStyles = {
    sm: 'text-xs px-2.5 py-1.5 h-8 gap-1.5',
    md: 'text-[14px] leading-[1.30] px-4 py-2.5 h-[40px] gap-2',
    lg: 'text-base px-5 py-3 h-[44px] gap-2.5',
  };

  const variantStyles = {
    // button-primary: Background #5645d4, text #ffffff, rounded-md, 10px 18px
    primary: disabled
      ? 'bg-hairline text-muted shadow-none pointer-events-none'
      : 'bg-primary text-white hover:bg-primary-pressed active:bg-primary-deep shadow-sm',
    // button-dark: Background #000000, text #ffffff
    dark: disabled
      ? 'bg-hairline text-muted pointer-events-none'
      : 'bg-ink-deep text-white hover:bg-neutral-800 active:bg-neutral-900',
    // button-secondary: transparent, text #1a1a1a, border 1px solid hairline-strong
    secondary: disabled
      ? 'border border-hairline text-muted pointer-events-none'
      : 'bg-transparent text-ink border border-hairline-strong hover:bg-surface active:bg-hairline-soft',
    // button-on-dark: Background #ffffff, text #1a1a1a
    'on-dark': disabled
      ? 'bg-white/40 text-stone pointer-events-none'
      : 'bg-white text-ink hover:bg-neutral-100 active:bg-neutral-200 shadow-sm',
    // button-secondary-on-dark: transparent, text #ffffff, border 1px solid on-dark-muted
    'secondary-on-dark': disabled
      ? 'border border-white/20 text-white/30 pointer-events-none'
      : 'bg-transparent text-white border border-on-dark-muted/60 hover:bg-white/10 active:bg-white/20',
    // button-ghost: transparent, text #1a1a1a, rounded.sm
    ghost: disabled
      ? 'text-muted pointer-events-none'
      : 'bg-transparent text-ink hover:bg-surface active:bg-hairline-soft',
    // button-link: transparent, text link-blue
    link: disabled
      ? 'text-muted pointer-events-none'
      : 'bg-transparent text-link-blue hover:text-link-blue-pressed underline-offset-2 hover:underline p-0 h-auto',
  };

  return (
    <button
      className={cn(
        baseStyles,
        radiusStyle,
        sizeStyles[size],
        variantStyles[variant],
        fullWidth && 'w-full',
        className
      )}
      disabled={disabled}
      {...props}
    >
      {leftIcon && <span className="inline-flex shrink-0">{leftIcon}</span>}
      <span>{children}</span>
      {rightIcon && <span className="inline-flex shrink-0">{rightIcon}</span>}
    </button>
  );
};
