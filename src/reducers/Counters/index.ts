import {MODIFYAction} from '../../actions'
import {INCREMENT,DECREMENT} from '../../constants'

export interface CountersStore{
    times:number;
}

const init:CountersStore={
    times:0,
}

export default (state=init,action:MODIFYAction):CountersStore=>{
    const {times}=state;
    switch(action.type){
        case INCREMENT:
            return {times:state.times+1};
        case DECREMENT:
            return {times:state.times-1};
        default:
            return {times:state.times};
    }
}