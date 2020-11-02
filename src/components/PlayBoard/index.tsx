import React,{FC,memo,useState,useMemo} from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import {Props} from '../../containers/PlayBoard';

import DigitBoard from '../../containers/DigitBoard';

import useStyles from '../../styles/playBoard';

const PlayBoard:FC<Props>=memo(({values,onChooseDigitStart,onUpdateSudoku})=>{
    const classes=useStyles();

    const [firstMount,setFirstMount]=useState(true);
    const [digitBoard,setDigitBoard]=useState(false);
    if(firstMount) onUpdateSudoku() && setFirstMount(false);

    const toggleDigitBoard=()=>{
        setDigitBoard((prev)=>!prev);
    }

    const FormRow:FC<{nums:number[],index:number}>=memo(({nums,index})=>(
        <React.Fragment>
            {nums.map((num,childIndex)=>(
                <Grid key={`PlayBoardLine${index}Block${childIndex}`} item spacing={0}>
                    <Paper variant='outlined' square className={classes.playBoardBlock} onClick={()=>{toggleDigitBoard();onChooseDigitStart(index,childIndex);}}>{num}</Paper>
                </Grid>
            ))}
        </React.Fragment>
    ));

    return (
        <>
            <div className={classes.playBoardContainer}>
                <Grid container spacing={0}>
                    {values.map((nums:number[],index)=>(
                        <Grid key={`PlayBoard${index}`} container item spacing={0}>
                            <FormRow nums={nums} index={index}/>
                        </Grid>
                    ))}
                </Grid>
            </div>
            <div onClick={toggleDigitBoard}>
                <DigitBoard open={digitBoard} onClose={toggleDigitBoard}/>
            </div>
        </>
    );
})

export default PlayBoard;