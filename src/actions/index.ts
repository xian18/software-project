import {Point, sudokuValue,PlayHistory} from '../types';

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


/*launch digitBoard when want to choose a number*/
export const CHOOSE_DIGIT_START='CHOOSE_ACTION_START';
export type CHOOSE_DIGIT_START=typeof CHOOSE_DIGIT_START;
export interface ChooseDigitStartAction {
    type:CHOOSE_DIGIT_START;
    line:number;
    column:number;
    value:sudokuValue;
}
export const chooseDigitStartAction=(line:number,column:number,value:sudokuValue):ChooseDigitStartAction=>{
    return {
        type:CHOOSE_DIGIT_START,
        line,
        column,
        value,
    }
}

/*DigitBoard click a number, the clicked number will update number in block*/
export const CHOOSE_DIGIT='CHOOSE_ACTION';
export type CHOOSE_DIGIT=typeof CHOOSE_DIGIT;
export interface ChooseDigitAction {
    type:CHOOSE_DIGIT;
    point:Point;
}
export const chooseDigitAction=(point:Point):ChooseDigitAction=>{
    return {
        type:CHOOSE_DIGIT,
        point,
    }
}

/*fresh sudoku 2-dimension array*/
export const UPDATE_SUDOKU='UPDATE_SUDOKU';
export type UPDATE_SUDOKU=typeof UPDATE_SUDOKU;
export interface UpdateSudokuAction {
    type:UPDATE_SUDOKU;
}
export const updateSudokuAction=():UpdateSudokuAction=>{
    return {
        type:UPDATE_SUDOKU,
    }
}

/*highlight block of the same number*/
export const BLOCK_HIGHLIGHT='BLOCK_HIGHLIGHT';
export type BLOCK_HIGHLIGHT=typeof BLOCK_HIGHLIGHT;
export interface BlockHighlightAction {
    type:BLOCK_HIGHLIGHT;
    value:sudokuValue;
}
export const blockHighlightAction=(value:sudokuValue):BlockHighlightAction=>{
    return {
        type:BLOCK_HIGHLIGHT,
        value,
    }
}

/*clear all highlight block*/
export const CLEAR_BLOCK_HIGHLIGHT='CLEAR_BLOCK_HIGHLIGHT';
export type CLEAR_BLOCK_HIGHLIGHT=typeof CLEAR_BLOCK_HIGHLIGHT;
export interface ClearBlockHighlightAction {
    type:CLEAR_BLOCK_HIGHLIGHT;
}
export const clearBlockHighlightAction=():ClearBlockHighlightAction=>{
    return {
        type:CLEAR_BLOCK_HIGHLIGHT,
    }
}

/*toggle global digitBoard on and off*/
export const TOGGLE_DIGITBOARD='TOGGLE_DIGITBOARD';
export type TOGGLE_DIGITBOARD=typeof TOGGLE_DIGITBOARD;
export interface ToggleDigitBoardAction {
    type:TOGGLE_DIGITBOARD;
}
export const toggleDigitBoardAction=():ToggleDigitBoardAction=>{
    return {
        type:TOGGLE_DIGITBOARD,
    }
}

/*play round go ahrad*/
export const PLAY_ROUND_FORWARD='PLAY_ROUND_FORWARD';
export type PLAY_ROUND_FORWARD=typeof PLAY_ROUND_FORWARD;
export interface PlayRoundForwardAction {
    type:PLAY_ROUND_FORWARD;
    payload:PlayHistory;
}
export const playRoundForwardAction=(payload:PlayHistory):PlayRoundForwardAction=>{
    return {
        type:PLAY_ROUND_FORWARD,
        payload
    }
}

/*play round go back*/
export const PLAY_ROUND_BACKWARD='PLAY_ROUND_BACKWARD';
export type PLAY_ROUND_BACKWARD=typeof PLAY_ROUND_BACKWARD;
export interface PlayRoundBackwardAction {
    type:PLAY_ROUND_BACKWARD;
}
export const playRoundBackwardAction=():PlayRoundBackwardAction=>{
    return {
        type:PLAY_ROUND_BACKWARD,
    }
}

