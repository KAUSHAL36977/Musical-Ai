import * as React from "react"

import { cn } from "@/lib/utils"

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}
const Card = ({ className, ...props }: CardProps) => (
  <div className={cn("rounded-lg border bg-white shadow-sm", className)} {...props} />
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
