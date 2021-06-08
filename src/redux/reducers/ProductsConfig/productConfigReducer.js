import {
    GET_PRODUCTS_START,
    GET_PRODUCTS_SUCCESS,
    GET_PRODUCTS_FAILURE
} from '../../actions/Configuration/productConfig/productActionTypes';


const initalState = {
    products: [],
    fetching:false,
    error: null
}

export const productConfigReducer = (state = initalState, action) => {
    switch (action.type) {
        case GET_PRODUCTS_START :
           return {
                ...state,
                fetching: true,
                error:null
            }
            case GET_PRODUCTS_SUCCESS :
           return {
                ...state,
                fetching: false,
                error:null,
                products: action.payload
            }
            case GET_PRODUCTS_FAILURE :
           return {
                ...state,
                fetching: false,
                error:action.payload
            }

        default:
            return state
    }

}