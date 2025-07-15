import { lazy } from 'react'

export default {
  path: '/request-organize/:id/approved',
  is_public: false,
  component: lazy(() => import('.')),
  layout: 'app',
  title: 'Volunteer Hub | Request Become Organize Approved'
}
