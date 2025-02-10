// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import movieListReducer from './reducers/movieListSlice';
import usersAuthReducer from './reducers/userAuthSlice';

export default configureStore({
  reducer: {
    movieList: movieListReducer,
    usersAuth: usersAuthReducer,
  },
});