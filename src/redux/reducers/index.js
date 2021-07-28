import authReducer from './authReducer'
import alertReducer from './alertReducer'

import ClientReducer from './clientReducer'
import { combineReducers } from 'redux'

const reducer = combineReducers({
  auth: authReducer,
  alert: alertReducer,
  ClientReducer,
})

export default reducer
