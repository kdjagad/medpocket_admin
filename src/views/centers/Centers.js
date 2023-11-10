import * as React from 'react'
import Box from '@mui/material/Box'
import { DataGrid } from '@mui/x-data-grid'
import api from 'src/api'
import { NavLink } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardHeader,
  CCardImage,
  CCardLink,
  CCloseButton,
  CContainer,
  CImage,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from '@coreui/react'
import Carousel from 'react-grid-carousel'

const Centers = () => {
  const [visible, setVisible] = React.useState(false)
  const [data, setData] = React.useState([])
  const [centerAds, setCenterAds] = React.useState([])
  const getCenters = async () => {
    const res = await api.get(`/admin/centers`)
    console.log('res', res)
    setData([...res.data.data])
  }
  const getCentersAds = async (centerId = 0) => {
    const res = await api.get(`/admin/centers-ads/${centerId}`)
    console.log('res ccc', res)
    setCenterAds([...res.data.data])
  }

  const deleteCenterAds = async (centerAdId = 0) => {
    const res = await api.delete(`/admin/centers-ads/${centerAdId}`)
    console.log('res ccc', res)
  }
  const deleteCenter = async (id = 0) => {
    const res = await api.delete(`/admin/centers/${id}`)
    console.log('res ccc', res)
    getCenters()
  }

  React.useEffect(() => {
    getCenters()
  }, [])
  const columns = [
    { field: 'id', headerName: 'ID', width: 60 },
    {
      field: 'center',
      headerName: 'Center',
      flex: 1,
    },

    {
      field: 'speech',
      headerName: 'Speech',
      flex: 1,
    },
    {
      field: 'header',
      headerName: 'Header',
      flex: 1,
      renderCell: ({ row }) => {
        return (
          <CContainer style={{ padding: 10 }}>
            <CImage src={row['header']} style={{ height: 100 }} />
          </CContainer>
        )
      },
    },
    {
      field: 'newslogo',
      headerName: 'News Logo',
      flex: 1,
      renderCell: ({ row }) => {
        return (
          <CContainer style={{ padding: 10 }}>
            <CImage src={row['newslogo']} style={{ height: 100, width: 100 }} />
          </CContainer>
        )
      },
    },
    {
      // field: '',
      headerName: 'Action',
      flex: 1,
      renderCell: ({ row }) => {
        return (
          <>
            <NavLink className="btn btn-sm btn-primary" to={`/centers/${row['id']}`}>
              View
            </NavLink>
            <NavLink
              className="btn btn-sm btn-primary"
              to={`#`}
              onClick={() => {
                var confirm = window.confirm('Are you sure to delete center?')
                if (confirm) deleteCenter(row['id'])
              }}
            >
              Delete
            </NavLink>
          </>
        )
      },
    },
  ]

  return (
    <Box sx={{ width: '100%' }}>
      <div className="d-flex align-items-center justify-content-end">
        <NavLink to="/centers/new" className="btn btn-sm btn-primary">
          Add Center
        </NavLink>
      </div>
      <DataGrid
        rows={data}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 50,
            },
          },
        }}
        pageSizeOptions={[50]}
        disableRowSelectionOnClick
      />
      <CModal
        visible={visible}
        onClose={() => setVisible(false)}
        aria-labelledby="LiveDemoExampleLabel"
        size="xl"
        alignment="center"
      >
        <CModalHeader onClose={() => setVisible(false)}>
          <CModalTitle id="LiveDemoExampleLabel">Ads</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <Carousel cols={3} rows={1} gap={10} loop>
            {centerAds.map((ad) => {
              if (!ad['attachment']) return null
              const fileName = ad['attachment'].split('/').pop()
              return (
                <Carousel.Item>
                  <CCard>
                    <CCardHeader style={{ justifyContent: 'space-between', display: 'flex' }}>
                      {fileName}
                      <CCloseButton
                        onClick={() => {
                          deleteCenterAds(ad['id'])
                        }}
                        color="red"
                      />
                    </CCardHeader>
                    <CCardImage width="100%" src={ad['attachment']} />
                  </CCard>
                </Carousel.Item>
              )
            })}
          </Carousel>
        </CModalBody>
      </CModal>
    </Box>
  )
}

export default Centers
