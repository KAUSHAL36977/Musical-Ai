import * as React from "react"

import { cn } from "@/lib/utils"

interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number
}

const Progress = ({ value = 0, className, style, ...props }: ProgressProps) => {
  const pct = Math.min(Math.max(Math.round(value), 0), 100)
  return (
    <div
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={pct}
      className={cn('w-full rounded-full overflow-hidden', className)}
      style={{ backgroundColor: 'var(--gray-200)', height: 8, ...(style as any) }}
      {...props}
    >
      <div style={{ width: `${pct}%`, height: '100%', backgroundColor: 'var(--brand-500)' }} />
    </div>
  )
}

export { Progress }
