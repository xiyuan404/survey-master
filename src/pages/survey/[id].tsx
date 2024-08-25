import PageWrapper from '@/components/PageWrapper'
import { getComponentByInfo } from '@/components/SurveyComponents'
import { getSurveyInfoById } from '@/services/survey'

import styles from '@/styles/Survey.module.scss'

type PropsType = {
  errno: number
  data?: {
    id: string
    title: string
    desc?: string
    js?: string
    css?: string
    isPublished: boolean
    isDeleted: boolean
    componentList: Array<any>
  }
  msg?: string
}

export default function Survey(props: PropsType) {
  const { errno, data, msg = '' } = props

  /**
   * 渲染问卷的组件列表前校验 early return pattern
   */

  if (errno !== 0) {
    return (
      <PageWrapper title="错误">
        <h1>该份问卷还不存在</h1>
        <p>{msg}</p>
      </PageWrapper>
    )
  }

  const {
    id,
    isDeleted,
    isPublished,
    desc = '',
    title = '',
    componentList = [],
  } = data || {}

  if (isDeleted) {
    return (
      <PageWrapper title={title} desc={desc}>
        <h1>title</h1>
        <p>该份问卷已被删除</p>
      </PageWrapper>
    )
  }

  if (!isPublished) {
    return (
      <PageWrapper title={title} desc={desc}>
        <h1>{title}</h1>
        <p>该份问卷还未发布</p>
      </PageWrapper>
    )
  }

  // 遍历组件信息并渲染对应组件
  const ComponentListElem = (
    <>
      {componentList.map((cmpInfo) => {
        const ComponentElem = getComponentByInfo(cmpInfo)
        return (
          <div key={cmpInfo.fe_id} className={styles.componentWrapper}>
            {ComponentElem}
          </div>
        )
      })}
    </>
  )

  return (
    <PageWrapper title={title} desc={desc}>
      <form method="post" action="/api/answer">
        <input type="hidden" name="surveyId" value={id} />
        {ComponentListElem}
        <div className={styles.submitBtnContainer}>
          <button type="submit">提交</button>
        </div>
      </form>
    </PageWrapper>
  )
}

export async function getServerSideProps({
  params,
}: {
  params: { id: string }
}) {
  const { id = '' } = params
  console.log('params', params)

  // 根据id获取问卷信息
  const data = (await getSurveyInfoById(id)) || {}
  console.log('data', data)
  return {
    props: data,
  }
}
