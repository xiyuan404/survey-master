import { FC } from 'react'
import SurveyTitleConf, { SurveyTitlePropsType } from './SurveyTitle'
import SurveyInputConf, { SurveyInputPropsType } from './SurveyInput'
import SurveyParagraphConf, { SurveyParagraphPropsType } from './SurveyParagraph'
import SurveyInfoConf, { SurveyInfoPropsType } from './SurveyInfo'
import SurveyTextareaConf, { SurveyTextareaPropsType } from './SurveyTextarea'
import SurveyRadioConf, { SurveyRadioPropsType } from './SurveyRadio'

export type ComponentPropsType = SurveyInputPropsType &
  SurveyTitlePropsType &
  SurveyParagraphPropsType &
  SurveyInfoPropsType &
  SurveyTextareaPropsType &
  SurveyRadioPropsType

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
  SurveyInfoConf,
  SurveyTextareaConf,
  SurveyRadioConf,
]

export function getComponentConfByType(type: string) {
  return ComponentConfList.find(c => c.type === type)
}

export const componentConfGroup = [
  {
    groupId: 'text-group',
    groupName: '文本显示',
    components: [SurveyInfoConf, SurveyTitleConf, SurveyParagraphConf],
  },
  {
    groupId: 'input-group',
    groupName: '用户输入',
    components: [SurveyInputConf, SurveyTextareaConf],
  },
  {
    groupId: 'choose-group',
    groupName: '用户选择',
    components: [SurveyRadioConf],
  },
]
