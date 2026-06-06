import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "",
        secondary: "",
        destructive: "",
        outline: "",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

const variantStyleMap: Record<string, React.CSSProperties> = {
  default: {
    backgroundColor: 'var(--brand-500)',
    color: 'var(--primary-foreground)',
    border: 'none',
  },
  secondary: {
    backgroundColor: 'var(--secondary, #eef2ff)',
    color: 'var(--secondary-foreground, #312e81)',
    border: 'none'
  },
  destructive: {
    backgroundColor: 'var(--danger, #ef4444)',
    color: 'var(--primary-foreground)',
    border: 'none'
  },
  outline: {
    backgroundColor: 'transparent',
    color: 'var(--foreground)',
  }
}

function Badge({ className, variant = 'default', style, ...props }: BadgeProps) {
  const variantStyle = variantStyleMap[variant as string] || {}
  const mergedStyle = { ...(variantStyle as React.CSSProperties), ...(style as React.CSSProperties) }

  return (
    <div style={mergedStyle} className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
