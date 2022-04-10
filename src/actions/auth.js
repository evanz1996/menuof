import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  SET_MESSAGE,
} from './types';

import authService from 'services/auth.service';

export const register = (fname, lname, email, password) => (dispatch) => {
  console.log('actions/auth/register');
  return authService.register(fname, lname, email, password).then(
    (response) => {
      console.log('auth actions', response);
      let success_message = response.data;
      if (response.status) {
        dispatch({
          type: REGISTER_SUCCESS,
        });
        dispatch({
          type: SET_MESSAGE,
          payload: success_message,
        });
      }

      return Promise.resolve();
    },
    (error) => {
      console.log('ERROR REGISTER', error.response);
      const message = error.response.data.error;
      dispatch({
        type: REGISTER_FAIL,
      });
      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });
      return Promise.reject();
    }
  );
};

export const login = (email, password) => (dispatch) => {
  console.log('actions/auth/login', email, password);

  return authService.login(email, password).then(
    (data) => {
      console.log('actions/auth/login', data);
      if (data.status === 200) {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: { user: data.data.auth_user },
        });
      } else {
        console.log('here at failed');
        dispatch({
          type: LOGIN_FAIL,
          payload: 'The credentials is not found',
        });
        dispatch({
          type: SET_MESSAGE,
          payload: 'The credentials is not found',
        });
      }
      return Promise.resolve();
    },
    (error) => {
      console.log('actions/auth/login/error', error.response.data.error);
      let message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      if (error.response.data.error) {
        console.log('    im here');
        message = error.response.data.error;
      }
      dispatch({
        type: LOGIN_FAIL,
      });
      console.log('message', message);
      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });
      return Promise.reject();
    }
  );
};

export const logout = () => (dispatch) => {
  console.log('im here at actions/auth/logout', dispatch);
  authService.logout();
  dispatch({
    type: LOGOUT,
  });
};
