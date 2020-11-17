import React, { FC, memo, useState, useMemo, useEffect } from 'react';
import { useSnackbar } from 'notistack';

import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Switch from '@material-ui/core/Switch';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import classNames from 'classnames';
import { numberIcons } from '../../consts/elements';
import useStyles from '../../styles/playHelper';

import { Props } from '../../containers/PlayHelper';
import TipButton from '../SmallComponents/TipButton';

import { Undo, Refresh, VisibilityOutlined, VisibilityOffOutlined } from '@material-ui/icons';
import NumberSvg from '../SmallComponents/NumberSvg';



//
const PlayHelper: FC<Props> = memo(
    ({
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
        saveGameAction,
        loadGameAction,
    }) => {
        const classes = useStyles();
        const { enqueueSnackbar, closeSnackbar } = useSnackbar();

        const [completeMessageShowed, setCompleteMessageshowed] = useState(
            false,
        ); /** 数独正确完成，是否展示过成功信息*/
        /** 使用enqueueSnackbar弹出消息框，展示数独成功完成，并将已经展示状态为设置为true */
        useEffect(() => {
            if (completeMessageShowed === false && complete === true) {
                enqueueSnackbar('Sudoku Complete!', { variant: 'info' });
                setCompleteMessageshowed(true);
            }
        }, [complete]);

        const [highlightLoc, setHighlightLoc] = useState(
            0,
        ); /** 1-9哪个数字需要高亮，0代表没有数字需要高亮,-1表示删除点击数字*/

        /** 按钮文本，可更改*/
        const showUnchangeableTexts = ['取消不可变显示', '显示不可变显示'];
        const showConflictTexts = ['取消显示冲突', '显示冲突'];

        const [showOptionNumberIcons,setShowOptionNumberIcons] = useState(false); //true 为可见 false 为不可见
        const [showUnchangeableSwitch, setShowUnchangeableSwitch] = useState(true);
        const [showUnchangeableText, setShowUnchangeableText] = useState(showUnchangeableTexts[0]);
        const [showConflictSwitch, setShowConflictSwitch] = useState(true);
        const [showConflictText, setShowConflictText] = useState(showConflictTexts[0]);
        const [showOptionNumberIcon, setShowOptionNumberIcon] = useState(showOptionNumberIcons[0]);

        /** toggle button text*/
        const toggleShowUnchangeable = () => {
            showUnchangeableText === showUnchangeableTexts[0]
                ? setShowUnchangeableText(showUnchangeableTexts[1])
                : setShowUnchangeableText(showUnchangeableTexts[0]);
            setShowUnchangeableSwitch((prev) => !prev);
        };

        /** toggle button text*/
        const toggleShowConflict = () => {
            showConflictText === showConflictTexts[0]
                ? setShowConflictText(showConflictTexts[1])
                : setShowConflictText(showConflictTexts[0]);
            setShowConflictSwitch((prev) => !prev);
        };

        /** toggle button text*/
        const toggleShowOptionNumberIcon=()=>{
            setShowOptionNumberIcons((prev)=>!prev);
        };

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
        const mapNumberIcon = (value: number, index: number) => (
            <Grid item className={classes.numberIconNormal}>
                <IconButton
                    onMouseEnter={() => {
                        blockHighlightAction(value);
                    }}
                    onClick={() => {
                        if (highlightLoc === value) {
                            clearPlaceValueAction();
                            setHighlightLoc(0);
                        } else {
                            setPlaceValueAction(value);
                            setHighlightLoc(value);
                        }
                    }}
                    onMouseLeave={clearBlockHighlightAction}
                    className={classNames(classes.numberIconNormal)}>
                    <NumberSvg
                        num={value}
                        SvgProp={{
                            className: classNames(classes.numberIconNormal, {
                                [classes.hightLight]: highlightLoc === value,
                            }),
                        }}></NumberSvg>
                </IconButton>
            </Grid>
        );

        return (
            <React.Fragment>
                <Grid container className={classNames(classes.numberContainerNormal, {})}>
                    {useMemo(() => Array.from(numberIcons.keys()).map(mapNumberIcon), [highlightLoc])}
                </Grid>
                <Grid container className={classes.buttonContainers}>
                    <TipButton
                        TooltipProp={{ title: '撤回上一步', children: <></>, arrow: true }}
                        IconButtonProp={{
                            onClick: playRoundBackwardAction,
                            className: classNames(classes.iconButtonContainer, {}),
                        }}>
                        <Undo className={classNames(classes.iconButtonIcon, {})} />
                    </TipButton>
                    <TipButton
                        TooltipProp={{ title: '开始新一局', children: <></>, arrow: true }}
                        IconButtonProp={{
                            onClick: updateSudokuAction,
                            className: classNames(classes.iconButtonContainer, {}),
                        }}>
                        <Refresh className={classNames(classes.iconButtonIcon, {})} />
                    </TipButton>
                    <TipButton
                        TooltipProp={{
                            title: showOptionNumberIcon ? '显示可选数字' : '隐藏可选数字',
                            children: <></>,
                            arrow: true,
                        }}
                        IconButtonProp={{
                            onClick: () => {
                                toggleShowOptionNumberIcon();
                                toggleShowOptionNumberAction();
                            },
                            className: classNames(classes.iconButtonContainer, {}),
                        }}>
                        <VisibilityOutlined
                            className={classNames(classes.iconButtonIcon, {
                                [classes.hideElement]: showOptionNumberIcon,
                            })}
                        />
                        <VisibilityOffOutlined
                            className={classNames(classes.iconButtonIcon, {
                                [classes.hideElement]: !showOptionNumberIcon,
                            })}
                        />
                    </TipButton>
                    <Button variant='contained' color='primary' onClick={saveGameAction}>saveGame</Button>
                    <Button variant='contained' color='primary' onClick={loadGameAction}>loadGame</Button>
                </Grid>
                <FormControl component='fieldset'>
                    <FormGroup aria-label='position' row>
                        {useMemo(
                            () => (
                                <FormControlLabel
                                    value={'unchangeable'}
                                    control={
                                        <Switch
                                            checked={showUnchangeableSwitch}
                                            onChange={() => {
                                                toggleShowUnchangeable();
                                                toggleShowUnchangeableAction();
                                            }}
                                            color='primary'
                                        />
                                    }
                                    label={showUnchangeableText}
                                    labelPlacement={'bottom'}
                                />
                            ),
                            [showUnchangeableText],
                        )}

                        {useMemo(
                            () => (
                                <FormControlLabel
                                    value={'conflict'}
                                    control={
                                        <Switch
                                            checked={showConflictSwitch}
                                            onChange={() => {
                                                toggleShowConflict();
                                                toggleShowConflictAction();
                                            }}
                                            color='primary'
                                        />
                                    }
                                    label={showConflictText}
                                    labelPlacement={'bottom'}
                                />
                            ),
                            [showConflictText],
                        )}
                    </FormGroup>
                </FormControl>
            </React.Fragment>
        );
    },
);
export default PlayHelper;
