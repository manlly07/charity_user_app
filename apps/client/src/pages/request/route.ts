import { lazy } from 'react'

export default {
  path: '/request-organize',
  is_public: false,
  component: lazy(() => import('.')),
  layout: 'blank',
  title: 'Volunteer Hub | Become Organize'
}
