import React,{FC,memo,useState,useMemo} from 'react';
import {useSnackbar} from 'notistack';

import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import classNames from 'classnames';
import {numberIcons} from '../../consts/elements';
import useStyles from '../../styles/playHelper';

import {Props} from '../../containers/PlayHelper';

const PlayHelper:FC<Props>=memo(({
                                blockHighlightAction,
                                setPlaceValueAction,
                                clearPlaceValueAction,
                                toggleShowUnchangeableAction,
                                updateSudokuAction,
                                playRoundBackwardAction,
                                clearBlockHighlightAction,
                            })=>{
    const classes=useStyles();
    const {enqueueSnackbar,closeSnackbar}=useSnackbar();
    const [highlightLoc,setHighlightLoc]=useState(0);
    const showUnchangeableTexts=['取消不可变显示','显示不可变显示'];
    const [showUnchangeableText,setShowUnchangeableText]=useState(showUnchangeableTexts[0]);

    const toggleShowUnchangeableText=()=>{
        showUnchangeableText === showUnchangeableTexts[0] ?
            setShowUnchangeableText(showUnchangeableTexts[1]) : 
            setShowUnchangeableText(showUnchangeableTexts[0]) ;
    }

    return (
        <React.Fragment >
            <Grid container className={classNames(classes.numbers,{
                [classes.root]:true
            })}>
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
            <Grid container >
                {useMemo(()=>(
                    <React.Fragment>
                        <Button variant='contained' color='primary' onClick={()=>{
                            toggleShowUnchangeableText();
                            toggleShowUnchangeableAction();
                        }}
                        className={classNames(classes.buttomNormal,{})}
                        >{showUnchangeableText}</Button>
                        <Button variant='contained' color='primary' onClick={playRoundBackwardAction} className={classNames(classes.buttomNormal,{})}>Go Back</Button>
                        <Button variant='contained' color='primary' onClick={updateSudokuAction} className={classNames(classes.buttomNormal,{})}>Update Sudoku</Button>
                    </React.Fragment>
                ),[])}
            </Grid>
        </React.Fragment>
    )
})

export default PlayHelper;