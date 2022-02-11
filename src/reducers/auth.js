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
  : { isLoggedIn: false, user: null };
console.log('initialState, auth reducers', initialState);
export default function auth(state = initialState, action) {
  console.log('reducer/auth', state, action);
  const { type, payload } = action;
  switch (type) {
    case REGISTER_SUCCESS:
      return {
        ...state,
        isLoggedIn: false,
      };
    case REGISTER_FAIL:
      return {
        ...state,
        isLoggedIn: false,
      };
    case LOGIN_SUCCESS:
      console.log('LOGIN SUCCESS HERE REDUCER');
      return {
        ...state,
        isLoggedIn: true,
        user: payload.user,
      };
    case LOGIN_FAIL:
      console.log('LOGIN_FAIL', state);
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    case LOGOUT:
      console.log('here at logout');
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
