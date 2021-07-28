<<<<<<< HEAD
import * as actionKeys from '../actionKeys'
const initialState = {
  clients: [],
}

const ClientReducer = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case actionKeys.GET_CLIENT:
      return {
        ...state,
        clients: payload,
      }

    default:
      return state
  }
}

export default ClientReducer
=======
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
>>>>>>> 49d823980faec6f7e123595ed54edfaa1d24387c
