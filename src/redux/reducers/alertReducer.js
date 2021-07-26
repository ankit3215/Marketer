import * as actionKeys from "../actionKeys";

const initialState = {
    isRequired : false,
    message : '',
    alertType : ''
}

const alertReducer = (state = initialState, action) => {
    const {type, payload} = action;

    switch (type){
        case actionKeys.SUCCESS_ALERT : 
            return {
                ...state,
                isRequired : true,
                message : payload.message,
                alertType : payload.alertType
            }
        case actionKeys.ERROR_ALERT :
            return {
                ...state,
                isRequired : true,
                message : payload.message,
                alertType : payload.alertType
            }
        case actionKeys.HIDE_ALERT:
            return initialState
            
        default : 
            return state
    }
}

export default alertReducer;