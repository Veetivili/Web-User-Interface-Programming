import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const fuelSlice = createSlice({
    name: 'fuel',
    initialState,
    reducers: {
        addRefuelEvent: (state, action) => {
            state.push(action.payload);
        },
        removeFuelEvent: (state, action) => {
            state.splice(action.payload, 1);
        }
    },
});

export const { addRefuelEvent, removeFuelEvent } = fuelSlice.actions;
export default fuelSlice.reducer;