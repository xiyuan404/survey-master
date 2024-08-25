import StatComponent from './StatComponent'
import Component from './Component'
import { SurveyCheckboxDefaultProps } from './interface'
import PropsComponent from './PropsComponent'

export * from './interface'

export default {
  title: '多选',
  type: 'surveyCheckbox',
  Component,
  PropsComponent,
  defaultProps: SurveyCheckboxDefaultProps,
  StatComponent,
}
