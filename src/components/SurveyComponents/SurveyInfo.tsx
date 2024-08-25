import React, { FC } from 'react'

type PropsType = {
  title: string
  desc: string
}

const SurveyInfo: FC<PropsType> = ({ title, desc }) => {
  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>{title}</h1>
      <p>{desc}</p>
    </div>
  )
}

export default SurveyInfo
