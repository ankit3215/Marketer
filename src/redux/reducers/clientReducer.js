import * as actionKeys from '../actionKeys'
const initialState = {
  clients: [],
  clients1: [],
}

const ClientReducer = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case actionKeys.GET_CLIENT:
      return {
        ...state,
        clients: payload,
      }
    case actionKeys.GET_CLIENT1:
      return {
        ...state,
        clients1: payload,
      }
    case 'UPDATED':
      return {
        ...state,
        clients1: state.clients1.map((item) =>
          item.id === payload.id ? payload : item
        ),
      }
    default:
      return state
  }
}

export default ClientReducer
