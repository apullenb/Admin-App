import {
    GET_ENTRIES_START,
    GET_ENTRIES_SUCCESS,
    GET_ENTRIES_FAILURE
} from '../../actions/Skincare/skincareActionTypes'

const initalState = {
    entries: [],
    entriesDesc: [],
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

        default:
            return state
    }

}