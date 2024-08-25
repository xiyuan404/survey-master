import React, { CSSProperties, FC } from 'react'

type PropsType = {
  text: string
  level: number
  isCenter?: boolean
}

const SurveyTitle: FC<PropsType> = ({ text, level, isCenter }: PropsType) => {
  const style: CSSProperties = {}
  if (isCenter) style.textAlign = 'center'

  switch (level) {
    case 1:
      return <h1 style={style}>{text}</h1>
    case 2:
      return <h2 style={style}>{text}</h2>
    case 3:
      return <h3 style={style}>{text}</h3>
  }
}

export default SurveyTitle
