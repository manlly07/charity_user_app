import { lazy } from 'react'

export default {
  path: '/organization/charities/update/:id',
  is_public: false,
  component: lazy(() => import('.')),
  layout: 'organization',
  title: 'Volunteer Hub | Update Organization Charities'
}
