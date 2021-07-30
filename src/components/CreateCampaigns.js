import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Navbar from './Navbar';
import { useSelector } from "react-redux";
// import MailerTable from './MailerTable'
// import NativeSelect from '@material-ui/core/NativeSelect'
// import './CSS/mailer.css'
// import Modal from '../common/Modal'
// import { campaignsList } from '../redux/actionCreators/campaignsActions'
// import { useDispatch, useSelector } from 'react-redux'
// import { sendMailer } from '../redux/actionCreators/mailerActions'
import {Form} from 'react-bootstrap';
import  db from '../services/firestoreServices';
import { toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./CSS/Camp.css";
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import {
  Container,
  Radio,
  FormControlLabel,
  RadioGroup,
  Grid,
  Slider,
  Button,
  TextField,
  FormControl,
  Select,
  MenuItem,
  FormLabel,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  root: {
    display: 'flex',
    width: '1035px',
    height: '500px',
    marginLeft: '25px',
    marginTop: '80px',
    backgroundColor: 'white',
    borderRadius: '10px',
  },
  form: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft:"30px",
    marginTop:"24px"
  },
  btn: {
    marginTop: '270px',
  },
})

const CreateCampaigns = (props) => {
  // const [campaignId, setCampaignId] = useState('')
  // const [selected, setSelected] = React.useState([])

  // const dispatch = useDispatch()
  // const sendMail = () => {
  //   // console.log(campaignId,selected)
  //   dispatch(sendMailer(campaignId, selected, window))
  //   setCampaignId('')
  //   setSelected([])
  // }
  // const campaign = useSelector((state) => state.CampaignReducer)
  // useEffect(() => {
  //   dispatch(campaignsList())
  // }, [])
  // console.log(campaignId,selected);

      const auth = useSelector((state) => state.auth.userInfo.userId);
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");

  const [loader, setLoader] = useState(false);
  const regexp = /^[A-Za-z]+$/;
  // const ent=/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  const ent=/[a-z]/gi;
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoader(true);

    // if(!name || ! email || !message){
    //   toast.error("Please fill all the required values");
    //   return;
    // }

    if(!name || !name.match(regexp)){
      toast.error("Name is required and it should be of string");
      
    }
    // if(!name.match(regexp)){
    //   toast.error("Name should be string")
    // }
    // if(name.length<3){
    //   toast.error("small name")
    // }
    if(!subject || !subject.match(ent)){
      toast.error("Subject is required and it should be of string type");
      
    }
    if(!content){
      toast.error("content is required");
    }

    if(name.match(regexp) && subject.match(ent) && content.length>10){

    db.collection("cont")
      .add({
        name: name,
        subject: subject,
        content: content,
        createdAt: Date(Date.now()).toString(),
        auth
      })
      .then(() => {
        setLoader(false);
        toast.success("Campaign Updated");
      })
      .catch((error) => {
        alert(error.message);
        setLoader(false);
      });
    

    setName("");
    setSubject("");
    setContent("");
    }
  }

  const classes = useStyles()

  return (
    <div>
      <Navbar/>
      <p className="camps">Campaigns</p>
      <div style={{ display: 'flex' }}>
        <div class='split left'>
          <span style={{ marginLeft: '0px' }}>
            {/* {' '}
            All Campaigns - <strong>Create Campaign</strong> */}

      <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
         <Link color="inherit" href="/" className="ras" style={{marginLeft:"44px"}}>
           All Campaigns
        </Link>
        <Link color="inherit" href="/getting-started/installation/" className="ras" style={{fontWeight:"700",marginLeft:"0px"}}>
          Create Campaigns
         </Link>
       </Breadcrumbs>
          </span>
        </div>
      </div>
      <div>
        <Container className={classes.root}>
          <form onSubmit={handleSubmit}>
            <Grid className={classes.form}>
              <Grid item>
                <p>
                  <strong style={{marginBottom:"8px",fontFamily:"karla",fontSize:"14px",fontWeight:"400",marginLeft:"-16px",height:"16px",width:"156px"}}>Campaign Name</strong>
                </p>
                {/* <input type='text' placeholder='Campaign Name' value={name}  onChange={(e) => setName(e.target.value)}/> */}
              <Form.Group className="plc" >
            <Form.Control style={{borderStyle:"solid",borderWidth:"1px",marginLeft:"-2px",width:"400px",height:"48px",borderRadius:"10px"}} type="text" placeholder="Campaign Name"  value={name} id="ram"
            onChange={(e) => setName(e.target.value)}/>
          </Form.Group>
                      
              </Grid>
              <Grid item>
                <p>
                  <strong style={{marginBottom:"8px",fontFamily:"karla",fontSize:"14px",fontWeight:"400",height:"16px",width:"156px",marginLeft:"-24px"}}>Subject</strong>
                </p>
                {/* <input type='text' placeholder='Subject'  value={subject}  onChange={(e) => setSubject(e.target.value)} /> */}

                           <Form.Group className="plc">
          <Form.Control  style={{borderStyle:"solid",borderWidth:"1px",marginLeft:"-10px",width:"400px",height:"48px",borderRadius:"10px"}} type="text" placeholder="Subject"  value={subject}
      onChange={(e) => setSubject(e.target.value)}/>          </Form.Group>
              </Grid>
            </Grid>
            <div>
              {/* <Grid item> */}
              <p style={{marginTop:"24px"}}>
                <strong style={{fontFamily:"karla",fontSize:"14px",fontWeight:"400",marginTop:"134px",marginLeft:"12px",marginBottom:"8px"}}>Content</strong>
              </p>
              {/* <input type='text' placeholder='Enter your content'  value={content}  onChange={(e) => setContent(e.target.value)} /> */}
               <Form.Group className="plc">
             <Form.Control as="textarea" style={{borderStyle:"solid",borderWidth:"1px",borderRadius:"10px",height:"140px",width:"900px",marginLeft:"25px"}}rows={3} 
 
              placeholder="Enter your content"
             value={content}
             onChange={(e) => setContent(e.target.value)}
             />
  </Form.Group>
              {/* </Grid> */}
            </div>
            <Button
              style={{marginTop:"140px",borderRadius:"10px",marginLeft: '10px'}}
              variant='contained'
              color='primary'
              type='submit'
              // className={classes.btn}
              className="btn1"
            >
              Submit
            </Button>
            <ToastContainer/>
          </form>
         
        </Container>
      </div>
    </div>
  )
}

CreateCampaigns.propTypes = {}

export default CreateCampaigns

