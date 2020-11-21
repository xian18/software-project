import { sudokuValue } from '../types';

/**
 * 等待完成
 * @param value 棋盘数据
 * @param x 判断位置的横坐标（从0-8）
 * @param y 判断位置的纵坐标（从0-8）
 *
 * @returns 棋盘中当前位置能填入什么
 */
export function optionNumber(value: sudokuValue[][], x: number, y: number): sudokuValue[] {
    return [1, 2, 3, 4, 5,6,7,8,9];
    
}

export default optionNumber;
