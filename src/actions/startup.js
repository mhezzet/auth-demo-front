import { SET_AUTH, SET_USER } from './types';

const startup = () => dispatch => {
  const token = localStorage.getItem('token');
  if (!token) return;

  let profile = localStorage.getItem('profile');

  try {
    profile = JSON.parse(profile);
  } catch {
    return;
  }

  dispatch({ type: SET_AUTH, token });

  dispatch({ type: SET_USER, payload: profile });
};

export default startup;
