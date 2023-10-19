import { createSlice, createAction } from '@reduxjs/toolkit';

//export const setFuelHistory = createAction('fuel/setFuelHistory');

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
        },
        setFuelHistory: (state, action) => {
            state.refuelEvents = action.payload;
        },
    },
});

export const { addRefuelEvent, removeFuelEvent, setPreviousKilometers, setFuelHistory } = fuelSlice.actions;
export default fuelSlice.reducer;
