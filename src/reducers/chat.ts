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

const insert = (item: Message, arr: Message[]) => {
    const length = arr.length;
    if (length === 0) {
        return [item];
    }
    for (let i = length - 1; i >= 0; i--) {
        if (arr[i].time > item.time) {
            arr[i + 1] = arr[i];
        } else {
            arr[i + 1] = item;
            break;
        }
    }
    return arr.slice(-100); // just have the last n messages
};

export default (state=init,action:ActionType):ChatStore=>{
    switch(action.type){
        case actions.SEND_MESSAGE:
            const messages=insert(action.message,[...state.messages]);
            return {...state,messages};
        default:
            return {...state};
    }
}