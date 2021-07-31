import  {
  getCampaignById,
  getClientEmailById,
} from "../../services/firestoreServices";
import sendEmail from "../../services/emailServices";

export const sendMailer =
  (campaign, clients, window, toast, setOn) => async (dispatch) => {
    try {
      //get data for campaign by id
      let docRef = await getCampaignById(campaign);
      let campaignData = docRef.data();

      //get data for client Email by id
      let clientEmail = await getClientEmailById(clients);

      // mail function
     await sendEmail(clientEmail,campaignData,window);

     toast.success("Mail Send")
     setOn(false) 

    } catch (error) {
      toast.error("Something went wrong")
    }
  };
