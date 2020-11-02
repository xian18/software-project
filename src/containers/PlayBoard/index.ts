import {connect} from 'react-redux';
import {Dispatch} from 'redux';

import {chooseDigitAction,chooseDigitStartAction, updateSudokuAction} from '../../actions';
import {Point} from '../../types';
import {StoreState} from '../../reducers';

import PlayBoard from '../../components/PlayBoard';

const mapStateToProps=({Game:{values}}:StoreState):{values:number[][]}=>({
    values
})

const mapDispatchToProps=(dispatch:Dispatch)=>({
    onChooseDigitStart:(line:number,column:number)=>dispatch(chooseDigitStartAction(line,column)),
    onUpdateSudoku:()=>dispatch(updateSudokuAction()),
})

type StateProps=ReturnType<typeof mapStateToProps>;
type DispatchProps=ReturnType<typeof mapDispatchToProps>;

export type Props=StateProps & DispatchProps;

export default connect(mapStateToProps,mapDispatchToProps)(PlayBoard);