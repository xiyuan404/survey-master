export type SurveyTextareaPropsType = {
  title?: string
  placeholder?: string
  onChange?: (newProps: SurveyTextareaPropsType) => void
  disabled?: boolean
}

export const SurveyTextareaDefaultProps: SurveyTextareaPropsType = {
  title: '多行输入',
  placeholder: 'enter...',
}
