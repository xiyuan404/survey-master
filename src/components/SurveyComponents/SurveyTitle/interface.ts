export type SurveyTitlePropsType = {
  text?: string
  level?: 1 | 2 | 3 | 4
  isCenter?: boolean
  disabled?: boolean
  onChange?: (newProps: SurveyTitlePropsType) => void
}

export const SurveyTitleDefaultProps: SurveyTitlePropsType = {
  text: '文本',
  level: 1,
  isCenter: false,
}
