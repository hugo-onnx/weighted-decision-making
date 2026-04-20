import * as React from 'react';
import { cn } from '@/lib/utils';

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<'input'>>(
  ({ className, ...props }, ref) => (
    <input
      className={cn(
        'flex h-12 w-full rounded-2xl border border-border/[0.7] bg-white/[0.8] px-4 py-3 text-[15px] text-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.75)] outline-none transition duration-200 placeholder:text-muted-foreground focus-visible:border-primary/[0.5] focus-visible:ring-4 focus-visible:ring-primary/[0.15]',
        className,
      )}
      ref={ref}
      {...props}
    />
  ),
);

Input.displayName = 'Input';

export { Input };
