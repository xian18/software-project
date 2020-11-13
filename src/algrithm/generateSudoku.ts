import { sudokuValue, Level } from '../types';

/**
 * 生成数独
 *
 * @param level 表示难度,取值0,1,2,3; 0-随机, 1-3难度递增
 *
 * @returns tuple [generate,answer] generate:元组的第一个元素,9x9 matrix   answer:元组的第二个元素, 9x9 matrix
 */

export const generateSudoku = (level: Level): sudokuValue[][][] => {
    /*algrithm for generating soduku here*/
    const a = undefined;

    return [
        [
            [a, a, a, a, a, a, a, a, a],
            [a, a, a, a, a, a, a, a, a],
            [a, a, a, a, a, a, 2, a, a],
            [a, a, a, a, a, a, a, a, a],
            [a, a, a, a, a, a, a, a, a],
            [a, a, a, a, a, a, 4, a, a],
            [a, a, a, a, a, a, a, a, a],
            [a, a, a, a, 1, a, a, a, a],
            [a, 8, a, 9, a, a, a, a, a],
        ],
        [
            [a, a, a, a, a, a, a, a, a],
            [a, a, a, a, a, a, a, a, a],
            [a, a, a, a, a, a, a, a, a],
            [a, a, a, a, a, a, a, a, a],
            [a, a, a, a, a, a, a, a, a],
            [a, a, a, a, a, a, a, a, a],
            [a, a, a, a, a, a, a, a, a],
            [a, a, a, a, a, a, a, a, a],
            [a, a, a, a, a, a, a, a, a],
        ],
    ];
};

export default generateSudoku;
