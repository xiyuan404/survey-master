import PropsComponent from './PropsComponent'
import Component from './Component'
import { SurveyInputDefaultProps } from './interface'

export * from './interface'

export default {
  title: '输入框',
  type: 'surveyInput',
  Component,
  PropsComponent,
  defaultProps: SurveyInputDefaultProps,
}
