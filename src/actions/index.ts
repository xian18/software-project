/* counter increase action*/
export const INCREMENT="INCREMENT";
export type INCREMENT=typeof INCREMENT;
export interface Increment {
    type:INCREMENT;
}
export const increment=():Increment=>{
    return {
        type:INCREMENT,
    }
}

/* counter decrease action*/
export const DECREMENT="DECREMENT";
export type DECREMENT=typeof DECREMENT;
export interface Decrement {
    type:DECREMENT;
}
export const decrement=():Decrement=>{
    return {
        type:DECREMENT,
    }
}

/* get serverValue action start, gonna be handled by epic*/
export const GET_SERVERVALUE='GET_SERVERVALUE';
export type GET_SERVERVALUE=typeof GET_SERVERVALUE;
export interface GetserverValue {
    type:GET_SERVERVALUE;
    payload:string;
}
export const getserverValue=(payload:string):GetserverValue=>{
    return {
        type:GET_SERVERVALUE,
        payload:payload,
    }
}

/*get serverValue action fullfilled, gonna be handled by counters's reducer*/
export const SERVERVALUE_FULFILLED='SERVERVALUE_FULFILLED';
export type SERVERVALUE_FULFILLED=typeof SERVERVALUE_FULFILLED;
export interface ServerValueFulfilled {
    type:SERVERVALUE_FULFILLED;
    key:string;
    message:string;
}
export const serverValueFulfilled=(key:string,message:string):ServerValueFulfilled=>{
    return {
        type:SERVERVALUE_FULFILLED,
        key,message
    }
}