import {Cardio, Weights, Workout} from '../services/database.service';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {calculateDistance, getTodaysDate} from '../services/utils.service';

const initialState: Workout = {
    duration: 0,
    date: '',
    bodyWeight: 72,
    weights: [],
    cardio: []
};

const workoutSlice = createSlice({
    name: 'workout',
    initialState,
    reducers: {
        create: state => {
            state.date = getTodaysDate();
        },
        createCardio: (state, action: PayloadAction<Cardio>) => {
            state.cardio = [...state.cardio, action.payload];
        },
        createWeight: (state, action: PayloadAction<Weights>) => {
            state.weights = [...state.weights, action.payload];
        },
        updateBodyWeight(state, action: PayloadAction<number>) {
            state.bodyWeight = action.payload;
        },
        updateDuration: (state, action: PayloadAction<number>) => {
            state.duration = action.payload;
        },
        updateCardio: (state, action: PayloadAction<[Cardio, number]>) => {
            state.cardio[action.payload[1]] = action.payload[0];
            state.cardio[action.payload[1]].distance = calculateDistance(state.cardio[action.payload[1]]);
        },
        updateWeight: (state, action: PayloadAction<[Weights, number]>) => {
            state.weights[action.payload[1]] = action.payload[0];
        },
        restoreWorkout: (state, action:PayloadAction<Workout>) => {
            return state = action.payload;
        }
    }
});

export const {create, updateDuration, createCardio, updateWeight, createWeight, updateCardio, updateBodyWeight, restoreWorkout} = workoutSlice.actions;
export default workoutSlice.reducer;