import React from 'react'
import { Toaster } from './sonner'
import { toast } from 'sonner'
import { Button } from './button'

export default {
  title: 'UI/Toaster',
  component: Toaster,
}

export const Default = () => (
  <div style={{ width: 360 }}>
    <Toaster />
    <Button onClick={() => toast.success('This is a success toast!')}>Show toast</Button>
  </div>
)
