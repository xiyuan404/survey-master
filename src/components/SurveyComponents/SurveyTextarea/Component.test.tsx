import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import Component from './Component'

/*   title: '多行输入',
  placeholder: 'enter...', */

test('默认属性', () => {
  render(<Component />)

  const h = screen.getByText('多行输入')
  expect(h).toBeInTheDocument()

  const textarea = screen.getByPlaceholderText('enter...')

  expect(textarea).toBeInTheDocument()
})

test('传入属性,', () => {
  render(<Component title="input" placeholder="placeholder" />)

  const h = screen.getByText('input')
  expect(h).toBeInTheDocument()

  const textarea = screen.getByPlaceholderText('placeholder')

  expect(textarea).toBeInTheDocument()
})
