import { lazy } from 'react'

export default {
  path: '/login',
  is_public: true,
  component: lazy(() => import('.')),
  layout: 'blank',
  title: 'Volunteer Hub | Login'
}
