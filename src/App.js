import React, { Component, Suspense } from 'react'
import { Toaster } from 'react-hot-toast'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ProtectedRoute from './protectedRoute'
import './scss/style.scss'

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Toaster position="bottom-center" />
        <Suspense fallback={loading}>
          <Routes>
            <Route
              exact
              path="/login"
              name="Login Page"
              element={<Login />}
              title={`Login | Medpocket Admin`}
            />
            <Route
              exact
              path="/404"
              name="Page 404"
              element={<Page404 />}
              title={`Not Found | Medpocket Admin`}
            />
            <Route
              title={`Dashboard | Medpocket Admin`}
              path="*"
              name="Dashboard"
              element={
                <ProtectedRoute>
                  <DefaultLayout />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Suspense>
      </BrowserRouter>
    )
  }
}

export default App
