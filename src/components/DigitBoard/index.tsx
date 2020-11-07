import React,{FC,memo} from 'react';


import Grid from '@material-ui/core/Grid';
import Modal from '@material-ui/core/Modal';
import { Button } from '@material-ui/core';
import {sudokuValue} from '../../types';
import Fade from '@material-ui/core/Fade';

import useStyles from '../../styles/digitBoard';
import {Props} from '../../containers/DigitBoard';

export interface localProps {
    open:boolean;
    onClose:()=>void;
}

const DigitBoard:FC<localProps & Props>=memo(({open,point,chooseDigitAction,playRoundForwardAction,blockHighlightAction,onClose})=>{
    const numbers:number[][]=[
                                [1,2,3],
                                [4,5,6],
                                [7,8,9]
                            ]
    const classes=useStyles();

    return (
        <Modal
            open={open}
            onClose={onClose}
            >
            <Fade in={open} mountOnEnter unmountOnExit>
                <div className={classes.modal}>
                    <Grid container spacing={1}>
                    {
                    numbers.map((nums,index)=>(
                        <Grid key={`DigitBoardLine${index}`} container item spacing={0}>
                            {nums.map((num,index)=>(
                                <Grid key={`DigitBoard${num}`} item spacing={0}>
                                    <Button
                                        size='small'
                                        color='secondary'
                                        onMouseEnter={()=>{if(num!=undefined) blockHighlightAction(num as sudokuValue)}}
                                        onClick={e=>{
                                                    chooseDigitAction({...point,value:num as sudokuValue});
                                                    playRoundForwardAction({x:point.x,y:point.y,from:point.value,to:num as sudokuValue});
                                                    }
                                                }
                                    >
                                        {num}
                                    </Button>
                                </Grid>
                        ))}
                        </Grid>
                    ))
                    }
                    </Grid>
                </div>
            </Fade>
        </Modal>
    )
})

export default DigitBoard;