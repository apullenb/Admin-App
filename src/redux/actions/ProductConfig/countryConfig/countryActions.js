import {
    GET_COUNTRIES_START,
    GET_COUNTRIES_SUCCESS,
    GET_COUNTRIES_FAILURE
} from './countryActionTypes'

import axios from 'axios';

export const handleFetchCountriesAsync = () => (dispatch) => {
    dispatch({type:GET_COUNTRIES_START});
    axios.get('https://zilis-general-api-be.azurewebsites.net/api/countries')
    .then(res => dispatch({type:GET_COUNTRIES_SUCCESS, payload:res.data}))
    .catch(error => dispatch({type:GET_COUNTRIES_FAILURE, payload:error}))
};