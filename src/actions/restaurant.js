import {
  CREATE_TUTORIAL,
  RETRIEVE_TUTORIALS,
  UPDATE_TUTORIAL,
  DELETE_TUTORIAL,
  DELETE_ALL_TUTORIALS,
  ADD_ACCESS_TOKEN,
} from './types.js';
import RestaurantDataService from '../services/restaurant.service';

export const createRestaurant = (data) => async (dispatch) => {
  console.log('createRestaurant', data);
  try {
    const res = await RestaurantDataService.create({ data });
    dispatch({
      type: CREATE_TUTORIAL,
      payload: res.data,
    });
    return Promise.resolve(res.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const AccessTokenRestaurant = (access_token) => (dispatch) => {
  console.log('here at', access_token);
  console.log('im here at action ADD_ACCESS_TOKEN');
  dispatch({
    type: 'ADD_ACCESS_TOKEN',
    payload: access_token,
  });
};
