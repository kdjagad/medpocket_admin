import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter>
      <div>
        <a href="https://coreui.io" target="_blank" rel="noopener noreferrer">
          MedPocket
        </a>
        <span className="ms-1">&copy; 2023</span>
      </div>
      <div className="ms-auto">
        <span className="me-1">Powered by</span>
        <a href="http://medisoftservices.com" target="_blank" rel="noopener noreferrer">
          Medisoft Services
        </a>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
