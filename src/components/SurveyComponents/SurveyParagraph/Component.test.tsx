import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import Component from './Component'

describe.skip('paragraph', () => {
  test('默认属性', () => {
    render(<Component />)
    const span = screen.getByText('一行段落')
    expect(span).toBeInTheDocument()

    const p = span.parentElement
    expect(p).not.toBeNull()

    expect(p!.style.textAlign).toBe('start')
  })

  test('传入属性', () => {
    render(<Component text="text" isCenter={true} />)
    const span = screen.getByText('text')
    expect(span).toBeInTheDocument()

    const p = span.parentElement
    expect(p).not.toBeNull()

    expect(p!.style.textAlign).toBe('center')
  })

  test('换行显示', () => {
    render(<Component text={'a\nb\nc'} />)
    const span = screen.getByText('a')
    expect(span).toBeInTheDocument()

    expect(span).toHaveTextContent('a')
    expect(span).not.toHaveTextContent('ab') //被换行了
  })
})
