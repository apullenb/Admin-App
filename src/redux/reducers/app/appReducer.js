import { 
    APP_STARTED
} from '../../actions/app/appActionTypes';

const intialState = {
    isStarted:false,
    fetching:false,
    error: null
}

export const appReducer = (state = intialState, action) => {
    switch (action.type) {
        case APP_STARTED:
            return {
                ...state,
                isStarted: true,
            }
            default:
                return state;
    }
};