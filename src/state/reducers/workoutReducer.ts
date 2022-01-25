import {ActionWorkout} from '../actions/updateWorkout';
import {Cardio, Weights} from '../../services/database.service';
import {calculateDistance, getTodaysDate} from '../../services/utils.service';

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
            const cardios: Cardio[] = [...state.cardio, action.payload];
            return {...state, cardio: cardios};
        }

        // case 'UPDATE_CARDIO_DURATION': {
        //     const cardios = [...state.cardio];
        //     cardios[action.payload.index].duration = action.payload.value
        //     return {...state, cardio: cardios};
        // }

        case 'UPDATE_CARDIO': {
            const cardios = [...state.cardio];
            cardios[action.index] = action.payload;
            cardios[action.index].distance = calculateDistance(cardios[action.index]);
            return {...state, cardio: cardios};
        }

        case 'CREATE_WEIGHT_WORKOUT': {
            const weights = [...state.weights];
            weights.push(action.payload);
            return {...state, weights};
        }

        case 'UPDATE_WEIGHTS_WORKOUT': {
            const weights = [...state.weights];
            weights[action.index] = action.payload;
            return {...state, weights};
        }



        default:
            return state;
    }
};