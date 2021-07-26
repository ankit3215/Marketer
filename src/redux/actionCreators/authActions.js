import * as actionKeys from "../actionKeys";
import {
  authAddUser,
  authVerifyUser,
  checkUserStatus,
  removeAuthToken,
  googleAuth,
  setAccessToken,
  resetPasswordRequest,
} from "../../services/authServices";
import {
  addDocument,
  updateDocument,
  searchForEmail,
  removeUserAccessToken,
} from "../../services/firestoreServices";

const registerUser = async (dispatch, userData) => {
  const response = await authAddUser(userData.email, "Root@9319");
  if (response.rejected) {
    throw response.error;
  }

  const userDoc = await addDocument("userInfo", userData);
  const userInfo = (await userDoc.get()).data();
  const userId = userDoc.id;

  // Set user data to store
  dispatch({
    type: actionKeys.SET_USER_DATA,
    payload: {
      userInfo: { ...userInfo, userId },
    },
  });

  return userId;
};

const updateUser = async (userId, userData) => {
  return await updateDocument("userInfo", userId, userData);
};

const signInUser = async (dispatch, userData) => {
  const credentials = await authVerifyUser(userData.email, userData.password);
  if (credentials.rejected) {
    throw credentials.error;
  }

  const doc = await searchForEmail(userData.email);
  const accessToken = credentials.user.refreshToken;
  const userId = doc[0].id;
  await setAccessToken(userId, accessToken);

  dispatch({
    type: actionKeys.LOGIN_USER,
    payload: {
      authInfo: credentials.user,
      userInfo: { ...doc[0].data(), userId },
    },
  });

  return credentials;
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

const logOutUser = async (dispatch, userId) => {
  console.log(userId);
  await removeUserAccessToken(userId);
  removeAuthToken();

  dispatch({
    type: actionKeys.LOGOUT_USER,
  });
};

const signUpWithGoogle = async (dispatch) => {
  const gData = await googleAuth().catch((error) => {
    throw error;
  });
  const { displayName, email } = gData.user;

  const doc = await searchForEmail(email);

  if (doc.length > 0) {
    // eslint-disable-next-line no-throw-literal
    throw { code: "auth/email-already-exist" };
  }

  const userDoc = await addDocument("userInfo", { displayName, email });
  const userInfo = (await userDoc.get()).data();
  const userId = userDoc.id;

  dispatch({
    type: actionKeys.SET_USER_DATA,
    payload: {
      userInfo: { ...userInfo, userId },
    },
  });
};

const loginWithGoogle = async (dispatch) => {
  const gData = await googleAuth().catch((error) => {
    throw error;
  });

  const { email, refreshToken } = gData.user;
  const doc = await searchForEmail(email);
  const userId = doc[0].id;
  if (doc.length < 1) {
    // eslint-disable-next-line no-throw-literal
    throw { code: "auth/email-not-registered" };
  }

  await setAccessToken(userId, refreshToken);

  dispatch({
    type: actionKeys.LOGIN_USER,
    payload: {
      authInfo: gData.user,
      userInfo: { ...doc[0].data(), userId },
    },
  });

  return doc[0].data();
};

const resetPassword = async (email) => {
  const resolved = await resetPasswordRequest(email).catch((error) => {
    throw error;
  });
  return resolved;
};

export {
  registerUser,
  signInUser,
  updateUser,
  setUserData,
  logOutUser,
  signUpWithGoogle,
  loginWithGoogle,
  resetPassword,
};
