import * as actions from '../actions';
import {Point} from '../types';
import {generateSudoku} from '../algrithm/generateSudoku';
import {sudokuValue,PlayHistory,Level} from '../types';
import {zero9x9,undefined9x9} from '../consts';
import {calculateHighlight} from '../algrithm/calculateHighlight';

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
    level:Level;
    point:Point;
    highlightPoint:Point;
    digitBoard:boolean;
    playRound:number;
    playHistorys:PlayHistory[];
}


const init:GameStore={
    values:undefined9x9,
    blockHighlight:zero9x9.map(x=>Object.assign({},x)) as number[][],
    level:1,
    point:{x:0,y:0,value:undefined},
    highlightPoint:{x:0,y:0,value:undefined},
    digitBoard:false,
    playRound:0,
    playHistorys:[],
}

export default (state=init,action:ActionType):GameStore=>{
    const {values,blockHighlight,level,point,highlightPoint,digitBoard,playRound,playHistorys} = state;
    switch(action.type){
        case actions.UPDATE_SUDOKU: // when click fresh button, generate sudoku and update 9x9 matrix in store
            const [generate,result]=generateSudoku(level);
            return {...state,values:generate};
        case actions.BLOCK_HIGHLIGHT:   // calculate highlight matrix
            return {...state,blockHighlight:calculateHighlight(values,action.value)};
        case actions.CLEAR_BLOCK_HIGHLIGHT:
            const clear=zero9x9.map(x=>Object.assign({},x));
            return {...state,blockHighlight:clear};
        case actions.TOGGLE_DIGITBOARD:     // show global digitBoard
            return {...state,digitBoard:!digitBoard};
        case actions.CHOOSE_DIGIT_START:    // just for update point and highlight point mouse is howvering on
            return {...state,point:{x:action.line,y:action.column,value:action.value},};
        case actions.CHOOSE_DIGIT:
            values[action.point.x][action.point.y]=action.point.value;
            return {...state,values:values,point:action.point};
        case actions.PLAY_ROUND_BACKWARD:
            if(playRound==0) return {...state};
            if(playRound>0) values[playHistorys[playRound-1].x][playHistorys[playRound-1].y]=playHistorys[playRound-1].from;
            return {...state,values:values,playRound:playRound-1,playHistorys:playHistorys.slice(0,playRound-1)};
        case actions.PLAY_ROUND_FORWARD:
            playHistorys.push(action.payload);
            return {...state,playRound:playRound+1,playHistorys,blockHighlight:calculateHighlight(values,action.payload.to)};
        default:
            return {...state};
    }
}