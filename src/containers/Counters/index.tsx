import {connect} from 'react-redux';
import {Dispatch} from 'redux';

import {increment,decrement} from '../../actions';
import {Counters} from '../../components/Counters';
import {StoreState} from '../../reducers'

const mapStateToProps=({Counters:{times}}:StoreState):{value:number}=>({
  value:times,  
})

const mapDispatchToProps=(dispatch:Dispatch)=>({
    onIncrement:()=>dispatch(increment()),
    onDecrement:()=>dispatch(decrement())
})

export default connect(mapStateToProps,mapDispatchToProps)(Counters);