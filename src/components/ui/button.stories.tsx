import React from 'react'
import { Button } from './button'

export default {
  title: 'UI/Button',
  component: Button,
  argTypes: {
    variant: { control: { type: 'select', options: ['default', 'ghost', 'destructive', 'outline'] } },
    size: { control: { type: 'select', options: ['default', 'sm', 'lg'] } },
    disabled: { control: 'boolean' },
  },
}

export const Playground = (args: any) => <Button {...args}>{args.label ?? 'Button'}</Button>
Playground.args = { variant: 'default', size: 'default', label: 'Button', disabled: false }

export const Ghost = Playground.bind({})
Ghost.args = { ...Playground.args, variant: 'ghost', label: 'Ghost' }
