import React, { useState, useEffect } from "react";
// import firebase from "firebase";

import "./Camp.css";
import  {firebase,db} from '../firebase';
import { toast,ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import {Card,Row,Col,Container,Form,Button} from 'react-bootstrap';
import { useSelector } from "react-redux";
import Navbar from "./Navbar";
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';




const Campaigns = () => {

    const auth = useSelector((state) => state.auth.userInfo.userId);
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

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
    if(!message){
      toast.error("message is required");
    }

    if(name.match(regexp) && subject.match(ent) && message.length>10){

    db.collection("cont")
      .add({
        name: name,
        subject: subject,
        message: message,
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
    setMessage("");
    }
  };

  return (
    <div className="ra">
      <Navbar/>
      <p className="camps">Campaigns</p>

      <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
        <Link color="inherit" href="/" className="ras" style={{marginLeft:"30px"}}>
          All Campaigns
        </Link>
        <Link color="inherit" href="/getting-started/installation/" className="ras" style={{fontWeight:"700"}}>
          Create Campaigns
        </Link>
      </Breadcrumbs>
      
    <Card style={{backgroundColor:"white",paddingLeft:"30px",paddingRight:"100px",marginTop:"24px",marginLeft:"30px",marginRight:"30px",borderRadius:"10px"}}>
    <Container>

   
    <Form className="form" onSubmit={handleSubmit}>
    
      
      
        <Row style={{marginTop:"30px"}}>
          <Col md={6} sm={4}>
          <p style={{marginBottom:"8px",fontFamily:"karla",fontSize:"14px",fontWeight:"400",marginLeft:"-16px",height:"16px",width:"156px"}}>Campaign name</p>
          <Form.Group className="plc" >
            <Form.Control style={{marginLeft:"-2px",width:"515px",height:"48px",borderRadius:"10px"}} type="text" placeholder="Campaign Name"  value={name} id="ram"
        onChange={(e) => setName(e.target.value)}/>
          </Form.Group>
          </Col>

          <Col md={6} sm={4}>
          <p style={{marginBottom:"8px",fontFamily:"karla",fontSize:"14px",fontWeight:"400",height:"16px",width:"156px",marginLeft:"29px"}}>Subject</p>
          <Form.Group className="plc">
            <Form.Control  style={{marginLeft:"44px",width:"515px",height:"48px",borderRadius:"10px"}} type="text" placeholder="Subject"  value={subject}
        onChange={(e) => setSubject(e.target.value)}/>
          </Form.Group>
          </Col>
        </Row>

        <Row>
        <label style={{fontFamily:"karla",fontSize:"14px",fontWeight:"400",marginTop:"24px",marginLeft:"-15px",marginBottom:"8px"}}>Content</label>
     <Col md={12} sm={12}>

<Form.Group className="plc">
<Form.Control as="textarea" style={{borderRadius:"10px",height:"140px",width:"1070px"}}rows={3} 
 
placeholder="Enter your content"
value={message}
onChange={(e) => setMessage(e.target.value)}
 />
 </Form.Group>
 </Col>

        </Row>
         

     <button
        type="submit"

        style={{marginTop:"200px",opacity:"0.4"}}
        
      >
        SUBMIT
      </button>
     

     

     
      
      <ToastContainer/>
    </Form>
    </Container>
    
    </Card>

    <div style={{marginTop:"0px",background:"rgb(200, 205, 245,0)"}}>
          <p>.</p>
      </div>

    </div>
  );
};

export default Campaigns;


