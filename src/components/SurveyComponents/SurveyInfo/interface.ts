export type SurveyInfoPropsType = {
  title?: string
  desc?: string

  onChange?: (newProps: SurveyInfoPropsType) => void
  disabled?: boolean
}

export const SurveyInfoDefaultProps = {
  title: '问卷标题',
  desc: '问卷描述',
}
