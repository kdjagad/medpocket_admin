import * as React from 'react'
import Box from '@mui/material/Box'
import { DataGrid } from '@mui/x-data-grid'
import api from 'src/api'
import { NavLink } from 'react-router-dom'
import { Switch } from '@mui/material'

const Users = () => {
  const [data, setData] = React.useState([])
  const getUsers = async () => {
    const res = await api.get(`/admin/users`)
    console.log('res', res)
    setData([...res.data.data])
  }
  const updateUser = async (userData, userId) => {
    const res = await api.post(`/admin/users/${userId}`, userData)
    console.log('res', res)
    if (res.status === 200) {
      getUsers()
    }
  }

  React.useEffect(() => {
    getUsers()
  }, [])
  const columns = [
    { field: 'id', headerName: 'ID', width: 60 },
    {
      field: 'city',
      headerName: 'Center',
    },
    {
      field: 'reg_key',
      headerName: 'Key',
      width: 200,
      renderCell: ({ row }) => {
        return <NavLink to={`/users/${row['id']}`}>{row['reg_key']}</NavLink>
      },
    },
    {
      field: 'name',
      headerName: 'Name',
      width: 150,
      renderCell: ({ row }) => {
        console.log('row', row)
        return `${row['first_name']} ${row['last_name']}`
      },
    },
    {
      field: 'firm_name',
      headerName: 'Firm Name',
      width: 150,
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 200,
    },
    {
      field: 'phone',
      headerName: 'Phone',
      width: 100,
    },
    {
      field: 'created_at',
      headerName: 'Registered',
      width: 100,
      renderCell: ({ row }) => {
        return new Date(row['created_at']).toLocaleDateString()
      },
    },
    {
      field: 'is_stockiest',
      headerName: 'Is Stockiest',
      renderCell: ({ row }) => {
        return (
          <Switch
            checked={row['is_stockiest']}
            disabled
            onClick={(e) => {
              updateUser({ is_stockiest: row['is_stockiest'] ? 0 : 1 }, row.id)
            }}
          />
        )
      },
    },
    {
      field: 'active',
      headerName: 'Active',
      renderCell: ({ row }) => {
        return (
          <Switch
            checked={row['active']}
            onClick={(e) => {
              updateUser({ active: row['active'] ? 0 : 1 }, row.id)
            }}
          />
        )
      },
    },
  ]

  return (
    <Box sx={{ width: '100%' }}>
      <DataGrid
        rows={data}
        columns={columns}
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
    </Box>
  )
}

export default Users
