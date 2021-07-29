import React, { useState, useEffect } from "react";
// import firebase from "firebase";

import "./Camp.css";
import  {firebase,db} from '../firebase';
import { toast,ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import {Card,Row,Col,Container,Form,Button} from 'react-bootstrap';
import { useSelector } from "react-redux";



const Campaigns = () => {

    const auth = useSelector((state) => state.auth.userInfo.userId);
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const [loader, setLoader] = useState(false);
  const regexp = /[a-z]/gi;
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
      <div style={{marginTop:"30px"}}>

      </div>
      <p className="camps">Campaigns</p>
      <p className="ras">All Campaigns  <span className="pa">Create Campaigns</span></p>
      
    <Card style={{backgroundColor:"white",paddingLeft:"30px",paddingRight:"100px",marginTop:"24px",marginLeft:"30px",marginRight:"30px",borderRadius:"10px"}}>
    <Container>

   
    <Form className="form" onSubmit={handleSubmit}>
    
      
      
        <Row style={{marginTop:"30px"}}>
          <Col>
          <p style={{marginBottom:"8px",fontFamily:"karla",fontSize:"14px",fontWeight:"400",marginLeft:"-10px",height:"16px",width:"156px"}}>Campaign Name</p>
          <Form.Group className="plc" >
            <Form.Control style={{marginLeft:"-12px",width:"515px",height:"48px"}} type="text" placeholder="Campaign Name"  value={name} id="ram"
        onChange={(e) => setName(e.target.value)}/>
          </Form.Group>
          </Col>

          <Col>
          <p style={{marginBottom:"8px",fontFamily:"karla",fontSize:"14px",fontWeight:"400",height:"16px",width:"156px",marginLeft:"57px"}}>Subject</p>
          <Form.Group className="plc">
            <Form.Control  style={{marginLeft:"58px",width:"515px",height:"48px"}} type="text" placeholder="Subject"  value={subject}
        onChange={(e) => setSubject(e.target.value)}/>
          </Form.Group>
          </Col>
        </Row>

        <Row>
        <label style={{fontFamily:"karla",fontSize:"14px",fontWeight:"400",marginTop:"24px"}}>Content</label>
     

<Form.Group className="plc">
<Form.Control as="textarea" rows={3}

placeholder="Enter your content"
value={message}
onChange={(e) => setMessage(e.target.value)}
 />
 </Form.Group>

        </Row>
         

        
      


      
      

     


      

     
      <button
        type="submit"

        style={{marginTop:"300px"}}
        
      >
        SUBMIT
      </button>
      <div style={{marginBottom:"-10px"}}>
          <p>.</p>
      </div>

     

     
      
      <ToastContainer/>
    </Form>
    </Container>
    
    </Card>

    </div>
  );
};

export default Campaigns;

