import {
    GET_PRODUCTS_START,
    GET_PRODUCTS_SUCCESS,
    GET_PRODUCTS_FAILURE
} from './productActionTypes'

import axios from 'axios';
import config from '../../../../config/env-urls';

export const handleFetchProductsAsync = () => (dispatch) => {
    dispatch({type:GET_PRODUCTS_START});
    axios.get(`${config.PRODUCTSBASEURL}/api/products`)
    .then(res => dispatch({type:GET_PRODUCTS_SUCCESS, payload:res.data}))
    .catch(error => dispatch({type:GET_PRODUCTS_FAILURE, payload:error}))
};