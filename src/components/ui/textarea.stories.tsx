import React from 'react'
import { Textarea } from './textarea'
import { Label } from './label'

export default {
  title: 'UI/Textarea',
  component: Textarea,
}

export const Default = () => (
  <div style={{ width: 360 }}>
    <Label htmlFor="bio">Bio</Label>
    <Textarea id="bio" placeholder="Tell us about your project" />
  </div>
)
