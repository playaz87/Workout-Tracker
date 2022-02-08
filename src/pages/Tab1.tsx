import {
    IonCard,
    IonContent,
    IonHeader,
    IonIcon, IonLabel,
    IonPage, IonRange,
    IonSegment,
    IonSegmentButton, IonSlide,
    IonTitle,
    IonToolbar
} from '@ionic/react';
import './Tab1.css';
import Stopwatch from '../components/stopwatch/stopwatch';
import {barbell, footsteps} from 'ionicons/icons';
import {useEffect, useState} from 'react';
import CardioSegment from '../components/cardio-segment/CardioSegment';

import WeightsSegment from '../components/weights-segment/WeightsSegment';
import {loadWorkout, saveWorkout} from '../services/database.service';
import {useAppDispatch, useAppSelector} from '../state/hooks';
import {
    create,
    createCardio,
    restoreWorkout,
    updateBodyWeight,
    updateDuration,
} from '../state/workoutSlice';
import {getTodaysDate} from '../services/utils.service';

const Tab1: React.FC = () => {
    const dispatch = useAppDispatch();
    const state = useAppSelector(state1 => state1.workout);
    const [isLoading, setIsLoading] = useState(true);
    const weightMin = state.bodyWeight - 2;
    const weightMax = state.bodyWeight + 2;


    useEffect(() => {

        loadWorkout(getTodaysDate())
            .then(res => {
                dispatch(restoreWorkout(res));
                setIsLoading(false);
            })
            .catch(() => {
                dispatch(create());
                dispatch(createCardio({id: 0, duration: 0, speed: 0, distance: 0, type: 'Walk'}));
                dispatch(createCardio({id: 1, duration: 0, speed: 0, distance: 0, type: 'Run'}));
                setIsLoading(false);
            });
    }, []);

    const [segment, setSegment] = useState('Cardio');

    const finishWorkout = () => {
        saveWorkout(state);
    };

    return (
        <IonPage>
            <IonContent fullscreen>
                {!isLoading &&
                    <IonCard>
                        <Stopwatch
                            onUpdateWorkout={updateDuration}
                            onStop={finishWorkout}
                            color="primary"
                            isSmall={false}
                            initVal={state.duration}
                        />
                        <IonLabel class="body-weight">Body weight ({state.bodyWeight})</IonLabel>
                        <IonRange
                            min={70}
                            max={74}
                            value={state.bodyWeight}
                            step={0.1}
                            snaps={true}
                            color="primary"
                            onIonChange={e => {
                                const val = Math.floor(e.detail.value as number * 10) / 10;
                                dispatch(
                                    updateBodyWeight(val)
                                );
                            }}
                        />
                    </IonCard>
                }


                <div className="ion-padding">
                    <IonSegment onIonChange={e => setSegment(e.detail.value as string)} value={segment}>
                        <IonSegmentButton value="Cardio">
                            <IonIcon icon={footsteps}/>
                            <IonLabel>Cardio</IonLabel>
                        </IonSegmentButton>
                        <IonSegmentButton value="Weights">
                            <IonIcon icon={barbell}/>
                            <IonLabel>Weights</IonLabel>
                        </IonSegmentButton>
                    </IonSegment>
                </div>
                {segment === 'Cardio' &&
                    <CardioSegment/>
                }
                {segment === 'Weights' &&
                    <WeightsSegment/>
                }
            </IonContent>
        </IonPage>
    );
};

export default Tab1;
