export type SurveyInputPropsType = {
  title?: string
  placeholder?: string
  onChange?: (newProps: SurveyInputPropsType) => void
  isLocked?: boolean
}

export const SurveyInputDefaultProps: SurveyInputPropsType = {
  title: 'title',
  placeholder: 'enter...',
}
