import {
    GET_ENTRIES_START,
    GET_ENTRIES_SUCCESS,
    GET_ENTRIES_FAILURE
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


