// import { AppBar, Toolbar, makeStyles, Typography } from '@material-ui/core'

// import Avatar from '@material-ui/core/Avatar'

// const useStyles = makeStyles({
//   root: {
//     display: 'flex',
//     justifyContent: 'space-between',
//   },
//   header: {
//     backgroundColor: 'transparent',
//     color: 'black',
//     boxShadow: '0px 0px 0px 0px',
//   },
// })

// const Navbar = () => {
//   const classes = useStyles()
//   return (
//     <div className={classes.root}>
//       <AppBar position='static' className={classes.header}>
//         <Toolbar>
//           <Typography variant='h6' style={{ flexGrow: '1' }}>
//             {' '}
//             Clients{' '}
//           </Typography>
//           <div>
//             <span style={{ float: 'right' }}>Rishabh Arya </span>
//             <span style={{ float: 'right' }}>
//               <Avatar>RA</Avatar>
//             </span>
//           </div>
//         </Toolbar>
//       </AppBar>
//     </div>
//   )
// }
// export default Navbar
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
