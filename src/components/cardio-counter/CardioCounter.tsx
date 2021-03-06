import Stopwatch from '../stopwatch/stopwatch';
import {IonCard, IonCardContent, IonCardHeader, IonIcon, IonRange, IonText} from '@ionic/react';
import {walk, man} from 'ionicons/icons';
import {useEffect, useState} from 'react';
import {Cardio} from '../../services/database.service';
import './CardioCounter.css';
import {updateCardio} from '../../state/actions/updateWorkout';
import {useDispatch} from 'react-redux';


const CardioCounter: React.FC<CardioProps> = ({cardio, color, index}) => {
    const dispatch = useDispatch();




    // useEffect(() => {
    //     dispatch(
    //         updateCardio(
    //             {...cardio, distance: calculateDistance()}, index
    //         )
    //     );
    // }, [cardio.duration]);

    const handleSpeedChange = (val: number) => {
        const data = {...cardio, speed: val};
        dispatch(
            updateCardio(
                data, index
            )
        )
    };

    return (
        <>
            <IonCard>
                <IonCardHeader>{cardio.type}</IonCardHeader>
                <IonCardContent>
                    <IonIcon icon={cardio.type === 'Walk' ? man : walk}/>
                    <Stopwatch
                        onUpdateCardio={updateCardio}
                        index={index}
                        cardio={cardio}
                        color={color} isSmall={true}/>
                    <IonRange
                        min={cardio.type === 'Walk' ? 1 : 7}
                        max={cardio.type === 'Walk' ? 8 : 15}
                        value={cardio.speed}
                        step={0.5} snaps={true}
                        pin={true}
                        pinFormatter={val => val}
                        color={color}
                        onIonChange={e => handleSpeedChange(e.detail.value as number)}
                    />
                    <div className="footer">
                        <IonText>{cardio.speed} Km/hr</IonText>
                        <IonText>{Math.round(cardio.distance)}m</IonText>
                    </div>
                </IonCardContent>
            </IonCard>
        </>
    );
};
export default CardioCounter;

export interface CardioProps {
    cardio: Cardio
    color: string;
    index: number;
}