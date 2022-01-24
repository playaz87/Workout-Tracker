import {
    IonContent,
    IonHeader,
    IonIcon, IonLabel,
    IonPage,
    IonSegment,
    IonSegmentButton,
    IonTitle,
    IonToolbar
} from '@ionic/react';
import './Tab1.css';
import Stopwatch from '../components/stopwatch/stopwatch';
import {barbell, footsteps} from 'ionicons/icons';
import {useEffect, useState} from 'react';
import CardioSegment from '../components/CardioSegment';
import {createCardio, updateWorkoutDuration} from '../state/actions/updateWorkout';
import {useDispatch} from 'react-redux';

const Tab1: React.FC = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(createCardio({id: 0, duration: 0, speed: 0, distance: 0, type: 'Walk'}))
        dispatch(createCardio({id: 1, duration: 0, speed: 0, distance: 0, type: 'Run'}))
    }, []);

    const [segment, setSegment] = useState('Cardio');
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Tab 1</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Tab 1</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <Stopwatch onUpdate={updateWorkoutDuration} color="primary" isSmall={false}/>
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
                {/*{segment === 'Weights' &&*/}
                {/*    <WeightsSegment workout={workout} setWorkout={setWorkout}/>*/}
                {/*}*/}
            </IonContent>
        </IonPage>
    );
};

export default Tab1;
