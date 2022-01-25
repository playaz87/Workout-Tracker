import {Cardio, Weights} from '../../services/database.service';

interface CreateWorkout {
    type: 'CREATE';
}

interface UpdateDuration {
    type: 'UPDATE_DURATION';
    payload: number
}

interface CreateCardio {
    type: 'CREATE_CARDIO';
    payload: Cardio;
}

export interface UpdateCardioData {
    payload: Cardio;
    index: number;
}

interface UpdateCardioDuration {
    type: 'UPDATE_CARDIO_DURATION';
    payload: UpdateCardioData;
}

interface UpdateCardio {
    type: 'UPDATE_CARDIO';
    payload: Cardio;
    index: number;
}

interface CreateWeightWorkout {
    type: 'CREATE_WEIGHT_WORKOUT';
    payload: Weights;
}

interface UpdateWeightsWorkout {
    type: 'UPDATE_WEIGHTS_WORKOUT';
    payload: Weights;
    index: number;
}

export type ActionWorkout = CreateWorkout | UpdateDuration | UpdateCardioDuration | CreateCardio | UpdateCardio | CreateWeightWorkout | UpdateWeightsWorkout;

export const createWorkout = (): ActionWorkout => ({
    type: 'CREATE',
});

export const updateWorkoutDuration = (val: number): ActionWorkout => ({
    type: 'UPDATE_DURATION',
    payload: val
});

export const createCardio = (cardio: Cardio): ActionWorkout => ({
    type: 'CREATE_CARDIO',
    payload: cardio
});

// export const updateCardioDuration = (data: UpdateCardioDurationData): ActionWorkout => ({
//     type: 'UPDATE_CARDIO_DURATION',
//     payload: data
// })

export const updateCardio = (cardio: Cardio, index: number):UpdateCardio => ({
    type: 'UPDATE_CARDIO',
    payload: cardio,
    index: index
});

export const createWeightsWorkout = (weights: Weights): CreateWeightWorkout => ({
    type: 'CREATE_WEIGHT_WORKOUT',
    payload: weights
});

export const updateWeightsWorkout = (weights: Weights, index: number): UpdateWeightsWorkout => ({
    type: 'UPDATE_WEIGHTS_WORKOUT',
    payload: weights,
    index
});