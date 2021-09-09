import { configureStore } from '@reduxjs/toolkit';
import starwarsReducer from '../features/starwars/starwarsSlice';

export const store = configureStore({
  reducer: {
    starwars: starwarsReducer,
  },
});
