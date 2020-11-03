import React,{FC,memo,useState,useMemo} from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';


import DigitBoard from '../../containers/DigitBoard';
import PlayBoardBlock from '../../containers/PlayBoardBlock';

import useStyles from '../../styles/playBoard';
import classNames from 'classnames';

import {Props} from '../../containers/PlayBoard';



const PlayBoard:FC<Props>=memo(({values,point,digitBoard,onToggleDigitBoard,onClearBlockHighlight,onUpdateSudoku})=>{
    const classes=useStyles();

    const [firstMount,setFirstMount]=useState(true);
    if(firstMount) onUpdateSudoku() && setFirstMount(false);

    const FormRow:FC<{nums:number[],index:number}>=memo(({nums,index})=>(
        <React.Fragment>
            {nums.map((num,childIndex)=>(
                <div onClick={onToggleDigitBoard}>
                    <PlayBoardBlock line={index} column={childIndex} num={values[index][childIndex]} />
                </div>
            ))}
        </React.Fragment>
    ));

    return (
        <>
            <div className={classes.playBoardContainer} onMouseLeave={onClearBlockHighlight}>
                <Grid container spacing={0}>
                    {values.map((nums:number[],index)=>(
                        <Grid key={`PlayBoard${index}`} container item spacing={0}>
                            <FormRow nums={nums} index={index} />
                        </Grid>
                    ))}
                </Grid>
            </div>
            <div onClick={onToggleDigitBoard}>
                <DigitBoard open={digitBoard} onClose={onToggleDigitBoard}/>
            </div>
        </>
    );
})

export default PlayBoard;