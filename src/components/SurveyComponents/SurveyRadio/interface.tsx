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
    { label: 'label1', value: 'val1' },
    { label: 'label2', value: 'val2' },
    { label: 'label3', value: 'val3' },
  ],
  selected: 'val1',
}

// 统计组件的属性类型

export type SurveyRadioStatPropsType = {
  stat: Array<{ name: string; count: number }>
}
