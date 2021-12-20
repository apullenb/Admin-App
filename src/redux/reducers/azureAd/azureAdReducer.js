import * as AZADACTIONS from '../../actions/azure/azureAdActionTypes';

const initalState = {
  profileData: null,
  profileImage: null,
  azAccessToken: null,
  graphToken: null,
  loading: false,
  error: null,
};

export const azureADReducer = (state = initalState, action) => {
  switch (action.type) {
    case AZADACTIONS.GET_AZPROFILE_SUCCESS:
      return {
        ...state,
        profileData: action.payload,
        fetching: false,
        error: null,
      };
    case AZADACTIONS.GET_AZPROFILE_FAILURE:
      return {
        ...state,
        fetching: false,
        error: action.payload,
      };
    case AZADACTIONS.GET_AZPROFILE_IMAGE_SUCCESS:
      return {
        ...state,
        fetching: false,
        profileImage: action.payload,
      };
    case AZADACTIONS.GET_AZPROFILE_IMAGE_FAILURE:
      return {
        ...state,
        fetching: false,
        error: action.payload,
      };
    case AZADACTIONS.SET_AZAD_ACCESS_TOKEN:
      return {
        ...state,
        azAccessToken: action.payload,
      };
    case AZADACTIONS.SET_GRAPH_TOKEN:
      return {
        ...state,
        graphToken: action.payload,
      };
    case AZADACTIONS.RESET_STATE:
      return {
        ...initalState,
      };

    default:
      return state;
  }
};
