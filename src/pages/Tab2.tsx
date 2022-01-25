import {IonContent, IonHeader, IonItem, IonLabel, IonList, IonPage, IonTitle, IonToolbar} from '@ionic/react';
import './Tab2.css';
import {useEffect, useState} from 'react';
import {loadAllWorkouts, Workout} from '../services/database.service';
import {formatDuration} from '../services/utils.service';

const Tab2: React.FC = () => {
    const [workouts, setWorkouts] = useState<Workout[]>([]);

    useEffect(() => {
        loadAllWorkouts()
            .then(res => {
                setWorkouts(res)
            });
    }, []);

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Past Workouts</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Tab 2</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonList>
                    {workouts.map(workout => {
                        return <IonItem>
                            <IonLabel>{workout.date} ({formatDuration(workout.duration)})</IonLabel>
                        </IonItem>
                    })}
                </IonList>
            </IonContent>
        </IonPage>
    );
};

export default Tab2;
