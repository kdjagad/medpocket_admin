import { CButton, CForm } from '@coreui/react'
import { Box, CircularProgress } from '@mui/material'
import axios from 'axios'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import api, { baseURL } from 'src/api'
import { AppFileUpload } from 'src/components'

function UploadFile(props) {
  const [loading, setLoading] = useState(false)
  const [loadingpis, setLoadingPis] = useState(false)
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
  const onsubmitpis = async (e) => {
    debugger
    try {
      setLoadingPis(true)
      e.preventDefault()
      const fd = new FormData(e.target)
      var object = {}
      fd.forEach((value, key) => (object[key] = value))
      const res = await api.post(`/admin/upload-pis`, object, {
        headers: {
          'content-type': 'multipart/form-data',
        },
      })
      setLoadingPis(false)
      console.log('res news', res)
      if (res.status == 200) {
        e.target.reset()
        toast.success('PIS Data Uploaded Successfully')
        //   navigate('/news')
      } else {
        toast.error(res.message || 'File not in correct format')
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || '')
    } finally {
      setLoadingPis(false)
    }
  }

  const downloadFile = async (path, filename = 'data-sheet') => {
    var loadingToast = toast.loading('Downloading File')
    // const res = await api.get(`/admin/${path}`)
    // if (res.status == 200) {
    //   toast.success('File Downloaded Successfully')
    // }

    axios({
      url: `${baseURL}/api/v1/admin/${path}`, //your url
      method: 'GET',
      responseType: 'blob', // important
    }).then((response) => {
      // create file link in browser's memory
      const href = URL.createObjectURL(response.data)

      // create "a" HTML element with href to file & click
      const link = document.createElement('a')
      link.href = href
      link.setAttribute('download', `${filename}-${new Date()}.xlsx`) //or any other extension
      document.body.appendChild(link)
      link.click()

      // clean up "a" element & remove ObjectURL
      document.body.removeChild(link)
      URL.revokeObjectURL(href)
      toast.dismiss(loadingToast)
      toast.success('File Downloaded Successfully')
    })
  }
  return (
    <Box sx={{ width: '100%' }}>
      <div className="row">
        <div className="col-sm-6">
          <div className="card">
            <div className="card-header d-flex align-items-center justify-content-between">
              <span>Upload Stockiest Chemist Druggist Data</span>
              <CButton
                type="button"
                color="success"
                className="px-4 d-flex align-items-center"
                onClick={() => downloadFile('download-data', 'medpocket-data-sheet')}
              >
                Download Existing Data
              </CButton>
            </div>
            <div className="card-body">
              <div className="text-center p-2">
                <strong>
                  Before upload please download existing data and change or add records on
                  downloaded file
                </strong>
                <p className="mt-3">
                  Please upload relevent file for uploading stockiest , cross reference, and chemist
                  and druggist.
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
                    {loading ? 'Uploading...' : 'Upload'}
                  </CButton>
                </CForm>
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm-6">
          <div className="card">
            <div className="card-header d-flex align-items-center justify-content-between">
              <span>Upload PIS Data</span>
              <CButton
                type="button"
                color="success"
                className="px-4 d-flex align-items-center"
                onClick={() => downloadFile('download-pis-data', 'medpocket-data-pis')}
              >
                Download Existing Data
              </CButton>
            </div>
            <div className="card-body">
              <div className="text-center p-2">
                <strong>
                  Before upload please download existing data and change or add records on
                  downloaded file
                </strong>
                <p className="mt-3">Please upload relevent file for uploading PIS.</p>
                <CForm onSubmit={onsubmitpis} encType="multipart/form-data">
                  <AppFileUpload name="file" required="required" preview={false} />
                  <CButton
                    disabled={loadingpis}
                    type="submit"
                    color="primary"
                    className="px-4 d-flex align-items-center m-auto"
                  >
                    {loadingpis && (
                      <CircularProgress size={20} style={{ color: 'white', marginRight: '10px' }} />
                    )}{' '}
                    {loadingpis ? 'Uploading...' : 'Upload'}
                  </CButton>
                </CForm>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Box>
  )
}

export default UploadFile
