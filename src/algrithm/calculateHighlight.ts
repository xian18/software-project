import {sudokuValue} from '../types';

export function calculateHighlight(blockHighlight:number[][],values:sudokuValue[][],value:sudokuValue){
    for(var m:number=0;m<9;m++)
        for(var n:number=0;n<9;n++)
            if(value!=undefined && value==values[m][n]) blockHighlight[m][n]=1;
            else blockHighlight[m][n]=0;
    return blockHighlight;
}