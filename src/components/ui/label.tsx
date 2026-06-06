import * as React from "react"

import { cn } from "@/lib/utils"

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {}

const Label = ({ className, style, ...props }: LabelProps) => (
  <label
    style={{ color: 'var(--foreground)', ...(style as React.CSSProperties) }}
    className={cn('text-sm font-medium', className)}
    {...props}
  />
)

export { Label }
