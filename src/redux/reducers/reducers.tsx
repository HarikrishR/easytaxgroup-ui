import * as actionTypes from '../actions/actionTypes';

const initialState = {
  loader: false,
  signIn: false,
  userData: null,
  clientSecretSettings: { clientSecret: "", loading: true },
  stripePromise: null,
};

const reducer = (state = initialState, action : any) => {
  switch (action.type) {
    case actionTypes.GET_LOADER:
      return {
        ...state,
        loader: action.payload,
      };
    case actionTypes.USER_DATA:
      return {
        ...state,
        userData: action.payload,
      };
    case actionTypes.SIGN_IN:
      return {
        ...state,
        signIn: action.payload,
      };
    case actionTypes.STRIPE_PROMISE:
      return {
        ...state,
        stripePromise: action.payload,
      };
    case actionTypes.CLIENT_SECURITY_SETTINGS:
      return {
        ...state,
        clientSecretSettings: action.payload,
      };
    default:
      return state;
  }
}
export default reducer; 