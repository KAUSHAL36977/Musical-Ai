import * as React from "react"

import { cn } from "@/lib/utils"

const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, style, ...props }, ref) => {
  const mergedStyle: React.CSSProperties = {
    backgroundColor: 'var(--background)',
    color: 'var(--foreground)',
    ...(style as React.CSSProperties),
  }

  return (
    <input
      ref={ref}
      style={mergedStyle}
      className={cn(
        "flex h-10 w-full rounded-md border px-3 py-2 text-sm placeholder:text-[var(--muted-foreground)] disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
})

Input.displayName = "Input"

export { Input }
