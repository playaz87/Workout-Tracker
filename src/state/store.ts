import {configureStore} from '@reduxjs/toolkit';
import workoutReducer from './workoutSlice';
import allWorkoutsReducer from './allWorkoutsSlice';

export const store = configureStore({
    reducer: {
        workout: workoutReducer,
        allWorkouts: allWorkoutsReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;