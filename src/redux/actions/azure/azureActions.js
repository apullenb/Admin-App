import custAxios from '../../../services/interceptors/httpService';
import * as AZACTIONS from '../azure/azureAdActionTypes';
import { LOGGED_IN, LOG_OUT } from '../app/appActionTypes';
import { graphConfig, loginRequest } from '../../../services/azureAD/authConfig';
import * as Auth from '../../../auth/Authorize';
import { loginZilisReq } from '../../../services/azureAD/authConfig';
import { SkincareAdminPermissions, LoginSkincareAdmin } from '../../actions/Skincare/skincareActions';
import config from '../../../config/env-urls';

export const handleLogin = (instance) => {
  return async (dispatch) => {
    function onSuccess(success) {
      return success;
    }
    function onError(error) {
      return error;
    }
    try {
      const res = await instance.loginPopup(loginRequest);
      dispatch({ type: AZACTIONS.SET_AZAD_ACCESS_TOKEN, payload: res.accessToken });
      Auth.setToken(Auth.aZAdminToken, res.accessToken);
      dispatch(callMsGraph(res.accessToken));
      dispatch(LoginSkincareAdmin(config.SKINCAREUSER))
      return onSuccess({ account: res.account });
    } catch (error) {
      return onError(error);
    }
  };
};

export const callMsGraph = () => (dispatch) => {
  custAxios
    .get(graphConfig.graphMeEndpoint)
    .then((response) => {
      dispatch(getProfileImage());
      dispatch({ type: AZACTIONS.GET_AZPROFILE_SUCCESS, payload: response.data });
      dispatch({ type: LOGGED_IN, payload: true });
      return response.data;
    })
    .then((response) => {
      dispatch(SkincareAdminPermissions(response.mail));
    })
    .catch((error) => {
      dispatch({ type: AZACTIONS.GET_AZPROFILE_FAILURE, payload: error });
    });
};

export const getProfileImage = () => (dispatch) => {
  custAxios
    .get(graphConfig.graphPofileImgEndpoint, { responseType: 'blob' })
    .then((res) => {
      const url = window.URL || window.webkitURL;
      var imageLink = url.createObjectURL(new Blob([res.data]), { type: 'image/jpeg' });
      dispatch({ type: AZACTIONS.GET_AZPROFILE_IMAGE_SUCCESS, payload: imageLink });
    })
    .catch((error) => {
      console.log(error);
      dispatch({ type: AZACTIONS.GET_AZPROFILE_IMAGE_FAILURE, payload: error });
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
  dispatch({ type: AZACTIONS.RESET_STATE });
  Auth.removeToken(Auth.aZAdminToken);
  Auth.removeToken(Auth.zilisAdminToken);
};

export const handleLoginZilis = (instance, account) => (dispatch) => {
  const request = { ...loginZilisReq, account };
  instance
    .acquireTokenSilent(request)
    .then((res) => {
      Auth.setToken(Auth.zilisAdminToken, res.accessToken);
      dispatch({ type: AZACTIONS.GET_ZILIS_SERVICE_TOKEN_SUCCESS });
    })
    .catch((err) => {
      dispatch({ type: AZACTIONS.GET_ZILIS_SERVICE_TOKEN_FAILURE });
      console.log(err);
    });
};
