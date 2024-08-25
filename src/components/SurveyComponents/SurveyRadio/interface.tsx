export type listType = {
  value: string
  label: string
}

export type SurveyRadioPropsType = {
  title?: string
  isVertical?: boolean
  list?: listType[]
  selected?: string

  onChange?: (newProps: SurveyRadioPropsType) => void
  disabled?: boolean
}

export const SurveyRadioDefaultProps = {
  title: '单选标题',
  isVertical: false,
  list: [
    { label: 'item1', value: 'item1' },
    { label: 'item2', value: 'item2' },
    { label: 'item3', value: 'item3' },
  ],
  selected: '',
}

// 统计组件的属性类型

export type SurveyRadioStatPropsType = {
  stat: Array<{ name: string; count: number }>
}
