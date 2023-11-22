import { CContainer, CSpinner } from '@coreui/react'
import React, { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'

// routes config
import routes from '../routes'

const AppContent = () => {
  return (
    <CContainer fluid>
      <Suspense fallback={<CSpinner color="primary" />}>
        <Routes>
          {routes.map((route, idx) => {
            return (
              route.element && (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  title={`${route.name} | Medpocket Admin` || 'Medpocket Admin'}
                  element={<route.element />}
                />
              )
            )
          })}
        </Routes>
      </Suspense>
    </CContainer>
  )
}

export default React.memo(AppContent)
