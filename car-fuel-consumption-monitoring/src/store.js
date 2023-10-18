import { configureStore } from '@reduxjs/toolkit';
import fuelReducer from './reducers/fuelSlice';

export const store = configureStore({
    reducer: {
        fuel: fuelReducer,
    },
});