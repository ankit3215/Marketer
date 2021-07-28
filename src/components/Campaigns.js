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
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const [loader, setLoader] = useState(false);
  const regexp = /[a-z]/gi;
  const ent=/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
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
    if(!email || !email.match(ent)){
      toast.error("Email is required and it should be of email type");
      
    }
    if(!message){
      toast.error("message is required");
    }

    if(name.match(regexp) && email.match(ent) && message){

    db.collection("cont")
      .add({
        name: name,
        email: email,
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
    setEmail("");
    setMessage("");
    }
  };

  return (
    <div className="ra">
      <p className="ra">All Campaigns  <span className="pa">Create Campaigns</span></p>
      
    <Card style={{backgroundColor:"white",paddingLeft:"30px",paddingRight:"100px",marginTop:"50px",marginLeft:"10px",marginRight:"30px",borderRadius:"10px"}}>
    <Container>

   
    <Form className="form" onSubmit={handleSubmit}>
    
      
      
        <Row style={{marginTop:"30px"}}>
          <Col>
          <p style={{marginBottom:"3px",fontFamily:"karla",fontSize:"14px",fontWeight:"400"}}>Campaign Name</p>
          <Form.Group className="plc" >
            <Form.Control style={{marginLeft:"-12px"}} type="text" placeholder="Campaign Name"  value={name} id="ram"
        onChange={(e) => setName(e.target.value)}/>
          </Form.Group>
          </Col>

          <Col>
          <p style={{marginBottom:"3px",fontFamily:"karla",fontSize:"14px",fontWeight:"400"}}>Subject</p>
          <Form.Group className="plc">
            <Form.Control  style={{marginLeft:"12px"}} type="text" placeholder="Subject"  value={email}
        onChange={(e) => setEmail(e.target.value)}/>
          </Form.Group>
          </Col>
        </Row>

        <Row>
        <label style={{fontFamily:"karla",fontSize:"14px",fontWeight:"400"}}>Content</label>
     

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

        style={{marginTop:"420px"}}
        
      >
        SUBMIT
      </button>

     

     
      
      <ToastContainer/>
    </Form>
    </Container>
    
    </Card>

    </div>
  );
};

export default Campaigns;

