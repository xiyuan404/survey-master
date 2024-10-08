import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import Component from './Component'

describe.skip('paragraph', () => {
  test('默认属性', () => {
    const { container } = render(<Component />)
    const span = screen.getByText('一行段落')
    expect(span).toBeInTheDocument()

    expect(container).not.toBeNull()

    expect(container!.style.textAlign).toBe('start')
  })

  test('传入属性', () => {
    const { container } = render(<Component text="text" isCenter={true} />)
    const span = screen.getByText('text')
    expect(span).toBeInTheDocument()

    expect(container).not.toBeNull()

    expect(container!.style.textAlign).toBe('center')
  })

  test('换行显示', () => {
    render(<Component text={'a\nb\nc'} />)
    const span = screen.getByText('a')
    expect(span).toBeInTheDocument()

    expect(span).toHaveTextContent('a')
    expect(span).not.toHaveTextContent('ab') //被换行了
  })
})
