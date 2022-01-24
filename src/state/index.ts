import {createStore} from 'redux'
import {workoutReducer} from './reducers/workoutReducer';
import {composeWithDevTools} from 'redux-devtools-extension';

export const store = createStore(workoutReducer, composeWithDevTools());