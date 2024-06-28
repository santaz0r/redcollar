import { configureStore, combineReducers } from '@reduxjs/toolkit';
import usersReducer from './users';
import eventsReducer from './events';

const rootReducer = combineReducers({
  users: usersReducer,
  events: eventsReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;
