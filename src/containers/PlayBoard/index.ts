import {connect} from 'react-redux';
import {Dispatch,bindActionCreators} from 'redux';

import {chooseDigitStartAction,
        updateSudokuAction,
        clearBlockHighlightAction,
        toggleDigitBoardAction,
        blockHighlightAction,
        playRoundForwardAction,
        playRoundBackwardAction,
    } from '../../actions';
import {PlayHistory, Point,sudokuValue} from '../../types';
import {StoreState} from '../../reducers';
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

const mapDispatchToProps=(dispatch:Dispatch)=>
    bindActionCreators({
        chooseDigitStartAction,
        updateSudokuAction,
        toggleDigitBoardAction,
        blockHighlightAction,
        clearBlockHighlightAction,
        playRoundForwardAction,
        playRoundBackwardAction,
    },dispatch);

type StateProps=ReturnType<typeof mapStateToProps>;
type DispatchProps=ReturnType<typeof mapDispatchToProps>;

export type Props=StateProps & DispatchProps;

export default connect(mapStateToProps,mapDispatchToProps)(PlayBoard);