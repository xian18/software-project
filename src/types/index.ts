
import * as React from 'react'

export type sudokuValue=undefined | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export interface Point {
    x:number;
    y:number;
    value:sudokuValue;
}

export interface PlayHistory {
    x:number;
    y:number;
    from:sudokuValue;
    to:sudokuValue;
}