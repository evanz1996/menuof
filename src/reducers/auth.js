import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
} from '../actions/types';

const user = JSON.parse(localStorage.getItem('user'));
console.log('reducer/auth', user);

const initialState = user
  ? { isLoggedIn: true, user }
  : { isLoggedIn: false, user: '', message: {} };
console.log('initia State, auth reducers', initialState);
export default function auth(state = initialState, action) {
  console.log('reducer/auth');
  const { type, payload } = action;
  console.log('payload', payload);
  switch (type) {
    case REGISTER_SUCCESS:
      console.log('REgister SUCCESS HERE REDUCER');
      return {
        ...state,
        isLoggedIn: true,
      };
    case REGISTER_FAIL:
      console.log('REgister FAILED HERE REDUCER');
      return {
        ...state,
        isLoggedIn: false,
      };
    case LOGIN_SUCCESS:
      console.log('LOGIN SUCCESS HERE REDUCER');
      console.log('LOGIN SUCCESS HERE REDUCER');
      console.log(' payload', payload);
      return {
        ...state,
        isLoggedIn: true,
        user: payload,
      };
    case LOGIN_FAIL:
      console.log('LOGIN LOGIN_FAIL HERE REDUCER');
      return {
        ...state,
        isLoggedIn: false,
        user: payload,
      };
    case LOGOUT:
      console.log('LOGOUT HERE REDUCER');
      console.log(state);
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    default:
      return state;
  }
}
