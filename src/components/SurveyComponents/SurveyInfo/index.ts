import Component from './Component'
import { SurveyInfoDefaultProps } from './interface'
import PropsComponent from './PropsComponent'

export * from './interface'

export default {
  title: '问卷信息',
  type: 'surveyInfo',
  Component,
  PropsComponent,
  defaultProps: SurveyInfoDefaultProps,
}
