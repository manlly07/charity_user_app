import { lazy } from 'react'

export default {
  path: '/forgot-password',
  is_public: true,
  component: lazy(() => import('.')),
  layout: 'blank',
  title: 'Volunteer Hub | Forgot Password'
}
