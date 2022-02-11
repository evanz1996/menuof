import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  SET_MESSAGE,
} from './types';

import authService from 'services/auth.service';

export const register = (name, email, password) => (dispatch) => {
  console.log('actions/auth/register');
  console.log('register', name, email, password);
  console.log(authService.register(name, email, password));
  return authService.register(name, email, password).then(
    (response) => {
      console.log('response at register actions', response);

      dispatch({
        type: REGISTER_SUCCESS,
      });
      dispatch({
        type: SET_MESSAGE,
        payload: response.data.message,
      });
      return Promise.resolve();
    },
    (error) => {
      console.log('error in action/auth', error);
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
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
      console.log('actions/auth/login/data', data.data.auth_user);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: { user: data.data.auth_user },
      });
      return Promise.resolve();
    },
    (error) => {
      console.log('actions/auth/login/error', error);
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
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
  console.log('actions/auth/logout');
  authService.logout();
  dispatch({
    type: LOGOUT,
  });
};
