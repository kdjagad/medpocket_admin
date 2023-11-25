import Centers from './views/centers/Centers'
import CenterDetails from './views/centers/Details'
import AddBatch from './views/keys/AddBatch'
import KeysBatch from './views/keys/Batches'
import Keys from './views/keys/Keys'
import AddNews from './views/news/AddNews'
import News from './views/news/News'
import UploadFile from './views/upload'
import StockiestRequest from './views/users/StockiestRequest'
import UserDetail from './views/users/UserDetail'
import Users from './views/users/Users'

// const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))

const routes = [
  { path: '/', exact: true, name: 'Dashboard', element: Users },
  { path: '/users', name: 'Users', element: Users },
  { path: '/keys', name: 'Keys', element: KeysBatch },
  { path: '/keys/:id', name: 'Batch Keys', element: Keys },
  { path: '/keys-add', name: 'Add Keys Batch', element: AddBatch },
  { path: '/news', name: 'News', element: News },
  { path: '/news/add', name: 'Add News', element: AddNews },
  { path: '/centers', name: 'Centers', element: Centers },
  { path: '/centers/:id', name: 'Center Details', element: CenterDetails },
  { path: '/users/:userId', name: 'User Details', element: UserDetail },
  { path: '/stockiest-request', name: 'Stockiest Request', element: StockiestRequest },
  { path: '/upload-data', name: 'Upload Data', element: UploadFile },
]

export default routes
