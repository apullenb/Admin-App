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
    case AZADACTIONS.GETAZPROFILESUCCESS:
      return {
        ...state,
        profileData: action.payload,
        fetching: false,
        error: null,
      };
    case AZADACTIONS.GETAZPROFILEFAILURE:
      return {
        ...state,
        fetching: false,
        error: action.payload,
      };
    case AZADACTIONS.GETAZPROFILEIMAGESUCCESS:
      return {
        ...state,
        fetching: false,
        profileImage: action.payload,
      };
    case AZADACTIONS.GETAZPROFILEIMAGEFAILURE:
      return {
        ...state,
        fetching: false,
        error: action.payload,
      };
    case AZADACTIONS.SETAZADACCESSTOKEN:
      return {
        ...state,
        azAccessToken: action.payload,
      };
    case AZADACTIONS.SETGRAPHTOKEN:
      return {
        ...state,
        graphToken: action.payload,
      };
      case AZADACTIONS.RESETSTATE: 
      return {
        ...initalState
      }

    default:
      return state;
  }
};
