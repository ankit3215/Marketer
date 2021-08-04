import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Navbar from '../../common/Navbar'
import MailerTable from '../tables/MailerTable'
import { toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../CSS/mailer.css'
import { campaignsList } from '../../redux/actionCreators/campaignsActions'
import { useDispatch, useSelector } from 'react-redux'
import { sendMailer } from '../../redux/actionCreators/mailerActions'
import {
  CircularProgress,
} from "@material-ui/core";
import Test from './test';
const Mailer = (props) => {
  const [campaignId, setCampaignId] = useState('')
  const [selected, setSelected] = React.useState([])
  const [on,setOn] = useState(false)
  const dispatch = useDispatch()
  const sendMail = async () => {
    if(campaignId==='' ||selected.length === 0 || campaignId ==='Choose a Campaigns') {
     return toast.error("Please select campaign and client")
    }
    setOn(!on)
    await dispatch(sendMailer(campaignId, selected, window,toast,setOn))
    setCampaignId('')
    setSelected([])
    document.getElementById('campaign').value = "Choose a Campaigns"
    
  }
  const campaign = useSelector((state) => state.CampaignReducer)
 
  useEffect(() => {
    dispatch(campaignsList())
  }, [])
  return (
    <div className='mailer'>
      <ToastContainer/>
      <Navbar page='Mailers' />
      <div style={{ display: 'flex' }}>
        <div className='split left'>
          <span style={{ marginLeft: '30px' }}> All Campaigns </span>
        </div>
        <div className='split right'>
          <span style={{ marginLeft: '0px' }}>
            Select Campaigns
            <select id="campaign" style={{ marginLeft: '15px' }} onChange={() => setCampaignId(document.getElementById('campaign').value)} >
              <option value="Choose a Campaigns" >Choose a Campaigns</option>
              {campaign&&campaign.campaigns.map(e =>{
                return <option value={e.id}>{e.data.name}</option>
              })}
            </select>
          </span>
        </div>
      </div>
      <div className='tble'>
        <Test selected={selected} setSelected={setSelected} toast={toast} />
      </div>
      <div style={{ }}>
        <button className='sendMailer' onClick={sendMail} disabled={on}>
         {on ?<><CircularProgress size={25} thickness={5} color="primary" /> Sending... </>: "SEND MAILER"}
        </button>
      </div>
    </div>
  )
}

Mailer.propTypes = {}

export default Mailer
