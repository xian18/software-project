import {combineReducers} from 'redux'
import CountersReducer,{CountersStore} from './Counters'

export interface StoreState {
    Counters:CountersStore
}

export const reducers=combineReducers({
    Counters:CountersReducer,
});