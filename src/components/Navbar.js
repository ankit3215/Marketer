import React from 'react'
import PropTypes from 'prop-types'
import Avatar from '@material-ui/core/Avatar'
const Navbar = ({ page }) => {
  return (
    <>
      <ul>
        <li className='nav1'>{page}</li>

        <li className='nav2' style={{ float: 'right' }}>
          Aman Sikarwar
        </li>
        <li className='nav3' style={{ float: 'right' }}>
          <Avatar>AS</Avatar>
        </li>
      </ul>
    </>
  )
}

Navbar.propTypes = {}
export default Navbar
