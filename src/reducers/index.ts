import { combineReducers } from 'redux';
import CountersReducer, { CountersStore } from './counters';
import ChatReducer,{ChatStore} from './chat';
import GameReducer, { GameStore } from './game';

export interface StoreState {
    Counters: CountersStore;
    Game: GameStore;
    Chat:ChatStore;
}

export const reducers = combineReducers({
    Counters: CountersReducer,
    Game: GameReducer,
    Chat:ChatReducer,
});
