import * as actionKeys from '../actionKeys'
import {
  EditClient,
  FetchClient,
  DeleteClient,
} from '../../services/firestoreServices'

export const clientList = () => async (dispatch) => {
  let data = await FetchClient()

  // console.log(data)
  let client = []
  data.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, ' => ', doc.data())
    client.push({ id: doc.id, data: doc.data() })
  })

  dispatch({
    type: actionKeys.GET_CLIENT,
    payload: client,
  })
}
// export const clientList1 = () => async (dispatch) => {
//   let data = await FetchClient()

//   // console.log(data)
//   let client = []
//   data.forEach((doc) => {
//     // doc.data() is never undefined for query doc snapshots
//     console.log(doc.id, ' => ', doc.data())
//     client.push({ id: doc.id, data: doc.data() })
//   })

//   dispatch({
//     type: actionKeys.GET_CLIENT1,
//     payload: client,
//   })
// }

export const editClient = (userData) => (dispatch) => {
  // console.log(userData)
  EditClient(userData)
    .then(() => {
      dispatch({
        type: actionKeys.UPDATE_CLIENT,
        payload: userData,
      })
      dispatch(clientList())
    })
    .catch((err) => {})

  // console.log(data)
}

export const deleteClient = (id) => (dispatch) => {
  // console.log(userData)
  DeleteClient(id)
    .then(() => {
      dispatch({
        type: actionKeys.DELETE_CLIENT,
        payload: id,
      })
    })
    .catch((err) => {})

  // console.log(data)
}
