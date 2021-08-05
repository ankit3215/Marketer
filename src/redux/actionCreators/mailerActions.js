import  {
  getCampaignById,
  getClientEmailById,
  addDocument,
  fetchHistory,getClientDataByIds,fetchHistoryByTime
} from "../../services/firestoreServices";
import sendEmail from "../../services/emailServices";
import * as actionKeys from '../actionKeys'

export const sendMailer =
  (campaign, clients, window, toast, setOn) => async (dispatch) => {
    try {

      console.log("campaaign:",campaign);
      console.log("client:",clients);
      //get data for campaign by id
      let docRef = await getCampaignById(campaign);
      let campaignData = docRef.data();

      //get data for client Email by id
      let clientEmail = await getClientEmailById(clients);

      // mail function
     await sendEmail(clientEmail,campaignData,window);

     let clientData = await getClientDataByIds(clients)

     clientData.map(async e =>{
      const obj = {
        campaignName:campaignData.name,
        campaignSubject:campaignData.subject,
        clientName:e.clientName,
        clientEmail:e.clientEmail,
        createdAt:new Date(),
      }
      await addDocument("history",obj);
     })
     

    



     toast.success("Mail Send")
     setOn(false) 

    } catch (error) {
      toast.error("Something went wrong")
    }
  };


  export const getHistory = (startDate, endDate) => async (dispatch) => {
    if(startDate==="" ||endDate===""){
      let history = await fetchHistory()
      dispatch({type:actionKeys.GET_HISTORY,payload:history});
    }
    else{
      let history = await fetchHistoryByTime(startDate, endDate)
      dispatch({type:actionKeys.GET_HISTORY,payload:history});

      
    }
  }
