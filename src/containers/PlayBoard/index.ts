import {connect} from 'react-redux';
import {Dispatch} from 'redux';

import {chooseDigitAction,
        chooseDigitStartAction,
        updateSudokuAction,
        clearBlockHighlightAction
    } from '../../actions';
import {Point} from '../../types';
import {StoreState} from '../../reducers';

import PlayBoard from '../../components/PlayBoard';

const mapStateToProps=({Game:{values,point,blockHighlight}}:StoreState):{values:number[][],point:Point,blockHighlight:number[][]}=>({
    values,
    point,
    blockHighlight,
})

const mapDispatchToProps=(dispatch:Dispatch)=>({
    onChooseDigitStart:(line:number,column:number)=>dispatch(chooseDigitStartAction(line,column)),
    onUpdateSudoku:()=>dispatch(updateSudokuAction()),
    onClearBlockHighlight:()=>dispatch(clearBlockHighlightAction()),
})

type StateProps=ReturnType<typeof mapStateToProps>;
type DispatchProps=ReturnType<typeof mapDispatchToProps>;

export type Props=StateProps & DispatchProps;

export default connect(mapStateToProps,mapDispatchToProps)(PlayBoard);