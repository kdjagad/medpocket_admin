import { CButton, CCol, CForm, CProgressBar, CProgressStacked, CRow, CToast } from '@coreui/react'
import { Box, CircularProgress } from '@mui/material'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import api from 'src/api'
import { AppFileUpload } from 'src/components'

function UploadFile(props) {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const onsubmit = async (e) => {
    debugger
    try {
      setLoading(true)
      e.preventDefault()
      const fd = new FormData(e.target)
      var object = {}
      fd.forEach((value, key) => (object[key] = value))
      const res = await api.post(`/admin/upload`, object, {
        headers: {
          'content-type': 'multipart/form-data',
        },
      })
      setLoading(false)
      console.log('res news', res)
      if (res.status == 200) {
        e.target.reset()
        toast.success('Data Uploaded Successfully')
        //   navigate('/news')
      } else {
        toast.error(res.message || 'File not in correct format')
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || '')
    } finally {
      setLoading(false)
    }
  }
  return (
    <Box sx={{ width: '100%' }}>
      <div className="text-center p-5">
        <h3>Upload Data</h3>
        <p>
          Please upload relevent file for uploading stockiest , cross reference, and chemist and
          drugist.
        </p>
        <CForm onSubmit={onsubmit} encType="multipart/form-data">
          <AppFileUpload name="file" required="required" preview={false} />
          <CButton
            disabled={loading}
            type="submit"
            color="primary"
            className="px-4 d-flex align-items-center m-auto"
          >
            {loading && (
              <CircularProgress size={20} style={{ color: 'white', marginRight: '10px' }} />
            )}{' '}
            Add
          </CButton>
        </CForm>
      </div>
    </Box>
  )
}

export default UploadFile
