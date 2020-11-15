import React, { FC, memo, useEffect, useMemo,useRef,useCallback } from 'react';
import { HotKeys } from "react-hotkeys";
import Modal from '@material-ui/core/Modal';
import Fade from '@material-ui/core/Fade';

import useStyles from '../../styles/digitBoard';
import { Props } from '../../containers/DigitBoard';
import Digits from './Digits';
import {sudokuValue} from '../../types';
import {digitsKeyMap,createDigitsHandlers} from '../../consts/hotKeys';


const DigitBoard: FC<Props> = memo(
    ({ digitBoard, point, chooseDigitAction, playRoundForwardAction, blockHighlightAction,toggleDigitBoardAction}) => {
        const numbers: number[][] = [
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9],
        ];
        const classes = useStyles();
        console.log(digitBoard);
        const modal=useRef<HTMLDivElement>(null);

        useEffect(()=>{
            modal.current?.focus();
        },[digitBoard])

        const handleChooseDigit=useCallback((num:number) => {
            chooseDigitAction({ ...point, value: num as sudokuValue });
            playRoundForwardAction({
                x: point.x,
                y: point.y,
                from: point.value,
                to: num as sudokuValue,
            });
            toggleDigitBoardAction();
        },[point,digitBoard]);

        const handlers=createDigitsHandlers(handleChooseDigit);

        return (
            <Modal open={digitBoard}>
                <Fade in={digitBoard}>
                    <HotKeys keyMap={digitsKeyMap} handlers={handlers}>
                        <div className={classes.modal} ref={modal}> 
                            {useMemo(()=>(
                                <Digits numbers={numbers}
                                    onMouseEnter={(num:number)=>{
                                        if (num != null) blockHighlightAction(num as sudokuValue);
                                    }}
                                    onClick={handleChooseDigit} />
                            ),[numbers,digitBoard])}
                        </div>
                    </HotKeys>
                </Fade>
            </Modal>
        );
    },
);

export default DigitBoard;
