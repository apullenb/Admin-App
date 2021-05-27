import {
    GET_COUNTRIES_START,
    GET_COUNTRIES_SUCCESS,
    GET_COUNTRIES_FAILURE
} from '../../actions/ProductConfig/countryConfig/countryActionTypes';


const initalState = {
    countries: [],
    fetching:false,
    error: null
}

export const countriesConfigReducer = (state = initalState, action) => {
    switch (action.type) {
        case GET_COUNTRIES_START :
           return {
                ...state,
                fetching: true,
                error:null
            }
            case GET_COUNTRIES_SUCCESS :
           return {
                ...state,
                fetching: false,
                error:null,
                countries: action.payload
            }
            case GET_COUNTRIES_FAILURE :
           return {
                ...state,
                fetching: false,
                error:action.payload
            }

        default:
            return state
    }

}