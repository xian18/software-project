import countersEpic from './Counters';
import { combineEpics, EpicMiddleware, createEpicMiddleware } from 'redux-observable';
import { Action, AnyAction } from 'redux';
import { StoreState } from '../reducers';
import { getserverValueAction, GetserverValue } from '../actions';
import { ActionType } from 'typesafe-actions';

export type ActionsType = ActionType<typeof getserverValueAction>;
export const epicMiddleware = createEpicMiddleware({
    dependencies: null,
});

export const epics = combineEpics(...countersEpic);
