import * as actions from '../actions';
import {Message} from '../types';

type ActionType=
    | actions.SendMessage

export interface ChatStore {
    messages:Message[];
}

const init:ChatStore={
    messages:[],

}

export default (state=init,action:ActionType):ChatStore=>{
    const {
        messages
    }=state;

    switch(action.type){
        case actions.SEND_MESSAGE:
            
            return {...state};
        default:
            return {...state};
    }
}