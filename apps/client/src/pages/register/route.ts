import { lazy } from 'react'

export default {
  path: '/register',
  is_public: false,
  component: lazy(() => import('.')),
  layout: 'blank',
  title: 'Volunteer Hub | Register'
}
