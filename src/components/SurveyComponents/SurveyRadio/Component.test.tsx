import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import Component from './Component'

describe('radio', () => {
  test('默认属性', () => {
    render(<Component />)
    const p = screen.getByText('单选标题')
    expect(p).toBeInTheDocument()

    const selectedVal = 'val1'

    for (let i = 1; i <= 3; i++) {
      const currVal = `val${i}`
      const radio = screen.getByDisplayValue(currVal)
      expect(radio).toBeInTheDocument()
      const label = screen.getByLabelText(`label${i}`)
      expect(label).toBeInTheDocument()

      const isChecked = radio.getAttribute('checked') !== null
      expect(isChecked).toEqual(currVal === selectedVal)
    }
  })

  test('传入属性', () => {
    const list = [
      { value: 'v1', label: 'l1' },
      { value: 'v2', label: 'l2' },
      { value: 'v3', label: 'l3' },
    ]

    render(<Component list={list} isVertical={true} selected="v2" title="title" />)
    const p = screen.getByText('title')
    expect(p).toBeInTheDocument()

    const selectedVal = 'v2'

    for (let i = 1; i <= 3; i++) {
      const currVal = `v${i}`
      const radio = screen.getByDisplayValue(currVal)
      expect(radio).toBeInTheDocument()
      const label = screen.getByLabelText(`l${i}`)
      expect(label).toBeInTheDocument()

      // 选中
      const isChecked = radio.getAttribute('checked') !== null
      expect(isChecked).toEqual(currVal === selectedVal)
    }
  })
})
