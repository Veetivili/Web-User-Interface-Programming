import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    refuelEvents: [],
    previousKilometers: null,
};

const fuelSlice = createSlice({
    name: 'fuel',
    initialState,
    reducers: {
        addRefuelEvent: (state, action) => {
            state.refuelEvents.push(action.payload);  // Updated line
        },
        removeFuelEvent: (state, action) => {
            state.refuelEvents.splice(action.payload, 1);  // Updated line
        },
        setPreviousKilometers: (state, action) => {
            state.previousKilometers = action.payload;
        }
    },
});

export const { addRefuelEvent, removeFuelEvent, setPreviousKilometers } = fuelSlice.actions;
export default fuelSlice.reducer;
