import * as React from 'react';

import { cn } from '@/lib/utils';
import { cva, VariantProps } from 'class-variance-authority';

const typographyVariants = cva('', {
  variants: {
    variant: {
      h1: 'scroll-m-20 text-4xl font-bold tracking-tight lg:text-5xl',
      h2: 'scroll-m-20 text-3xl font-semibold tracking-tight transition-colors first:mt-0',
      h3: 'scroll-m-20 text-2xl font-semibold tracking-tight',
      h4: 'scroll-m-20 text-xl font-semibold tracking-tight',
      p: 'leading-7 text-lg',
      muted: 'text-sm text-muted-foreground'
    }
  },
  defaultVariants: {
    variant: 'p'
  }
});

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement>, VariantProps<typeof typographyVariants> {}

const RendererInput = React.forwardRef<HTMLInputElement, InputProps>(({ className, variant, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(typographyVariants({ variant, className }), 'w-full bg-transparent rounded-lg border border-transparent hover:border-blue-700 focus:outline-none', className)}
      ref={ref}
      {...props}
    />
  );
});
RendererInput.displayName = 'RendererInput';

export { RendererInput };
