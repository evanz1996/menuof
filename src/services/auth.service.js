import axios from 'axios';
const API_URL = 'http://localhost/freelance/menuof/public/api';
//register
const register = (username, email, password) => {
  return axios.post(API_URL + 'api/syr/create', {
    username,
    email,
    password,
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
