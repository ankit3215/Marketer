import React from 'react'
import PropTypes from 'prop-types'
import Avatar from '@material-ui/core/Avatar'
import { useSelector } from 'react-redux'

const Navbar = ({ page }) => {
  const {displayName}=useSelector(state=>state.auth.userInfo)
  return (
    <>
      <ul>
        <li className='nav1'>{page}</li>

        <li className='nav2' style={{ float: 'right' }}>
          {displayName}
        </li>
        <li className='nav3' style={{ float: 'right' }}>
        <Avatar style={{backgroundColor:"#D1A402"}}>{displayName&&displayName[0]}</Avatar>
        </li>
      </ul>
    </>
  )
}

Navbar.propTypes = {}
export default Navbar;
