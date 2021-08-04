import * as actionKeys from '../actionKeys'
const initialState = {
  clients: [],
  // search: '',
}

const ClientReducer = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case actionKeys.GET_CLIENT:
      return {
        ...state,
        clients: payload,
      }
    // case actionKeys.GET_CLIENT1:
    //   return {
    //     ...state,
    //     clients1: payload,
    //   }
    case actionKeys.UPDATE_CLIENT:
      return {
        ...state,
        clients: state.clients.map((item) =>
          item.id === payload.id ? payload : item
        ),
      }
    case actionKeys.DELETE_CLIENT:
      return {
        ...state,
        clients: state.clients.filter((client) => client.id !== payload),
      }
    default:
      return state
  }
}

export default ClientReducer
