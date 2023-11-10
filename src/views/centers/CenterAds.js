import Carousel from 'react-grid-carousel'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCardImage,
  CCloseButton,
  CCol,
  CForm,
  CRow,
} from '@coreui/react'
import React from 'react'
import api from 'src/api'
import { AppFileUpload } from 'src/components'

function CenterAds(props) {
  const { id = 0 } = props
  const [centerAds, setCenterAds] = React.useState([])
  const getCentersAds = async (centerId = 0) => {
    const res = await api.get(`/admin/centers-ads/${centerId}`)
    console.log('res ccc', res)
    setCenterAds([...res.data.data])
  }
  const deleteCenterAds = async (centerAdid = 0) => {
    const res = await api.delete(`/admin/centers-ads/${centerAdid}`)
    console.log('res ccc', res)
    getCentersAds(id)
  }
  const postCenterAds = async (e) => {
    e.preventDefault()
    const fd = new FormData()
    fd.append('center_id', id)
    fd.append('centerAds', e.target.files[0])
    var object = {}
    fd.forEach((value, key) => (object[key] = value))
    var res = await api.post(`/admin/centers-ads`, object, {
      headers: {
        'content-type': 'multipart/form-data',
      },
    })

    console.log('res cc', res)
    if (res.status == 200) {
      getCentersAds(id)
    }
  }
  React.useEffect(() => {
    if (id > 0 && id && id != 'new') getCentersAds(id)
  }, [id])

  return (
    <>
      <h3>Upload Center Ads Here</h3>
      <CRow>
        <CCol sm="3">
          <CCard className="text-center">
            <CCardHeader style={{ justifyContent: 'space-between', display: 'flex' }}>
              Center Ads
            </CCardHeader>
            <CCardBody>
              <AppFileUpload
                name="centerAds"
                id="centerAds"
                label="Click Here Upload New Image"
                style={{ display: 'none' }}
                multiple
                onChange={postCenterAds}
              />
              <CButton
                className="btn btn-lg btn-primary"
                onClick={() => {
                  document.getElementById('centerAds').click()
                }}
              >
                Upload
              </CButton>
            </CCardBody>
          </CCard>
        </CCol>
        {centerAds.map((ad) => {
          if (!ad['attachment']) return null
          const fileName = ad['attachment'].split('/').pop()
          return (
            <CCol sm="3">
              <CCard>
                <CCardHeader style={{ justifyContent: 'space-between', display: 'flex' }}>
                  {fileName}
                  <CCloseButton
                    onClick={() => {
                      deleteCenterAds(ad['Id'])
                    }}
                    color="red"
                  />
                </CCardHeader>
                <CCardImage width="100%" src={ad['attachment']} />
              </CCard>
            </CCol>
          )
        })}
      </CRow>
    </>
  )
}

export default CenterAds
