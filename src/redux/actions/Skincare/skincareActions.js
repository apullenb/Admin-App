import {
  GET_ENTRIES_START,
  GET_ENTRIES_SUCCESS,
  GET_ENTRIES_FAILURE,
  GET_ACCOUNTS_START,
  GET_ACCOUNTS_SUCCESS,
  GET_ACCOUNTS_FAILURE,
  GET_FILTERED_ACCOUNTS_START,
  GET_FILTERED_ACCOUNTS_SUCCESS,
  GET_FILTERED_ACCOUNTS_FAILURE,
  LOGIN_ADMIN_SKINCARE_START,
  LOGIN_ADMIN_SKINCARE_SUCCESS,
  LOGIN_ADMIN_SKINCARE_FAILURE,
} from "./skincareActionTypes";

import axios from "axios";
import config from "../../../config/env-urls";

export const getEntries =
  (perPage = 10, pageNo = 1, sort = "entries.id", sortDirection = "asc") =>
  (dispatch) => {
    dispatch({ type: GET_ENTRIES_START });
    return axios
    .get(`${config.SKINCAREBASEURL}/api/challenge/all-entries?perPage=${perPage}&pageNo=${pageNo}&orderBy=${sort}&sortDirection=${sortDirection}`)
    .then(res=>{
        dispatch({type:GET_ENTRIES_SUCCESS, payload:res.data});
    })
    .catch(error=>{
        dispatch({type:GET_ENTRIES_FAILURE, payload:error});
    })
};
export const getGlowEntries = (perPage = 10, pageNo = 1, sort = "glowEntryId", sortDirection = "asc", filter = '') => (dispatch) => { 
  dispatch({type: GET_ENTRIES_START});
  return axios 
  .get(`${config.SKINCAREBASEURL}/api/challenge/all-glow-entries?pageNo=${pageNo}&perPage=${perPage}&orderBy=${sort}&sortDirection=${sortDirection}&filter=${filter}`)
  .then(res=>{
      dispatch({type:GET_ENTRIES_SUCCESS, payload:res.data});
  })
  .catch(error=>{
      dispatch({type:GET_ENTRIES_FAILURE, payload:error});
  })
};

export const getAccounts =
  (perPage = 10, pageNo = 1, sort = "users.id", sortDirection = "asc") =>
  (dispatch) => {
    dispatch({ type: GET_ACCOUNTS_START });
    return axios
    .get(`${config.SKINCAREBASEURL}/api/challenge/all-users?perPage=${perPage}&pageNo=${pageNo}&orderBy=${sort}&sortDirection=${sortDirection}`)
    .then(res=>{
     
        dispatch({type:GET_ACCOUNTS_SUCCESS, payload:res.data});
    })
    .catch(error=>{
        dispatch({type:GET_ACCOUNTS_FAILURE, payload:error});
    })
};

export const filterAccounts =
  (col, filter, perPage = 10, pageNo = 1, sort = "id", sortDirection = "asc") =>
  (dispatch) => {
    dispatch({ type: GET_FILTERED_ACCOUNTS_START });
    return axios
      .post(
        `${config.SKINCAREBASEURL}/api/challenge/get-user-by?perPage=${perPage}&pageNo=${pageNo}&orderBy=${sort}&sortDirection=${sortDirection}`,
        { col, filter }
      )
      .then((res) => {
        dispatch({ type: GET_FILTERED_ACCOUNTS_SUCCESS, payload: res.data });
      })
      .catch((error) => {
        dispatch({ type: GET_FILTERED_ACCOUNTS_FAILURE, payload: error });
      });
  };

export const LoginSkincareAdmin = (skincareUser) => {
  return async (dispatch) => {
    dispatch({ type: LOGIN_ADMIN_SKINCARE_START });
    function onSuccess(success) {
      console.log(success);
      dispatch({ type: LOGIN_ADMIN_SKINCARE_SUCCESS, payload: success.data });
      return success;
    }
    function onError(error) {
      dispatch({
        type: LOGIN_ADMIN_SKINCARE_FAILURE,
        payload: error.response.data.error,
      });
      return error;
    }
    try {
      console.log("here we are")
      const success = await axios.post(
        `${config.SKINCAREBASEURL}/api/challenge/login`,
        skincareUser
      );
      localStorage.setItem("Token", success.data.token);

      return onSuccess(success);
    } catch (error) {
      return onError(error);
    }
  };
};
