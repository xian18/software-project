import * as actions from '../actions';
import {Point} from '../types';
import {generateSudoku} from '../algrithm/generateSudoku';
import {sudokuValue,PlayHistory} from '../types';

type ActionType=
    | actions.ChooseDigitAction
    | actions.ChooseDigitStartAction
    | actions.UpdateSudokuAction
    | actions.BlockHighlightAction
    | actions.ClearBlockHighlightAction
    | actions.ToggleDigitBoardAction
    | actions.PlayRoundBackwardAction
    | actions.PlayRoundForwardAction

export interface GameStore {
    values:sudokuValue[][];
    blockHighlight:number[][];
    level:number;
    point:Point;
    highlightPoint:Point;
    digitBoard:boolean;
    playRound:number;
    playHistorys:PlayHistory[];
}

const a=undefined;

const init:GameStore={
    values:[
        [a,a,a,a,a,a,a,a,a],
        [a,a,a,a,a,a,a,a,a],
        [a,a,a,a,a,a,a,a,a],
        [a,a,a,a,a,a,a,a,a],
        [a,a,a,a,a,a,a,a,a],
        [a,a,a,a,a,a,a,a,a],
        [a,a,a,a,a,a,a,a,a],
        [a,a,a,a,a,a,a,a,a],
        [a,a,a,a,a,a,a,a,a],
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
    point:{x:0,y:0,value:undefined},
    highlightPoint:{x:0,y:0,value:undefined},
    digitBoard:false,
    playRound:0,
    playHistorys:[],
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
    const {values,blockHighlight,level,point,highlightPoint,digitBoard,playRound,playHistorys} = state;
    switch(action.type){
        case actions.UPDATE_SUDOKU: // when click fresh button, generate sudoku and update 9x9 matrix in store
            return {...state,values:generateSudoku(level)};
        case actions.BLOCK_HIGHLIGHT:   // calculate highlight matrix
            for(var m:number=0;m<9;m++)
                for(var n:number=0;n<9;n++)
                    if(action.value!=undefined && action.value==values[m][n]) blockHighlight[m][n]=1;
                    else blockHighlight[m][n]=0;
            return {...state,blockHighlight:blockHighlight};
        case actions.CLEAR_BLOCK_HIGHLIGHT:
            const clear=initBlockHighlight.map(x=>Object.assign({},x));
            return {...state,blockHighlight:clear};
        case actions.TOGGLE_DIGITBOARD:     // show global digitBoard
            return {...state,digitBoard:!digitBoard};
        case actions.CHOOSE_DIGIT_START:    // just for update point and highlight point mouse is howvering on
            return {...state,point:{x:action.line,y:action.column,value:action.value},};
        case actions.CHOOSE_DIGIT:
            values[action.point.x][action.point.y]=action.point.value;
            return {...state,values:values,point:action.point};
        case actions.PLAY_ROUND_BACKWARD:
            console.log(playHistorys.slice(0,playRound-1));
            console.log(playRound);
            if(playRound==0) return {...state};
            if(playRound>0) values[playHistorys[playRound-1].x][playHistorys[playRound-1].y]=playHistorys[playRound-1].from;
            return {...state,values:values,playRound:playRound-1,playHistorys:playHistorys.slice(0,playRound-1)};
        case actions.PLAY_ROUND_FORWARD:
            playHistorys.push(action.payload);
            return {...state,playRound:playRound+1,playHistorys};
        default:
            return {...state};
    }
}