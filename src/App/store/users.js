import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import usersService from '../services/users.service';
import authService from '../services/auth.service';

const initialState = {
  entities: [],
  isLoading: false,
  dataError: '',
  user: null,
  isLoggedIn: false,
  dataLoad: false,
  userError: '',
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    usersRequested: (state) => {
      state.dataLoad = true;
    },
    usersReceived: (state, action) => {
      state.entities = action.payload;
      state.dataLoad = false;
    },
    usersRequestFailed: (state, action) => {
      state.dataError = action.payload;
      state.dataLoad = false;
    },
    authRequested: (state) => {
      state.userError = '';
      state.isLoading = true;
    },
    authRequestSuccess: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
      state.isLoading = false;
    },
    authRequestFailed: (state, action) => {
      state.userError = action.payload;
      state.isLoading = false;
    },
    userLoad: (state, action) => {
      state.isLoading = action.payload;
    },
    userLoggedOut: (state) => {
      state.isLoggedIn = false;
      state.user = null;
    },
    clearedLoginErr: (state) => {
      state.userError = '';
    },
  },

  selectors: {
    getUsersLoadingStatus: (state) => state.dataLoad,
    getUsersList: (state) => state.entities,
    getIsLogin: (state) => state.isLoggedIn,
    getCurrentuserData: (state) => state.user,
    authTrigger: (state) => state.isLoading,
    getLoginError: (state) => state.userError,
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
  userLoggedOut,
  userLoad,
  clearedLoginErr,
} = actions;

export const { getLoginError, getUsersList, authTrigger, getUsersLoadingStatus, getCurrentuserData, getIsLogin } =
  selectors;

export const clearError = () => async (dispatch) => dispatch(clearedLoginErr());

export const logout = () => async (dispatch) => {
  localStorage.removeItem('token');
  dispatch(userLoggedOut());
};

export const login =
  ({ payload, setActive }) =>
  async (dispatch) => {
    dispatch(authRequested());
    const { email, password } = payload;
    try {
      const response = await authService.login({ email, password });
      localStorage.setItem('token', response.jwt);
      dispatch(authRequestSuccess(response.user));
      setActive(false);
    } catch (e) {
      if (axios.isAxiosError(e)) {
        const message = e.response?.data?.error?.message;

        dispatch(authRequestFailed(message));
      }
    }
  };

export const signUp =
  ({ payload, setActive }) =>
  async (dispatch) => {
    dispatch(authRequested());
    const { email, password, name: username } = payload;
    try {
      const response = await authService.signUp({ email, password, username });
      localStorage.setItem('token', response.jwt);
      dispatch(authRequestSuccess(response.user));
      setActive(false);
    } catch (e) {
      if (axios.isAxiosError(e)) {
        const message = e.response?.data?.error?.message;
        dispatch(authRequestFailed(message));
      }
    }
  };

export const checkAuth = (token) => async (dispatch) => {
  dispatch(userLoad(true));
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
    dispatch(userLoad(false));
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
