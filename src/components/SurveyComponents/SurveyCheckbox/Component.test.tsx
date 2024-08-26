import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import Component from './Component'

/* 
  title: '多选标题',
  isVertical: false,
  opts: [
    { label: 'label1', value: 'val1', checked: false },
    { label: 'label2', value: 'val2', checked: true },
    { label: 'label3', value: 'val3', checked: true },
  ], */

describe.only('checkbox', () => {
  test('默认属性', () => {
    render(<Component />)

    const p = screen.getByText('多选标题')
    expect(p).toBeInTheDocument()

    for (let i = 1; i <= 3; i++) {
      const curVal = `val${i}`
      const checkbox = screen.getByDisplayValue(curVal)
      expect(checkbox).toBeInTheDocument()
      const label = screen.getByText(`label${i}`)
      expect(label).toBeInTheDocument()

      // 每一个默认都为选中
      expect(checkbox.getAttribute('checked')).toBeNull()
    }
  })

  test('传入属性', () => {
    const opts = [
      { label: '11', value: 'v1', checked: false },
      { label: 'l2', value: 'v2', checked: true },
      { label: 'l3', value: 'v3', checked: true },
    ]

    render(<Component opts={opts} title="title" />)

    const p = screen.getByText('title')
    expect(p).toBeInTheDocument()

    const checkbox1 = screen.getByDisplayValue(`v1`)
    expect(checkbox1).toBeInTheDocument()
    expect(checkbox1.getAttribute('checked')).toBeNull() // 未选中

    const checkbox2 = screen.getByDisplayValue('v2')
    expect(checkbox2).toBeInTheDocument()
    expect(checkbox2.getAttribute('checked')).not.toBeNull() // 选中
    const checkbox3 = screen.getByDisplayValue('v3')
    expect(checkbox3).toBeInTheDocument()
    expect(checkbox3.getAttribute('checked')).not.toBeNull() // 选中
  })
})
