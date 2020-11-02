
import {connect} from 'react-redux';
import {Dispatch} from 'redux';

import {updateSudokuAction} from '../../actions';
import {StoreState} from '../../reducers';

import AppBar from '../../components/AppBar';

const mapDispatchToProps=(dispatch:Dispatch)=>({
    onUpdateSudoku:()=>dispatch(updateSudokuAction()),
})

type DispatchProps=ReturnType<typeof mapDispatchToProps>;

export type Props=DispatchProps;

export default connect(null,mapDispatchToProps)(AppBar);