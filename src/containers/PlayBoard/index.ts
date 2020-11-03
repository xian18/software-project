import {connect} from 'react-redux';
import {Dispatch} from 'redux';

import {chooseDigitAction,
        chooseDigitStartAction,
        updateSudokuAction,
        clearBlockHighlightAction,
        toggleDigitBoardAction,
    } from '../../actions';
import {Point} from '../../types';
import {StoreState} from '../../reducers';

import PlayBoard from '../../components/PlayBoard';

const mapStateToProps=({Game:{values,point,digitBoard,blockHighlight}}:StoreState):{values:number[][],point:Point,digitBoard:boolean}=>({
    values,
    point,
    digitBoard,
})

const mapDispatchToProps=(dispatch:Dispatch)=>({
    onChooseDigitStart:(line:number,column:number)=>dispatch(chooseDigitStartAction(line,column)),
    onUpdateSudoku:()=>dispatch(updateSudokuAction()),
    onClearBlockHighlight:()=>dispatch(clearBlockHighlightAction()),
    onToggleDigitBoard:()=>dispatch(toggleDigitBoardAction()),
})

type StateProps=ReturnType<typeof mapStateToProps>;
type DispatchProps=ReturnType<typeof mapDispatchToProps>;

export type Props=StateProps & DispatchProps;

export default connect(mapStateToProps,mapDispatchToProps)(PlayBoard);