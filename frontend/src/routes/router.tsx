import { createBrowserRouter, Outlet } from 'react-router-dom'

import Layout from '@/components/layout'
import {
  AddPlanPage,
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
      <Layout>
        <Outlet />
      </Layout>
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
    ],
  },
])

export default router
