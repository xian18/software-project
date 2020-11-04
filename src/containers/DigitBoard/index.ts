import {connect, MapStateToProps} from 'react-redux';
import {Dispatch,bindActionCreators} from 'redux';

import {chooseDigitAction,
        blockHighlightAction,
        playRoundForwardAction,  
      } from '../../actions';
import {Point, sudokuValue,PlayHistory} from '../../types';
import {StoreState} from '../../reducers';

import DigitBoard from '../../components/DigitBoard';

const mapStateToProps=({Game:{point}}:StoreState):{point:Point}=>({
    point,
  })

const mapDispatchToProps=(dispatch:Dispatch)=>
  bindActionCreators({
    chooseDigitAction,
    blockHighlightAction,
    playRoundForwardAction,
  },dispatch)

type StateProps=ReturnType<typeof mapStateToProps>;
type DispatchProps=ReturnType<typeof mapDispatchToProps>
export type Props=StateProps & DispatchProps;

export default connect(mapStateToProps,mapDispatchToProps)(DigitBoard);
