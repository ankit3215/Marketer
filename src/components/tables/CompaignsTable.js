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
import { CompaignList } from '../../redux/actionCreators/compaignsAction'
import {editCampaign,deleteCampaign} from '../../redux/actionCreators/campaignsActions';
import Modal from '../../common/Modal'

const headCells = [
  {
    id: 'compaign_image',
    numeric: false,
    disablePadding: true,
    label: 'Compaign Pic',
  },
  {
    id: 'compaign_name',
    numeric: false,
    disablePadding: true,
    label: 'Compaign Name',
  },
  {
    id: 'compaign_subject',
    numeric: true,
    disablePadding: false,
    label: 'Subject',
  },
  {
    id: 'compaign_content',
    numeric: true,
    disablePadding: false,
    label: 'Content',
  },
  { id: 'actions', 
    numeric: true, 
    disablePadding: false, 
    label: 'Actions' },
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
            align='left'
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

export default function CompaignsTable() {
  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [isModal, setIsModal] = React.useState(false);
  const [formData, setFormData] = React.useState({
    name: '',
   subject: '',
   content: '',
  })
  const [UserID, setUserID] = React.useState('')


  const dispatch = useDispatch();
  const {campaigns} = useSelector((state) => state.CampaignReducer);
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  useEffect(() => {
    dispatch(CompaignList())
  }, [])
  console.log("bbbb",campaigns)
  
  const handleSelectAllClick = (event) => {
    if (event?.target?.checked) {
      const newSelecteds = campaigns?.map((n) => n?.data?.name)
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
    dispatch(editCampaign({ id: UserID, data: formData }))
    toggle()
  }

  const toggle = () => {
    setIsModal(!isModal)
  }
  const openModal = (row) => {
    setFormData({ ...formData, name: row.data.name, subject: row.data.subject, content: row.data.content })
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

  const handleDelete =async (row) =>{
    await dispatch(deleteCampaign(row.id))
     
   }

  const isSelected = (name) => selected.indexOf(name) !== -1

  return (
    <div className={classes.root}>
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
              rowCount={campaigns && campaigns.length}
            />
            <TableBody>
              {
                //   stableSort(client.clients, getComparator(order, orderBy))
                //     .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                campaigns?.map((row, index) => {
                    const isItemSelected = isSelected(row?.data?.name)
                    const labelId = `enhanced-table-checkbox-${index}`

                    return (
                      <TableRow key={row.id} hover style={{ height: 5 }} role='checkbox' aria-checked={isItemSelected} tabIndex={-1} selected={isItemSelected} >
                        <TableCell padding='checkbox'>
                          <Checkbox checked={isItemSelected} onClick={(event) => handleClick(event, row?.data?.client_name) } inputProps={{ 'aria-labelledby': labelId }} />
                        </TableCell>
                        <TableCell align='left'><img width="100px" height="100px" src={row?.data?.auth?.userInfo?.imageUrl}/></TableCell>
                        <TableCell component='th' id={labelId} scope='row' padding='none' >
                          {row?.data?.name}
                        </TableCell>
                        <TableCell align='left'>{row?.data?.subject}</TableCell>
                        <TableCell align='left'>{row?.data?.content}</TableCell>
                        <TableCell align='left'>
                          <IconButton onClick={() => openModal(row)}>
                            {/* {' '} */}
                            <EditIcon />
                          </IconButton>

                        
                          <IconButton onClick={() =>handleDelete(row)}>
                            {' '}
                            <DeleteIcon />
                    
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    )
                  })
              }
              {/* {client && client.clients && client.clients.length > 0 && (
                <TableRow style={{ height: 33 * client.clients.length }}>
                  <TableCell colSpan={3} />
                </TableRow>
              )} */}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Modal on={isModal} toggle={toggle}>
        {isModal && (
          <form onSubmit={(e) => onSubmit(e)}>
            {/* <span>Edit client</span> */}
            <label>Campaign Name:</label>
            <br />
            <input
              type='text'
              name='name'
              value={formData.name}
              onChange={(e) => onChange(e)}
            />
            <br />
            <label>Subject:</label>
            <br />
            <input
              type='text'
              name='subject'
              value={formData.subject}
              onChange={(e) => onChange(e)}
            />
            <br />
            <label>Content:</label>
            <br />
            <input
              type='text'
              name='content'
              value={formData.content}
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
