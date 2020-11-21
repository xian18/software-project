import { conflictValue } from '../types';

/**
 * 检测数独盘中的冲突
 *
 * @param values 数独盘 9x9 matrix
 *
 * @returns conflict:是否冲突 true-冲突,false-不冲突
 *          complete:是否过关，即数独被正确完成
 *          conflict:冲突点 数字大小代表第几个数字冲突 数字从1-9,null代表此格不与任何格子冲突
 */

const a: conflictValue = null;
let conflictValues: conflictValue[][] = [
    [a, a, a, a, a, a, a, a, a],
    [a, a, a, a, a, a, a, a, a],
    [a, a, a, a, a, a, a, a, a],
    [a, a, a, a, a, a, a, a, a],
    [a, a, a, a, a, a, a, a, a],
    [a, a, a, a, a, a, a, a, a],
    [a, a, a, a, a, a, a, a, a],
    [a, a, a, a, a, a, a, a, a],
    [a, a, a, a, a, a, a, a, a],
];
let conflict: boolean = false;
let complete: boolean = false;
export function conflictDetect(values: conflictValue[][]) {
    conflict = false;
    complete = false;
    isConflict(values);
    isSuccess(values);
    return {
        conflict,
        complete,
        conflictValues,
    };
}

function isConflict(values: conflictValue[][]) {
    let row: number, column: number, num: number, innernum: number;
    //按照行遍历是否冲突
    for (row = 0; row < 9; row++) {
        for (column = 0; column < 9; column++) {
            for (num = column + 1; num < 9; num++) {
                if (values[row][column] == values[row][num]) {
                    conflictValues[row][column] = values[row][column];
                    conflictValues[row][num] = values[row][num];
                    console.log(row, column, num);
                    conflict = true;
                }
            }
        }
    }
    for (column = 0; column < 9; column++) {
        for (row = 0; row < 9; row++) {
            for (num = row + 1; num < 9; num++) {
                if (values[row][column] == values[num][column]) {
                    conflictValues[row][column] = values[row][column];
                    conflictValues[num][column] = values[num][column];
                    conflict = true;
                }
            }
        }
    }
    // for (num = 0; num < 9; num++) {
    //     for (row = Math.floor(num / 3); row < Math.floor(num / 3) + 3; row++) {
    //         for (column = num % 3; column < num % 3 + 3; column++) {
    //             for (innernum = 0; innernum < 9; innernum++) {
    //                 if (values[row][column] = values[Math.floor(num / 3) + Math.floor(innernum / 3)][(num % 3) * 3 + (innernum % 3)]) {
    //                     conflictValues[row][column] = values[row][column];
    //                     conflictValues[Math.floor(num / 3) + Math.floor(innernum / 3)][(num % 3) * 3 + (innernum % 3)] = values[row][column]
    //                     conflict = true;
    //                 }
    //             }
    //         }
    //     }
    // }
}

function isSuccess(values: conflictValue[][]): boolean {
    let row: number, column: number;
    if (conflict)
        complete = false;
    else {
        for (row = 0; row < 9; row++) {
            for (column = 0; column < 9; column++) {
                if (values[row][column] == a)
                    complete = false;
            }
        }
    }
    return complete;
}

export default conflictDetect;
