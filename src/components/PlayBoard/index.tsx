import React,{FC,memo,useState,useMemo,useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';


import DigitBoard from '../../containers/DigitBoard';

import useStyles from '../../styles/playBoard';
import classNames from 'classnames';

import {sudokuValue,PlayHistory} from '../../types';
import {Props} from '../../containers/PlayBoard';

function comparePlayBoardBlock(prevProps:any,nextProps:any){
    return  (
                prevProps.num === nextProps.num &&
                prevProps.highlight === nextProps.highlight
            );
}

const PlayBoardBlock:FC<{num:sudokuValue,highlight:boolean} >= memo(({children,num,highlight})=>
{


    return (
        <Grid item spacing={0}>
            {children}
        </Grid>
    )
},comparePlayBoardBlock);


const PlayBoard:FC<Props>=memo(({
    values,
    digitBoard,
    blockHighlight,
    playRound,
    onToggleDigitBoard,
    onClearBlockHighlight,
    onUpdateSudoku,
    onChooseDigitStart,
    onBlockHighlight,
})=>{

    const classes=useStyles();

    useEffect(()=>{
        onUpdateSudoku();
    },[])

    return (
        <>
            <div className={classes.playBoardContainer} onMouseLeave={onClearBlockHighlight}>
                <Grid container spacing={0}>
                    {values.map((nums:sudokuValue[],line)=>(
                        <Grid key={`PlayBoard${line}`} container item spacing={0}>
                            {nums.map((num,column)=>(
                                <div onClick={onToggleDigitBoard}>
                                    <React.Fragment key={`PlayBoardLine${line}Block${column}`}>
                                        <PlayBoardBlock
                                            num={values[line][column]}
                                            highlight={blockHighlight[line][column]==1?true:false}>
                                            <Paper
                                                variant='outlined'
                                                className={classNames(
                                                        classes.playBoardBlock,
                                                        {
                                                            [classes.hightLight]:blockHighlight[line][column],
                                                        }
                                                    )} square onMouseEnter={()=>{
                                                onChooseDigitStart(line,column,num);
                                                onBlockHighlight(num);
                                                }
                                            }>{num}</Paper>
                                        </PlayBoardBlock>
                                    </React.Fragment>
                                </div>
                            ))}
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