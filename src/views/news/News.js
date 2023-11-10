import * as React from 'react'
import Box from '@mui/material/Box'
import { DataGrid } from '@mui/x-data-grid'
import api from 'src/api'
import { NavLink } from 'react-router-dom'

const News = () => {
  const [data, setData] = React.useState([])
  const getNews = async () => {
    const res = await api.get(`/admin/news`)
    console.log('res', res)
    setData([...res.data.data])
  }

  React.useEffect(() => {
    getNews()
  }, [])
  const columns = [
    { field: 'id', headerName: 'ID', width: 60 },
    {
      field: 'messageHeader',
      headerName: 'Header',
      flex: 1,
    },

    {
      field: 'messageDetail',
      headerName: 'Details',

      flex: 1,
    },
    {
      field: 'msgTime',
      headerName: 'Date',
      width: 200,
    },
    {
      field: 'center',
      headerName: 'Center',
      width: 200,
    },
    {
      field: 'attachments',
      headerName: 'Attachments',
      flex: 1,
    },
  ]

  return (
    <Box sx={{ width: '100%' }}>
      <div className="d-flex align-items-center justify-content-end">
        <NavLink to="/news/add" className="btn btn-sm btn-primary">
          Add News
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
    </Box>
  )
}

export default News
