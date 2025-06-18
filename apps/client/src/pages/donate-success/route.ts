import { lazy } from 'react'

export default {
  path: '/donate/success/:id',
  is_public: false,
  component: lazy(() => import('.')),
  layout: 'blank',
  title: 'Volunteer Hub | Donate Successfully'
}
