import firebase from '../firebase'

const db = firebase.firestore()

export const addDocument = async (collection, data) => {
  try {
    const newDoc = await db.collection(collection).add(data)
    return newDoc
  } catch (error) {
    console.log(error)
  }
}

export const updateDocument = async (collection, docId, newData) => {
  console.log(docId)
  return await db.collection(collection).doc(docId).update(newData)
}

export const searchForEmail = async (value) => {
  const filteredDoc = await db
    .collection('userInfo')
    .where('email', '==', value)
    .get()
  return filteredDoc.docs
}

export const searchForAccessToken = async (token) => {
  const doc = await db
    .collection('userInfo')
    .where('accessToken', '==', token)
    .get()
  return doc.docs
}

export const removeUserAccessToken = async (userId) => {
  return await db.collection('userInfo').doc(userId).update({ accessToken: '' })
}

export const FetchClient = async () => {
  return await db.collection('client').get()
}
export const FetchCompaign = async () => {
  return await db.collection('campaign').get()
}
export const FetchCampaigns = async () => {
  return await db.collection('campaign').get()
}

export const EditClient = async (userData) => {
  // console.log(userData)
  return await db.collection('client').doc(userData.id).update(userData.data)
}

export const DeleteClient = async (id) => {
  // console.log(userData)
  return await db.collection('client').doc(id).delete()
}

export const getCampaignById = async (id) => {
  return await db.collection('campaign').doc(id).get()
}

export const getClientEmailById = async (clientIds) => {
  let clientData = []
  let querySnapshot = await db.collection('client').get()

  querySnapshot.forEach((doc) => {
    if (clientIds.includes(doc.id.toString()))
      clientData.push(doc.data().client_email)
  })

  return clientData
}

export const EditCampaign = async (userData) => {
  // console.log(userData)
  return await db.collection('campaign').doc(userData.id).update(userData.data)
}

export const DeleteCampaign = async (id) => {
  // console.log(userData)
  return await db.collection('campaign').doc(id).delete()
}

export const fetchHistory = async () => {
  let history=[];
  let querySnapshot = await db.collection('history').get()
  querySnapshot.forEach((doc) => {
      history.push({key:doc.id,...doc.data()})
  })

 

  return history
}

export const fetchHistoryByTime = async (startDate, endDate) => {
  let history=[];
  startDate = new Date(startDate)
  endDate = new Date(endDate)
  let querySnapshot = await db.collection('history').where("createdAt",">",startDate).where("createdAt","<",endDate)
  .get()
  querySnapshot.forEach((doc) => {
      history.push({key:doc.id,...doc.data()})
  })



 

  return history
}

export const fetchHistoryByDate = async (date) => {
  let history=[];
  date = new Date(date)
  date.setHours(0)
  let endDate = new Date(date)
  endDate.setHours(23)
  
  let querySnapshot = await db.collection('history').where("createdAt","<=",endDate).where("createdAt",">=",date)
  .get()
  querySnapshot.forEach((doc) => {
    
      history.push({key:doc.id,...doc.data()})
  })


  
 

  return history
}

export const getClientDataByIds = async (clientIds) => {
  let clientData = []
  let querySnapshot = await db.collection('client').get()

  querySnapshot.forEach((doc) => {
    if (clientIds.includes(doc.id.toString()))
      clientData.push({clientEmail:doc.data().client_email,clientName:doc.data().client_name})
  })

  return clientData
}


export default db
