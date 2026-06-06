import React from 'react'
import { Card, CardHeader, CardContent, CardTitle } from './card'

export default {
  title: 'UI/Card',
  component: Card,
}

export const Default = () => (
  <Card style={{ width: 320 }}>
    <CardHeader>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{ width: 36, height: 36, borderRadius: 8, background: 'linear-gradient(90deg,#7c3aed,#06b6d4)' }} />
        <CardTitle>Card Title</CardTitle>
      </div>
    </CardHeader>
    <CardContent>
      <p style={{ margin: 0 }}>This is an example of a card using design tokens and glass utilities.</p>
    </CardContent>
  </Card>
)
