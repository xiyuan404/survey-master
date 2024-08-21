export type SurveyInputPropsType = {
  title?: string
  placeholder?: string
  onChange?: (newProps: SurveyInputPropsType) => void
  disabled?: boolean
}

export const SurveyInputDefaultProps: SurveyInputPropsType = {
  title: '输入框',
  placeholder: 'enter...',
}
