import React from 'react';
import { cn } from '../../utils/cn';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, ...props }, ref) => {
    return (
      <div className="w-full">
        <label className="block text-sm font-medium text-gray-300 mb-1.5">
          {label}
        </label>
        <div className="relative">
          <input
            ref={ref}
            className={cn(
              "block w-full rounded-xl border bg-[#0B1020] px-4 py-2.5 text-white placeholder-gray-500 shadow-sm transition-all duration-200",
              "focus:outline-none focus:ring-2 focus:ring-[#7C3AED] focus:border-transparent",
              error ? "border-red-500 focus:ring-red-500" : "border-white/10 hover:border-white/20",
              className
            )}
            autoComplete="off"
            {...props}
          />
        </div>
        {error && (
          <p className="mt-1.5 text-sm text-red-400 animate-in slide-in-from-top-1">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
