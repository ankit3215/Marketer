import authReducer from "./authReducer";
import alertReducer from "./alertReducer";
import {combineReducers} from "redux";

const reducer = combineReducers({
    auth : authReducer,
    alert: alertReducer,
})

export default reducer;