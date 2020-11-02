import {connect} from 'react-redux';
import {Dispatch} from 'redux';

import {chooseDigitAction} from '../../actions';
import {Point} from '../../types';
import {StoreState} from '../../reducers';

import DigitBoard from '../../components/DigitBoard';

const mapStateToProps=({Game:{point}}:StoreState):{point:Point}=>({
    point,
  })

const mapDispatchToProps=(dispatch:Dispatch)=>({
    onChooseDigit:(point:Point)=>dispatch(chooseDigitAction(point)),
})

export default connect(mapStateToProps,mapDispatchToProps)(DigitBoard);
