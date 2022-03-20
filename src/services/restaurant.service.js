import http from '../http-common.js';

class RestaurantDataService {
  create(data) {
    console.log('here ate RestaurantDataService', data);
    return http.post('/resturants', data);
  }
}
export default new RestaurantDataService();
