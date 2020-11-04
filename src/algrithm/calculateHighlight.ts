import {sudokuValue} from '../types';

/**
 * calculateHighlight
 * 
 * @param blockHighlight original 9x9 matrix
 * @param values current 9x9 board value matrix
 * @param value value given to check dulplicate
 * 
 * @returns blockHighlight matrix
 */
export function calculateHighlight(blockHighlight:number[][],values:sudokuValue[][],value:sudokuValue){
    for(var m:number=0;m<9;m++)
        for(var n:number=0;n<9;n++)
            if(value!=undefined && value==values[m][n]) blockHighlight[m][n]=1;
            else blockHighlight[m][n]=0;
    return blockHighlight;
}