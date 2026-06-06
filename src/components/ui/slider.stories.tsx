import React, { useState } from 'react'
import { Slider } from './slider'

export default {
  title: 'UI/Slider',
  component: Slider,
  argTypes: {
    min: { control: 'number' },
    max: { control: 'number' },
    step: { control: 'number' },
  },
}

export const Playground = (args: any) => {
  const [value, setValue] = useState(args.value ?? 30)
  return (
    <div style={{ width: 360 }}>
      <Slider {...args} value={value} onValueChange={(v: number[]) => setValue(v[0])} />
      <div style={{ marginTop: 12 }}>Value: {value}</div>
    </div>
  )
}
Playground.args = { value: 30, min: 0, max: 100, step: 1 }
