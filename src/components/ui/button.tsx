import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '~/utils/cn';

const buttonVariants = cva(
  'inline-flex items-center font-sans  justify-center rounded-sm text-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:opacity-90',
        destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline:
          'border border-input bg-background hover:bg-secondary/80 hover:text-primary',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-secondary/80 hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
        clip: 'bg-primary text-primary-foreground hover:opacity-90 clip',
        rounded:
          'bg-primary text-primary-foreground rounded-full border border-primary  hover:bg-background hover:text-primary ',
        'rounded-outline':
          'hover:bg-primary hover:text-primary-foreground rounded-full border border-primary  bg-background text-primary ',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        icon_square: 'h-9 w-9 rounded-none border-teal text-gray-200',
        md: 'h-9 rounded-sm px-3',
        lg: 'h-11 rounded-sm px-8',
        full: 'h-10 px-4 py-2 w-full',
        icon: 'h-12 w-12 rounded-full',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = 'Button';

export { Button, buttonVariants };
