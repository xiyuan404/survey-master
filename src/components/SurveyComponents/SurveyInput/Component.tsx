import React, { FC } from 'react'
import { Typography, Input } from 'antd'
import { SurveyInputDefaultProps, SurveyInputPropsType } from './interface'

const { Paragraph } = Typography
const SurveyInput: FC<SurveyInputPropsType> = (props: SurveyInputPropsType) => {
  const { title, placeholder } = { ...SurveyInputDefaultProps, ...props }
  return (
    <div>
      <Paragraph strong>{title}</Paragraph>
      <div>
        <Input placeholder={placeholder} />
      </div>
    </div>
  )
}

export default SurveyInput
