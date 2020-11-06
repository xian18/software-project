import {connect, MapStateToProps} from 'react-redux';
import {Dispatch,bindActionCreators} from 'redux';

import {blockHighlightAction} from '../../actions';
import {StoreState} from '../../reducers';

import PlayHelper from '../../components/PlayHelper';

const mapStateToProps=({Game:{}}:StoreState):{}=>({
  })

const mapDispatchToProps=(dispatch:Dispatch)=>
  bindActionCreators({
    blockHighlightAction,
  },dispatch)

type StateProps=ReturnType<typeof mapStateToProps>;
type DispatchProps=ReturnType<typeof mapDispatchToProps>
export type Props=StateProps & DispatchProps;

export default connect(null,mapDispatchToProps)(PlayHelper);
