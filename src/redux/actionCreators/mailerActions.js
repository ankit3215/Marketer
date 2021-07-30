import * as actionKeys from '../actionKeys'
import db,{  } from '../../services/firestoreServices'
import {mailerAlert} from './alertActions';


export const sendMailer = (campaign,clients,window) => async (dispatch) => {
    //get data for campaaign
    let docRef = await db.collection("campaign").doc(campaign).get();
    let campaignData = docRef.data()
    //get data for client
    let clientData = []
   let querySnapshot = await db.collection("client").get()

    querySnapshot.forEach((doc) => {
        if(clients.includes((doc.id).toString()))
        clientData.push(doc.data().client_email);
    });

    

    // console.log(clientData,campaignData.subject,campaignData.content);
       // mail function 
        window.Email.send({
           SecureToken : "a66a457c-0910-429b-9643-b6a48a3c16c2",
           To : clientData,
           From : "reactjs137@gmail.com",
           Subject : campaignData.subject,
           Body : campaignData.content,
       }).then(
     message => console.log(message)
   );
     mailerAlert(dispatch,"Mail send")
  }