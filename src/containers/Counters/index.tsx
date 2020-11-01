import {connect} from 'react-redux';
import {Dispatch} from 'redux';

import {increment,decrement, getserverValue} from '../../actions';
import {Counters} from '../../components/Counters';
import {StoreState} from '../../reducers'

const mapStateToProps=({Counters:{times,serverValue}}:StoreState):{value:number,serverValue:string}=>({
  value:times,
  serverValue
})

const mapDispatchToProps=(dispatch:Dispatch)=>({
    onIncrement:()=>dispatch(increment()),
    onDecrement:()=>dispatch(decrement()),
    ongetserverValue:(payload:string)=>dispatch(getserverValue(payload))
})

type StateProps=ReturnType<typeof mapStateToProps>;
type DispatchProps=ReturnType<typeof mapDispatchToProps>;

export type Props=StateProps & DispatchProps;

export default connect(mapStateToProps,mapDispatchToProps)(Counters);