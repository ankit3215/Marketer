import * as actionKeys from '../actionKeys'
import { FetchCampaigns } from '../../services/firestoreServices'

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