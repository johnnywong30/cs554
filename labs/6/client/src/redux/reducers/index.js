import { combineReducers } from 'redux';
import pokemon from './pokemonReducer';
import trainer from './trainerReducer';

const rootReducer = combineReducers({
    pokemon,
    trainer
});

export default rootReducer;