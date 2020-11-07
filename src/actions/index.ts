import {Point, sudokuValue,PlayHistory} from '../types';
import createActionFunc from './utils';

/** 让counter数字加一*/
export const INCREMENT="INCREMENT";
export type INCREMENT=typeof INCREMENT;
export interface Increment {
    type:INCREMENT;
}
export const incrementAction=createActionFunc(INCREMENT);

/** 让counter数字减一*/
export const DECREMENT="DECREMENT";
export type DECREMENT=typeof DECREMENT;
export interface Decrement {
    type:DECREMENT;
}
export const decrementAction=createActionFunc(DECREMENT);

/** get serverValue action start, gonna be handled by epic*/
export const GET_SERVERVALUE='GET_SERVERVALUE';
export type GET_SERVERVALUE=typeof GET_SERVERVALUE;
export interface GetserverValue {
    type:GET_SERVERVALUE;
    payload:string;
}
export const getserverValueAction=createActionFunc(GET_SERVERVALUE,'payload');

/** get serverValue action fullfilled, gonna be handled by counters's reducer*/
export const SERVERVALUE_FULFILLED='SERVERVALUE_FULFILLED';
export type SERVERVALUE_FULFILLED=typeof SERVERVALUE_FULFILLED;
export interface ServerValueFulfilled {
    type:SERVERVALUE_FULFILLED;
    key:string;
    message:string;
}
export const serverValueFulfilled=createActionFunc(SERVERVALUE_FULFILLED,'key','value');


/** 展示DigitBoard*/
export const CHOOSE_DIGIT_START='CHOOSE_ACTION_START';
export type CHOOSE_DIGIT_START=typeof CHOOSE_DIGIT_START;
export interface ChooseDigitStartAction {
    type:CHOOSE_DIGIT_START;
    point:Point;
}
export const chooseDigitStartAction=createActionFunc(CHOOSE_DIGIT_START,'point');

/** DigitBoard click a number, the clicked number will update number in block*/
export const CHOOSE_DIGIT='CHOOSE_ACTION';
export type CHOOSE_DIGIT=typeof CHOOSE_DIGIT;
export interface ChooseDigitAction {
    type:CHOOSE_DIGIT;
    point:Point;
}
export const chooseDigitAction=createActionFunc(CHOOSE_DIGIT,'point');

/** 调用generateSudoku函数，生成新的数独9x9 matrix,放入store中*/
export const UPDATE_SUDOKU='UPDATE_SUDOKU';
export type UPDATE_SUDOKU=typeof UPDATE_SUDOKU;
export interface UpdateSudokuAction {
    type:UPDATE_SUDOKU;
}
export const updateSudokuAction=createActionFunc(UPDATE_SUDOKU);

/** 根据value计算新的blockHighlight矩阵*/
export const BLOCK_HIGHLIGHT='BLOCK_HIGHLIGHT';
export type BLOCK_HIGHLIGHT=typeof BLOCK_HIGHLIGHT;
export interface BlockHighlightAction {
    type:BLOCK_HIGHLIGHT;
    value:sudokuValue;
}
export const blockHighlightAction=createActionFunc(BLOCK_HIGHLIGHT,'value');

/** 将blockHighlight矩阵全部置0，没有任何一个块需要高亮*/
export const CLEAR_BLOCK_HIGHLIGHT='CLEAR_BLOCK_HIGHLIGHT';
export type CLEAR_BLOCK_HIGHLIGHT=typeof CLEAR_BLOCK_HIGHLIGHT;
export interface ClearBlockHighlightAction {
    type:CLEAR_BLOCK_HIGHLIGHT;
}
export const clearBlockHighlightAction=createActionFunc(CLEAR_BLOCK_HIGHLIGHT);

/** toggle global digitBoard on and off*/
export const TOGGLE_DIGITBOARD='TOGGLE_DIGITBOARD';
export type TOGGLE_DIGITBOARD=typeof TOGGLE_DIGITBOARD;
export interface ToggleDigitBoardAction {
    type:TOGGLE_DIGITBOARD;
}
export const toggleDigitBoardAction=createActionFunc(TOGGLE_DIGITBOARD);

/** play round go ahrad*/
export const PLAY_ROUND_FORWARD='PLAY_ROUND_FORWARD';
export type PLAY_ROUND_FORWARD=typeof PLAY_ROUND_FORWARD;
export interface PlayRoundForwardAction {
    type:PLAY_ROUND_FORWARD;
    payload:PlayHistory;
}
export const playRoundForwardAction=createActionFunc(PLAY_ROUND_FORWARD,'payload');

/** play round go back*/
export const PLAY_ROUND_BACKWARD='PLAY_ROUND_BACKWARD';
export type PLAY_ROUND_BACKWARD=typeof PLAY_ROUND_BACKWARD;
export interface PlayRoundBackwardAction {
    type:PLAY_ROUND_BACKWARD;
}
export const playRoundBackwardAction=createActionFunc(PLAY_ROUND_BACKWARD);

/** 设置placeValue值*/
export const SET_PLACE_VALUE='SET_PLACE_VALUE';
export type SET_PLACE_VALUE=typeof SET_PLACE_VALUE;
export interface SetPlaceValueAction {
    type:SET_PLACE_VALUE;
    value:sudokuValue;
}
export const setPlaceValueAction=createActionFunc(SET_PLACE_VALUE,'value');

/** 清空placeValue值，设置为undefined*/
export const CLEAR_PLACE_VALUE='CLEAR_PLACE_VALUE';
export type CLEAR_PLACE_VALUE=typeof CLEAR_PLACE_VALUE;
export interface ClearPlaceValueAction {
    type:CLEAR_PLACE_VALUE;
    value:sudokuValue;
}
export const clearPlaceValueAction=createActionFunc(CLEAR_PLACE_VALUE,'value');

/** 如果需要显示哪些是初始数据不需要改变，showUnchangeable=true,否则为false*/
export const TOGGLE_SHOW_UNCHANGEABLE='TOGGLE_SHOW_UNCHANGEABLE';
export type TOGGLE_SHOW_UNCHANGEABLE=typeof TOGGLE_SHOW_UNCHANGEABLE;
export interface ToggleShowUnchangeableAction {
    type:TOGGLE_SHOW_UNCHANGEABLE
}
export const toggleShowUnchangeableAction=createActionFunc(TOGGLE_SHOW_UNCHANGEABLE);

/** 如果需要显示哪些是冲突数字，showConflict=true,否则为false*/
export const TOGGLE_SHOW_CONFLICT='TOGGLE_SHOW_CONFLICT';
export type TOGGLE_SHOW_CONFLICT=typeof TOGGLE_SHOW_CONFLICT;
export interface ToggleShowConflictAction {
    type:TOGGLE_SHOW_CONFLICT
}
export const toggleShowConflictAction=createActionFunc(TOGGLE_SHOW_CONFLICT);