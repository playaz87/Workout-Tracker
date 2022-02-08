import CardioCounter from '../cardio-counter/CardioCounter';

import {useAppSelector} from '../../state/hooks';

const CardioSegment = () => {
    const cardio = useAppSelector(state => state.workout.cardio);
    return (
        <>
            {
                cardio.map((c, i) => <CardioCounter cardio={c} color="secondary" index={i} key={c.id}/>)
            }
        </>
    );
};
export default CardioSegment;