import * as React from 'react'
import Box from '@mui/material/Box'
import { DataGrid } from '@mui/x-data-grid'
import api from 'src/api'
import { NavLink } from 'react-router-dom'
import { Switch } from '@mui/material'
import QRCode from 'react-qr-code'
import { CButton, CContainer } from '@coreui/react'

const Keys = ({ onlyStockiest = false }) => {
  const [data, setData] = React.useState([])
  const getKeys = async () => {
    const res = await api.get(`/admin/keys`)
    console.log('res', res)
    setData([...res.data.data])
  }

  const generateKeys = async (number) => {
    const res = await api.get(`/licences/${number}`)
    console.log('res', res)
    getKeys()
  }

  React.useEffect(() => {
    getKeys()
  }, [])
  const columns = [
    { field: 'id', headerName: 'ID', width: 60 },
    {
      field: 'reg_key',
      headerName: 'Key',
      flex: 1,
    },

    {
      field: 'is_used',
      headerName: 'Is Used',
      renderCell: ({ row }) => {
        return (
          <button className={`btn btn-sm btn-${row['is_used'] ? 'info' : 'success'}`}>
            {row['is_used'] ? 'Already Used' : 'Non Used'}
          </button>
        )
      },
      flex: 1,
    },
    {
      field: 'created_at',
      headerName: 'Created',
      width: 100,
      renderCell: ({ row }) => {
        return new Date(row['created_at']).toLocaleDateString()
      },
    },
    {
      field: '',
      headerName: 'QR Code',
      width: 200,
      renderCell: ({ row }) => {
        return <QRCode value={row['reg_key']} size={200} />
      },
    },
  ]

  const askGenerateKeys = () => {
    var number = window.prompt('Enter count number how many keys you want to generate')
    generateKeys(number)
  }

  return (
    <Box sx={{ width: '100%' }}>
      <div className="d-flex align-items-center justify-content-end">
        <CButton className="btn btn-sm btn-primary" onClick={askGenerateKeys}>
          Generate Keys
        </CButton>
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
        // checkboxSelection
        disableRowSelectionOnClick
        rowHeight={230}
      />
    </Box>
  )
}

export default Keys
