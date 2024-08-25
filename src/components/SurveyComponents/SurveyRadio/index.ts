import Component from './Component'
import { SurveyRadioDefaultProps } from './interface'
import PropsComponent from './PropsComponent'
import StatComponent from './StatComponent'

export * from './interface'

export default {
  title: '多选标题',
  type: 'surveyRadio',
  Component,
  PropsComponent,
  defaultProps: SurveyRadioDefaultProps,
  StatComponent: StatComponent,
}
