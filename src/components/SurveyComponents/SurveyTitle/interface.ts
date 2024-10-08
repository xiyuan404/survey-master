export type SurveyTitlePropsType = {
  text?: string
  level?: 1 | 2 | 3 | 4
  isCenter?: boolean
  disabled?: boolean
  onChange?: (newProps: SurveyTitlePropsType) => void
}

export const SurveyTitleDefaultProps: SurveyTitlePropsType = {
  text: '一行文本',
  level: 2,
  isCenter: false,
}
