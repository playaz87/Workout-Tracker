import {Cardio} from '../../services/database.service';

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

export interface UpdateCardioDurationData {
    value: number;
    index: number;
}

interface UpdateCardioDuration {
    type: 'UPDATE_CARDIO_DURATION';
    payload: UpdateCardioDurationData;
}

interface UpdateCardio {
    type: 'UPDATE_CARDIO';
    payload: Cardio;
    index: number;
}

export type ActionWorkout = CreateWorkout | UpdateDuration | UpdateCardioDuration | CreateCardio | UpdateCardio;

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

export const updateCardioDuration = (data: UpdateCardioDurationData): ActionWorkout => ({
    type: 'UPDATE_CARDIO_DURATION',
    payload: data
})

export const updateCardio = (cardio: Cardio, index: number):UpdateCardio => ({
    type: 'UPDATE_CARDIO',
    payload: cardio,
    index
});