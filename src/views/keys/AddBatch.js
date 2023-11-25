import { cilUser } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import {
  CButton,
  CCol,
  CForm,
  CFormInput,
  CFormSelect,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import { Box } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import api from 'src/api'
function AddBatch(props) {
  const [centers, setCenters] = React.useState([])
  const navigate = useNavigate()
  const onsubmit = async (e) => {
    e.preventDefault()
    const fd = new FormData(e.target)
    var object = {}
    fd.forEach((value, key) => (object[key] = value))
    const res = await api.post(`/admin/keys-batch`, object)
    console.log('res batches', res)
    if (res.status == 200) {
      navigate('/keys')
    }
  }
  return (
    <Box sx={{ width: '100%' }}>
      <CForm onSubmit={onsubmit} encType="multipart/form-data">
        <h1>Add Keys Batch</h1>
        <CInputGroup className="mb-3">
          <CInputGroupText>
            <CIcon icon={cilUser} />
          </CInputGroupText>
          <CFormInput placeholder="Batch Name" name="batch_name" required="required" />
        </CInputGroup>
        <CInputGroup className="mb-3">
          <CInputGroupText>
            <CIcon icon={cilUser} />
          </CInputGroupText>
          <CFormInput
            type="number"
            placeholder="No. of keys you want to generate"
            name="number_of_keys"
            required="required"
          />
        </CInputGroup>
        <CInputGroup className="mb-3">
          <CInputGroupText>
            <CIcon icon={cilUser} />
          </CInputGroupText>
          <CFormSelect
            placeholder="Select Print Status"
            name="printed_status"
            required="required"
            options={[
              { label: 'Not Printed', value: 0 },
              { label: 'Printed', value: 1 },
            ]}
          />
        </CInputGroup>

        <CRow>
          <CCol xs={6}>
            <CButton type="submit" color="primary" className="px-4">
              Generate
            </CButton>
          </CCol>
          <CCol xs={6} className="text-right"></CCol>
        </CRow>
      </CForm>
    </Box>
  )
}

export default AddBatch
