import { lazy } from 'react'

export default {
  path: '/request-organize/success',
  is_public: false,
  component: lazy(() => import('.')),
  layout: 'app',
  title: 'Volunteer Hub | Send Request Become Organize Success'
}
