import { ADD_ACCESS_TOKEN } from 'actions/types';
const initialState = '';
function accessTokenCreatedRestaurant(accessToken = initialState, action) {
  console.log('ADD_ACCESS_TOKEN11');
  const { type, payload } = action;
  switch (type) {
    case ADD_ACCESS_TOKEN:
      console.log('ADD_ACCESS_TOKEN');
      return { ...accessToken, payload };
    default:
      return accessToken;
  }
}
export default accessTokenCreatedRestaurant;
