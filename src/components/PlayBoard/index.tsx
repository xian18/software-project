import React,{FC,memo,useState,useMemo} from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';


import DigitBoard from '../../containers/DigitBoard';
import PlayBoardBlock from '../../containers/PlayBoardBlock';

import useStyles from '../../styles/playBoard';
import useStylesBlock from '../../styles/playBoardBlock';
import classNames from 'classnames';

import {Props} from '../../containers/PlayBoard';



const PlayBoard:FC<Props>=memo(({values,point,blockHighlight,onClearBlockHighlight,onUpdateSudoku})=>{
    const classes=useStyles();
    const blockClasses=useStylesBlock();
    console.log(blockHighlight);
    const [firstMount,setFirstMount]=useState(true);
    const [digitBoard,setDigitBoard]=useState(false);
    if(firstMount) onUpdateSudoku() && setFirstMount(false);

    const toggleDigitBoard=()=>{
        setDigitBoard((prev)=>!prev);
    }

    const FormRow:FC<{nums:number[],index:number}>=memo(({nums,index})=>(
        <React.Fragment>
            {nums.map((num,childIndex)=>(
                <div onClick={toggleDigitBoard}>
                    <PlayBoardBlock line={index} column={childIndex} num={values[index][childIndex]} highlight={blockHighlight[index][childIndex]} />
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
            <div onClick={toggleDigitBoard}>
                <DigitBoard open={digitBoard} onClose={toggleDigitBoard}/>
            </div>
        </>
    );
})

export default PlayBoard;