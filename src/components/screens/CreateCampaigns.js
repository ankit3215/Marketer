import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Navbar from '../../common/Navbar'
import { useSelector } from 'react-redux'
import { Form } from 'react-bootstrap'
import { uploadFile } from "../../services/fireStorage";
import db from '../../services/firestoreServices'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import '../CSS/Camp.css'
import Breadcrumbs from '@material-ui/core/Breadcrumbs'
import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'
import NavigateNextIcon from '@material-ui/icons/NavigateNext'
import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';

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
    marginLeft: '30px',
    marginTop: '24px',
  },
  btn: {
    marginTop: '270px',
  },
})

const CreateCampaigns = (props) => {
  const auth = useSelector((state) => state.auth);
  const [name, setName] = useState('')
  const [subject, setSubject] = useState('')
  const [content, setContent] = useState('')
  const [fileUrl, setFileUrl] = useState("");
  const [fileUrl1, setFileUrl1] = useState("");
  const userId = auth.userInfo.userId;

  const [loader, setLoader] = useState(false)
  const regexp = /[a-z]/gi

  const onFileChange=async(e)=>{
    debugger
    const file = e.target.files[0];
    if(!file) return;

    const name = file.name;
    const fileUrl = await uploadFile(file, `campaignPic/${name}`);

    

    const doc = db.collection("userInfo").doc(userId.toString());

    await doc
      .update({
        imageUrl: fileUrl,
      })
      .then(() => {
        setFileUrl(fileUrl);
        console.log("url updated in database");
      })
      .catch(() => {
        console.log("some error occured");
      });

      await doc.get().then((docRef) => {
        setFileUrl1(docRef.data().url);
      });

  }
  const ent = /[a-z]/gi
  const handleSubmit = (e) => {
    e.preventDefault()
    setLoader(true)

    // if(!name || ! email || !message){
    //   toast.error("Please fill all the required values");
    //   return;
    // }

    if (!name || !name.match(regexp)) {
      toast.error('Name is required and it should be of string')
    }
    // if(!name.match(regexp)){
    //   toast.error("Name should be string")
    // }
    // if(name.length<3){
    //   toast.error("small name")
    // }
    if (!subject || !subject.match(ent)) {
      toast.error('Subject is required and it should be of string type')
    }
    if (!content) {
      toast.error('content is required')
    }

    if (name.match(regexp) && subject.match(ent) && content) {
      db.collection('campaign')
        .add({
          name: name,
          subject: subject,
          content: content,
          createdAt: Date(Date.now()).toString(),
          auth,
        })
        .then(() => {
          setLoader(false)
          toast.success('Campaign Updated')
        })
        .catch((error) => {
          alert(error.message)
          setLoader(false)
        })

      setName('')
      setSubject('')
      setContent('')
    }
  }

  const classes = useStyles()

  return (
    <div>
      <Navbar />
      <p className='camps'>Campaigns</p>
      <div style={{ display: 'flex' }}>
        <div class='split left'>
          <span style={{ marginLeft: '0px' }}>
            {/* {' '}
            All Campaigns - <strong>Create Campaign</strong> */}

            <Breadcrumbs
              separator={<NavigateNextIcon fontSize='small' />}
              aria-label='breadcrumb'
            >
              <Link
                color='inherit'
                href='/'
                className='ras'
                style={{ marginLeft: '34px' }}
              >
                All Campaigns
              </Link>
              <Link
                color='inherit'
                href='/getting-started/installation/'
                className='ras'
                style={{ fontWeight: '700', marginLeft: '0px' }}
              >
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
                  <strong
                    style={{
                      marginBottom: '8px',
                      fontFamily: 'karla',
                      fontSize: '14px',
                      fontWeight: '400',
                      marginLeft: '-16px',
                      height: '16px',
                      width: '156px',
                    }}
                  >
                    Campaign Name
                  </strong>
                </p>
                {/* <input type='text' placeholder='Campaign Name' value={name}  onChange={(e) => setName(e.target.value)}/> */}
                <Form.Group className='plc'>
                  <Form.Control
                    style={{
                      borderStyle: 'solid',
                      borderWidth: '1px',
                      marginLeft: '-2px',
                      width: '400px',
                      height: '48px',
                      borderRadius: '10px',
                    }}
                    type='text'
                    placeholder='Campaign Name'
                    value={name}
                    id='ram'
                    onChange={(e) => setName(e.target.value)}
                  />
                </Form.Group>
              </Grid>
              <Grid item>
              
                {/* <input type="file"  accept="image/*" onChange={onFileChange}/> */}
                {/* {fileUrl1 && (
            <img
              src={fileUrl1}
              alt="profile img"
              style={{ width: "100px", height: "100px" }}
            />
          )} */}
                <p>
                  <strong
                    style={{
                      marginBottom: '8px',
                      fontFamily: 'karla',
                      fontSize: '14px',
                      fontWeight: '400',
                      height: '16px',
                      width: '156px',
                      marginLeft: '-24px',
                    }}
                  >
                    Subject
                  </strong>
                </p>
                {/* <input type='text' placeholder='Subject'  value={subject}  onChange={(e) => setSubject(e.target.value)} /> */}

                <Form.Group className='plc'>
                  <Form.Control
                    style={{
                      borderStyle: 'solid',
                      borderWidth: '1px',
                      marginLeft: '-10px',
                      width: '400px',
                      height: '48px',
                      borderRadius: '10px',
                    }}
                    type='text'
                    placeholder='Subject'
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                  />{' '}
                </Form.Group>
              </Grid>
            </Grid>
            <p style={{ marginTop: '24px' }}>
                <strong
                  style={{
                    fontFamily: 'karla',
                    fontSize: '14px',
                    fontWeight: '400',
                    marginTop: '134px',
                    marginLeft: '12px',
                    marginBottom: '8px',
                  }}
                >
                  Image Upload
                </strong>
              </p>

            <Grid item xs={12}>
                 <input type="file"  accept="image/*" onChange={onFileChange} style={{marginLeft:"14px"}}/>
           </Grid>

            <div>
              {/* <Grid item> */}
              <p style={{ marginTop: '24px' }}>
                <strong
                  style={{
                    fontFamily: 'karla',
                    fontSize: '14px',
                    fontWeight: '400',
                    marginTop: '134px',
                    marginLeft: '12px',
                    marginBottom: '8px',
                  }}
                >
                  Content
                </strong>
              </p>
              {/* <input type='text' placeholder='Enter your content'  value={content}  onChange={(e) => setContent(e.target.value)} /> */}
              <Form.Group className='plc'>
                <Form.Control
                  as='textarea'
                  style={{
                    borderStyle: 'solid',
                    borderWidth: '1px',
                    borderRadius: '10px',
                    height: '140px',
                    width: '900px',
                    marginLeft: '25px',
                  }}
                  rows={3}
                  placeholder='Enter your content'
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </Form.Group>
              {/* </Grid> */}
            </div>
            {/* <Avatar style={{backgroundColor:"#D1A402"}}>{fileUrl && (
            <img
              src={fileUrl || auth.userInfo.imageUrl}
              alt="profile img"
              style={{ width: "100px", height: "100px" }}
            />
          )}</Avatar> */}
            <Button
              style={{
                marginTop: '80px',
                borderRadius: '10px',
                marginLeft: '10px',
              }}
              variant='contained'
              color='primary'
              type='submit'
              // className={classes.btn}
              className='btn1'
            >
              Submit
            </Button>
            <ToastContainer />
          </form>
        </Container>
        
        {/* <Avatar style={{backgroundColor:"#D1A402"}}>{fileUrl && (
            <img
              src={fileUrl || auth.userInfo.imageUrl}
              alt="profile img"
              style={{ width: "100px", height: "100px" }}
            />
          )}</Avatar> */}

{/* <Avatar  className={classes.large}
    src = {fileUrl || auth.userInfo.imageUrl}/> */}

      </div>
    </div>
  )
}

CreateCampaigns.propTypes = {}

export default CreateCampaigns