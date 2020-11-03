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
    | actions.ToggleDigitBoardAction

export interface GameStore {
    values:number[][];
    blockHighlight:number[][];
    level:number;
    point:Point;
    highlightPoint:Point;
    digitBoard:boolean;
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
    highlightPoint:{x:0,y:0,value:0},
    digitBoard:false,
}

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

export default (state=init,action:ActionType):GameStore=>{
    const {values,blockHighlight,level,point,highlightPoint,digitBoard} = state;
    switch(action.type){
        case actions.UPDATE_SUDOKU: // when click fresh button, generate sudoku and update 9x9 matrix in store
            return {...state,values:generateSudoku(level)};
        case actions.BLOCK_HIGHLIGHT:
            for(var m:number=0;m<9;m++){
                for(var n:number=0;n<9;n++){
                    if(action.value==values[m][n]) blockHighlight[m][n]=1;
                    else blockHighlight[m][n]=0;
                }
            }
            console.log(blockHighlight);
            return {...state,blockHighlight:blockHighlight};
        case actions.CLEAR_BLOCK_HIGHLIGHT:
            const clear=initBlockHighlight.map(x=>Object.assign({},x));
            return {...state,blockHighlight:clear};
        case actions.TOGGLE_DIGITBOARD:     // show global digitBoard
            return {...state,digitBoard:!digitBoard};
        case actions.CHOOSE_DIGIT_START:    // just for update point and highlight point mouse is howvering on
            console.log(action.line,action.column);
            return {
                ...state,
                point:{...point,x:action.line,y:action.column},
            };
        case actions.CHOOSE_DIGIT:
            values[action.point.x][action.point.y]=action.point.value;
            return {...state,values:values,point:action.point};
        
        default:
            return {...state};
    }
}