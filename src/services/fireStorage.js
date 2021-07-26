import firebase from "../firebase";

const storageRef = firebase.storage().ref();

export const uploadFile = async (fileObj, ref) => {
    const fileRef = storageRef.child(ref);
    await fileRef.put(fileObj);
    return await fileRef.getDownloadURL();
}





