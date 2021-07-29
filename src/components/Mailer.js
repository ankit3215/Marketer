import React,{useEffect,useState} from 'react'
import PropTypes from 'prop-types'
import Navbar from './Navbar'
import MailerTable from './MailerTable'
import NativeSelect from '@material-ui/core/NativeSelect'
import './CSS/mailer.css'
import Modal from '../common/Modal'
import {campaignsList} from '../redux/actionCreators/campaignsActions';
import { useDispatch, useSelector } from 'react-redux'

const Mailer = (props) => {
  const [campaignId, setCampaignId] = useState("")
  const [selected, setSelected] = React.useState([]);

  const dispatch = useDispatch();
  const sendMail = () =>{
    console.log(campaignId,selected)
  }
  const campaign = useSelector((state) => state.CampaignReducer);
  useEffect(() => {
    dispatch(campaignsList())
  }, [])
  // console.log(campaignId,selected);
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
            <select id="campaign" style={{ marginLeft: '20px' }} onChange={() => setCampaignId(document.getElementById('campaign').value)} >
              <option >Choose a Campaigns</option>
              {campaign&&campaign.campaigns.map(e =>{
                return <option value={e.id}>{e.data.name}</option>
              })}
            </select>
          </span>
        </div>
      </div>
      <div className='tble'>
        <MailerTable selected={selected} setSelected={setSelected} />
      </div>
      <div style={{marginBottom:"15px"}}>
        <button className='sendMailer' onClick={sendMail} >SEND MAILER</button>
      </div>
    
    </div>
  )
}

Mailer.propTypes = {}

export default Mailer
