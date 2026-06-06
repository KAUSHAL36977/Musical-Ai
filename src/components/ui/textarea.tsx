import * as React from "react"

import { cn } from "@/lib/utils"

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, style, ...props }, ref) => {
  const mergedStyle: React.CSSProperties = {
    backgroundColor: 'var(--background)',
    color: 'var(--foreground)',
    ...(style as React.CSSProperties),
  }

  return (
    <textarea
      ref={ref}
      style={mergedStyle}
      className={cn(
        "min-h-[80px] w-full rounded-md border px-3 py-2 text-sm placeholder:text-[var(--muted-foreground)]",
        className
      )}
      {...props}
    />
  )
})

Textarea.displayName = "Textarea"

export { Textarea }
