import React, { FC } from 'react'

import { Checkbox, Space, Typography } from 'antd'
import { SurveyCheckboxDefaultProps, SurveyCheckboxPropsType } from './interface'

const { Paragraph } = Typography

const Component: FC<SurveyCheckboxPropsType> = (props: SurveyCheckboxPropsType) => {
  const { opts = [], title, isVertical } = { ...SurveyCheckboxDefaultProps, ...props }

  return (
    <div>
      <Paragraph strong>{title}</Paragraph>
      <Space direction={isVertical ? 'vertical' : 'horizontal'}>
        {opts.map(({ label, value, checked }) => {
          return (
            <Checkbox value={value} checked={checked} key={value}>
              {label}
            </Checkbox>
          )
        })}
      </Space>
    </div>
  )
}

export default Component
