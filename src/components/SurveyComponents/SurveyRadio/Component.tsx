import React, { FC } from 'react'

import { Radio, Space, Typography } from 'antd'
import { SurveyRadioDefaultProps, SurveyRadioPropsType } from './interface'

const { Paragraph } = Typography

const Component: FC<SurveyRadioPropsType> = (props: SurveyRadioPropsType) => {
  const { title, selected, opts, isVertical } = { ...SurveyRadioDefaultProps, ...props }

  return (
    <div>
      <Paragraph strong>{title}</Paragraph>
      <Radio.Group value={selected}>
        <Space direction={isVertical ? 'vertical' : 'horizontal'}>
          {opts.map(({ value, label }) => {
            return (
              <Radio key={value} value={value}>
                {label}
              </Radio>
            )
          })}
        </Space>
      </Radio.Group>
    </div>
  )
}

export default Component
