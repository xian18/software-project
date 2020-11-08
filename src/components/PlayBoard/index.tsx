import React, { FC, memo,useMemo,} from "react";
import { IconButton, Grid } from "@material-ui/core";

import DigitBoard from "../../containers/DigitBoard";

import useStyles from "../../styles/playBoard";
import classNames from "classnames";

import { sudokuValue,} from "../../types";
import { Props } from "../../containers/PlayBoard";
import { optionNumber } from "../../algrithm/optionNumber";

import NumberIcon from './NumberIcon';
import NumberOption from './NumberOption';

const PlayBoard: FC<Props> = memo(
	({
		values,
		initValues,
		digitBoard,
		point,
		blockHighlight,
		playRound,
		placeValue,
		showUnchangeable,
		conflictValues,
		showConflict,
		complete,
		showOptionNumber,
		toggleDigitBoardAction,
		clearBlockHighlightAction,
		chooseDigitStartAction,
		chooseDigitAction,
		playRoundForwardAction,
		blockHighlightAction,
		toggleShowOptionNumberAction,
	}) => {
		const classes = useStyles();

		/**
		 * 如果不是不可变的数字，当placeValue == undefined，点击不会对block中数字进行影响，点击应当拉起DigitBoard
		 * 如果数字是1-9，对对应block数字设置为1-9
		 * 如果数字是-1，代表清空block为空
		 */
		const handleBlockClick = (
			line: number,
			column: number,
			value: sudokuValue
		) => {
			if (initValues[line][column] == undefined) {
				if (placeValue != undefined) {
					chooseDigitAction({ x: line, y: column, value: placeValue === -1 ? undefined : placeValue });
					playRoundForwardAction({
						x: line,
						y: column,
						from: value,
						to: placeValue
					});
				} else {
					toggleDigitBoardAction();
				}
			}
		};

		const handleOptionClick=(line:number,column:number,value:sudokuValue)=>{
			chooseDigitAction({ x: line, y: column, value, });
			playRoundForwardAction({
				x: line,
				y: column,
				from: undefined,
				to: value,
			});
		}

		/**
		 * 将1x9数组展开成一横行9个数独block
		 * rely props:values,showOptionNumber,initValues,showUnchangeable,showConflict,conflictValues,blockHighlight
		 * @param nums 1x9 matrix
		 * 
		 * @returns JSX.ELEMENT array
		 */
		const mapPlayBoardBlock=(nums: sudokuValue[], line:number) => (
			<Grid key={`PlayBoard${line}`} container item spacing={0}>
				{nums.map((num, column) => (
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
								onMouseEnter={() => {
									chooseDigitStartAction({ x: line, y: column, value: num });
									blockHighlightAction(num);
								}}
								onClick={() => {
									handleBlockClick(line, column, num);
								}}
								onMouseLeave={clearBlockHighlightAction}
								disabled={showOptionNumber === true && num === undefined}
							>
								<NumberIcon
									num={num}
									initNum={initValues[line][column]}
									showUnchangeable={
										showUnchangeable
									}
									/** 最后一个条件num === 1 | 2 ... 可以去掉，作为优化*/
									className={classNames(classes.numberIconNormal, {
										[classes.hightLight]: blockHighlight[line][column],
										[classes.conflictOne]:showConflict && conflictValues[line][column] === 1 && num === 1,
										[classes.conflictTwo]:showConflict && conflictValues[line][column] === 2 && num === 2,
										[classes.conflictThree]:showConflict && conflictValues[line][column] === 3 && num === 3,
										[classes.conflictFour]:showConflict && conflictValues[line][column] === 4 && num === 4,
										[classes.conflictFive]:showConflict && conflictValues[line][column] === 5 && num === 5,
										[classes.conflictSix]:showConflict && conflictValues[line][column] === 6 && num === 6,
										[classes.conflictSeven]:showConflict && conflictValues[line][column] === 7 && num === 7,
										[classes.conflictEight]:showConflict && conflictValues[line][column] === 8 && num === 8,
										[classes.conflictNine]:showConflict && conflictValues[line][column] === 9 && num === 9,
									})}
									
								/>
								</IconButton>
								{(() => {
								if (num === undefined && showOptionNumber === true){
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
											onMouseEnter={()=>{blockHighlightAction(num)}}
											onClick={()=>{handleOptionClick(line,column,num)}}
											onMouseLeave={clearBlockHighlightAction}
										/>
									))}
									</Grid>
									);
								}
								})()}
						</Grid>
					</div>
				))}
			</Grid>
		)

		return (
			<>
				{useMemo(()=>{
					return (
					<div
						className={classes.playBoardContainer}
						onMouseLeave={clearBlockHighlightAction}
					>
						<Grid container spacing={0}>
							{values.map(mapPlayBoardBlock)}
						</Grid>
					</div>
				)},[playRound,values,showOptionNumber,initValues,showUnchangeable,showConflict,conflictValues,blockHighlight])}

				{useMemo(
					() => (
						<div onClick={toggleDigitBoardAction}>
							<DigitBoard open={digitBoard} onClose={toggleDigitBoardAction} />
						</div>
					),
					[digitBoard]
				)}
			</>
		);
	}
);

export default PlayBoard;
