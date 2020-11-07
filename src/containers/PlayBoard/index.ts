import {connect} from 'react-redux';
import {Dispatch,bindActionCreators} from 'redux';

import {chooseDigitStartAction,
        updateSudokuAction,
        clearBlockHighlightAction,
        toggleDigitBoardAction,
        blockHighlightAction,
        playRoundForwardAction,
        playRoundBackwardAction,
        chooseDigitAction,
    } from '../../actions';
import {Point,sudokuValue,conflictValue} from '../../types';
import {StoreState} from '../../reducers';
import PlayBoard from '../../components/PlayBoard';

const mapStateToProps=({
    Game:{values,
        initValues,
        point,
        digitBoard,
        blockHighlight,
        playRound,
        placeValue,
        showUnchangeable,
        conflictValues,
        showConflict,
        complete,
    }}:StoreState):
    {
        values:sudokuValue[][],
        initValues:sudokuValue[][],
        point:Point,
        digitBoard:boolean,
        blockHighlight:number[][],
        playRound:number,
        placeValue:sudokuValue,
        showUnchangeable:boolean,
        conflictValues:conflictValue[][],
        showConflict:boolean,
        complete:boolean,
    }=>({
    values,
    initValues,
    point,
    digitBoard,
    blockHighlight,
    playRound,
    placeValue,
    showUnchangeable,
    conflictValues,
    showConflict,
    complete,
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
        chooseDigitAction,
    },dispatch);

type StateProps=ReturnType<typeof mapStateToProps>;
type DispatchProps=ReturnType<typeof mapDispatchToProps>;

export type Props=StateProps & DispatchProps;

export default connect(mapStateToProps,mapDispatchToProps)(PlayBoard);