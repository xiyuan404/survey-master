import React, { lazy } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import SurveyLayout from 'src/layouts/SurveyLayout'
import MainLayout from 'src/layouts/MainLayout'
import ManageLayout from 'src/layouts/ManageLayout'
import Home from 'src/pages/Home'
import NotFound from 'src/pages/NotFound'
import List from 'src/pages/manage/List'
import Star from 'src/pages/manage/Star'
import Trash from 'src/pages/manage/Trash'
import Register from 'src/pages/Register'
import Login from 'src/pages/Login'
// import Stat from 'src/pages/survey/Stat'
// import Edit from '../pages/survey/Edit'

const Stat = lazy(() => import('src/pages/survey/Stat'))
const Edit = lazy(() => import('../pages/survey/Edit'))

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'register',
        element: <Register />,
      },
      {
        path: 'manage',
        element: <ManageLayout />,
        children: [
          {
            path: 'list',
            element: <List />,
          },
          {
            path: 'star',
            element: <Star />,
          },
          {
            path: 'trash',
            element: <Trash />,
          },
        ],
      },
      {
        path: '*', // 404 路由配置，都写在最后（兜底）
        element: <NotFound />,
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
      {
        path: 'stat/:id',
        element: <Stat />,
      },
    ],
  },
])

export default router

// -----------常量-----------

export const HOME_PATHNAME = '/'
export const LOGIN_PATHNAME = '/login'
export const Register_PATHNAME = '/register'
export const MANAGE_INDEX_PATHNAME = '/manage/list'
export const SURVEY_EDIT_PATHNAME = '/survey/edit/'
export const SURVEY_STAT_PATHNAME = '/survey/stat/'

export function isLoginOrRegisterPage(pathname: string) {
  return [LOGIN_PATHNAME, Register_PATHNAME].includes(pathname)
}

export function isNoNeedUserInfo(pathname: string) {
  return [HOME_PATHNAME, LOGIN_PATHNAME, Register_PATHNAME].includes(pathname)
}
