import { useState, useEffect } from 'react'
import {
  Container,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import Checkbox from '@material-ui/core/Checkbox'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import Modal from '../common/Modal'
import Navbar from './Navbar'
import { useDispatch, useSelector } from 'react-redux'
import { clientList1, editClient } from '../redux/actionCreators/clientAction'
import './CSS/client.css'

const useStyles = makeStyles(() => ({
  table: {
    width: '600px',
    height: '620px',
    marginTop: '50px',
    marginLeft: '15px',
  },
  upload: {
    width: '410px',
    height: '620px',
    marginTop: '50px',
    marginLeft: '50px',
  },
}))

const Client = (props) => {
  // const [openModal, setOpenModal] = useState(false)
  const dispatch = useDispatch()

  const client = useSelector((state) => state.ClientReducer)
  const [isModal, setisModal] = useState(false)
  const [UserData, setUserData] = useState({})
  const [UserID, setUserID] = useState('')
  // console.log(client)
  const classes = useStyles()

  useEffect(() => {
    dispatch(clientList1())
    // console.log(client.clients[0])
  }, [])

  const onChange = (e) => {
    setUserData({ ...UserData, [e.target.name]: e.target.value })
  }

  const toggle = () => {
    setisModal(!isModal)
  }

  const openModal = (row) => {
    setUserData({
      ...UserData,
      client_name: row.data.client_name,
      client_email: row.data.client_email,
    })
    setUserID(row.id)
    setisModal(!isModal)
  }

  const onSubmit = (e) => {
    e.preventDefault()
    dispatch(editClient({ id: UserID, data: UserData }))
    toggle()
  }

  return (
    <>
      <div>
        <Navbar page='Client' />
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div>
            <Container className={classes.table}>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell padding='checkbox'>
                        <Checkbox />
                      </TableCell>
                      <TableCell>
                        <strong>Client Name</strong>
                      </TableCell>
                      <TableCell>
                        {' '}
                        <strong>Email ID</strong>
                      </TableCell>
                      <TableCell>
                        {' '}
                        <strong>Action</strong>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {client.clients1.map((client) => (
                      <TableRow>
                        <TableCell padding='checkbox'>
                          <Checkbox />
                        </TableCell>
                        <TableCell>{client.data.client_name}</TableCell>
                        <TableCell>{client.data.client_email}</TableCell>
                        <TableCell>
                          <IconButton onClick={() => openModal(client)}>
                            {' '}
                            <EditIcon />
                          </IconButton>

                          <IconButton>
                            {' '}
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Container>
          </div>
          <div>
            <Container className={classes.upload}>
              <strong>Upload Clients</strong>
              <h1>uplodadas</h1>
            </Container>
          </div>
        </div>
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
              value={UserData.client_name}
              onChange={(e) => onChange(e)}
            />
            <br />
            <label>Last name:</label>
            <br />
            <input
              type='text'
              name='client_email'
              value={UserData.client_email}
              onChange={(e) => onChange(e)}
            />
            <br />
            <br />
            <button type='submit'>Submit</button>
          </form>
        )}
      </Modal>
    </>
  )
}

Client.propTypes = {}

export default Client
