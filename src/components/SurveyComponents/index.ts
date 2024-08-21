import { FC } from 'react'
import SurveyTitleConf, { SurveyTitlePropsType } from './SurveyTitle'
import SurveyInputConf, { SurveyInputPropsType } from './SurveyInput'
import SurveyParagraphConf, { SurveyParagraphPropsType } from './SurveyParagraph'

export type ComponentPropsType = SurveyInputPropsType &
  SurveyTitlePropsType &
  SurveyParagraphPropsType

export type ComponentConfType = {
  type: string
  title: string
  PropsComponent: FC<ComponentPropsType>
  Component: FC<ComponentPropsType>
  defaultProps: ComponentPropsType
}

const ComponentConfList: ComponentConfType[] = [
  SurveyTitleConf,
  SurveyInputConf,
  SurveyParagraphConf,
]

export function getComponentConfByType(type: string) {
  return ComponentConfList.find(c => c.type === type)
}

export const componentConfGroup = [
  {
    groupId: 'text-group',
    groupName: '文本显示',
    components: [SurveyTitleConf, SurveyParagraphConf],
  },
  {
    groupId: 'input-group',
    groupName: '用户输入',
    components: [SurveyInputConf],
  },
]
