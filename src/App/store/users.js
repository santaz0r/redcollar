import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import usersService from '../services/users.service';
import authService from '../services/auth.service';

const initialState = {
  entities: [],
  isLoading: true,
  dataError: '',
  user: null,
  isLoggedIn: false,

  userError: '',
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    usersRequested: (state) => {
      state.isLoading = true;
    },
    usersReceived: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    usersRequestFailed: (state, action) => {
      state.dataError = action.payload;
      state.isLoading = false;
    },
    authRequested: (state) => {
      state.userError = '';
    },
    authRequestSuccess: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
    },
    authRequestFailed: (state, action) => {
      state.userError = action.payload;
    },
    dataLoad: (state, action) => {
      state.isLoading = action.payload;
    },
  },

  selectors: {
    getUsersLoadingStatus: (state) => state.isLoading,
    getUsersList: (state) => state.entities,
    getIsLogin: (state) => state.isLoggedIn,
    getCurrentuserData: (state) => state.user,
  },
});

const { actions, reducer: usersReducer, selectors } = usersSlice;

const {
  usersRequested,
  usersReceived,
  usersRequestFailed,
  authRequestSuccess,
  authRequestFailed,
  authRequested,
  dataLoad,
} = actions;
export const { getUsersList, getUsersLoadingStatus, getCurrentuserData, getIsLogin } = selectors;

export const login =
  ({ payload, setActive }) =>
  async (dispatch) => {
    dispatch(authRequested());

    const { email, password } = payload;
    try {
      console.log(email, password);
      const response = await authService.login({ email, password });
      console.log(response);
      localStorage.setItem('token', response.jwt);
      dispatch(authRequestSuccess(response.user));
      setActive(false);
    } catch (e) {
      if (axios.isAxiosError(e)) {
        const message = e.response?.data?.message;
        dispatch(authRequestFailed(message));
      }
    }
  };

export const checkAuth = (token) => async (dispatch) => {
  dispatch(dataLoad(true));
  try {
    const response = await usersService.getMe(token);
    dispatch(authRequestSuccess(response));
  } catch (e) {
    if (axios.isAxiosError(e)) {
      const message = e.response?.data?.message;
      // dispatch(authRequestFailed(message));
      console.log(message);
    }
  } finally {
    dispatch(dataLoad(false));
  }
};

export const loadUsersList = () => async (dispatch) => {
  dispatch(usersRequested());
  try {
    const data = await usersService.getUsers();
    dispatch(usersReceived(data));
  } catch (e) {
    if (axios.isAxiosError(e)) {
      dispatch(usersRequestFailed(e.message));
    }
  }
};

export default usersReducer;
