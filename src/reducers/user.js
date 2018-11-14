import { SET_USER, UNSET_USER } from '../actions/types';

const initialState = {
  email: '',
  picture: ''
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_USER:
      return { ...state, ...payload };
    case UNSET_USER:
      return initialState;
    default:
      return state;
  }
};
