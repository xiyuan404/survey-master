export type OptsType = {
  value: string
  label: string
  checked: boolean
}

export type SurveyCheckboxPropsType = {
  title?: string
  isVertical?: boolean
  opts?: OptsType[]
  onChange?: (newProps: SurveyCheckboxPropsType) => void
  disabled?: boolean
}

export const SurveyCheckboxDefaultProps: SurveyCheckboxPropsType = {
  title: '多选标题',
  isVertical: false,
  opts: [
    { label: 'label1', value: 'val1', checked: false },
    { label: 'label2', value: 'val2', checked: false },
    { label: 'label3', value: 'val3', checked: false },
  ],
}

export type SurveyCheckboxStatPropsType = {
  stat: Array<{ name: string; count: number }>
}
