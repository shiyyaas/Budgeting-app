import React, { forwardRef } from 'react';
import { cn } from '../../utils/cn';
import { Search } from 'lucide-react';

export interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
}

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(({
  label,
  error,
  helperText,
  leftIcon,
  className,
  id,
  ...props
}, ref) => {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="w-full flex flex-col gap-1.5">
      {label && (
        <label htmlFor={inputId} className="text-[13px] font-semibold text-charcoal flex items-center justify-between">
          <span>{label}</span>
          {props.required && <span className="text-semantic-error text-xs">*</span>}
        </label>
      )}
      <div className="relative flex items-center w-full">
        {leftIcon && (
          <div className="absolute left-3.5 text-steel pointer-events-none flex items-center">
            {leftIcon}
          </div>
        )}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            // text-input token: bg canvas, text ink, rounded.md (8px), height 44px, border 1px solid hairline-strong
            // text-input-focused: border 2px solid primary
            'w-full h-[44px] px-3.5 bg-canvas text-ink text-[14px] rounded-md border border-hairline-strong transition-all placeholder:text-muted focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary',
            leftIcon && 'pl-10',
            error && 'border-semantic-error focus:border-semantic-error focus:ring-semantic-error',
            className
          )}
          {...props}
        />
      </div>
      {error ? (
        <span className="text-[12px] font-medium text-semantic-error mt-0.5">{error}</span>
      ) : helperText ? (
        <span className="text-[12px] text-steel mt-0.5">{helperText}</span>
      ) : null}
    </div>
  );
});

TextInput.displayName = 'TextInput';

export interface SearchPillProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onClear?: () => void;
}

export const SearchPill: React.FC<SearchPillProps> = ({
  className,
  value,
  ...props
}) => {
  return (
    <div className="relative flex items-center w-full">
      <Search className="absolute left-3.5 w-4 h-4 text-steel pointer-events-none" />
      <input
        type="text"
        value={value}
        className={cn(
          // search-pill token: bg surface, text steel, rounded.md, height 44px, border 1px solid hairline
          'w-full h-[44px] pl-10 pr-4 bg-surface text-ink placeholder:text-steel text-[14px] rounded-md border border-hairline transition-all focus:outline-none focus:bg-canvas focus:border-primary focus:ring-1 focus:ring-primary',
          className
        )}
        {...props}
      />
    </div>
  );
};
