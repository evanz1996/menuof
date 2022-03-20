import axios from 'axios';
const API_URL = 'http://localhost/freelance/menuof/public/api';
const API_URL2 = 'http://menuof.test/api/resturant-owner';
const headers = {
  'Content-Type': 'application/json',
};
//register
const register = (fname, lname, email, password) => {
  console.log('here at auth service register', fname, lname, email, password);
  return axios.post(
    API_URL2 + '/auth/register',
    {
      fname: fname,
      lname: fname,
      email: email,
      password: password,
      // address: '',
      // street_num: '',
      // doorbell: '',
      // postcode: '',
      // phone_prefix: '',
      // telephone: '',
      // business: false,
      // lat: '14.599512',
      // lng: '120.984222',
      // app: 'github.com',
      // tablepad: null,
    },
    headers
  );
  // .then(
  //   (response) => {
  //     console.log('response', response);
  //     return response;
  //   },
  //   (error) => {
  //     console.log('error', error.response);
  //     console.log('auth service response', error.response.status);
  //     return error;
  //   }
  // );
};

// /auth/login

const login = (email, password) => {
  console.log(email, password);
  console.log('im here at login auth.service');
  return axios
    .post(
      API_URL + '/auth/login',
      {
        email: email,
        password: password,
      },
      headers
    )
    .then(
      (response) => {
        console.log(response.data.auth_user.uid);
        console.log(response.data.expires_in);
        if (response.data.access_token) {
          localStorage.setItem('token', response.data.access_token);
          localStorage.setItem('user', response.data.auth_user.uid);
          localStorage.setItem(
            'expires',
            JSON.stringify(response.data.expires_in)
          );
        }
        console.log('auth service response', response);
        return response;
      },
      (error) => {
        console.log('auth service response', error.response);

        // console.log();
        // console.log(error.response.data);
        // alert(error.response.data.error);
        return error;
      }
    );
};

//logout
const logout = () => {
  console.log('im here at services auth.service');
  localStorage.removeItem('user');
  localStorage.removeItem('token');
  localStorage.removeItem('expires');
};

const authService = {
  register,
  login,
  logout,
};
export default authService;
