import { 
    APP_STARTED,
    STORE_SKINCARE_AUTH_TOKEN
} from '../../actions/app/appActionTypes';

const intialState = {
    isStarted:false,
    fetching:false,
    error: null,
    skincareAuthToken: null
}

export const appReducer = (state = intialState, action) => {
    switch (action.type) {
      case APP_STARTED:
          return {
              ...state,
              isStarted: true,
          }
      case STORE_SKINCARE_AUTH_TOKEN :
          return {
            ...state,
            skincareAuthToken: action.payload
          }
      default:
          return state;
    }
};