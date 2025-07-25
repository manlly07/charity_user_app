import { lazy } from 'react'

export default {
  path: '/logout',
  is_public: true,
  component: lazy(() => import('.')),
  layout: 'blank',
  title: 'Volunteer Hub | Logout'
}
