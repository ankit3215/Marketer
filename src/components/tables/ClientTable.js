import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import Checkbox from '@material-ui/core/Checkbox'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import { useDispatch, useSelector } from 'react-redux'
import {
  clientList,
  editClient,
  deleteClient,
} from '../../redux/actionCreators/clientAction'
import Modal from '../../common/Modal'
import EnhancedTableHead from './EnhancedTableHead'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(1),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}))

export default function ClientTable({ selected, setSelected, toast }) {
  const classes = useStyles()
  const [isModal, setIsModal] = useState(false)
  const [formData, setFormData] = useState({
    client_name: '',
    company_name: '',
    phone_number: '',
    client_email: '',
    customer_type: '',
  })
  const [UserID, setUserID] = useState('')

  const dispatch = useDispatch()

  const client = useSelector((state) => state.ClientReducer)

  useEffect(() => {
    dispatch(clientList())
  }, [])

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = client.clients.map((n) => n.id)
      // debugger
      setSelected(newSelecteds)
      return
    }
    setSelected([])
  }

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    console.log(formData)
    await dispatch(editClient({ id: UserID, data: formData }))
    toast.success('Edit Successfully')
    toggle()
  }

  const handleDelete = async (row) => {
    await dispatch(deleteClient(row.id))
    toast.error('Deleted Successfully')
  }

  const toggle = () => {
    setIsModal(!isModal)
  }
  const openModal = (row) => {
    setFormData({
      ...formData,
      client_name: row.data.client_name,
      company_name: row.data.company_name,
      phone_number: row.data.phone_number,
      client_email: row.data.client_email,
      customer_type: row.data.customer_type,
    })
    setUserID(row.id)
    setIsModal(!isModal)
  }

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name)
    let newSelected = []

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1))
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      )
    }

    setSelected(newSelected)
  }

  const isSelected = (name) => selected.indexOf(name) !== -1

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <TableContainer style={{ maxHeight: '390px' }}>
          <Table
            stickyHeader
            className={classes.table}
            aria-labelledby='tableTitle'
            size='small'
            aria-label='enhanced table'
          >
            <EnhancedTableHead
              numSelected={selected.length}
              onSelectAllClick={handleSelectAllClick}
              rowCount={client && client.clients && client.clients.length}
            />
            <TableBody>
              {client &&
                client.clients &&
                client.clients.map((row, index) => {
                  const isItemSelected = isSelected(row.id)
                  const labelId = `enhanced-table-checkbox-${index}`

                  return (
                    <TableRow
                      hover
                      style={{ height: 5 }}
                      role='checkbox'
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={isItemSelected}
                    >
                      <TableCell padding='checkbox'>
                        <Checkbox
                          checked={isItemSelected}
                          onClick={(event) => handleClick(event, row.id)}
                          inputProps={{ 'aria-labelledby': labelId }}
                        />
                      </TableCell>
                      <TableCell
                        component='th'
                        id={labelId}
                        scope='row'
                        padding='none'
                      >
                        {row.data.client_name}
                      </TableCell>
                      <TableCell>{row.data.company_name}</TableCell>
                      <TableCell>{row.data.phone_number}</TableCell>
                      <TableCell>{row.data.client_email}</TableCell>
                      <TableCell>{row.data.customer_type}</TableCell>
                      <TableCell>
                        <IconButton onClick={() => openModal(row)}>
                          {' '}
                          <EditIcon />
                        </IconButton>

                        <IconButton onClick={() => handleDelete(row)}>
                          {' '}
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  )
                })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Modal on={isModal} toggle={toggle}>
        {isModal && (
          <form onSubmit={(e) => onSubmit(e)}>
            {/* <span>Edit client</span> */}
            <label>Client Name:</label>
            <br />
            <input
              type='text'
              name='client_name'
              value={formData.client_name}
              onChange={(e) => onChange(e)}
            />
            <br />
            <label>Company Name:</label>
            <br />
            <input
              type='text'
              name='company_name'
              value={formData.company_name}
              onChange={(e) => onChange(e)}
            />
            <br />
            <label>Phone Number:</label>
            <br />
            <input
              type='text'
              name='phone_number'
              value={formData.phone_number}
              onChange={(e) => onChange(e)}
            />
            <br />
            <label>Email:</label>
            <br />
            <input
              type='text'
              name='client_email'
              value={formData.client_email}
              onChange={(e) => onChange(e)}
            />
            <br />
            <label>Customer Type:</label>
            <br />
            <input
              type='text'
              name='customer_type'
              value={formData.customer_type}
              onChange={(e) => onChange(e)}
            />
            <br />
            <br />
            <button type='submit'>Submit</button>
          </form>
        )}
      </Modal>
    </div>
  )
}
