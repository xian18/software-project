import {conflictValue} from '../types';

/**
 * 检测数独盘中的冲突
 * 
 * @param values 数独盘 9x9 matrix
 * 
 * @returns conflict:是否冲突 true-冲突,false-不冲突
 *          complete:是否过关，即数独被正确完成         
 *          conflict:冲突点 数字大小代表第几个数字冲突 数字从1-9,undefined代表此格不与任何格子冲突
 */

export function conflictDetect(values:conflictValue[][]){
    const a:conflictValue=undefined;

    const blockConflict:conflictValue[][]=[
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
        conflict:false,
        complete:false,
        blockConflict,
    }
}

export default conflictDetect;