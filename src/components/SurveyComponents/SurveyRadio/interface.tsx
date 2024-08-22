export type OptsType = {
  value: string
  label: string
}

export type SurveyRadioPropsType = {
  title?: string
  isVertical?: boolean
  opts?: OptsType[]
  selected?: string

  onChange?: (newProps: SurveyRadioPropsType) => void
  disabled?: boolean
}

export const SurveyRadioDefaultProps = {
  title: '单选标题',
  isVertical: false,
  opts: [
    { label: 'item1', value: 'item1' },
    { label: 'item2', value: 'item2' },
    { label: 'item3', value: 'item3' },
  ],
  selected: '',
}
