import {INCREMENT,DECREMENT} from '../constants'

export type MODIFYAction=INCREMENTAction|DECREMENTAction;

export interface INCREMENTAction {
    type:INCREMENT;
}

export const increment=():INCREMENTAction=>{
    return {
        type:INCREMENT,
    }
}

export interface DECREMENTAction {
    type:DECREMENT;
}

export const decrement=():DECREMENTAction=>{
    return {
        type:DECREMENT,
    }
}