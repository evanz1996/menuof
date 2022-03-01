// import { SELECTED_RESTAURANT_ID } from './types';
export const selectRestaurantId = (restaurantId) => (dispatch) => {
  console.log('here at', restaurantId);
  console.log('im here at action selectRestaurantId');
  dispatch({
    type: 'SELECTED_RESTAURANT_ID',
    payload: restaurantId,
  });
};
