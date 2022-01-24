import React, {useEffect, useRef, useState} from 'react';
import {IonButton, IonText} from '@ionic/react';
import './stopwatch.css';
import {useDispatch} from 'react-redux';
import {
    ActionWorkout,
    UpdateCardioDurationData
} from '../../state/actions/updateWorkout';

const Stopwatch: React.FC<StopwatchProps> = ({onUpdate, color, isSmall, index}) => {
    const dispatch = useDispatch();
    const [timer, setTimer] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const countRef = useRef<any>(null);

    useEffect(() => {
        const data = index != null ? {value: timer, index} as UpdateCardioDurationData : timer;
        dispatch(onUpdate(data));
    }, [timer])

    const handleStart = () => {
        setIsActive(true);
        setIsPaused(false);
        countRef.current = setInterval(() => {
            setTimer((timer) => timer + 1);
        }, 1000);
    };

    const handleStop = () => {
        setIsActive(false);
        setIsPaused(false);
        clearInterval(countRef.current);
    };

    const handlePause = () => {
        clearInterval(countRef.current);
        setIsPaused(true);
    };

    const handleResume = () => {
        setIsPaused(false);
        countRef.current = setInterval(() => {
            setTimer(timer => timer + 1);
        }, 1000);
    };

    const handleReset = () => {
        setIsActive(false);
        setIsPaused(false);
        setTimer(0);
    };

    const formatTime = () => {
        const getSeconds = `0${(timer % 60)}`.slice(-2);
        const minutes = Math.floor(timer / 60);
        const getMinutes = `0${minutes % 60}`.slice(-2)
        const getHours = `0${Math.floor(timer / 3600)}`.slice(-2)

        return `${getHours} : ${getMinutes} : ${getSeconds}`
    }

    return (
        <>
            <div className="column">
                <IonText className={isSmall ? 'small-counter' : 'large-counter'}
                         color={color}>{formatTime()}</IonText>
                <div className="inline">
                    <IonButton color={color} size={isSmall ? 'small' : 'default'}
                               onClick={isActive ? handleStop : handleStart}>{isActive ? 'Stop' : 'Start'}</IonButton>
                    <IonButton color={color} size={isSmall ? 'small' : 'default'}
                               onClick={isPaused ? handleResume : handlePause}>{isPaused ? 'Resume' : 'Pause'}</IonButton>
                    <IonButton color={color} size={isSmall ? 'small' : 'default'}
                               onClick={handleReset}>Reset</IonButton>
                </div>
            </div>
        </>
    );
};
export default Stopwatch;


export interface StopwatchProps {
    onUpdate(val: number | UpdateCardioDurationData): ActionWorkout;
    color: string;
    isSmall: boolean;
    index?: number;
}