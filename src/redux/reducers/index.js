<<<<<<< HEAD
import authReducer from './authReducer'
import alertReducer from './alertReducer'

import ClientReducer from './clientReducer'
import { combineReducers } from 'redux'

const reducer = combineReducers({
  auth: authReducer,
  alert: alertReducer,
  ClientReducer,
=======
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

>>>>>>> 49d823980faec6f7e123595ed54edfaa1d24387c
})

export default reducer
