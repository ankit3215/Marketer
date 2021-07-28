import {
  Container,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Box,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import Checkbox from '@material-ui/core/Checkbox'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'

const useStyles = makeStyles(() => ({
  root: {
    // display: 'flex',
    width: '700px',
    height: '620px',
    // marginTop: '90px',
    marginLeft: '30px',
  },
}))

const Client = (props) => {
  const classes = useStyles()
  return (
    <>
      <div style={{ display: 'flex' }}>
        <Container className={classes.root}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell padding='checkbox'>
                    <Checkbox />
                  </TableCell>
                  <TableCell>Client Name</TableCell>
                  <TableCell>Email ID</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell padding='checkbox'>
                    <Checkbox />
                  </TableCell>
                  <TableCell>John Doe</TableCell>
                  <TableCell>john@example.com</TableCell>
                  <TableCell>
                    <EditIcon />
                    <DeleteIcon />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell padding='checkbox'>
                    <Checkbox />
                  </TableCell>
                  <TableCell>Jane Doe</TableCell>
                  <TableCell>jane@example.com</TableCell>
                  <TableCell>
                    <EditIcon />
                    <DeleteIcon />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
        <Container>Hello</Container>
      </div>
    </>
  )
}

Client.propTypes = {}

export default Client
