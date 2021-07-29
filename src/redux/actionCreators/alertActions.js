import * as actionKeys from "../actionKeys";

export const successAlert = (dispatch, message) => {
    dispatch({
        type: actionKeys.SUCCESS_ALERT,
        payload : {
            message : message,
            alertType : "success"
        }
    });
}

export const mailerAlert = (dispatch, message) => {
    dispatch({
        type: actionKeys.SUCCESS_ALERT,
        payload : {
            message : message,
            alertType : "success"
        }
    });
}

export const errorAlert = (dispatch, message) => {
    dispatch({
        type: actionKeys.ERROR_ALERT,
        payload: {
            message: message,
            alertType: "error"
        }
    });
}

export const hideAlert = (dispatch) => {
    dispatch({
        type : actionKeys.HIDE_ALERT,
    })
}

