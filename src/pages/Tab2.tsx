import {
    IonAlert,
    IonContent,
    IonHeader, IonIcon,
    IonItem, IonItemOption, IonItemOptions,
    IonItemSliding,
    IonLabel,
    IonList,
    IonPage,
    IonTitle,
    IonToolbar
} from '@ionic/react';
import './Tab2.css';
import {useEffect, useState} from 'react';
import {deleteWorkout, loadAllWorkouts, Workout} from '../services/database.service';
import {formatDuration} from '../services/utils.service';
import {trash} from 'ionicons/icons';
import shortid from 'shortid';
import {useAppDispatch, useAppSelector} from '../state/hooks';
import {set} from '../state/allWorkoutsSlice';

const Tab2: React.FC = () => {
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const [dateToDelete, setDateToDelete] = useState('');

    useEffect(() => {
        load();
    }, []);

    const load = () => {
        loadAllWorkouts()
            .then(res => {
                dispatch(
                    set(res)
                )
            });
    };

    const workouts = useAppSelector(state => state.allWorkouts);
    const dispatch = useAppDispatch();

    const handleDelete = () => {
        deleteWorkout(dateToDelete)
            .then(() => {
                load();
            });
        setIsAlertOpen(false);
        setDateToDelete('');
    };

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
                        return (
                            <IonItemSliding key={shortid.generate()}>
                                <IonItemOptions slot="start">
                                    <IonItemOption color="danger" onClick={() => {
                                        setDateToDelete(workout.date);
                                        setIsAlertOpen(true);
                                    }}
                                    >
                                        <IonIcon icon={trash} style={{fontSize: '1.4rem'}}/>
                                    </IonItemOption>
                                </IonItemOptions>
                                <IonItem>
                                    <IonLabel>{workout.date} ({formatDuration(workout.duration)})</IonLabel>
                                </IonItem>
                            </IonItemSliding>
                        );
                    })}
                </IonList>
                <IonAlert
                    isOpen={isAlertOpen}
                    onDidDismiss={() => setIsAlertOpen(false)}
                    header="Are you sure?"
                    message={`Delete workout ${dateToDelete}`}
                    buttons={[
                        {
                            text: 'Cancel',
                            role: 'cancel',
                            handler: () => {
                                setIsAlertOpen(false);
                                setDateToDelete('');
                            }
                        },
                        {
                            text: 'Ok',
                            handler: () => {
                                handleDelete();
                            }
                        }
                    ]}
                />
            </IonContent>
        </IonPage>
    );
};

export default Tab2;
