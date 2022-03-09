import { combineReducers } from 'redux';
import auth from './auth';
import message from './message';
import currentRestaurantReducer from './currentRestaurantReducer';
// import message from './message';
import currentMenuSelectedReducer from './currentMenuSelectedReducer';
export default combineReducers({
  auth,
  message,
  currentRestaurantReducer,
  currentMenuSelectedReducer,
});
