import React from 'react'
import { Progress } from './progress'

export default {
  title: 'UI/Progress',
  component: Progress,
}

export const Default = () => (
  <div style={{ width: 360 }}>
    <Progress value={55} />
  </div>
)
