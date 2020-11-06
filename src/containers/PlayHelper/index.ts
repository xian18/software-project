import {connect, MapStateToProps} from 'react-redux';
import {Dispatch,bindActionCreators} from 'redux';

import {blockHighlightAction,
        setPlaceValueAction,
        clearPlaceValueAction,
        chooseDigitAction,
        toggleShowUnchangeableAction,
        updateSudokuAction,
        playRoundBackwardAction,
      } from '../../actions';
import {StoreState} from '../../reducers';

import PlayHelper from '../../components/PlayHelper';
import { sudokuValue } from '../../types';

const mapStateToProps=({Game:{placeValue}}:StoreState):{placeValue:sudokuValue}=>({
  placeValue
})

const mapDispatchToProps=(dispatch:Dispatch)=>
  bindActionCreators({
    blockHighlightAction,
    setPlaceValueAction,
    clearPlaceValueAction,
    chooseDigitAction,
    toggleShowUnchangeableAction,
    updateSudokuAction,
    playRoundBackwardAction,
  },dispatch)

type StateProps=ReturnType<typeof mapStateToProps>;
type DispatchProps=ReturnType<typeof mapDispatchToProps>
export type Props=StateProps & DispatchProps;

export default connect(mapStateToProps,mapDispatchToProps)(PlayHelper);
