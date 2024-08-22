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
    { label: '选项1', value: 'item1', checked: false },
    { label: '选项2', value: 'item2', checked: false },
    { label: '选项3', value: 'item3', checked: false },
  ],
}
