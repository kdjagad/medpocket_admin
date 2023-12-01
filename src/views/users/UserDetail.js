import { CButton, CContainer, CForm, CFormInput, CFormLabel } from '@coreui/react'
import { DataGrid } from '@mui/x-data-grid'
import { useEffect, useState } from 'react'
import { NotificationContainer, NotificationManager } from 'react-notifications'
import 'react-notifications/lib/notifications.css'
import { NavLink, useParams } from 'react-router-dom'
import api, { baseURL } from 'src/api'

const UserDetail = (props) => {
  const [user, setUser] = useState(null)
  const { userId = 0 } = useParams()
  const getUser = async (userId) => {
    const res = await api.get(`/admin/users/${userId}`)
    if (res.status == 200) {
      setUser(res.data.data)
    }
  }
  const updateUser = async (userId) => {
    const res = await api.post(`/admin/users/${userId}`, user)
    if (res.status == 200) {
      getUser(userId)
      NotificationManager.success('User Updated')
    }
  }
  useEffect(() => {
    getUser(userId)
  }, [userId])

  const onChangeText = (e) => {
    const name = e.target.name
    const updUser = {
      ...user,
      [name]: e.target.value,
    }
    setUser(updUser)
  }

  const onSubmit = (e) => {
    e.preventDefault()
    updateUser(userId)
  }

  const columnsStockiests = [
    { field: 'id', headerName: 'ID', width: 50 },
    { flex: 1, field: 'firm_name', headerName: 'Firm Name' },
    { flex: 1, field: 'phone', headerName: 'Phone' },
    { flex: 1, field: 'center', headerName: 'Center' },
    {
      flex: 1,
      field: 'filename',
      headerName: 'Document',
      renderCell: ({ row }) => {
        return <p>{row['attachment'].split('\\').pop()}</p>
      },
    },
    {
      flex: 1,
      field: 'attachment',
      headerName: 'Attachment',
      renderCell: ({ row }) => {
        return (
          <NavLink
            className={'btn btn-primary btn-sm'}
            target="_blank"
            download={'Attachment'}
            to={`${baseURL}/${row['attachment']}`}
          >
            View
          </NavLink>
        )
      },
    },
  ]

  const columnsProducts = [
    { field: 'id', headerName: 'ID', width: 50 },
    {
      flex: 1,
      field: 'filename',
      headerName: 'Document',
      renderCell: ({ row }) => {
        return <p>{row['attachment'].split('\\').pop()}</p>
      },
    },
    {
      flex: 1,
      field: 'attachment',
      headerName: 'Attachment',
      renderCell: ({ row }) => {
        return (
          <NavLink
            className={'btn btn-primary btn-sm'}
            target="_blank"
            download={'Attachment'}
            to={`${baseURL}/${row['attachment']}`}
          >
            View
          </NavLink>
        )
      },
    },
  ]

  console.log('user', user)
  if (!user) return null
  return (
    <CContainer fluid>
      <div className="card">
        <CForm onSubmit={onSubmit}>
          <div className="card-header">User Info</div>
          <div className="card-body">
            <div className="row">
              <div className="col-sm-6">
                <CFormLabel>First Name</CFormLabel>
                <CFormInput
                  type="text"
                  className="form-control"
                  name="first_name"
                  value={user['first_name']}
                  onChange={onChangeText}
                />
              </div>
              <div className="col-sm-6">
                <CFormLabel>Last Name</CFormLabel>
                <CFormInput
                  type="text"
                  className="form-control"
                  name="last_name"
                  value={user['last_name']}
                  onChange={onChangeText}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-sm-6">
                <CFormLabel>Email</CFormLabel>
                <CFormInput
                  type="text"
                  className="form-control"
                  name="email"
                  value={user['email']}
                  onChange={onChangeText}
                />
              </div>
              <div className="col-sm-6">
                <CFormLabel>Phone</CFormLabel>
                <CFormInput
                  type="number"
                  className="form-control"
                  name="phone"
                  value={user['phone']}
                  onChange={onChangeText}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-sm-6">
                <CFormLabel>Reg Key</CFormLabel>
                <CFormInput
                  type="text"
                  readOnly
                  className="form-control"
                  name="reg_key"
                  value={user['reg_key']}
                  onChange={onChangeText}
                />
              </div>
              <div className="col-sm-6">
                <CFormLabel>Center</CFormLabel>
                <CFormInput
                  type="text"
                  className="form-control"
                  name="city"
                  value={user['city']}
                  onChange={onChangeText}
                />
              </div>
            </div>
          </div>
          <div className="card-footer d-flex justify-content-end">
            <CButton type="submit">Save</CButton>
          </div>
          <NotificationContainer />
        </CForm>
      </div>
      <div className="row mt-5">
        <div className="col-sm-6">
          <div className="card">
            <div className="card-header">Uploaded Stockiest</div>
            <div className="card-body">
              <DataGrid
                rows={user?.uploaded_stockiests || []}
                columns={columnsStockiests}
                initialState={{
                  pagination: {
                    paginationModel: {
                      pageSize: 100,
                    },
                  },
                }}
                pageSizeOptions={[10]}
                // checkboxSelection
                disableRowSelectionOnClick
              />
            </div>
          </div>
        </div>
        <div className="col-sm-6">
          <div className="card">
            <div className="card-header">Uploaded Products</div>
            <div className="card-body">
              <DataGrid
                rows={user?.uploaded_products || []}
                columns={columnsProducts}
                initialState={{
                  pagination: {
                    paginationModel: {
                      pageSize: 100,
                    },
                  },
                }}
                pageSizeOptions={[10]}
                // checkboxSelection
                disableRowSelectionOnClick
              />
            </div>
          </div>
        </div>
      </div>
    </CContainer>
  )
}

export default UserDetail
