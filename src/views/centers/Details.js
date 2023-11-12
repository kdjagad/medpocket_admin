import {
  CButton,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CFormTextarea,
  CRow,
} from '@coreui/react'
import { Box } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import api from 'src/api'
import { AppFileUpload, AppInput } from 'src/components'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import Editor from 'ckeditor5-custom-build/build/ckeditor'
import CenterAds from './CenterAds'

function CenterDetails(props) {
  const { id = null } = useParams()
  const [center, setCenter] = useState(null)

  const [enabled, setEnabled] = useState(0)
  const [speech, setSpeech] = useState('')
  const navigate = useNavigate()
  const onsubmit = async (e) => {
    e.preventDefault()
    const fd = new FormData(e.target)
    var object = {}
    fd.forEach((value, key) => (object[key] = value))
    var res = null
    if (id > 0) {
      res = await api.put(`/admin/centers/${id}`, object, {
        headers: {
          'content-type': 'multipart/form-data',
        },
      })
    } else {
      res = await api.post(`/admin/centers`, object, {
        headers: {
          'content-type': 'multipart/form-data',
        },
      })
    }
    console.log('res news', res)
    if (res.status == 200) {
      navigate('/centers')
    }
  }
  const getCenterById = async (id) => {
    const res = await api.get(`/admin/centers/${id}`)
    console.log('res', res)

    let { data = null } = res.data

    setCenter(data)
    setEnabled(data?.isEnabled)
    setSpeech(data?.speech || '')
  }

  React.useEffect(() => {
    if (id > 0 && id && id != 'new') getCenterById(id)
  }, [])
  function getBase64(file) {
    var reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = function () {
      console.log(reader.result)
    }
    reader.onerror = function (error) {
      console.log('Error: ', error)
    }
  }

  const uploadAdapter = (loader) => {
    return {
      upload: async () => {
        const file = await loader.file
        const base64 = await getBase64(file)
        return {
          default: base64,
        }
      },
    }
  }
  function uploadPlugin(editor) {
    editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
      return uploadAdapter(loader)
    }
  }
  return (
    <Box sx={{ width: '100%' }}>
      <CForm onSubmit={onsubmit} encType="multipart/form-data">
        <CFormInput type="hidden" name="speech" value={speech} />
        <h1>Center Details</h1>
        <CContainer style={{ marginTop: 50 }}>
          <CRow>
            <CCol>
              <AppInput name="center" label="Center" defaultValue={center?.center} />
            </CCol>
            <CCol>
              <CFormSelect
                label="Enabled"
                options={[
                  { label: 'Yes', value: 1 },
                  { label: 'No', value: 0 },
                ]}
                placeholder="Select Enabled"
                value={enabled}
                onChange={(e) => setEnabled(e.target.value)}
                name="isEnabled"
              />
            </CCol>
          </CRow>
          <CRow className="mb-3">
            <CCol>
              <CFormLabel>Speech</CFormLabel>
              <CKEditor
                editor={Editor}
                config={{
                  extraPlugins: [uploadPlugin],
                }}
                data={speech}
                onReady={(editor) => {
                  // You can store the "editor" and use when it is needed.
                  console.log('Editor is ready to use!', editor)
                }}
                onChange={(event, editor) => {
                  const data = editor.getData()
                  console.log({ event, editor, data })
                  setSpeech(data)
                }}
                onBlur={(event, editor) => {
                  console.log('Blur.', editor)
                }}
                onFocus={(event, editor) => {
                  console.log('Focus.', editor)
                }}
              />
            </CCol>
          </CRow>
          <CRow className="mb-3">
            <CCol>
              <AppFileUpload name="header" label="Header Logo" initfiles={center?.header} />
            </CCol>
            <CCol>
              <AppFileUpload name="newslogo" label="News Logo" initfiles={center?.newslogo} />
            </CCol>
          </CRow>
          <CRow>
            <CCol xs={6}>
              <CButton type="submit" color="primary" className="px-4 mb-4">
                Save
              </CButton>
            </CCol>
            <CCol xs={6} className="text-right"></CCol>
          </CRow>
          <CRow className="mb-3">
            <CCol>
              <CenterAds id={id} />
            </CCol>
          </CRow>
        </CContainer>
      </CForm>
    </Box>
  )
}

export default CenterDetails
