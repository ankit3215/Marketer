import authReducer from "./authReducer";
import alertReducer from "./alertReducer";
import CampaignReducer from "./campaignReducer";
import ClientReducer from "./clientReducer";
import {combineReducers} from "redux";

const reducer = combineReducers({
    auth : authReducer,
    alert: alertReducer,
    ClientReducer,
    CampaignReducer,

})

export default reducer;