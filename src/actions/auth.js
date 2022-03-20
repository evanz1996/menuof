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
  console.log('register', fname, lname, email, password);
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
      // if (response.response) {
      //   if (response.status === 200) {
      //     console.log(response.data, 'AUTH.JS ACTIONS');
      //     dispatch({
      //       type: REGISTER_SUCCESS,
      //     });
      //     dispatch({
      //       type: SET_MESSAGE,
      //       payload: response.response.data,
      //     });
      //     return Promise.resolve();
      //   } else {
      //     console.log('Promise', Promise.resolve());
      //     let message = response.response.data.error;
      //     console.log('422222', message);
      //     dispatch({
      //       type: REGISTER_FAIL,
      //     });
      //     dispatch({
      //       type: SET_MESSAGE,
      //       payload: message,
      //     });
      //   }
      //   return Promise.resolve();
      // }

      //   console.log(response, 'response');

      //   if (response.status === 200) {
      //     console.log(response.data, 'AUTH.JS ACTIONS');
      //     dispatch({
      //       type: REGISTER_SUCCESS,
      //     });
      //     dispatch({
      //       type: SET_MESSAGE,
      //       payload: response.response.data,
      //     });
      //   }
      //   return Promise.resolve();
      //  else {
      //   let message = response.response.data.error;
      //   console.log('422222', message);
      //   dispatch({
      //     type: REGISTER_FAIL,
      //   });
      //   dispatch({
      //     type: SET_MESSAGE,
      //     payload: message,
      //   });
      //   return Promise.resolve();
      // }

      // if (response.response.status === 422) {
      //   console.log('422');
      //   let message = response.response.data.error;
      //   console.log(message);
      //   dispatch({
      //     type: REGISTER_FAIL,
      //   });
      //   dispatch({
      //     type: SET_MESSAGE,
      //     payload: message,
      //   });
      // } else {
      //   console.log('ELSEEE RESPONSE', response.response.data);
      //   dispatch({
      //     type: REGISTER_SUCCESS,
      //   });
      //   dispatch({
      //     type: SET_MESSAGE,
      //     payload: response.response.data,
      //   });
      // }
      // }

      // dispatch({
      //   type: REGISTER_SUCCESS,
      // });
      // dispatch({
      //   type: SET_MESSAGE,
      //   payload: response.data.message,
      // });
    },
    (error) => {
      console.log('ERROR REGISTER');
      console.log('error in action/auth', error.response);
      console.log('error in action/auth', error.response);
      const message = error.response.data.error;
      // const message =
      //   (error.response &&
      //     error.response.data &&
      //     error.response.data.message) ||
      //   error.message ||
      //   error.toString();
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
      // console.log('actions/auth/login/data', data.data.auth_user);
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
      // if (data.data.auth_user) {
      //   dispatch({
      //     type: LOGIN_SUCCESS,
      //     payload: { user: data.data.auth_user },
      //   });
      // }

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
