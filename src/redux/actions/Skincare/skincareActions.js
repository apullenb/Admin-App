import {
    GET_ENTRIES_START,
    GET_ENTRIES_SUCCESS,
    GET_ENTRIES_FAILURE,
    GET_ACCOUNTS_START,
    GET_ACCOUNTS_SUCCESS,
    GET_ACCOUNTS_FAILURE,
    GET_FILTERED_ACCOUNTS_START,
    GET_FILTERED_ACCOUNTS_SUCCESS,
    GET_FILTERED_ACCOUNTS_FAILURE
} from './skincareActionTypes'

import axios from 'axios';
import config from "../../../config/env-urls";

export const getEntries = (perPage = 10, pageNo = 1, sort = "entries.id", sortDirection = "asc") => (dispatch) => {
    dispatch({type: GET_ENTRIES_START});
    return axios
    .get(`${config.SKINCAREBASEURL}/api/challenge/all-entries?perPage=${perPage}&pageNo=${pageNo}&orderBy=${sort}&sortDirection=${sortDirection}`)
    .then(res=>{
        dispatch({type:GET_ENTRIES_SUCCESS, payload:res.data});
    })
    .catch(error=>{
        dispatch({type:GET_ENTRIES_FAILURE, payload:error});
    })
};


export const getAccounts = (perPage = 10, pageNo = 1, sort = "users.id", sortDirection = "asc") => (dispatch) => {
    dispatch({type: GET_ACCOUNTS_START});
    return axios
    .get(`${config.SKINCAREBASEURL}/api/challenge/all-users?perPage=${perPage}&pageNo=${pageNo}&orderBy=${sort}&sortDirection=${sortDirection}`)
    .then(res=>{
        dispatch({type:GET_ACCOUNTS_SUCCESS, payload:res.data});
    })
    .catch(error=>{
        dispatch({type:GET_ACCOUNTS_FAILURE, payload:error});
    })
};


export const filterAccounts = (filter = "users.id") => (dispatch) => {
    dispatch({type: GET_FILTERED_ACCOUNTS_START});
    return axios
    .get(`${config.SKINCAREBASEURL}/api/challenge/all-users?filtered=${filter}`)
    .then(res=>{
        dispatch({type:GET_FILTERED_ACCOUNTS_SUCCESS, payload:res.data});
    })
    .catch(error=>{
        dispatch({type:GET_FILTERED_ACCOUNTS_FAILURE, payload:error});
    })
};

