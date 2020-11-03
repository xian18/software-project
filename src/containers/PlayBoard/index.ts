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
import {Point} from '../../types';
import {StoreState} from '../../reducers';

import PlayBoard from '../../components/PlayBoard';

const mapStateToProps=({Game:{values,point,digitBoard,blockHighlight,playRoundCurrent}}:StoreState):
    {
        values:number[][],
        point:Point,
        digitBoard:boolean,
        blockHighlight:number[][],
        playRoundCurrent:number,
    }=>({
    values,
    point,
    digitBoard,
    blockHighlight,
    playRoundCurrent,
})

const mapDispatchToProps=(dispatch:Dispatch)=>({
    onChooseDigitStart:(line:number,column:number)=>dispatch(chooseDigitStartAction(line,column)),
    onUpdateSudoku:()=>dispatch(updateSudokuAction()),
    onClearBlockHighlight:()=>dispatch(clearBlockHighlightAction()),
    onToggleDigitBoard:()=>dispatch(toggleDigitBoardAction()),
    onBlockHighlight:(value:number)=>dispatch(blockHighlightAction(value)),
    onPlayRoundForward:()=>dispatch(playRoundForwardAction()),
    onPlayRoundBackward:()=>dispatch(playRoundBackwardAction()),
})

type StateProps=ReturnType<typeof mapStateToProps>;
type DispatchProps=ReturnType<typeof mapDispatchToProps>;

export type Props=StateProps & DispatchProps;

export default connect(mapStateToProps,mapDispatchToProps)(PlayBoard);