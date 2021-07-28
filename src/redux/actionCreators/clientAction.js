import * as actionKeys from "../actionKeys";
import {
   FetchClient
  } from "../../services/firestoreServices";
  

 export const clientList = () => async (dispatch) => {
     let data = await FetchClient()

  console.log(data);
  let client =[]
  data.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, " => ", doc.data());
    client.push(doc.data());
});

dispatch({
    type:actionKeys.GET_CLIENT ,
    payload: client
})
  };