import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import Edit from '../pages/survey/Edit'
import SurveyLayout from 'src/layouts/SurveyLayout'
import MainLayout from 'src/layouts/MainLayout'
import ManageLayout from 'src/layouts/ManageLayout'

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/',
      },
      {
        path: 'login',
      },
      {
        path: 'register',
      },
      {
        path: 'manage',
        element: <ManageLayout />,
        children: [
          {
            path: 'list',
          },
          {
            path: 'star',
          },
          {
            path: 'trash',
          },
        ],
      },
    ],
  },
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

// -----------常量-----------

export const HOME_PATHNAME = '/'
export const LOGIN_PATHNAME = '/login'
export const Register_PATHNAME = '/register'
export const MANAGE_INDEX_PATHNAME = '/manage/list'

export function isLoginOrRegisterPage(pathname: string) {
  return [LOGIN_PATHNAME, Register_PATHNAME].includes(pathname)
}

export function isNoNeedUserInfo(pathname: string) {
  return [HOME_PATHNAME, LOGIN_PATHNAME, Register_PATHNAME].includes(pathname)
}
