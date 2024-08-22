import { createBrowserRouter, Outlet } from 'react-router-dom'

import { MainLayout } from '@/components/layout'
import {
  AddPlanPage,
  KakaoLoginPage,
  LoginPage,
  NotFoundPage,
  PlanDetailPage,
  PlanListPage,
} from '@/pages'

import { routes } from '.'

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <MainLayout>
        <Outlet />
      </MainLayout>
    ),
    errorElement: <NotFoundPage />,
    children: [
      {
        path: routes.login,
        element: <LoginPage />,
      },
      {
        path: routes.plans,
        element: <PlanListPage />,
      },
      {
        path: routes.addPlan,
        element: <AddPlanPage />,
      },
      {
        path: routes.plan,
        element: <PlanDetailPage />,
      },
      {
        path: routes.kakaoLogin,
        element: <KakaoLoginPage />,
      },
    ],
  },
])

export default router
