import * as actionKeys from "../actionKeys";
const initialState = {
    userInfo : {},
    authInfo : {},
    isLoggedIn : false,
};

const AuthReducer = (state = initialState, action) => {
    const {type, payload} = action;

        switch(type){
            case actionKeys.LOGIN_USER :
                return {
                    ...state,
                    isLoggedIn : true,
                    authInfo: payload.authInfo,
                    userInfo : payload.userInfo
                }
            case actionKeys.SET_USER_DATA : 
                return {
                    ...state,
                    userInfo : payload.userInfo,
                    isLoggedIn : true
                }

            case actionKeys.LOGOUT_USER:
                return initialState

            default :
                return state;
        }
}

export default AuthReducer;