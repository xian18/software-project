import * as actions from '../actions';
import {Point} from '../types';
import {generateSudoku} from '../algrithm/generateSudoku';

type ActionType=
    | actions.ChooseDigitAction
    | actions.ChooseDigitStartAction
    | actions.UpdateSudokuAction

export interface GameStore {
    values:number[][];
    level:number;
    point:Point;
}

const init:GameStore={
    values:[
        [1,1,1,1,1,1,1,1,1],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
    ],
    level:1,
    point:{x:0,y:0,value:0},
}

export default (state=init,action:ActionType):GameStore=>{
    const {values,level,point} = state;
    switch(action.type){
        case actions.UPDATE_SUDOKU:
            return {...state,values:generateSudoku(level)};
        case actions.CHOOSE_DIGIT_START:
            return {...state,point:{x:action.line,y:action.column,value:point.value}};
        case actions.CHOOSE_DIGIT:
            values[action.point.x][action.point.y]=action.point.value;
            return {...state,values:values,point:action.point};
        default:
            return {...state};
    }
}