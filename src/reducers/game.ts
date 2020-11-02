import * as actions from '../actions';
import {Point} from '../types';
import {generateSudoku} from '../algrithm/generateSudoku';
import { Highlight } from '@material-ui/icons';

type ActionType=
    | actions.ChooseDigitAction
    | actions.ChooseDigitStartAction
    | actions.UpdateSudokuAction
    | actions.BlockHighlightAction
    | actions.ClearBlockHighlightAction

export interface GameStore {
    values:number[][];
    blockHighlight:number[][];
    level:number;
    point:Point;
    highlightPoint:Point;
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
    blockHighlight:[
        [0,0,0,0,0,0,0,0,0],
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
    highlightPoint:{x:0,y:0,value:0}
}

export default (state=init,action:ActionType):GameStore=>{
    const {values,blockHighlight,level,point,highlightPoint} = state;
    switch(action.type){
        case actions.UPDATE_SUDOKU:
            return {...state,values:generateSudoku(level)};
        case actions.BLOCK_HIGHLIGHT:
            const v=values[highlightPoint.x][highlightPoint.y];
            for(var m:number=0;m<9;m++){
                for(var n:number=0;n<9;n++){
                    if(v==values[m][n]) blockHighlight[m][n]=1;
                    else blockHighlight[m][n]=0;
                }
            }
            return {...state,blockHighlight:blockHighlight};
        case actions.CLEAR_BLOCK_HIGHLIGHT:
            const initBlockHighlight=[
                [0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0],
            ];
            return {...state,blockHighlight:initBlockHighlight};
        case actions.CHOOSE_DIGIT_START:
            return {
                ...state,
                point:{...point,x:action.line,y:action.column},
                highlightPoint:{...highlightPoint,x:action.line,y:action.column},
            };
        case actions.CHOOSE_DIGIT:
            values[action.point.x][action.point.y]=action.point.value;
            return {...state,values:values,point:action.point};
        default:
            return {...state};
    }
}