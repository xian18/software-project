import React,{FC,memo,useState,useMemo, useEffect} from 'react';
import {useSnackbar} from 'notistack';

import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import classNames from 'classnames';
import {numberIcons} from '../../consts/elements';
import useStyles from '../../styles/playHelper';

import {Props} from '../../containers/PlayHelper';

const PlayHelper:FC<Props>=memo(({
                                complete,
                                blockHighlightAction,
                                setPlaceValueAction,
                                clearPlaceValueAction,
                                toggleShowUnchangeableAction,
                                updateSudokuAction,
                                playRoundBackwardAction,
                                clearBlockHighlightAction,
                                toggleShowConflictAction,
                                toggleShowOptionNumberAction,
                            })=>{
    const classes=useStyles();
    const {enqueueSnackbar,closeSnackbar}=useSnackbar();

    const [completeMessageShowed,setCompleteMessageshowed]=useState(false); /** 数独正确完成，是否展示过成功信息*/
    useEffect(()=>{
        if(completeMessageShowed === false && complete === true){
            enqueueSnackbar('Sudoku Complete!',{variant:'info'});
            setCompleteMessageshowed(true);
        }
    },[complete]);

    const [highlightLoc,setHighlightLoc]=useState(0);   /** 1-9哪个数字需要高亮，0代表没有数字需要高亮,-1表示删除点击数字*/

    const showUnchangeableTexts=['取消不可变显示','显示不可变显示'];
    const showConflictTexts=['取消显示冲突','显示冲突'];
    const showOptionNumberTexts=['取消可选数字','展示可选数字'];

    const [showUnchangeableText,setShowUnchangeableText]=useState(showUnchangeableTexts[0]);
    const [showConflictText,setShowConflictText]=useState(showConflictTexts[0]);
    const [showOptionNumberText,setShowOptionNumberText]=useState(showOptionNumberTexts[0]);

    /** toggle*/
    const toggleShowUnchangeableText=()=>{
        showUnchangeableText === showUnchangeableTexts[0] ?
            setShowUnchangeableText(showUnchangeableTexts[1]) : 
            setShowUnchangeableText(showUnchangeableTexts[0]) ;
    }

    /** toggle*/
    const toggleShowConflictText=()=>{
        showConflictText === showConflictTexts[0] ?
            setShowConflictText(showConflictTexts[1]) :
            setShowConflictText(showConflictTexts[0]) ;
    }

    const toggleShowOptionNumberText=()=>{
        showOptionNumberText === showOptionNumberTexts[0] ?
            setShowOptionNumberText(showOptionNumberTexts[1]) :
            setShowOptionNumberText(showOptionNumberTexts[0]) ;
    }

    return (
        <React.Fragment >
            <Grid container className={classNames(classes.root,{})}>
                <Grid container className={classNames(classes.numbers,{})}>
                    {Array.from(numberIcons.keys()).map((value,index)=>(
                        <Grid item>
                            <IconButton
                                onMouseEnter={()=>{
                                    blockHighlightAction(value);
                                }}
                                onClick={()=>{
                                    if(highlightLoc === value){
                                        clearPlaceValueAction();
                                        setHighlightLoc(0);
                                    }
                                    else {
                                        setPlaceValueAction(value);
                                        setHighlightLoc(value);
                                    }
                                }}
                                onMouseLeave={clearBlockHighlightAction}
                                className={classNames(classes.numberContainerNormal)}
                                >
                                <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
                                    className={classNames(
                                        classes.numberIconNormal,
                                            {
                                                [classes.hightLight]:highlightLoc === value
                                            }
                                    )}>
                                    {numberIcons.get(value)}
                                </svg>
                            </IconButton>
                        </Grid>
                    ))}
                </Grid>

                {useMemo(()=>(
                        <Button variant='contained' color='primary' onClick={()=>{
                            toggleShowUnchangeableText();
                            toggleShowUnchangeableAction();
                        }}>{showUnchangeableText}</Button>
                ),[showUnchangeableText])}

                {useMemo(()=>(
                    <>
                        <Button variant='contained' color='primary' onClick={playRoundBackwardAction}>Go Back</Button>
                        <Button variant='contained' color='primary' onClick={updateSudokuAction}>Update Sudoku</Button>
                    </>
                ),[])}

                {useMemo(()=>(
                    <Button variant='contained' color='primary'
                    onClick={()=>{
                        toggleShowConflictText();
                        toggleShowConflictAction();
                    }}>{showConflictText}</Button>
                ),[showConflictText])}

                {useMemo(()=>(
                    <Button variant='contained' color='primary'
                    onClick={()=>{
                        toggleShowOptionNumberText();
                        toggleShowOptionNumberAction();
                    }}>{showOptionNumberText}</Button>
                ),[showOptionNumberText])}
            </Grid>
        </React.Fragment>
    )})
export default PlayHelper;