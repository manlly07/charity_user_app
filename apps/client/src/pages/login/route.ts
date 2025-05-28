import { lazy } from 'react'

export default {
  path: '/login',
  is_public: false,
  component: lazy(() => import('.')),
  layout: 'blank',
  title: 'Volunteer Hub | Login'
}
