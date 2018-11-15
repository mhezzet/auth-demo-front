import axios from 'axios';
import { SIGN_LOCAL, SET_USER, UNSET_USER, SIGN_OUT } from './types';

/**
|--------------------------------------------------
| SignUp local
|--------------------------------------------------
*/

export const signLocal = (payload, type) => async dispatch => {
  try {
    const query = type === 'in' ? '/auth/local' : '/users';

    const response = await axios.post(
      `http://localhost:3000/api${query}`,
      payload
    );
    const token = response.headers['x-auth-token'];
    dispatch({
      type: SIGN_LOCAL,
      token,
      isAuthenticated: true
    });

    let profile = {
      ...response.data
    };

    profile = JSON.stringify(profile);
    localStorage.setItem('token', token);
    localStorage.setItem('profile', profile);

    dispatch({
      type: SET_USER,
      payload: response.data
    });

    return Promise.resolve();
  } catch ({ response }) {
    return Promise.reject(response.data);
  }
};

/**
|--------------------------------------------------
| SingOut
|--------------------------------------------------
*/

export const signOut = () => dispatch => {
  localStorage.removeItem('token');
  localStorage.removeItem('profile');

  dispatch({
    type: SIGN_OUT
  });

  dispatch({
    type: UNSET_USER
  });
};
