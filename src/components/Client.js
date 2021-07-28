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
import Modal from './Modal'
import Navbar from './Navbar'
import { useDispatch, useSelector } from 'react-redux'
import { clientList } from '../redux/actionCreators/clientAction'

const Client = props => {
    return (
        <div >
            this is client
        </div>
    )
}

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
                          <IconButton component='span'>
                            {/* <EditIcon onClick={() => setOpenModal(true)} /> */}
                            <EditIcon />
                            <DeleteIcon />
                          </IconButton>
                          {/* {openModal && <Modal closeModal={setOpenModal} />} */}
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
