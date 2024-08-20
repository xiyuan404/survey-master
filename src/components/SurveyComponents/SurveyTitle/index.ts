import Component from './Component'
import { SurveyTitleDefaultProps } from './interface'

export * from './interface' // 集中统一导出类型

// 组件配置
export default {
  title: '标题',
  type: 'surveyTitle', // 渲染问卷列表时根据type选择
  Component,
  defaultProps: SurveyTitleDefaultProps,
}
