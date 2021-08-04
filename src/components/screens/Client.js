import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Navbar from '../../common/Navbar'
import ClientTable from '../tables/ClientTable'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import '../CSS/mailer.css'
import { campaignsList } from '../../redux/actionCreators/campaignsActions'
import { useDispatch, useSelector } from 'react-redux'
import { sendMailer } from '../../redux/actionCreators/mailerActions'
import { CircularProgress } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import { Link } from 'react-router-dom'
import Modal from '../../common/Modal'
import { Container } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Upload from '../Upload'
import SearchIcon from '@material-ui/icons/Search'

const useStyles = makeStyles((theme) => ({
  upload: {
    width: '410px',
    height: 520,
    marginLeft: '20px',
    backgroundColor: 'white',
    borderRadius: '10px',
  },
}))

const Client = (props) => {
  const classes = useStyles()
  const [campaignId, setCampaignId] = useState('')
  const [selected, setSelected] = React.useState([])

  const [on, setOn] = useState(false)
  const dispatch = useDispatch()
  const sendMail = async () => {
    if (
      campaignId === '' ||
      selected.length === 0 ||
      campaignId === 'Choose a Campaigns'
    ) {
      return toast.error('Please select campaign and client')
    }
    setOn(!on)
    await dispatch(sendMailer(campaignId, selected, window, toast, setOn))
    setCampaignId('')
    setSelected([])
    document.getElementById('campaign').value = 'Choose a Campaigns'
  }
  const toggle = () => {
    setOn(!on)
  }

  const campaign = useSelector((state) => state.CampaignReducer)

  useEffect(() => {
    dispatch(campaignsList())
  }, [])

  return (
    <div className='mailer'>
      <ToastContainer />
      <Navbar page='Clients' />
      <div style={{ display: 'flex' }}>
        <div className='split left'>
          <span style={{ marginLeft: '30px' }}> All Clients </span>
        </div>
        <div className='split right'>
          <input type='text' placeholder='Search...' />
          {/* <SearchIcon /> */}
          <span style={{ marginLeft: '70px' }}>
            <Button
              variant='contained'
              style={{ backgroundColor: '#8e17c6', color: 'white' }}
              onClick={() => setOn(!on)}
            >
              Upload Client
            </Button>

            {/* <select id="campaign" style={{ marginLeft: '20px' }} onChange={() => setCampaignId(document.getElementById('campaign').value)} >
              <option value="Choose a Campaigns" >Choose a Campaigns</option>
              {campaign&&campaign.campaigns.map(e =>{
                return <option value={e.id}>{e.data.name}</option>
              })}
            </select> */}
          </span>
        </div>
      </div>
      <div className='tble'>
        <ClientTable
          selected={selected}
          setSelected={setSelected}
          toast={toast}
        />
      </div>
      {/* <div style={{ }}>
        <button className='sendMailer' onClick={sendMail} disabled={on}>
         {on ?<><CircularProgress size={25} thickness={5} color="primary" /> Sending... </>: "SEND MAILER"}
        </button>
      </div> */}

      <Modal on={on} toggle={toggle}>
        {on && (
          <Container className={classes.upload}>
            <strong>Upload Clients</strong>
            <Upload toggle={toggle} />
          </Container>
        )}
      </Modal>
    </div>
  )
}

Client.propTypes = {}

export default Client
