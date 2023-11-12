import * as React from 'react'
import Box from '@mui/material/Box'
import { DataGrid } from '@mui/x-data-grid'
import api from 'src/api'
import { NavLink } from 'react-router-dom'
import { Modal, Switch } from '@mui/material'
import QRCode from 'react-qr-code'
import { CButton, CContainer } from '@coreui/react'

const KeysBatch = ({ onlyStockiest = false }) => {
  const [data, setData] = React.useState([])
  const [modalAddKeyBatch, setModalAddKeyBatch] = React.useState(false)
  const getKeysBatch = async () => {
    const res = await api.get(`/admin/keys-batch`)
    console.log('res', res)
    setData([...res.data.data])
  }

  const generateKeysBatch = async (number) => {
    const res = await api.get(`/admin/keys-batch`)
    console.log('res', res)
    getKeysBatch()
  }

  const deleteBatch = async (id = 0) => {
    const res = await api.delete(`/admin/keys-batch/${id}`)
    console.log('res ccc', res)
    getKeysBatch()
  }

  React.useEffect(() => {
    getKeysBatch()
  }, [])
  const columns = [
    { field: 'batch_id', headerName: 'ID', width: 120 },
    {
      field: 'batch_name',
      headerName: 'Batch',
      flex: 1,
    },
    {
      field: 'printed_status',
      headerName: 'Print Status',
      flex: 1,
      renderCell: ({ row }) => {
        return (
          <span class="badge bg-primary">
            {row['printed_status'] == 0 ? 'Not Printed' : 'Printed'}
          </span>
        )
      },
    },

    {
      field: 'ss',
      headerName: 'Keys Status',
      renderCell: ({ row }) => {
        return (
          <div>
            <p>
              <strong>Total : </strong>
              {parseInt(row['not_used_count'] || 0) + parseInt(row['used_count'] || 0)}
            </p>
            <p>
              <strong>Used : </strong>
              {parseInt(row['used_count'] || 0)}
            </p>
            <p>
              <strong>Not Used : </strong>
              {parseInt(row['not_used_count'] || 0)}
            </p>
          </div>
        )
      },
      flex: 1,
    },
    {
      field: 'created_at',
      headerName: 'Created',
      width: 100,
      renderCell: ({ row }) => {
        return new Date(row['created']).toLocaleDateString()
      },
    },
    {
      field: 'dd',
      headerName: 'Action',
      flex: 1,
      renderCell: ({ row }) => {
        return (
          <>
            <NavLink className="btn btn-sm btn-primary me-2" to={`/keys/${row['batch_id']}`}>
              View
            </NavLink>
            <NavLink
              className="btn btn-sm btn-danger"
              to={`#`}
              onClick={() => {
                var confirm = window.confirm('Are you sure to delete batch?')
                if (confirm) deleteBatch(row['id'])
              }}
            >
              Delete
            </NavLink>
          </>
        )
      },
    },
  ]

  const askGenerateKeysBatch = () => {
    // var number = window.prompt('Enter count number how many keys you want to generate')
    // generateKeysBatch(number)
    window.location.href = '/keys/add'
  }

  return (
    <Box sx={{ width: '100%' }}>
      <div className="d-flex align-items-center justify-content-end mb-2">
        <CButton className="btn btn-sm btn-primary" onClick={askGenerateKeysBatch}>
          Generate KeysBatch
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
        rowHeight={120}
      />
    </Box>
  )
}

export default KeysBatch
