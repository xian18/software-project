import React,{FC,memo,useState,useMemo} from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import useStyles from '../../styles/playBoardBlock';
import classNames from 'classnames';
import { Highlight } from '@material-ui/icons';

export interface Props {
    line:number;
    column:number;
    num:number;
    highlight:number;
    onChooseDigitStart:(line:number,column:number)=>void;
    onBlockHighlight:()=>void;
}

const PlayBoardBlock:FC<Props>=memo(({line,column,num,highlight,onChooseDigitStart,onBlockHighlight})=>{
    const classes=useStyles();
    return (
        <Grid key={`PlayBoardLine${line}Block${column}`} item spacing={0}>
            <Paper
                variant='outlined'
                className={classNames(
                        classes.playBoardBlock,
                        {
                            [classes.hightLight]:highlight
                        }
                    )} square onMouseEnter={()=>{
                onChooseDigitStart(line,column);
                onBlockHighlight();
            }
            }>{num}</Paper>
        </Grid>
    )
});

export default PlayBoardBlock;