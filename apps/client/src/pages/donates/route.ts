import { lazy } from 'react'

export default {
  path: '/donate',
  is_public: false,
  component: lazy(() => import('.')),
  layout: 'app',
  title: 'Volunteer Hub | Donate'
}
