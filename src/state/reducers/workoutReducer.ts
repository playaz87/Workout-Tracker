import {ActionWorkout} from '../actions/updateWorkout';
import {Cardio, Weights} from '../../services/database.service';
import {getTodaysDate} from '../../services/utils.service';

export interface WorkoutState {
    duration: number;
    date: string;
    weights: Weights[];
    cardio: Cardio[];
}


const initialState: WorkoutState = {duration: 0, date: '', weights: [], cardio: []};


export const workoutReducer = (state: WorkoutState = initialState, action: ActionWorkout): WorkoutState => {
    switch (action.type) {

        case 'CREATE':
            const date = getTodaysDate();
            return {...state, date};

        case 'UPDATE_DURATION':
            return {...state, duration: action.payload};

        case 'CREATE_CARDIO': {
            const cardio: Cardio[] = [...state.cardio, action.payload];
            return {...state, cardio};
        }

        case 'UPDATE_CARDIO_DURATION': {
            const cardio = [...state.cardio];
            cardio[action.payload.index].duration = action.payload.value
            return {...state, cardio};
        }

        case 'UPDATE_CARDIO': {
            const cardio = [...state.cardio];
            cardio[action.index] = action.payload;
            return {...state, cardio};
        }

        default:
            return state;
    }
};