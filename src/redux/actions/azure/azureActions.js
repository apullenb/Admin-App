import axios from 'axios';
import * as AZACTIONS from '../azure/azureAdActionTypes';
import { LOGGED_IN, LOG_OUT } from '../app/appActionTypes';
import { graphConfig, loginRequest } from '../../../services/azureAD/authConfig';
import * as Auth from '../../../auth/Authorize';

export const handleLogin = (instance) => (dispatch) => {
  instance
    .loginPopup(loginRequest)
    .then((res) => {
      dispatch({ type: AZACTIONS.SETAZADACCESSTOKEN, payload: res.accessToken });
      Auth.setToken(res.accessToken);
      dispatch(callMsGraph(res.accessToken));
    })
    .catch((error) => {
      console.error(error);
    });
};

export const callMsGraph = (accessToken) => (dispatch) => {
  const bearer = `Bearer ${accessToken}`;
  const options = {
    headers: {
      Authorization: bearer,
    },
  };

  axios
    .get(graphConfig.graphMeEndpoint, options)
    .then((response) => {
      dispatch(getProfileImage(accessToken));
      dispatch({ type: AZACTIONS.GETAZPROFILESUCCESS, payload: response.data });
      dispatch({ type: LOGGED_IN, payload: true });
    })
    .catch((error) => {
      dispatch({ type: AZACTIONS.GETAZPROFILEFAILURE, payload: error });
    });
};

export const getProfileImage = (accessToken) => (dispatch) => {
  const bearer = `Bearer ${accessToken}`;
  const options = {
    headers: {
      Authorization: bearer,
    },
  };
  axios
    .get(graphConfig.graphPofileImgEndpoint, { ...options, responseType: 'blob' })
    .then((res) => {
      const url = window.URL || window.webkitURL;
      var imageLink = url.createObjectURL(new Blob([res.data]), { type: 'image/jpeg' });
      dispatch({ type: AZACTIONS.GETAZPROFILEIMAGESUCCESS, payload: imageLink });
    })
    .catch((error) => {
      console.log(error);
      dispatch({ type: AZACTIONS.GETAZPROFILEIMAGEFAILURE, payload: error });
    });
};

export const handleLogout = (instance) => (dispatch) => {
  instance
    .logoutPopup()
    .then(() => {
      dispatch(logoutCleanup());
    })
    .catch((e) => {
      console.error(e);
    });
};

const logoutCleanup = () => (dispatch) => {
  dispatch({ type: LOG_OUT });
  dispatch({ type: AZACTIONS.RESETSTATE });
  Auth.removeToken();
};
