import { APP_STARTED, LOGGED_IN, LOG_OUT } from '../../actions/app/appActionTypes';

const intialState = {
  isStarted: false,
  loggedIn: false,
  fetching: false,
  error: null,
};

export const appReducer = (state = intialState, action) => {
  switch (action.type) {
    case APP_STARTED:
      return {
        ...state,
        isStarted: true,
      };

    case LOGGED_IN:
      return {
        ...state,
        loggedIn: action.payload,
      };
    case LOG_OUT:
      return {
        ...intialState,
      };

    default:
      return state;
  }
};
