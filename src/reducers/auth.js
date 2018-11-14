import {
  SIGN_LOCAL,
  SIGN_LOCAL_ERR,
  SIGN_OUT,
  SET_AUTH
} from '../actions/types';

const initialState = {
  isAuthenticated: false,
  token: '',
  errorMessage: ''
};

export default (
  state = initialState,
  { type, token, err, isAuthenticated }
) => {
  switch (type) {
    case SIGN_LOCAL:
      return { ...state, token, isAuthenticated };
    case SIGN_LOCAL_ERR:
      return { ...state, errorMessage: err };
    case SIGN_OUT:
      return initialState;
    case SET_AUTH:
      return { ...state, token, isAuthenticated: true };
    default:
      return state;
  }
};
