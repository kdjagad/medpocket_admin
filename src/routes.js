import React from 'react'
import Users from './views/users/Users'
import UserDetail from './views/users/UserDetail'
import Keys from './views/keys/Keys'
import News from './views/news/News'
import AddNews from './views/news/AddNews'
import Centers from './views/centers/Centers'
import CenterDetails from './views/centers/Details'
import StockiestRequest from './views/users/StockiestRequest'

// const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))

const routes = [
  { path: '/', exact: true, name: 'Dashboard', element: Users },
  { path: '/users', name: 'Users', element: Users },
  { path: '/keys', name: 'Keys', element: Keys },
  { path: '/news', name: 'News', element: News },
  { path: '/news/add', name: 'Add News', element: AddNews },
  { path: '/centers', name: 'Centers', element: Centers },
  { path: '/centers/:id', name: 'Center Details', element: CenterDetails },
  { path: '/users/:userId', name: 'User Details', element: UserDetail },
  { path: '/stockiest-request', name: 'Stockiest Request', element: StockiestRequest },
]

export default routes
