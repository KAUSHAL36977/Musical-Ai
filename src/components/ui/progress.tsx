import * as React from "react"

import { cn } from "@/lib/utils"

interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number
}

const Progress = ({ value = 0, className, ...props }: ProgressProps) => {
  const pct = Math.min(Math.max(Math.round(value), 0), 100)
  return (
    <div
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={pct}
      className={cn("w-full bg-muted rounded-full overflow-hidden", className)}
      {...props}
    >
      <div style={{ width: `${pct}%` }} className="h-full bg-primary" />
    </div>
  )
}

export { Progress }
