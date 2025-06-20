import { lazy } from 'react'

export default {
  path: '/request-organize/status',
  is_public: false,
  component: lazy(() => import('.')),
  layout: 'app',
  title: 'Volunteer Hub | Request Become Organize Status'
}
