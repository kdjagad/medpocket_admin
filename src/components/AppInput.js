import { CContainer, CFormInput, CFormLabel, CInputGroup } from '@coreui/react'
import React from 'react'

const AppInput = (props) => {
  return (
    <div className="mb-3">
      <CFormInput {...props} />
    </div>
  )
}

export default React.memo(AppInput)
