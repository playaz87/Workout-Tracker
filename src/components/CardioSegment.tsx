import {useState} from 'react';
import CardioCounter from './cardio-counter/CardioCounter';
import {useSelector} from 'react-redux';
import {WorkoutState} from '../state/reducers/workoutReducer';

const CardioSegment = () => {
    const cardio = useSelector<WorkoutState, WorkoutState['cardio']>(state => state.cardio)
    return (
        <>
            {
                cardio.map((c, i) => <CardioCounter cardio={c} color="secondary" index={i} key={c.id}/>)
            }
        </>
    );
};
export default CardioSegment;