import React, {useEffect, useState} from 'react';
import {Weights} from '../../../services/database.service';
import {IonCard, IonCardContent, IonIcon, IonItem, IonLabel, IonSelect, IonSelectOption, IonText} from '@ionic/react';
import {barbell, man, walk} from 'ionicons/icons';
import './WeightCounter.css';
import {useDispatch} from 'react-redux';
import {updateWeightsWorkout} from '../../../state/actions/updateWorkout';

const WeightCounter: React.FC<WeightCounterProps> = ({weight, index}) => {
    const dispatch = useDispatch();

    const handleSetsChange = (val: number) => {
        dispatch(
            updateWeightsWorkout(
                {...weight, sets: val}, index
            )
        )
    };
    const handleRepsChange = (val: number) => {
        dispatch(
            updateWeightsWorkout(
                {...weight, reps: val}, index
            )
        )
    };

    const openSelect = (id: string) => {
        // @ts-ignore
        document.getElementById(id).click();
    };

    return (
        <>
            <IonCard>
                <IonCardContent className="ion-padding">
                    <IonText className="ion-text-center sentence-case">{weight.type} ({weight.weight} kg)</IonText>
                    <div className="flex-row">
                        <IonIcon className={'icon'} icon={weight.icon}/>
                        <IonLabel onClick={e => openSelect('reps-select')}>Reps:</IonLabel>
                        <IonSelect value={weight.reps}
                                   interface={'action-sheet'}
                                   id={'reps-select'}
                                   onIonChange={e => handleRepsChange(e.detail.value)}
                        >
                            <IonSelectOption value={2}>2</IonSelectOption>
                            <IonSelectOption value={3}>3</IonSelectOption>
                            <IonSelectOption value={4}>4</IonSelectOption>
                            <IonSelectOption value={5}>5</IonSelectOption>
                            <IonSelectOption value={6}>6</IonSelectOption>
                            <IonSelectOption value={7}>7</IonSelectOption>
                            <IonSelectOption value={8}>8</IonSelectOption>
                            <IonSelectOption value={9}>9</IonSelectOption>
                            <IonSelectOption value={10}>10</IonSelectOption>
                            <IonSelectOption value={11}>11</IonSelectOption>
                            <IonSelectOption value={12}>12</IonSelectOption>
                        </IonSelect>
                        <IonLabel onClick={() => openSelect('sets-select')}>Sets:</IonLabel>
                        <IonSelect
                            value={weight.sets}
                            interface={'action-sheet'}
                            id={'sets-select'}
                            onIonChange={e => handleSetsChange(e.detail.value as number)}
                        >
                            <IonSelectOption value={1}>1</IonSelectOption>
                            <IonSelectOption value={2}>2</IonSelectOption>
                            <IonSelectOption value={3}>3</IonSelectOption>
                            <IonSelectOption value={4}>4</IonSelectOption>
                            <IonSelectOption value={5}>5</IonSelectOption>
                            <IonSelectOption value={6}>6</IonSelectOption>
                        </IonSelect>
                    </div>
                 </IonCardContent>
            </IonCard>
        </>
    );
};

interface WeightCounterProps {
    weight: Weights;
    index: number;
};

export default WeightCounter;