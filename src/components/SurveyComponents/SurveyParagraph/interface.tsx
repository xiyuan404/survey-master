export type SurveyParagraphPropsType = {
  text?: string
  isCenter?: boolean

  // props
  onChange?: (props: SurveyParagraphPropsType) => void
  disabled?: boolean
}

export const SurveyParagraphDefaultProps = {
  text: '一行段落',
  isCenter: false,
}
