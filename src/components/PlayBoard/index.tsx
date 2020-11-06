import React,{FC,memo,useState,useMemo,useEffect} from 'react';
import {IconButton,Grid,SvgIcon, Icon} from '@material-ui/core';
import Paper from '@material-ui/core/Paper';


import DigitBoard from '../../containers/DigitBoard';

import useStyles from '../../styles/playBoard';
import classNames from 'classnames';

import {sudokuValue,PlayHistory} from '../../types';
import {Props} from '../../containers/PlayBoard';
import {numberIcons} from '../../consts/elements';
import {optionNumber} from "../../algrithm/optionNumber"


function comparePlayBoardBlock(prevProps:any,nextProps:any){
    if(prevProps.unchangeable === true)
        return true;
    return  (
                prevProps.num === nextProps.num &&
                prevProps.showUnchangeable === nextProps.showUnchangeable &&
                prevProps.className === nextProps.className
            );
}



const NumberIcon:FC<{
                        num:sudokuValue,
                        showUnchangeable:boolean,
                        className:any,
                    }> =memo(({num,showUnchangeable,className})=>
{
    const classes=useStyles();

    const [initNum,setInitNum]=useState(num);
    const [unchangeable,setUnchangeable]=useState(initNum!=undefined);
    if(unchangeable)
        return (
            <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
                className={classNames(
                    {
                        [classes.unchangeableBlock]:showUnchangeable,
                    },
                    className,
                )}>
                {numberIcons.get(initNum as number)}
            </svg>
        )
    else{
        if(num===undefined){
            return (<svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" className={className}>
                    <image width="100%" height="100%" xlinkHref=""/>
            </svg>)
        }
        else return (
            <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" className={className}>
                {numberIcons.get(num)}
            </svg>
            )
        }
},comparePlayBoardBlock);


const PlayBoard:FC<Props>=memo(({
    values,
    digitBoard,
    point,
    blockHighlight,
    playRound,
    placeValue,
    showUnchangeable,
    toggleDigitBoardAction,
    clearBlockHighlightAction,
    updateSudokuAction,
    chooseDigitStartAction,
    chooseDigitAction,
    playRoundForwardAction,
    blockHighlightAction,
})=>{

    const classes=useStyles();
    const [initValues,setInitValues]=useState(values.map(x=>Object.assign({},x)));

    const handleBlockClick=(line:number,column:number,value:sudokuValue)=>{
        if(initValues[line][column]==undefined){
            if(placeValue!=undefined){
                chooseDigitAction({x:line,y:column,value:placeValue});
                playRoundForwardAction({x:line,y:column,from:value,to:placeValue})
            }else{
                toggleDigitBoardAction()
            }
        }
    }

    return (
        <>
            <div className={classes.playBoardContainer} onMouseLeave={clearBlockHighlightAction}>
                <Grid container spacing={0}>
                    {values.map((nums:sudokuValue[],line)=>(
                        <Grid key={`PlayBoard${line}`} container item spacing={0}>
                            {nums.map((num,column)=>(
                                <div className={classes.PlayBoardLine}>
                                    <Grid item container key={`PlayBoardLine${line}Block${column}`}>
                                    <IconButton className={classNames(
                                                    classes.playBoardBlockContainer,
                                                    {
                                                        [classes.bottomPaddingBorder]:line===2 || line===5,
                                                        [classes.topPadding]:!(line%3),
                                                        [classes.rightPaddingBorder]:column=== 2 || column===5,
                                                        [classes.leftPadding]:!(column%3),
                                                    }
                                                )}
                                                onMouseEnter={()=>{
                                                chooseDigitStartAction({x:line,y:column,value:num});
                                                blockHighlightAction(num);
                                                }}
                                                onClick={()=>{handleBlockClick(line,column,num)}}
                                                >
                                                <NumberIcon
                                                    num={values[line][column]}
                                                    showUnchangeable={showUnchangeable} /*This property needs to be configured and set by some button*/
                                                    className={classNames(
                                                        classes.numberIconNormal,
                                                        {
                                                            [classes.hightLight]:blockHighlight[line][column],
                                                            [classes.hideUndefinedIcon]:values[line][column]==undefined,
                                                        }
                                                    )}
                                                    >
                                                </NumberIcon>
                                            {(()=>{
                                            const optNumber:sudokuValue[]=optionNumber(values,line,column);
                                            if(values[line][column]==undefined)
                                                return (
                                                    <Grid container item className={classes.optionNumberBlock}>
                                                        {optNumber.map((num)=>
                                                            (
                                                                <NumberIcon 
                                                                    num={num}
                                                                    showUnchangeable={false}
                                                                    className={classes.optionNumberIcon}
                                                                >
                                                                </NumberIcon>)
                                                            )
                                                        }
                                                    </Grid>)
                                            }
                                        )()}
                                        </IconButton>
                                    </Grid>
                                </div>
                            ))}
                        </Grid>
                    ))}
                </Grid>
            </div>
            {useMemo(()=>(
                <div onClick={toggleDigitBoardAction}>
                    <DigitBoard open={digitBoard} onClose={toggleDigitBoardAction}/>
                </div>
            ),[digitBoard])}
        </>
    );
})

export default PlayBoard;