import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import eventsService from '../services/even.service';

const initialState = {
  entities: [],
  isLoading: true,
  createError: '',
  dataError: '',

  joinError: '',
};

const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    eventsRequested: (state) => {
      state.isLoading = true;
    },
    eventsReceived: (state, action) => {
      state.entities = action.payload.data;
      state.isLoading = false;
    },
    eventsRequestFailed: (state, action) => {
      state.dataError = action.payload;
      state.isLoading = false;
    },

    eventJoinRequest: (state) => {
      state.joinError = '';
    },

    eventJoin: (state, action) => {
      state.entities = action.payload;
    },

    eventJoinFailed: (state, action) => {
      state.joinError = action.payload;
    },
  },
  selectors: {
    getEventsLoadingStatus: (state) => state.isLoading,
    getEventsList: (state) => state.entities,
  },
});

const { actions, reducer: eventsReducer, selectors } = eventsSlice;

const { eventsReceived, eventsRequestFailed, eventsRequested, eventJoin, eventJoinFailed, eventJoinRequest } = actions;

export const { getEventsList, getEventsLoadingStatus } = selectors;

export const toggleEvent =
  ({ payload, setNewModal, isJoin = true }) =>
  async (dispatch) => {
    dispatch(eventJoinRequest());
    try {
      const data = await eventsService.joinLeaveEvent(payload);
      dispatch(eventJoin(data.data));
      isJoin ? setNewModal('congrats') : setNewModal();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        dispatch(eventJoinFailed(error.message));
      }
    }
  };

export const loadEventsList = () => async (dispatch) => {
  dispatch(eventsRequested());
  try {
    const data = await eventsService.getEvents();
    dispatch(eventsReceived(data));
  } catch (e) {
    if (axios.isAxiosError(e)) {
      dispatch(eventsRequestFailed(e.message));
    }
  }
};

export default eventsReducer;
