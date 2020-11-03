import React,{FC,memo,useState} from 'react';


import Grid from '@material-ui/core/Grid';
import myModal from '../Modal';
import Modal from '@material-ui/core/Modal';
import { Button } from '@material-ui/core';
import {Point,sudokuValue,PlayHistory} from '../../types';
import Fade from '@material-ui/core/Fade';
import Dialog from '@material-ui/core/Dialog';


import useStyles from '../../styles/digitBoard';

export interface Props {
    open:boolean;
    point:Point;
    onChooseDigit:(point:Point)=>void;
    onPlayRoundForward:(payload:PlayHistory)=>void;
    onBlockHighlight:(value:sudokuValue)=>void;
    onClose:()=>void;
}

const DigitBoard:FC<Props>=memo(({open,point,onChooseDigit,onPlayRoundForward,onBlockHighlight,onClose})=>{
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
                    numbers.map((nums)=>(
                        <Grid container item spacing={0}>
                            {nums.map((num,index)=>(
                                <Grid key={`DigitBoard${num}`} item spacing={0}>
                                    <Button
                                        size='small'
                                        color='secondary'
                                        onMouseEnter={()=>{if(num!=undefined) onBlockHighlight(num as sudokuValue)}}
                                        onClick={e=>{
                                                    onChooseDigit({...point,value:num as sudokuValue});
                                                    onPlayRoundForward({x:point.x,y:point.y,from:point.value,to:num as sudokuValue});
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