import axios from 'axios';
import { SET_AUTH, SET_USER, UNSET_USER, SIGN_OUT } from './types';

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
      type: SET_AUTH,
      token
    });

    localStorage.setItem('token', token);
    localStorage.setItem('profile', JSON.stringify(response.data));

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
| SignUp Google
|--------------------------------------------------
*/

export const googleSign = accessToken => async dispatch => {
  try {
    console.log(accessToken);
    const response = await axios.post('http://localhost:3000/api/auth/google', {
      accessToken: accessToken
    });

    const token = response.headers['x-auth-token'];
    dispatch({
      type: SET_AUTH,
      token
    });

    localStorage.setItem('token', token);
    localStorage.setItem('profile', JSON.stringify(response.data));

    dispatch({
      type: SET_USER,
      payload: response.data
    });

    return Promise.resolve();
  } catch ({ response }) {
    console.log(response);
    return Promise.reject(response.data);
  }
};

/**
|--------------------------------------------------
| SignUp Facebook
|--------------------------------------------------
*/

export const facebookSign = accessToken => async dispatch => {
  try {
    const response = await axios.post(
      'http://localhost:3000/api/auth/facebook',
      { accessToken }
    );

    const token = response.headers['x-auth-token'];

    dispatch({
      type: SET_AUTH,
      token
    });

    localStorage.setItem('token', token);
    localStorage.setItem('profile', JSON.stringify(response.data));

    dispatch({
      type: SET_USER,
      payload: response.data
    });

    return Promise.resolve();
  } catch ({ response }) {
    console.log(response);
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
