import * as actionKeys from '../actionKeys'
const initialState = {
  campaigns: [],
}

const CampaignReducer = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case actionKeys.GET_CAMPAIGNS:
      return {
        ...state,
        campaigns: payload,
      }

    default:
      return state
  }
}

export default CampaignReducer
