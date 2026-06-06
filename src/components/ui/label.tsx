import * as React from "react"

import { cn } from "@/lib/utils"

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {}

const Label = ({ className, ...props }: LabelProps) => (
  <label className={cn("text-sm font-medium", className)} {...props} />
)

export { Label }
