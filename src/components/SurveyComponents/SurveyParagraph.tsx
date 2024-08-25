import React, { FC } from 'react'

type PropsType = {
  text: string
  isCenter: boolean
}

const SurveyParagraph: FC<PropsType> = ({ text, isCenter }) => {
  // 段落换行处理
  const textList = text.split('\n')

  return (
    <p>
      {textList.map((line, index) => (
        <span key={index}>
          {index > 0 && <br />}
          {line}
        </span>
      ))}
    </p>
  )
}

export default SurveyParagraph
