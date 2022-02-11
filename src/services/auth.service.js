import axios from 'axios';
const API_URL = 'http://localhost/freelance/menuof/public/api';
//register
const register = (name, email, password) => {
  console.log('here at auth service register', name, email, password);
  return axios
    .post(API_URL + '/sign-up', {
      name: name,
      surname: 'surname',
      email: email,
      password: password,
      address: '',
      street_num: '',
      doorbell: '',
      postcode: '',
      phone_prefix: '',
      telephone: '',
      business: false,
      lat: '14.599512',
      lng: '120.984222',
      app: 'github.com',
      tablepad: null,
    })
    .then((response) => {
      console.log('response', response);
      return response;
    });
};

//login
const login = (email, password) => {
  console.log(email, password);
  console.log('im here at login auth.service');
  return axios
    .post(API_URL + '/auth/login', {
      email: email,
      password: password,
    })
    .then((response) => {
      console.log(response.data.auth_user.uid);
      console.log(response.data.expires_in);
      if (response.data.access_token) {
        localStorage.setItem(
          'token',
          JSON.stringify(response.data.access_token)
        );
        localStorage.setItem(
          'user',
          JSON.stringify(response.data.auth_user.uid)
        );
        localStorage.setItem(
          'expires',
          JSON.stringify(response.data.expires_in)
        );
      }
      console.log('auth service response', response);
      return response;
    });
};

//logout
const logout = () => {
  localStorage.removeItem('user');
};

const authService = {
  register,
  login,
  logout,
};
export default authService;
