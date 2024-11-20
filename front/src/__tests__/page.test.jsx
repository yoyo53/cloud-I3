import { expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import Page from '../app/page'
 
test('Page', () => {
  render(<Page />)
  expect(screen.getByRole('heading', { level: 2, name: 'Y\. The new way to chat' })).toBeDefined()
})
