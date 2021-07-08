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
} from '../../actions/Skincare/skincareActionTypes'

const initalState = {
    entries: [],
    accounts: [],
    fetching: false,
    error: null,

}

export const entriesConfigReducer = (state = initalState, action) => {
    switch (action.type) {
        case GET_ENTRIES_START :
           return {
                ...state,
                fetching: true,
                error:null
            }
            case GET_ENTRIES_SUCCESS :
           return {
                ...state,
                fetching: false,
                error:null,
                entries: action.payload
            }
            case GET_ENTRIES_FAILURE :
           return {
                ...state,
                fetching: false,
                error:action.payload
            }
            case GET_ACCOUNTS_START :
                return {
                     ...state,
                     fetching: true,
                     error:null
            }
            case GET_ACCOUNTS_SUCCESS :
                return {
                     ...state,
                     fetching: false,
                     error:null,
                     accounts: action.payload
            }
            case GET_ACCOUNTS_FAILURE :
                return {
                     ...state,
                     fetching: false,
                     error:action.payload
            }
            case GET_FILTERED_ACCOUNTS_START :
                return {
                     ...state,
                     fetching: true,
                     error:null
            }
            case GET_FILTERED_ACCOUNTS_SUCCESS :
                return {
                     ...state,
                     fetching: false,
                     error:null,
                     accounts: action.payload
            }
            case GET_FILTERED_ACCOUNTS_FAILURE :
                return {
                     ...state,
                     fetching: false,
                     error:action.payload
            }
     
        default:
            return state
    }

}