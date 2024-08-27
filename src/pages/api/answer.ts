/**
 *
 * @param reqBody raw answer info
 * @returns 格式化后答卷信息
 */

import { postAnswer } from '@/services/answer'
import { NextApiRequest, NextApiResponse } from 'next'

// flat vs nest data structure
function getAnswerInfo(reqBody: any) {
  const answerList: any[] = []
  Object.keys(reqBody).forEach((key) => {
    if (key === 'surveyId') return
    answerList.push({
      componentId: key,
      value: reqBody[key],
    })
  })

  return {
    surveyId: reqBody.surveyId,
    answerList,
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    // 不是 post 则返回错误
    res.status(200).json({ errno: -1, msg: 'Method 错误' })
  }

  // 获取并格式化表单数据
  const answerInfo = getAnswerInfo(req.body)

  try {
    // 提交到服务端 Mock
    const resData = await postAnswer(answerInfo)
    if (resData.errno === 0) {
      // 如果提交成功了
      res.redirect('/success')
    } else {
      // 提交失败了
      res.redirect('/fail')
    }
  } catch (err) {
    res.redirect('/fail')
  }
}
