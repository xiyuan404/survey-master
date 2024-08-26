import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import Component from './Component'

describe.skip('Info', () => {
  test('默认属性', () => {
    render(<Component />) //渲染组件

    const h = screen.getByText('问卷标题')
    expect(h).toBeInTheDocument() // 断言API
  })

  test('传入属性', () => {
    render(<Component title="hello" desc="world" />) //渲染组件

    const h = screen.getByText('hello')
    expect(h).toBeInTheDocument()

    const p = screen.getByText('world')
    expect(p).toBeInTheDocument()
  })

  test('换行显示', () => {
    render(<Component desc={'a\n\b\nc'} />) //渲染组件
    const span = screen.getByText('a')
    expect(span).toBeInTheDocument()

    expect(span).toHaveTextContent('a')
    expect(span).not.toHaveTextContent('ab')
  })
})
