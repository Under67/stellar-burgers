import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { userSlice } from './userSlice';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import { ingredientsSlice } from './ingredientsSlice';
import { feedsSlice } from './feedSlice';
import { ordersSlice } from './orderSlice';

const rootReducer = combineReducers({
  user: userSlice.reducer,
  ingredient: ingredientsSlice.reducer,
  feed: feedsSlice.reducer,
  order: ordersSlice.reducer
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
