import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import Component from './Component'

test('默认属性', () => {
  render(<Component />)

  const h = screen.getByText('输入框')
  expect(h).toBeInTheDocument()

  const input = screen.getByPlaceholderText('enter...')

  expect(input).toBeInTheDocument()
})

test('传入属性,', () => {
  render(<Component title="input" placeholder="placeholder" />)

  const h = screen.getByText('input')
  expect(h).toBeInTheDocument()

  const input = screen.getByPlaceholderText('placeholder')

  expect(input).toBeInTheDocument()
})
