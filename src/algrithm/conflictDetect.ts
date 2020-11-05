import {sudokuValue} from '../types';

/**
 * 检测数独盘中的冲突
 * 
 * @param values 数独盘 9x9 matrix
 * 
 * @returns result:是否冲突 true-冲突,false-不冲突    conflict:冲突点 数字大小代表第几个数字冲突 数字从1-9
 */

export function conflictDetect(values:sudokuValue[][]){
    const a:sudokuValue=undefined;

    const conflict:sudokuValue[][]=[
        [a,a,a,a,a,a,a,a,a],
        [a,a,a,a,a,a,a,a,a],
        [a,a,a,a,a,a,a,a,a],
        [a,a,a,a,a,a,a,a,a],
        [a,a,a,a,a,a,a,a,a],
        [a,a,a,a,a,a,a,a,a],
        [a,a,a,a,a,a,a,a,a],
        [a,a,a,a,a,a,a,a,a],
        [a,a,a,a,a,a,a,a,a],
    ];

    return {
        result:false,
        complete:false,
        conflict,
    }
}

export default conflictDetect;