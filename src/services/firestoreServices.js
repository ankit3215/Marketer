import firebase from '../firebase'

const db = firebase.firestore()

export const addDocument = async (collection, data) => {
  const newDoc = await db.collection(collection).add(data)
  return newDoc
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

export default db
