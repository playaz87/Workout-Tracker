import {Storage} from '@capacitor/storage';
import {barbell, bicycle, body} from 'ionicons/icons';
import benchpress from '../assets/custom-icons/benchpress.svg';
import latpulldown from '../assets/custom-icons/latpulldown.svg';
import {useAppDispatch} from '../state/hooks';

export interface Cardio {
    id: number;
    type: 'Run' | 'Walk';
    duration: number;
    speed: number;
    distance: number;
}

export interface Weights {
    type: string;
    reps: number;
    sets: number;
    icon: any;
    weight: number;
}

export interface Workout {
    date: string;
    duration: number;
    bodyWeight: number;
    weights: Weights[];
    cardio: Cardio[];
}

export const WeightWorkouts = [
    {type: 'Bench Press', icon: benchpress as unknown as string},
    {type: 'Lat Pulldown', icon: latpulldown as unknown as string},
    {type: 'Bicep Curl', icon: barbell},
    {type: 'Shoulder Press', icon: barbell},
    {type: 'Tricep Curl', icon: barbell},
];

export const saveWorkout = (workout: Workout) => {
    Storage.set({key: `workout_${workout.date}`, value: JSON.stringify(workout)});
}

export const loadWorkout = async (date: string): Promise<Workout> => {
    const res = await Storage.get({key: `workout_${date}`});
    return await new Promise((resolve, reject) => {
        if (res.value) {
            resolve(JSON.parse(res.value));
        }
        reject();
    });

}

export const loadAllWorkouts = async (): Promise<Workout[]> => {
    const workouts: Workout[] = [];
    return new Promise(async resolve => {
        const keys = await Storage.keys();
        keys.keys.forEach((value, index) => {
            if (value.includes('workout')) {
                Storage.get({key: value})
                    .then(res => {
                        if (typeof res.value === 'string') {
                            const workout = JSON.parse(res.value);
                            workouts.push(workout);
                        }
                        if (index === keys.keys.length - 1) {
                            resolve(workouts);
                        }
                    })
            }
        });
    });
}

export const deleteWorkout = (date: string): Promise<void> => {
    return new Promise((resolve, reject) => {
        Storage.remove({key: `workout_${date}`})
            .then(() => resolve())
            .catch(() => reject);
    });
};