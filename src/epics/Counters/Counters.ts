import { Action,AnyAction } from 'redux';
import {isOfType} from 'typesafe-actions';
import {
    ActionsObservable,
    combineEpics,
    createEpicMiddleware,
    EpicMiddleware,
    StateObservable,
} from 'redux-observable';
import { BehaviorSubject, Observable, of,ObservableInput } from 'rxjs';
import {ajax} from 'rxjs/ajax';
import {catchError,filter,mergeMap,startWith,switchMap} from 'rxjs/operators';

import {getserverValue,GetserverValue,GET_SERVERVALUE,serverValueFulfilled} from '../../actions';
import {StoreState} from '../../reducers';

import {API} from '../../config/consts';

export type ActionType =
    | GetserverValue
    
export const getserverValueEpic=(action$:ActionsObservable<any>)=>
    action$.pipe(
        filter(isOfType(GET_SERVERVALUE)),
        mergeMap(() =>
            ajax.getJSON<{ type: string; message: string }>(`${API}/user/qrCode`).pipe(
                mergeMap((res) => {
                    if (res.type === 'success') {
                        return of(
                            serverValueFulfilled(res.type,res.message),
                        );
                    }
                    throw Error(res.message);
                }),
            ),
        ),
    );