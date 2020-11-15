import React, { FC, memo, useMemo, useContext, useCallback, useEffect,useState } from 'react';
import {Grid } from '@material-ui/core';

import useStyles from '../../styles/playBoard';

import { sudokuValue,Point } from '../../types';
import { Props } from '../../containers/PlayBoard';
import NumberBlock from './NumberBlock';
import { ThemeContext } from '../../styles/withRoot';
import {digitsKeyMap,createDigitsHandlers} from '../../consts/hotKeys';
import { create } from 'domain';
import { HotKeys } from 'react-hotkeys';

const PlayBoard: FC<Props> = memo(
    ({
        values,
        initValues,
        digitBoard,
        point,
        blockHighlight,
        playRound,
        placeValue,
        showUnchangeable,
        conflictValues,
        showConflict,
        complete,
        showOptionNumber,
        toggleDigitBoardAction,
        clearBlockHighlightAction,
        chooseDigitStartAction,
        chooseDigitAction,
        playRoundForwardAction,
        blockHighlightAction,
        toggleShowOptionNumberAction,
        chooseDigitHotKeysAction,
    }) => {
        //console.log("in component",point);
        const classes = useStyles();
        const { darkMode } = useContext(ThemeContext);

        const handleChooseDigitHotKeys=(value: sudokuValue) => {
            chooseDigitHotKeysAction(value);
        };

        let handlers=createDigitsHandlers(handleChooseDigitHotKeys);

        /**
         * 如果不是不可变的数字，当placeValue == null，点击不会对block中数字进行影响，点击应当拉起DigitBoard
         * 如果数字是1-9，对对应block数字设置为1-9
         * 如果数字是-1，代表清空block为空
         */
        const handleBlockClick = (line: number, column: number, value: sudokuValue) => {
            if (initValues[line][column] === null) {
                if (placeValue !== null) {
                    chooseDigitAction({ x: line, y: column, value: placeValue === -1 ? null : placeValue });
                    playRoundForwardAction({
                        x: line,
                        y: column,
                        from: value,
                        to: placeValue,
                    });
                } else {
                    toggleDigitBoardAction();
                }
            }
        };

        const handleOptionClick = (line: number, column: number, value: sudokuValue) => {
            chooseDigitAction({ x: line, y: column, value });
            playRoundForwardAction({
                x: line,
                y: column,
                from: null,
                to: value,
            });
        };

        /**
         * 将1x9数组展开成一横行9个数独block
         * rely props:playRound,values,showOptionNumber,initValues,showUnchangeable,showConflict,conflictValues,blockHighlight
         * @param nums 1x9 matrix
         *
         * @returns JSX.ELEMENT array
         */
        const mapPlayBoardBlock = (nums: sudokuValue[], line: number) => (
            <Grid key={`PlayBoard${line}`} container item spacing={0}>
                {nums.map((num: sudokuValue, column: number) => (
                    <NumberBlock
                        line={line}
                        column={column}
                        values={values}
                        num={num}
                        initValue={initValues[line][column]}
                        conflictValue={conflictValues[line][column]}
                        showConflict={showConflict}
                        showOptionNumber={showOptionNumber}
                        showUnchangeable={showUnchangeable}
                        blockhighlight={blockHighlight[line][column] == 1 ? true : false}
                        blockOnMouseEnter={(line: number, column: number, num: sudokuValue) => {
                            chooseDigitStartAction({ x: line, y: column, value: num });
                            blockHighlightAction(num);
                        }}
                        blockOnClick={(line: number, column: number, num: sudokuValue) => {
                            handleBlockClick(line, column, num);
                        }}
                        blockOnMouseLeave={() => {
                            clearBlockHighlightAction();
                        }}
                        optionOnMouseEnter={(num: sudokuValue) => {
                            blockHighlightAction(num);
                        }}
                        optionOnClick={(line: number, column: number, num: sudokuValue) => {
                            handleOptionClick(line, column, num);
                        }}
                        optionOnMouseLeave={() => {
                            clearBlockHighlightAction();
                        }}
                    />
                ))}
            </Grid>
        );
        return (
            <>
                {useMemo(() => {
                    return (
                        <>
                        <HotKeys keyMap={digitsKeyMap} handlers={handlers}>
                            <div className={classes.playBoardContainer} onMouseLeave={clearBlockHighlightAction}>
                                <Grid container spacing={0}>
                                    {values.map(mapPlayBoardBlock)}
                                </Grid>
                            </div>
                        </HotKeys>
                        </>
                    );
                }, [
                    playRound,
                    values,
                    showOptionNumber,
                    initValues,
                    showUnchangeable,
                    showConflict,
                    conflictValues,
                    blockHighlight,
                    darkMode,
                    point,handlers,
                ])}
            </>
        );
    },
);

export default PlayBoard;
