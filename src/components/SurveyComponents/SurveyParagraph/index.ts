import PropsComponent from './PropsConf'
import Component from './Component'
import { SurveyParagraphDefaultProps } from './interface'

export * from './interface'

export default {
  title: '段落',
  type: 'surveyParagraph',
  Component,
  PropsComponent,
  defaultProps: SurveyParagraphDefaultProps,
}
