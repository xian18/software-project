import {connect} from 'react-redux';
import {Dispatch} from 'redux';

import {chooseDigitStartAction,
        updateSudokuAction,
        clearBlockHighlightAction,
        toggleDigitBoardAction,
        blockHighlightAction,
        playRoundForwardAction,
        playRoundBackwardAction,
    } from '../../actions';
import {PlayHistory, Point} from '../../types';
import {StoreState} from '../../reducers';

import {sudokuValue} from '../../types';
import PlayBoard from '../../components/PlayBoard';

const mapStateToProps=({Game:{values,point,digitBoard,blockHighlight,playRound}}:StoreState):
    {
        values:sudokuValue[][],
        point:Point,
        digitBoard:boolean,
        blockHighlight:number[][],
        playRound:number,
    }=>({
    values,
    point,
    digitBoard,
    blockHighlight,
    playRound,
})

const mapDispatchToProps=(dispatch:Dispatch)=>({
    onChooseDigitStart:(line:number,column:number,value:sudokuValue)=>dispatch(chooseDigitStartAction(line,column,value)),
    onUpdateSudoku:()=>dispatch(updateSudokuAction()),
    onClearBlockHighlight:()=>dispatch(clearBlockHighlightAction()),
    onToggleDigitBoard:()=>dispatch(toggleDigitBoardAction()),
    onBlockHighlight:(value:sudokuValue)=>dispatch(blockHighlightAction(value)),
    onPlayRoundForward:(payload:PlayHistory)=>dispatch(playRoundForwardAction(payload)),
    onPlayRoundBackward:()=>dispatch(playRoundBackwardAction()),
})

type StateProps=ReturnType<typeof mapStateToProps>;
type DispatchProps=ReturnType<typeof mapDispatchToProps>;

export type Props=StateProps & DispatchProps;

export default connect(mapStateToProps,mapDispatchToProps)(PlayBoard);