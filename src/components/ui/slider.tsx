import * as React from "react"

import { cn } from "@/lib/utils"

interface SliderProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> {
  value?: number[] | number
  onValueChange?: (value: number[]) => void
  min?: number
  max?: number
  step?: number
}

const Slider = React.forwardRef<HTMLInputElement, SliderProps>(
  ({ value, onValueChange, min = 0, max = 100, step = 1, className, ...props }, ref) => {
    const innerValue = Array.isArray(value) ? value[0] : (value ?? min)

    return (
      <input
        ref={ref}
        type="range"
        min={min}
        max={max}
        step={step}
        value={innerValue}
        onChange={(e) => {
          const newVal = Number((e.target as HTMLInputElement).value)
          onValueChange?.([newVal])
          props.onChange?.(e as any)
        }}
        className={cn('w-full', className)}
        style={{
          accentColor: 'var(--brand-500)',
          height: 8,
          background: 'var(--gray-200)'
        }}
        {...(props as any)}
      />
    )
  }
)

Slider.displayName = "Slider"

export { Slider }
