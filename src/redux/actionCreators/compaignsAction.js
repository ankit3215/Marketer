import * as actionKeys from '../actionKeys'
import {FetchCompaign } from '../../services/firestoreServices'

export const CompaignList = () => async (dispatch) => {
  let data = await FetchCompaign()

  // console.log(data)
  let compaign = []
  data.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    // console.log(doc.id, ' => ', doc.data())
    compaign.push({ id: doc.id, data: doc.data() })
    console.log(compaign);
  })

  dispatch({
    type: actionKeys.GET_Compaign,
    payload: compaign,
  })
}