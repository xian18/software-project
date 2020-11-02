import * as actions from '../actions';
import {Point} from '../types';

type ActionType=
    | actions.ChooseDigitAction

export interface GameStore {
    values:number[][];
    point:Point;
}

const init:GameStore={
    values:Array(9).fill(Array(9),0),
    point:{x:0,y:0,value:0},
}

export default (state=init,action:ActionType):GameStore=>{
    const {values,point} = state;
    switch(action.type){
        case actions.CHOOSE_DIGIT:
            var curValues:number[][]=Object.assign([],values);
            curValues[action.point.x][action.point.y]=action.point.value;
            return {...state,values:curValues,point:action.point};
        default:
            return {...state};
    }
}