import React, { FC } from 'react'
import { SurveyTitleDefaultProps, SurveyTitlePropsType } from './interface'
import { Typography } from 'antd'
const { Title } = Typography

const SurveyTitle: FC<SurveyTitlePropsType> = (props: SurveyTitlePropsType) => {
  const { text, level, isCenter } = { ...SurveyTitleDefaultProps, ...props }

  function genFontSize() {
    if (level === 1) return '24px'
    if (level === 2) return '20px'
    if (level === 3) return '16px'
    return '16px'
  }

  return (
    <div>
      <Title
        level={level}
        style={{ textAlign: isCenter ? 'center' : 'start', fontSize: genFontSize() }}
      >
        {text}
      </Title>
    </div>
  )
}

export default SurveyTitle
