import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { lighten, makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TablePagination from '@material-ui/core/TablePagination'
import TableRow from '@material-ui/core/TableRow'
import TableSortLabel from '@material-ui/core/TableSortLabel'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Checkbox from '@material-ui/core/Checkbox'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'
import DeleteIcon from '@material-ui/icons/Delete'
import FilterListIcon from '@material-ui/icons/FilterList'
import EditIcon from '@material-ui/icons/Edit'
import { useDispatch, useSelector } from 'react-redux'
import {
  clientList,
  editClient,
  deleteClient,
} from '../redux/actionCreators/clientAction'
import Modal from '../common/Modal'
import Navbar from './Navbar'
import Upload from './Upload'
import { Container } from '@material-ui/core'

const headCells = [
  {
    id: 'client_name',
    numeric: false,
    disablePadding: true,
    label: 'Client Name',
  },
  {
    id: 'client_email',
    numeric: true,
    disablePadding: false,
    label: 'Email ID',
  },
  { id: 'actions', numeric: true, disablePadding: false, label: 'Actions' },
]

function EnhancedTableHead(props) {
  const { classes, onSelectAllClick, numSelected, rowCount } = props

  return (
    <TableHead>
      <TableRow>
        <TableCell padding='checkbox'>
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all desserts' }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
          >
            <TableSortLabel>{headCell.label}</TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    height: 520,
    marginTop: '90px',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(1),
  },
  table: {
    minWidth: 525,
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
  upload: {
    width: '410px',
    height: 520,
    marginLeft: '20px',
    backgroundColor: 'white',
    borderRadius: '10px',
  },
}))

export default function ClientTable() {
  const classes = useStyles()
  const [order, setOrder] = React.useState('asc')
  const [orderBy, setOrderBy] = React.useState('calories')
  const [selected, setSelected] = React.useState([])
  const [isModal, setIsModal] = React.useState(false)
  const [formData, setFormData] = React.useState({
    client_name: '',
    client_email: '',
  })
  const [UserID, setUserID] = React.useState('')

  const dispatch = useDispatch()
  const client = useSelector((state) => state.ClientReducer)
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  useEffect(() => {
    dispatch(clientList())
  }, [])

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = client.clients.map((n) => n.data.client_name)
      // debugger
      setSelected(newSelecteds)
      return
    }
    setSelected([])
  }

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const onSubmit = (e) => {
    e.preventDefault()
    console.log(formData)
    dispatch(editClient({ id: UserID, data: formData }))
    toggle()
  }

  const toggle = () => {
    setIsModal(!isModal)
  }
  const openModal = (row) => {
    setFormData({
      ...formData,
      client_name: row.data.client_name,
      client_email: row.data.client_email,
    })
    setUserID(row.id)
    setIsModal(!isModal)
  }

  const handleDelete = (row) => {
    dispatch(deleteClient(row.id))
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
      <Navbar page='Clients' />
      <Paper className={classes.paper}>
        <TableContainer style={{ maxHeight: 482 }}>
          <Table
            stickyHeader
            className={classes.table}
            aria-labelledby='tableTitle'
            size='small'
            aria-label='enhanced table'
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={client && client.clients && client.clients.length}
            />
            <TableBody>
              {
                //   stableSort(client.clients, getComparator(order, orderBy))
                //     .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                client &&
                  client.clients &&
                  client.clients.map((row, index) => {
                    const isItemSelected = isSelected(row.data.client_name)
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
                            onClick={(event) =>
                              handleClick(event, row.data.client_name)
                            }
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
                        <TableCell align='right'>
                          {row.data.client_email}
                        </TableCell>
                        <TableCell align='right'>
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
                  })
              }
              {client && client.clients && client.clients.length > 0 && (
                <TableRow style={{ height: 33 * client.clients.length }}>
                  <TableCell colSpan={3} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <div>
        <Container className={classes.upload}>
          <strong>Upload Clients</strong>
          <Upload />
        </Container>
      </div>
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
            <label>Last name:</label>
            <br />
            <input
              type='text'
              name='client_email'
              value={formData.client_email}
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
