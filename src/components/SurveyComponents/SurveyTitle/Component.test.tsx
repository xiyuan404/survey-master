import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import Component from './Component'

describe.skip('title', () => {
  test('默认属性', () => {
    render(<Component />)

    const h = screen.getByText('一行文本')
    expect(h).toBeInTheDocument()

    expect(h.style.textAlign).toBe('start')

    expect(h.matches('h2')).toBeTruthy() // h2
  })

  test('传入属性', () => {
    render(<Component text="title" level={1} isCenter={true} />)

    const h = screen.getByText('title')
    expect(h).toBeInTheDocument()

    expect(h.style.textAlign).toBe('center')

    expect(h.matches('h1')).toBeTruthy() // h2
  })
})
