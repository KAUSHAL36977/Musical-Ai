import React from 'react'
import { Progress } from './progress'

export default {
  title: 'UI/Progress',
  component: Progress,
  argTypes: {
    value: { control: { type: 'range', min: 0, max: 100 } },
  },
}

export const Playground = (args: any) => (
  <div style={{ width: 360 }}>
    <Progress {...args} />
  </div>
)
Playground.args = { value: 55 }
