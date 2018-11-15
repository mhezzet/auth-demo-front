import { SIGN_OUT, SET_AUTH } from '../actions/types';

const initialState = {
  isAuthenticated: false,
  token: ''
};

export default (state = initialState, { type, token }) => {
  switch (type) {
    case SIGN_OUT:
      return initialState;
    case SET_AUTH:
      return { ...state, token, isAuthenticated: true };
    default:
      return state;
  }
};
