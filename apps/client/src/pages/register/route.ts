import { lazy } from 'react'

export default {
  path: '/register',
  is_public: true,
  component: lazy(() => import('.')),
  layout: 'blank',
  title: 'Volunteer Hub | Register'
}
