import { FC } from 'react'
import SurveyTitleConf, { SurveyTitlePropsType } from './SurveyTitle'
import SurveyInputConf, { SurveyInputPropsType } from './SurveyInput'

export type ComponentPropsType = SurveyInputPropsType & SurveyTitlePropsType

export type ComponentConfType = {
  type: string
  Component: FC<ComponentPropsType>
  defaultProps: ComponentPropsType
}

const ComponentConfList: ComponentConfType[] = [SurveyTitleConf, SurveyInputConf]

export function getComponentConfByType(type: string) {
  return ComponentConfList.find(c => c.type === type)
}
