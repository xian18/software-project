import {sudokuValue,Level} from '../types'

/**
 * 生成数独
 * 
 * @param level 表示难度,取值0,1,2,3; 0-随机, 1-3难度递增
 * 
 * @returns 9x9 matrix represents values in board，如果待填空的数字是空，返回undefined
 */

export const generateSudoku=(level:Level):sudokuValue[][][]=>{
    /*algrithm for generating soduku here*/
    const a=1;

    return [[
        [a,a,a,a,a,a,a,a,a],
        [a,a,a,a,a,a,a,a,a],
        [a,a,a,a,a,a,a,a,a],
        [a,a,a,a,a,a,a,a,a],
        [a,a,a,a,a,a,a,a,a],
        [a,a,a,a,a,a,a,a,a],
        [a,a,a,a,a,a,a,a,a],
        [a,a,a,a,a,a,a,a,a],
        [a,a,a,a,a,a,a,a,a],
    ],[
        [a,a,a,a,a,a,a,a,a],
        [a,a,a,a,a,a,a,a,a],
        [a,a,a,a,a,a,a,a,a],
        [a,a,a,a,a,a,a,a,a],
        [a,a,a,a,a,a,a,a,a],
        [a,a,a,a,a,a,a,a,a],
        [a,a,a,a,a,a,a,a,a],
        [a,a,a,a,a,a,a,a,a],
        [a,a,a,a,a,a,a,a,a],
    ]]
}

export default generateSudoku;