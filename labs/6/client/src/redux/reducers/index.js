import { combineReducers } from 'redux';
import trainer from './trainerReducer';

const rootReducer = combineReducers({
    trainer
});

export default rootReducer;