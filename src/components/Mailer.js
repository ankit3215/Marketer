import React from 'react'
import PropTypes from 'prop-types'
import Navbar from './Navbar'
import MailerTable from './MailerTable'
import NativeSelect from '@material-ui/core/NativeSelect'
import './CSS/mailer.css'
import Modal from '../common/Modal'
const Mailer = (props) => {
  return (
    <div className='mailer'>
      <Navbar page='Mailers' />
      <div style={{ display: 'flex' }}>
        <div class='split left'>
          <span style={{ marginLeft: '30px' }}> All Campaigns </span>
        </div>
        <div class='split right'>
          <span style={{ marginLeft: '100px' }}>
            Select Campaigns
            <select style={{ marginLeft: '20px' }}>
              <option value='volvo'>Choose a Campaigns</option>
            </select>
          </span>
        </div>
      </div>
      <div className='tble'>
        <MailerTable />
      </div>
      <div >
        <button className='sendMailer'>SEND MAILER</button>
      </div>
    
    </div>
  )
}

Mailer.propTypes = {}

export default Mailer
