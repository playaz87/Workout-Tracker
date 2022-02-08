import React, {useState} from 'react';
// import WeightCounter from '../weight-counter/WeightCounter';
import {
    InputChangeEventDetail,
    IonButton,
    IonContent,
    IonIcon,
    IonInput,
    IonItem,
    IonLabel,
    IonList,
    IonPopover
} from '@ionic/react';
import {barbell} from 'ionicons/icons';
import {Weights, WeightWorkouts, Workout} from '../../services/database.service';
import {animateRequired} from '../../services/utils.service';
import './WeightsSegment.css';
import '../../../node_modules/animate.css/animate.css';
import {useAppDispatch, useAppSelector} from '../../state/hooks';
import {createWeight} from '../../state/workoutSlice';
import WeightCounter from './weight-counter/WeightCounter';


const defaultWeightsWorkout: Weights = {
    reps: 0,
    sets: 0,
    type: 'Bicep Curl',
    icon: barbell,
    weight: 0
};

const WeightsSegment = () => {
    const [nextWeightsWorkout, setNextWeightsWorkout] = useState<Weights>(defaultWeightsWorkout);
    const dispatch = useAppDispatch();
    const weights = useAppSelector(state => state.workout.weights);
    const addWeightsWorkout = () => {
        if (nextWeightsWorkout.weight <= 0) {
            animateRequired('weight-input');
        } else {
            dispatch(
                createWeight(
                    {...nextWeightsWorkout}
                )
            );
            setNextWeightsWorkout({...defaultWeightsWorkout, icon: nextWeightsWorkout.icon});
        }
    };

    const handleWeightChange = (e: CustomEvent<InputChangeEventDetail>) => {
        if (e.detail.value) {
            const weight = parseInt(e.detail.value, 10);
            setNextWeightsWorkout({...nextWeightsWorkout, weight})
        }
    };


    return (
        <>
            <div className="flex-row">
                <div className="flex-around">
                    <IonIcon slot={'start'} icon={nextWeightsWorkout.icon} id="popover-trigger" className="padding-8 icon"/>
                    <IonLabel>{nextWeightsWorkout.type}</IonLabel>
                </div>
                <div className="width-40 flex-around">
                    <IonInput
                        value={nextWeightsWorkout.weight}
                        onIonChange={e => handleWeightChange(e)}
                        id={'weight-input'}
                        className="animate__animated"
                    >
                        <IonLabel style={{'marginRight': '10px'}}>Weight (kg): </IonLabel>
                    </IonInput>
                </div>
                <IonPopover trigger="popover-trigger" dismissOnSelect={true} event>
                    <IonContent>
                        <IonList>
                            {WeightWorkouts.map((ww, index) => {
                                return (
                                    <IonItem
                                        onClick={() => (setNextWeightsWorkout({
                                            ...nextWeightsWorkout,
                                            type: ww.type,
                                            icon: ww.icon
                                        }))}
                                        key={index}>
                                        <IonIcon slot={'start'} icon={ww.icon}/>
                                        <IonLabel>{ww.type}</IonLabel>
                                    </IonItem>
                                )
                            })}
                        </IonList>
                    </IonContent>
                </IonPopover>
                <IonButton
                    slot={'end'}
                    size={'default'}
                    color={'secondary'}
                    onClick={addWeightsWorkout}
                >+</IonButton>
            </div>
            {weights.map((ww, index) =>
                <WeightCounter weight={ww} key={index} index={index} />
            )}
        </>
    );
};


export default WeightsSegment;