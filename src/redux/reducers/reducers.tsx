import * as actionTypes from '../actions/actionTypes';

const initialState = {
  signIn: false
};

const reducer = (state = initialState, action : any) => {
  switch (action.type) {
    case actionTypes.SIGN_IN:
      return {
        ...state,
        signIn: action.payload,
      };
    default:
      return state;
  }
}
export default reducer; 