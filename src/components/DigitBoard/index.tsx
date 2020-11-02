import React,{FC,memo,useState} from 'react';

import Grid from '@material-ui/core/Grid';
import Modal from '@material-ui/core/Modal';
import { Button } from '@material-ui/core';
import {Point} from '../../types';


import useStyles from '../../styles/digitBoard';

export interface Props {
    open:boolean;
    point:Point;
    onChooseDigit:(point:Point)=>void;
    onClose:()=>void;
}

const DigitBoard:FC<Props>=memo(({open,point,onChooseDigit,onClose})=>{
    const numbers:number[]=[1,2,3,4,5,6,7,8,9];
    const classes=useStyles();
    const FormRow:FC<{nums:number[]}>=memo(({nums})=>(
        <React.Fragment>
            {nums.map((num,index)=>(
                <Grid key={`DigitBoard${num}`} item spacing={0}>
                <Button size='small' color='secondary' onClick={e=>onChooseDigit({...point,value:num})}>{num}</Button>
                </Grid>
            ))}
        </React.Fragment>
    ));

    return (
        <Modal open={open} onClose={onClose}>
            <div className={classes.modal}>
                <Grid container spacing={1} className={classes.modalContainer}>
                    <Grid container item spacing={0}>
                        <FormRow nums={numbers.slice(0,3)}/>
                    </Grid>
                    <Grid container item spacing={0}>
                        <FormRow nums={numbers.slice(3,6)} />
                    </Grid>
                    <Grid container item spacing={0}>
                        <FormRow nums={numbers.slice(6,9)} />
                    </Grid>
                </Grid>
            </div>
        </Modal>
    )
})

export default DigitBoard;