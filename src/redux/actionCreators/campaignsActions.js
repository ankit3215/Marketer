import * as actionKeys from '../actionKeys'
import { FetchCampaigns,EditCampaign,DeleteCampaign } from '../../services/firestoreServices'
import {CompaignList} from './compaignsAction'
export const campaignsList = () => async (dispatch) => {
  let data = await FetchCampaigns()

  // console.log(data)
  let campaign = []
  data.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, ' => ', doc.data())
    campaign.push({ id: doc.id, data: doc.data() })
  })

  dispatch({
    type: actionKeys.GET_CAMPAIGNS,
    payload: campaign,
  })
}


export const editCampaign = (userData) => (dispatch) => {
  // console.log(userData)
  EditCampaign(userData)
    .then(() => {
      // dispatch(campaignsList())
      dispatch(CompaignList())
    })
    .catch((err) => {})

  // console.log(data)
}


export const deleteCampaign = (id) => (dispatch) => {
  // console.log(userData)
  DeleteCampaign(id)
    .then(() => {
      dispatch(CompaignList())
    })
    .catch((err) => {})

  // console.log(data)
}