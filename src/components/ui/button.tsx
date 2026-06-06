import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        default: "hover:brightness-95",
        ghost: "bg-transparent hover:bg-accent",
        destructive: "hover:brightness-95",
        outline: "border bg-transparent",
      },
      size: {
        default: "h-10 py-2 px-4",
        sm: "h-9 px-3",
        lg: "h-11 px-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const variantStyleMap: Record<string, React.CSSProperties> = {
  default: {
    backgroundColor: 'var(--brand-500)',
    color: 'var(--primary-foreground)',
    border: 'none',
  },
  ghost: {
    backgroundColor: 'transparent',
    color: 'var(--foreground)'
  },
  destructive: {
    backgroundColor: 'var(--danger)',
    color: 'var(--primary-foreground)'
  },
  outline: {
    backgroundColor: 'transparent',
    color: 'var(--foreground)',
    border: '1px solid rgba(0,0,0,0.08)'
  }
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size, style, ...props }, ref) => {
    const variantStyle = variantStyleMap[variant as string] || {}
    const mergedStyle = { ...(variantStyle as React.CSSProperties), ...(style as React.CSSProperties) }

    return (
      <button
        ref={ref}
        style={mergedStyle}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      />
    )
  }
)

Button.displayName = "Button"

export { Button, buttonVariants }
