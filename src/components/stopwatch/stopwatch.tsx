import React, {useEffect, useRef, useState} from 'react';
import {IonButton, IonText} from '@ionic/react';
import './stopwatch.css';

import {Cardio} from '../../services/database.service';
import {useAppDispatch, useAppSelector} from '../../state/hooks';
import {PayloadAction} from '@reduxjs/toolkit';

const Stopwatch: React.FC<StopwatchProps> = ({onUpdateWorkout, onUpdateCardio,  color, isSmall, index, cardio, onStop, initVal}) => {
    const dispatch = useAppDispatch();
    const [timer, setTimer] = useState(initVal);
    const [isActive, setIsActive] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const countRef = useRef<any>(null);

    useEffect(() => {
        if (onUpdateWorkout) {
            dispatch(onUpdateWorkout(timer));
        } else if (onUpdateCardio && cardio && index != null) {
            const data = {...cardio};
            data.duration = timer;
            dispatch(
                onUpdateCardio([data, index])
            );
        }
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
        if (onStop) {
            onStop();
        }
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
    onUpdateWorkout?(val: number): PayloadAction<number>;
    onUpdateCardio?(data: [Cardio, number]): PayloadAction<[Cardio, number]>
    onStop?(): void;
    color: string;
    isSmall: boolean;
    index?: number;
    cardio?: Cardio;
    initVal: number;
}