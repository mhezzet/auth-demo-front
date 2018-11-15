import { SIGN_LOCAL, SIGN_OUT, SET_AUTH } from '../actions/types';

const initialState = {
  isAuthenticated: false,
  token: ''
};

export default (state = initialState, { type, token, isAuthenticated }) => {
  switch (type) {
    case SIGN_LOCAL:
      return { ...state, token, isAuthenticated };
    case SIGN_OUT:
      return initialState;
    case SET_AUTH:
      return { ...state, token, isAuthenticated: true };
    default:
      return state;
  }
};
