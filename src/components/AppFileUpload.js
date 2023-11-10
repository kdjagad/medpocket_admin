import {
  CCol,
  CContainer,
  CFormInput,
  CFormLabel,
  image,
  CInputGroup,
  CRow,
  CImage,
} from '@coreui/react'
import React, { useEffect, useState } from 'react'

const AppFileUpload = (props) => {
  const { initfiles = null, preview = true, onChange = null } = props
  const [files, setFiles] = useState(initfiles || null)
  useEffect(() => {
    setFiles(initfiles)
  }, [initfiles])
  return (
    <div className="mb-3">
      {files && preview && (
        <div className="bg-white p-2 border-1 rounded mb-2 text-center">
          {Array.isArray(files) ? (
            <CRow>
              {files.map((file) => (
                <CCol style={{ textAlign: 'center' }}>
                  <CImage className="rounded" style={{ maxHeight: 150 }} src={file} />
                </CCol>
              ))}
            </CRow>
          ) : (
            <CImage className="rounded" src={files} style={{ maxHeight: 150 }} />
          )}
        </div>
      )}
      <CFormInput
        {...props}
        type="file"
        onChange={(e) =>
          onChange ? onChange(e) : setFiles(window.URL.createObjectURL(e.target.files[0]))
        }
      />
    </div>
  )
}

export default React.memo(AppFileUpload)
