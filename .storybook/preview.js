import React from 'react'
import '../src/app/globals.css'
import ThemeProvider from '../src/styles/theme'

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
}

export const decorators = [
  (Story) => (
    <ThemeProvider>
      <div style={{ padding: 20 }}>
        <Story />
      </div>
    </ThemeProvider>
  ),
]
