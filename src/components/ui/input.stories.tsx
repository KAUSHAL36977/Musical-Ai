import React from 'react'
import { Input } from './input'
import { Label } from './label'

export default {
  title: 'UI/Input',
  component: Input,
}

export const Default = () => (
  <div style={{ width: 360 }}>
    <Label htmlFor="name">Name</Label>
    <Input id="name" placeholder="Enter your name" />
  </div>
)

export const Disabled = () => (
  <div style={{ width: 360 }}>
    <Input placeholder="Disabled" disabled />
  </div>
)
