import SurveyCheckbox from './SurveyCheckbox'
import SurveyInfo from './SurveyInfo'
import SurveyInput from './SurveyInput'
import SurveyParagraph from './SurveyParagraph'
import SurveyRadio from './SurveyRadio'
import SurveyTextarea from './SurveyTextarea'
import SurveyTitle from './SurveyTitle'

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
    case 'surveyTextarea':
      return <SurveyTextarea fe_id={fe_id} props={props} />
    case 'surveyRadio':
      return <SurveyRadio fe_id={fe_id} props={props} />
    case 'surveyCheckbox':
      return <SurveyCheckbox fe_id={fe_id} props={props} />
    case 'surveyTitle':
      return <SurveyTitle {...props} />
    case 'surveyParagraph':
      return <SurveyParagraph {...props} />
    case 'surveyInfo':
      return <SurveyInfo {...props} />
    default:
      return null
  }
}
