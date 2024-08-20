import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import Edit from '../pages/survey/Edit'
import SurveyLayout from 'src/layouts/SurveyLayout'

const router = createBrowserRouter([
  {
    path: 'survey',
    element: <SurveyLayout />,
    children: [
      {
        path: 'edit/:id',
        element: <Edit />,
      },
      // {
      //   path: 'stat/id',
      //   element: <Stat />,
      // },
    ],
  },
])

export default router
