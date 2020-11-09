import React,{FC,memo,useMemo} from 'react';
import useStyles from '../../styles/playBoard';
import classNames from 'classnames';
import {Grid,IconButton} from '@material-ui/core';
import {sudokuValue,conflictValue} from '../../types';
import NumberIcon from './NumberIcon';
import optionNumber from '../../algrithm/optionNumber';
import NumberOption from './NumberOption';

export interface localProps {
    line:number;
    column:number;
    num:sudokuValue;
    initValue:sudokuValue;
    conflictValue:conflictValue;
    showOptionNumber:boolean;
    showConflict:boolean;
    showUnchangeable:boolean;
    blockhighlight:boolean;
    blockOnMouseEnter:Function;
    blockOnClick:Function;
    blockOnMouseLeave:Function;
    values:sudokuValue[][];
    optionOnMouseEnter:Function;
    optionOnClick:Function;
    optionOnMouseLeave:Function;
}

function compareNumberBlock(prevProps:any,nextProps:any){
    /**
     * 注意有一种情况，当initValue=undefined,showOptionNumber变为true或者变为false
     * 
     */
    return (
        prevProps.num === nextProps.num &&
        prevProps.initValue === nextProps.initValue &&
        prevProps.blockhighlight === nextProps.blockhighlight &&
        prevProps.showOptionNumber === nextProps.showOptionNumber &&
        prevProps.showConflict === nextProps.showConflict &&
        prevProps.showUnchangeable === nextProps.showUnchangeable && 
        prevProps.conflictValue === nextProps.conflictValue
    );
}

const NumberBlock:FC<localProps>=memo(({
    line,
    column,
    num,
    initValue,
    showOptionNumber,
    showConflict,
    showUnchangeable,
    conflictValue,
    blockhighlight,
    blockOnMouseEnter,
    blockOnClick,
    blockOnMouseLeave,
    values,
    optionOnMouseEnter,
    optionOnClick,
    optionOnMouseLeave,
})=>{
    const classes=useStyles();
    console.log('update');
    return (
        <div className={classes.PlayBoardLine} key={`PlayBoardLine${line}Block${column}`}>
        <Grid item container className={classNames({
            [classes.bottomPaddingBorder]: line === 2 || line === 5,
            [classes.topPadding]: !(line % 3),
            [classes.rightPaddingBorder]: column === 2 || column === 5,
            [classes.leftPadding]: !(column % 3),
        })}>
            <IconButton
                className={classNames(classes.playBoardBlockContainer, {
                    [classes.hideUndefinedIcon]: showOptionNumber === true && num === undefined
                })}
                onMouseEnter={()=>{
                    blockOnMouseEnter(line,column,num);
                }}
                onClick={() => {
                    if(initValue === undefined)
                        blockOnClick(line, column, num);
                }}
                onMouseLeave={()=>{
                    blockOnMouseLeave()
                }}
                disabled={showOptionNumber === true && num === undefined}
            >
                <NumberIcon
                    num={num}
                    initNum={initValue}
                    showUnchangeable={
                        showUnchangeable
                    }
                    /** 最后一个条件num === 1 | 2 ... 可以去掉，作为优化*/
                    className={classNames(classes.numberIconNormal, {
                        [classes.hightLight]: blockhighlight,
                        [classes.conflictOne]:showConflict && conflictValue === 1 && num === 1,
                        [classes.conflictTwo]:showConflict && conflictValue === 2 && num === 2,
                        [classes.conflictThree]:showConflict && conflictValue === 3 && num === 3,
                        [classes.conflictFour]:showConflict && conflictValue === 4 && num === 4,
                        [classes.conflictFive]:showConflict && conflictValue === 5 && num === 5,
                        [classes.conflictSix]:showConflict && conflictValue === 6 && num === 6,
                        [classes.conflictSeven]:showConflict && conflictValue === 7 && num === 7,
                        [classes.conflictEight]:showConflict && conflictValue === 8 && num === 8,
                        [classes.conflictNine]:showConflict && conflictValue === 9 && num === 9,
                    })}
                    
                />
                </IconButton>
                {useMemo(() => {
                if (num === undefined && showOptionNumber === true && initValue === undefined){
                    const optNumber: sudokuValue[] = optionNumber(
                        values,
                        line,
                        column
                    );
                    return (
                    <Grid container item className={classNames(classes.optionNumberBlock,{
                        [classes.optionalNumberTopPadding]:!(line%3),
                    })}>
                    {optNumber.map((num,c) => (
                        <NumberOption num={num}
                            onMouseEnter={()=>{optionOnMouseEnter(num)}}
                            onClick={()=>{optionOnClick(line,column,num)}}
                            onMouseLeave={()=>{optionOnMouseLeave()}}
                        />
                    ))}
                    </Grid>
                    );
                }
                },[...values,num,showOptionNumber,initValue])}
        </Grid>
    </div>
    )
},compareNumberBlock)

export default NumberBlock;