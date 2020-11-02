import {combineReducers} from 'redux'
import CountersReducer,{CountersStore} from './counters'
import GameReducer,{GameStore} from './game';

export interface StoreState {
    Counters:CountersStore,
    Game:GameStore
}

export const reducers=combineReducers({
    Counters:CountersReducer,
    Game:GameReducer
});