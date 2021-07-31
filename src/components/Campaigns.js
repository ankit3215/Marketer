import React from 'react'
import PropTypes from 'prop-types'
import Navbar from './Navbar'
import CompaignsTable from './CompaignsTable'
import NativeSelect from '@material-ui/core/NativeSelect'
import './CSS/mailer.css'
import Modal from '../common/Modal'
import Button from '@material-ui/core/Button'
import { Link } from 'react-router-dom'
const Campaigns = (props) => {
  return (
    // <div style={{ marginTop: '30px' }}>this is a campaign</div>
    <div className='mailer'>
      <Navbar page='Campaigns' />
      <div style={{ display: 'flex' }}>
        <div class='split left'>
          <span style={{ marginLeft: '30px' }}> All Campaigns </span>
        </div>
        <div class='split right'>
          <span style={{ marginLeft: '250px' }}>
            {/* Select Campaigns
            <select style={{ marginLeft: '20px' }}>
              <option value='volvo'>Choose a Campaigns</option>
            </select> */}
            <Button
              variant='contained'
              style={{ backgroundColor: '#8e17c6', color: 'white' }}
            >
              <Link to='/create' style={{ textDecoration: 'none' }}>
                Create
              </Link>
            </Button>
          </span>
        </div>
      </div>
      <div className='tble'>
        <CompaignsTable />
      </div>
    </div>
  )
  // Campaigns.propTypes = {}
}
export default Campaigns
