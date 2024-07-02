import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import eventsService from '../services/even.service';

const initialState = {
  entities: [],
  isLoading: true,
  dataError: '',

  joinError: '',
  createError: '',
  triggerLoading: false,
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

    eventToggleJoin: (state, action) => {
      state.entities = action.payload;
    },

    eventJoinFailed: (state, action) => {
      state.joinError = action.payload;
    },

    eventCreateRequest: (state) => {
      state.createError = '';
      state.triggerLoading = true;
    },

    eventCreated: (state, action) => {
      state.entities = action.payload;
      state.triggerLoading = false;
    },

    eventCreateFailed: (state, action) => {
      state.createError = action.payload;
      state.triggerLoading = false;
    },
  },
  selectors: {
    getEventsLoadingStatus: (state) => state.isLoading,
    getEventsList: (state) => state.entities,
    getTriggerLoading: (state) => state.triggerLoading,
  },
});

const { actions, reducer: eventsReducer, selectors } = eventsSlice;

const {
  eventsReceived,
  eventsRequestFailed,
  eventsRequested,
  eventToggleJoin,
  eventJoinFailed,
  eventJoinRequest,
  eventCreateFailed,
  eventCreateRequest,
  eventCreated,
} = actions;

export const { getEventsList, getEventsLoadingStatus, getTriggerLoading } = selectors;

export const createEvent =
  ({ payload, setNewModal }) =>
  async (dispatch) => {
    dispatch(eventCreateRequest());
    try {
      const data = await eventsService.createEvent(payload);
      dispatch(eventCreated(data.data));
      setNewModal('congrats');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        dispatch(eventCreateFailed(error.message));
        setNewModal('failed');
      }
    }
  };

export const toggleEvent =
  ({ payload, setNewModal, isJoin = true }) =>
  async (dispatch) => {
    dispatch(eventJoinRequest());
    try {
      const data = await eventsService.joinLeaveEvent(payload);
      dispatch(eventToggleJoin(data.data));
      isJoin ? setNewModal('congrats') : setNewModal();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        dispatch(eventJoinFailed(error.message));
        setNewModal('failed');
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
