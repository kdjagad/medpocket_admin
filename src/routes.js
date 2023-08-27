import React from 'react'
import Users from './views/users/Users'
import Login from './views/pages/login/Login'

// const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/users', name: 'Users', element: Users },
]

export default routes
