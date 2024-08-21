export type SurveyInputPropsType = {
  title?: string
  placeholder?: string
  onChange?: (newProps: SurveyInputPropsType) => void
}

export const SurveyInputDefaultProps: SurveyInputPropsType = {
  title: 'title',
  placeholder: 'enter...',
}
