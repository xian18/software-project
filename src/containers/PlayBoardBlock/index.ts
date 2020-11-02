import {connect} from 'react-redux';
import {Dispatch} from 'redux';

import {blockHighlightAction, chooseDigitStartAction} from '../../actions';
import {StoreState} from '../../reducers';

import PlayBoardBlock from '../../components/PlayBoardBlock';

const mapStateToProps=({Game:{values,point,blockHighlight}}:StoreState):{}=>({
})

const mapDispatchToProps=(dispatch:Dispatch)=>({
    onChooseDigitStart:(line:number,column:number)=>dispatch(chooseDigitStartAction(line,column)),  /*set the block x,y in store*/
    onBlockHighlight:()=>dispatch(blockHighlightAction()),
})

type StateProps=ReturnType<typeof mapStateToProps>;
type DispatchProps=ReturnType<typeof mapDispatchToProps>;

export type Props=StateProps & DispatchProps;

export default connect(mapStateToProps,mapDispatchToProps)(PlayBoardBlock);