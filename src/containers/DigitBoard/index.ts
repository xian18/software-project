import {connect} from 'react-redux';
import {Dispatch} from 'redux';

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

const mapDispatchToProps=(dispatch:Dispatch)=>({
    onChooseDigit:(point:Point)=>dispatch(chooseDigitAction(point)),
    onBlockHighlight:(value:sudokuValue)=>dispatch(blockHighlightAction(value)),
    onPlayRoundForward:(payload:PlayHistory)=>dispatch(playRoundForwardAction(payload)),
})

export default connect(mapStateToProps,mapDispatchToProps)(DigitBoard);
