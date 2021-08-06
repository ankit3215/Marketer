import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableSortLabel from '@material-ui/core/TableSortLabel'
import Checkbox from '@material-ui/core/Checkbox'

const headCells = [
  {
    id: 'client_name',
    numeric: false,
    disablePadding: true,
    label: 'Client Name',
  },
  {
    id: 'company_name',
    numeric: false,
    disablePadding: true,
    label: 'Company Name',
  },
  {
    id: 'phone_number',
    numeric: false,
    disablePadding: true,
    label: 'Phone Number',
  },
  {
    id: 'client_email',
    numeric: true,
    disablePadding: false,
    label: 'Email ID',
  },
  {
    id: 'customer_type',
    numeric: true,
    disablePadding: false,
    label: 'Customer Type',
  },
  { id: 'actions', numeric: true, disablePadding: false, label: 'Actions' },
]

function EnhancedTableHead(props) {
  const { onSelectAllClick, numSelected, rowCount } = props

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
            // align={headCell.numeric ? 'right' : 'left'}
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
  numSelected: PropTypes.number.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  rowCount: PropTypes.number.isRequired,
}

export default EnhancedTableHead
