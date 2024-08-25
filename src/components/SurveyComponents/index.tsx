import SurveyInput from './SurveyInput'

type ComponentInfoType = {
  fe_id: string
  type: string
  title: string
  isHidden: string
  props: any
}

export const getComponentByInfo = (cmpInfo: ComponentInfoType) => {
  const { type, props, isHidden, fe_id } = cmpInfo

  if (isHidden) return null

  switch (type) {
    case 'surveyInput':
      return <SurveyInput fe_id={fe_id} props={props} />
  }
}
