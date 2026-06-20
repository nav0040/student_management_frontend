import React from 'react';
import { cn } from '../../utils/cn';
import { Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading, children, disabled, ...props }, ref) => {
    const variants = {
      primary: 'bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] text-white shadow-lg hover:shadow-[0_0_20px_rgba(124,58,237,0.4)] border border-white/10',
      secondary: 'bg-white/5 text-white border border-white/10 hover:bg-white/10',
      danger: 'bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white border border-red-500/20',
    };

    const sizes = {
      sm: 'h-8 px-4 text-xs',
      md: 'h-10 px-6 text-sm',
      lg: 'h-12 px-8 text-base',
    };

    return (
      <motion.button
        whileHover={{ scale: disabled || isLoading ? 1 : 1.02 }}
        whileTap={{ scale: disabled || isLoading ? 1 : 0.98 }}
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          'inline-flex items-center justify-center rounded-xl font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-[#7C3AED] focus:ring-offset-2 focus:ring-offset-[#0B1020] disabled:opacity-50 disabled:pointer-events-none',
          variants[variant],
          sizes[size],
          className
        )}
        {...(props as any)}
      >
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {children}
      </motion.button>
    );
  }
);
Button.displayName = 'Button';
