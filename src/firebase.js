import firebase from 'firebase'

const firebaseConfig = {
  apiKey: 'AIzaSyCRX0Wy49Qjg_VOTPfE5Y0CbysccWqkVHo',
  authDomain: 'marketer-11e67.firebaseapp.com',
  projectId: 'marketer-11e67',
  storageBucket: 'marketer-11e67.appspot.com',
  messagingSenderId: '809757151893',
  appId: '1:809757151893:web:bae764f288c3ce2a91019c',
  measurementId: 'G-CX802H1MGB',
}

firebase.initializeApp(firebaseConfig)

export const db = firebase.firestore();


export default firebase;
