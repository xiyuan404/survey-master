import PropsComponent from './PropsComponent'
import Component from './Component'
import { SurveyTextareaDefaultProps } from './interface'

export * from './interface'

export default {
  title: '多行输入',
  type: 'surveyTextarea',
  Component,
  PropsComponent,
  defaultProps: SurveyTextareaDefaultProps,
}
