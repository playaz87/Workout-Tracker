import Stopwatch from '../stopwatch/stopwatch';
import {IonCard, IonCardContent, IonCardHeader, IonIcon, IonRange, IonText} from '@ionic/react';
import {walk, man} from 'ionicons/icons';
import {useEffect, useState} from 'react';
import {Cardio} from '../../services/database.service';
import './CardioCounter.css';
import {updateCardio, updateCardioDuration} from '../../state/actions/updateWorkout';
import {useDispatch} from 'react-redux';


const CardioCounter: React.FC<CardioProps> = ({cardio, color, index}) => {
    const dispatch = useDispatch();


    const calculateDistance = () => {
        const metres = cardio.speed * 1000;
        const metresPerSecond = metres / (60 * 60);
        return cardio.duration * metresPerSecond;
    };

    useEffect(() => {
        updateCardio({...cardio, distance: calculateDistance()}, index);
    }, [cardio.duration]);

    return (
        <>
            <IonCard>
                <IonCardHeader>{cardio.type}</IonCardHeader>
                <IonCardContent>
                    <IonIcon icon={cardio.type === 'Walk' ? man : walk}/>
                    <Stopwatch
                        onUpdate={updateCardioDuration}
                        index={index}
                        color={color} isSmall={true}/>
                    <IonRange
                        min={cardio.type === 'Walk' ? 1 : 7}
                        max={cardio.type === 'Walk' ? 8 : 15}
                        value={cardio.speed}
                        step={0.5} snaps={true}
                        pin={true}
                        pinFormatter={val => val}
                        color={color}
                        onIonChange={e => updateCardio({...cardio, speed: e.detail.value as number}, index)}
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