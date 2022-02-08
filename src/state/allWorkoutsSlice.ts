import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Workout} from '../services/database.service';

const initialState: Workout[] = [];

const allWorkoutsSlice = createSlice({
    name: 'allWorkouts',
    initialState,
    reducers: {
        set: (state, action: PayloadAction<Workout[]>) => {
            return state = action.payload;
        }
    }
});

export const {set} = allWorkoutsSlice.actions;
export default allWorkoutsSlice.reducer;