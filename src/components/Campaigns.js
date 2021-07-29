// import React from 'react'
// import PropTypes from 'prop-types'
// import Navbar from './Navbar'

// const Campaigns = (props) => {
//   return <div style={{marginLeft:"50px"}}>
//     <Navbar/>
    
    
//   </div>

//   // Campaigns.propTypes = {}
// }
// export default Campaigns

import React, { useState, useEffect } from "react";
// import firebase from "firebase";

import "./Camp.css";
import  {firebase,db} from '../firebase';
import { toast,ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import {Card,Row,Col,Container,Form,Button} from 'react-bootstrap';
import { useSelector } from "react-redux";
import Navbar from "./Navbar";



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
      <p className="ras">All Campaigns  <span className="pa">Create Campaigns</span></p>
      
    <Card style={{backgroundColor:"white",paddingLeft:"30px",paddingRight:"100px",marginTop:"24px",marginLeft:"30px",marginRight:"30px",borderRadius:"10px"}}>
    <Container>

   
    <Form className="form" onSubmit={handleSubmit}>
    
      
      
        <Row style={{marginTop:"30px"}}>
          <Col>
          <p style={{marginBottom:"8px",fontFamily:"karla",fontSize:"14px",fontWeight:"400",marginLeft:"-16px",height:"16px",width:"156px"}}>Campaign Name</p>
          <Form.Group className="plc" >
            <Form.Control style={{marginLeft:"-2px",width:"515px",height:"48px",borderRadius:"10px"}} type="text" placeholder="Campaign Name"  value={name} id="ram"
        onChange={(e) => setName(e.target.value)}/>
          </Form.Group>
          </Col>

          <Col>
          <p style={{marginBottom:"8px",fontFamily:"karla",fontSize:"14px",fontWeight:"400",height:"16px",width:"156px",marginLeft:"29px"}}>Subject</p>
          <Form.Group className="plc">
            <Form.Control  style={{marginLeft:"44px",width:"515px",height:"48px",borderRadius:"10px"}} type="text" placeholder="Subject"  value={subject}
        onChange={(e) => setSubject(e.target.value)}/>
          </Form.Group>
          </Col>
        </Row>

        <Row>
        <label style={{fontFamily:"karla",fontSize:"14px",fontWeight:"400",marginTop:"24px",marginLeft:"-15px",marginBottom:"8px"}}>Content</label>
     

<Form.Group className="plc">
<Form.Control as="textarea" style={{borderRadius:"10px",height:"140px"}}rows={3}
 
placeholder="Enter your content"
value={message}
onChange={(e) => setMessage(e.target.value)}
 />
 </Form.Group>

        </Row>
         

        
      


      
      

     


      

     
      <button
        type="submit"

        style={{marginTop:"200px"}}
        
      >
        SUBMIT
      </button>
     

     

     
      
      <ToastContainer/>
    </Form>
    </Container>
    
    </Card>

    <div style={{marginTop:"0px",backgroundColor:"gray"}}>
          <p>.</p>
      </div>

    </div>
  );
};

export default Campaigns;


