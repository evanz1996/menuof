import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { setMessage } from './message';
import authService from 'services/auth.service';
import thunk from 'redux-thunk';
const user = JSON.parse(localStorage.getItem('user'));
console.log('auth js', user);

export const register = createAsyncThunk(
  'auth/register',
  async ({ username, email, password }, thunkAPI) => {
    try {
      const response = await authService.register(username, email, password);
      console.log('slice/auth', response);
      thunkAPI.dispatch(setMessage(response.data.message));
      return response.data;
    } catch (error) {
      console.log('slice/auth/register', error);
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

//login
export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }, thunkAPI) => {
    console.log('thunkAPI', thunkAPI);
    try {
      const data = await authService.login(email, password);
      console.log('slice/login', data.data.auth_user);
      return { user: data.data.auth_user };
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.error) ||
        error.message ||
        error.toString();
      console.log(error.toString());
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

//logout
export const logout = createAsyncThunk('auth/logout', async () => {
  await authService.logout();
});

const initialState = user
  ? { isLoggedIn: true, user }
  : { isLoggedIn: false, user: null };

const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: {
    //register extraReducers
    [register.fulfilled]: (state, action) => {
      state.isLoggedIn = false;
    },
    [register.rejected]: (state, action) => {
      state.isLoggedIn = false;
    },
    //login extraReducers
    [login.fulfilled]: (state, action) => {
      console.log('here ate  login.fulfilled');
      console.log(action.payload);
      state.isLoggedIn = true;
      state.user = action.payload.user;
      console.log('state.user', state.user);
    },
    [login.rejected]: (state, action) => {
      console.log('here ate  login.rejected');
      state.isLoggedIn = false;
      state.user = null;
    },
    //logout extraReducers
    [logout.fulfilled]: (state, action) => {
      console.log('here ate logout.fulfilled');
      state.isLoggedIn = false;
      state.user = null;
    },
  },
});

const { reducer } = authSlice;
export default reducer;
