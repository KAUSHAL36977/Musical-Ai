import React, { useState } from 'react'
import { Slider } from './slider'

export default {
  title: 'UI/Slider',
  component: Slider,
}

export const Default = () => {
  const [value, setValue] = useState(30)
  return (
    <div style={{ width: 360 }}>
      <Slider value={value} onValueChange={(v: number[]) => setValue(v[0])} />
      <div style={{ marginTop: 12 }}>Value: {value}</div>
    </div>
  )
}
