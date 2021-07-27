import * as actionKeys from "../actionKeys";
import {
  checkUserStatus,
  removeAuthToken,
  googleAuth,
  setAccessToken,
  resetPasswordRequest,
} from "../../services/authServices";
import {
  addDocument,
  updateDocument,
  removeUserAccessToken,
} from "../../services/firestoreServices";


const updateUser = async (userId, userData) => {
  return await updateDocument("userInfo", userId, userData);
};


const setUserData = async (dispatch) => {
  const userData = await checkUserStatus();

  const userInfo = {
    ...(userData && { ...userData.data() }),
    userId: userData.id,
  };

  dispatch({
    type: actionKeys.SET_USER_DATA,
    payload: {
      userInfo: userInfo,
    },
  });
};


const logOutUser = async (dispatch, userId,history) => {
  await removeUserAccessToken(userId);
  removeAuthToken();

  dispatch({
    type: actionKeys.LOGOUT_USER,
  });
   history.push("/")
};


const loginWithGoogle = async (dispatch) => {
  const gData = await googleAuth().catch((error) => {
    throw error;
  });
  const { displayName, email, refreshToken } = gData.user;

  const userDoc = await addDocument("userInfo", { displayName, email });
  const userInfo = (await userDoc.get()).data();
  const userId = userDoc.id;

  await setAccessToken(userId, refreshToken);

  dispatch({
    type: actionKeys.SET_USER_DATA,
    payload: {
      userInfo: { ...userInfo, userId },
    },
  });
};

const resetPassword = async (email) => {
  const resolved = await resetPasswordRequest(email).catch((error) => {
    throw error;
  });
  return resolved;
};

export {
  updateUser,
  setUserData,
  logOutUser,
  loginWithGoogle,
  resetPassword,
};
