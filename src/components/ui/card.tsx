import * as React from "react"

import { cn } from "@/lib/utils"

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}
const Card = ({ className, style, ...props }: CardProps) => (
  <div
    style={{
      backgroundColor: 'var(--background)',
      boxShadow: 'var(--elevation-1)',
      ...(style as React.CSSProperties)
    }}
    className={cn('rounded-lg border', className)}
    {...props}
  />
)

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}
const CardHeader = ({ className, ...props }: CardHeaderProps) => (
  <div className={cn("mb-2", className)} {...props} />
)

interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}
const CardTitle = ({ className, ...props }: CardTitleProps) => (
  <h3 className={cn("text-lg font-semibold", className)} {...props} />
)

interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {}
const CardContent = ({ className, ...props }: CardContentProps) => (
  <div className={cn("p-2", className)} {...props} />
)

export { Card, CardHeader, CardTitle, CardContent }
