import React,{FC,memo,useState,useMemo, useEffect} from 'react';
import {useSnackbar} from 'notistack';

import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import classNames from 'classnames';
import {numberIcons} from '../../consts/elements';
import useStyles from '../../styles/playHelper';

import {Props} from '../../containers/PlayHelper';

import {Undo} from '@material-ui/icons';

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
    /** 使用enqueueSnackbar弹出消息框，展示数独成功完成，并将已经展示状态为设置为true*/
    useEffect(()=>{
        if(completeMessageShowed === false && complete === true){
            enqueueSnackbar('Sudoku Complete!',{variant:'info'});
            setCompleteMessageshowed(true);
        }
    },[complete]);

    const [highlightLoc,setHighlightLoc]=useState(0);   /** 1-9哪个数字需要高亮，0代表没有数字需要高亮,-1表示删除点击数字*/

    /** 按钮文本，可更改*/
    const showUnchangeableTexts=['取消不可变显示','显示不可变显示'];
    const showConflictTexts=['取消显示冲突','显示冲突'];
    const showOptionNumberTexts=['取消可选数字','展示可选数字'];

    const [showUnchangeableText,setShowUnchangeableText]=useState(showUnchangeableTexts[0]);
    const [showConflictText,setShowConflictText]=useState(showConflictTexts[0]);
    const [showOptionNumberText,setShowOptionNumberText]=useState(showOptionNumberTexts[0]);

    /** toggle button text*/
    const toggleShowUnchangeableText=()=>{
        showUnchangeableText === showUnchangeableTexts[0] ?
            setShowUnchangeableText(showUnchangeableTexts[1]) : 
            setShowUnchangeableText(showUnchangeableTexts[0]) ;
    }

    /** toggle button text*/
    const toggleShowConflictText=()=>{
        showConflictText === showConflictTexts[0] ?
            setShowConflictText(showConflictTexts[1]) :
            setShowConflictText(showConflictTexts[0]) ;
    }

    /** toggle button text*/
    const toggleShowOptionNumberText=()=>{
        showOptionNumberText === showOptionNumberTexts[0] ?
            setShowOptionNumberText(showOptionNumberTexts[1]) :
            setShowOptionNumberText(showOptionNumberTexts[0]) ;
    }

    /** 
     * map to show numberIcon 1-9
     * 
     * rely props:highligLoc
     * 
     * @param value map keys
     * @param index from 0
     * 
     * @returns JSX.Element 
     */
    const mapNumberIcon=(value:number,index:number)=>(
        <Grid item className={classes.numberIconNormal}>
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
                className={classNames(classes.numberIconNormal)}
                >
                <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
                    className={classNames(
                        classes.numberIconNormal,
                            {
                                [classes.hightLight]:highlightLoc === value,
                                [classes.haveBorder]:value===-1,
                            }
                    )}>
                    {numberIcons.get(value)}
                </svg>
            </IconButton>
        </Grid>
    )

    return (
        <React.Fragment >
            <Grid container className={classNames(classes.numberContainerNormal,{})}>
                {useMemo(()=> Array.from(numberIcons.keys()).map(mapNumberIcon) ,[highlightLoc])}
            </Grid>
            <Grid container >
                {useMemo(()=>(
                        <Button variant='contained' color='primary' onClick={()=>{
                            toggleShowUnchangeableText();
                            toggleShowUnchangeableAction();
                        }}><Typography>{showUnchangeableText}</Typography></Button>
                ),[showUnchangeableText])}

                {useMemo(()=>(
                    <>
                        <IconButton onClick={playRoundBackwardAction}><Undo style={{color:"#000000"}} /></IconButton>
                        <IconButton onClick={updateSudokuAction}>Update Sudoku</IconButton>
                    </>
                ),[])}

                {useMemo(()=>(
                    <Button variant='contained' color='primary'
                    onClick={()=>{
                        toggleShowConflictText();
                        toggleShowConflictAction();
                    }}><Typography>{showConflictText}</Typography></Button>
                ),[showConflictText])}

                {useMemo(()=>(
                    <Button variant='contained' color='primary'
                    onClick={()=>{
                        toggleShowOptionNumberText();
                        toggleShowOptionNumberAction();
                    }}><Typography>{showOptionNumberText}</Typography></Button>
                ),[showOptionNumberText])}
            </Grid>
        </React.Fragment>
    )})
export default PlayHelper;