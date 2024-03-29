import {
  GET_ENTRIES_START,
  GET_ENTRIES_SUCCESS,
  GET_ENTRIES_FAILURE,
  GET_ACCOUNTS_START,
  GET_ACCOUNTS_SUCCESS,
  GET_ACCOUNTS_FAILURE,
  GET_FILTERED_ACCOUNTS_START,
  GET_FILTERED_ACCOUNTS_SUCCESS,
  GET_FILTERED_ACCOUNTS_FAILURE,
  LOGIN_ADMIN_SKINCARE_START,
  LOGIN_ADMIN_SKINCARE_SUCCESS,
  LOGIN_ADMIN_SKINCARE_FAILURE,
  PERMISSIONS_SKINCARE_START,
  PERMISSIONS_SKINCARE_SUCCESS,
  PERMISSIONS_SKINCARE_FAILURE,
} from '../../actions/Skincare/skincareActionTypes';

const initalState = {
  entries: '',
  accounts: [],
  fetching: false,
  error: null,
  skincareAuthToken: null,
  skincarePermissions: null,
  permissionFeched: false,
  PermissionsError: false,
};

export const entriesConfigReducer = (state = initalState, action) => {
  switch (action.type) {
    case GET_ENTRIES_START:
      return {
        ...state,
        fetching: true,
        error: null,
      };
    case GET_ENTRIES_SUCCESS:
      return {
        ...state,
        fetching: false,
        error: null,
        entries: action.payload,
      };
    case GET_ENTRIES_FAILURE:
      return {
        ...state,
        fetching: false,
        error: action.payload,
      };
    case GET_ACCOUNTS_START:
      return {
        ...state,
        fetching: true,
        error: null,
      };
    case GET_ACCOUNTS_SUCCESS:
      return {
        ...state,
        fetching: false,
        error: null,
        accounts: action.payload,
      };
    case GET_ACCOUNTS_FAILURE:
      return {
        ...state,
        fetching: false,
        error: action.payload,
      };
    case GET_FILTERED_ACCOUNTS_START:
      return {
        ...state,
        fetching: true,
        error: null,
      };
    case GET_FILTERED_ACCOUNTS_SUCCESS:
      return {
        ...state,
        fetching: false,
        error: null,
        accounts: action.payload,
      };
    case GET_FILTERED_ACCOUNTS_FAILURE:
      return {
        ...state,
        fetching: false,
        error: action.payload,
      };
    case LOGIN_ADMIN_SKINCARE_START:
      return {
        ...state,
        fetching: true,
        error: null,
      };
    case LOGIN_ADMIN_SKINCARE_SUCCESS:
      return {
        ...state,
        fetching: false,
        error: null,
        skincareAuthToken: action.payload.token,
      };
    case LOGIN_ADMIN_SKINCARE_FAILURE:
      return {
        ...state,
        fetching: false,
        error: action.payload,
      };

    case PERMISSIONS_SKINCARE_START:
      return {
        ...state,
        error: null,
      };
    case PERMISSIONS_SKINCARE_SUCCESS:
      return {
        ...state,
        permissionFeched: true,
        skincarePermissions: action.payload,
      };
    case PERMISSIONS_SKINCARE_FAILURE:
      return {
        ...state,
        PermissionsError: action.payload,
        permissionFeched: true,
      };
    default:
      return state;
  }
};
