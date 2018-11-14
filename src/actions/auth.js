import axios from 'axios';
import {
  SIGN_LOCAL,
  SIGN_LOCAL_ERR,
  SET_USER,
  UNSET_USER,
  SIGN_OUT
} from './types';

/**
|--------------------------------------------------
| SignUp local
|--------------------------------------------------
*/

export const signLocal = (payload, type, callback) => async dispatch => {
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
    dispatch({
      type: SIGN_LOCAL_ERR,
      err: ''
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

    callback(false);
  } catch (ex) {
    console.log(ex.response.data);
    dispatch({
      type: SIGN_LOCAL_ERR,
      err: ex.response.data
    });
    callback(true);
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
