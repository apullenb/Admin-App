import {
    STORE_SKINCARE_AUTH_TOKEN
} from './appActionTypes'

export const storeSkincareAuthToken = (skincareAuthToken) => (dispatch) => {
  dispatch({type: STORE_SKINCARE_AUTH_TOKEN, payload:skincareAuthToken});
};
