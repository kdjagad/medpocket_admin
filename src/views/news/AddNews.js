import { cilCloudUpload, cilUser } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import {
  CButton,
  CCol,
  CForm,
  CFormInput,
  CFormSelect,
  CFormTextarea,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import { Box } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api, { api_url } from 'src/api'
function AddNews(props) {
  const [centers, setCenters] = useState([])
  const navigate = useNavigate()
  const onsubmit = async (e) => {
    e.preventDefault()
    const fd = new FormData(e.target)
    var object = {}
    fd.forEach((value, key) => (object[key] = value))
    const res = await api.post(`${api_url}/admin/news/add`, object, {
      headers: {
        'content-type': 'multipart/form-data',
      },
    })
    console.log('res news', res)
    if (res.status == 200) {
      navigate('/news')
    }
  }
  const getCenters = async () => {
    const res = await api.get(`/admin/centers`)
    console.log('res', res)
    const newArr = [{ label: 'All', value: 'All' }]
    let { data = [] } = res.data
    data.map((dt) => newArr.push({ label: dt.center, value: dt.center }))
    setCenters([...newArr])
  }

  React.useEffect(() => {
    getCenters()
  }, [])
  return (
    <Box sx={{ width: '100%' }}>
      <CForm onSubmit={onsubmit} encType="multipart/form-data">
        <h1>Add News</h1>
        <CInputGroup className="mb-3">
          <CInputGroupText>
            <CIcon icon={cilUser} />
          </CInputGroupText>
          <CFormInput placeholder="Header" autoComplete="messageHeader" name="messageHeader" />
        </CInputGroup>
        <CInputGroup className="mb-3">
          <CInputGroupText>
            <CIcon icon={cilUser} />
          </CInputGroupText>
          <CFormTextarea placeholder="Details" autoComplete="messageDetail" name="messageDetail" />
        </CInputGroup>
        <CInputGroup className="mb-3">
          <CInputGroupText>
            <CIcon icon={cilUser} />
          </CInputGroupText>
          <CFormSelect placeholder="Select Center" name="center" options={centers} />
        </CInputGroup>
        <CInputGroup className="mb-3">
          <CInputGroupText>
            <CIcon icon={cilCloudUpload} />
          </CInputGroupText>
          <CFormInput
            placeholder="Select Attachments"
            type="file"
            multiple={true}
            name="attachments"
          />
        </CInputGroup>
        <CRow>
          <CCol xs={6}>
            <CButton type="submit" color="primary" className="px-4">
              Add
            </CButton>
          </CCol>
          <CCol xs={6} className="text-right"></CCol>
        </CRow>
      </CForm>
    </Box>
  )
}

export default AddNews
