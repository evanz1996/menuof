import { SELECTED_RESTAURANT_ID } from 'actions/types';
const initialState = 1;

function currentRestaurantReducer(selectedtId = initialState, action) {
  console.log('here at currentRestaurantReducer');
  const { type, payload } = action;
  switch (type) {
    case SELECTED_RESTAURANT_ID:
      console.log('here at switch currentRestaurantReducer ');
      console.log('payload', payload);
      return { ...selectedtId, payload };
    default:
      return selectedtId;
  }
}

export default currentRestaurantReducer;
