import * as React from 'react';

export type sudokuValue = undefined | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9; /** undefined-格子为空，1-9代表格子值为1-9*/
/** undefined-此格不与任何格冲突 1-9代表此格是1-9数字的冲突*/
export type conflictValue = undefined | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export type PlaceValue = -1 | undefined | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export type Level = 0 | 1 | 2 | 3;

export interface Point {
    x: number;
    y: number;
    value: sudokuValue;
}

export interface PlayHistory {
    x: number;
    y: number;
    from: sudokuValue;
    to: sudokuValue;
}
