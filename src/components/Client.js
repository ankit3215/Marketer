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
// import Modal from '../common/Modal'
import Navbar from './Navbar'
import { useDispatch, useSelector } from 'react-redux'
import { clientList } from '../redux/actionCreators/clientAction'

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
  // console.log(client)
  const classes = useStyles()

  useEffect(() => {
    dispatch(clientList())
  }, [])

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
                    {client.clients.map((client) => (
                      <TableRow>
                        <TableCell padding='checkbox'>
                          <Checkbox />
                        </TableCell>
                        <TableCell>{client.client_name}</TableCell>
                        <TableCell>{client.client_email}</TableCell>
                        <TableCell>
                          {/* <IconButton component='span'>
                            <EditIcon onClick={() => setOpenModal(true)} />
                            <EditIcon />
                            <DeleteIcon />
                          </IconButton>
                          {openModal && <Modal closeModal={setOpenModal} />} */}
                          <IconButton>
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
    </>
  )
}

Client.propTypes = {}

export default Client
