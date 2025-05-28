import { lazy } from 'react'

export default {
  path: '/',
  is_public: false,
  component: lazy(() => import('.')),
  layout: 'app',
  title: 'SkyJourney | Home'
}
