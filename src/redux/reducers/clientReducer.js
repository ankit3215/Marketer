
import * as actionKeys from "../actionKeys";
const initialState = {
    clients : []
    
};

const ClientReducer = (state = initialState, action) => {
    const {type, payload} = action;

        switch(type){
            case actionKeys.GET_CLIENT :
                return {
                    ...state,
                    clients : payload,
                }

            default :
                return state;
        }
}

export default ClientReducer;

