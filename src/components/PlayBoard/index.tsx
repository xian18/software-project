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
		toggleDigitBoardAction,
		clearBlockHighlightAction,
		updateSudokuAction,
		chooseDigitStartAction,
		chooseDigitAction,
		playRoundForwardAction,
		blockHighlightAction,
	}) => {
		const classes = useStyles();

		const handleBlockClick = (
			line: number,
			column: number,
			value: sudokuValue
		) => {
			if (initValues[line][column] == undefined) {
				if (placeValue != undefined) {
					chooseDigitAction({ x: line, y: column, value: placeValue });
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


		return (
			<>
				<div
					className={classes.playBoardContainer}
					onMouseLeave={clearBlockHighlightAction}
				>
					<Grid container spacing={0}>
						{values.map((nums: sudokuValue[], line) => (
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
													[classes.hideUndefinedIcon]: num === undefined
												})}
												onMouseEnter={() => {
													chooseDigitStartAction({ x: line, y: column, value: num });
													blockHighlightAction(num);
												}}
												onClick={() => {
													handleBlockClick(line, column, num);
												}}
											>
												<NumberIcon
													num={values[line][column]}
													initNum={initValues[line][column]}
													showUnchangeable={
														showUnchangeable
													}
													className={classNames(classes.numberIconNormal, {
														[classes.hightLight]: blockHighlight[line][column],
														[classes.conflictOne]:showConflict && conflictValues[line][column] === 1,
														[classes.conflictTwo]:showConflict && conflictValues[line][column] === 2,
														[classes.conflictThree]:showConflict && conflictValues[line][column] === 3,
														[classes.conflictFour]:showConflict && conflictValues[line][column] === 4,
														[classes.conflictFive]:showConflict && conflictValues[line][column] === 5,
														[classes.conflictSix]:showConflict && conflictValues[line][column] === 6,
														[classes.conflictSeven]:showConflict && conflictValues[line][column] === 7,
														[classes.conflictEight]:showConflict && conflictValues[line][column] === 8,
														[classes.conflictNine]:showConflict && conflictValues[line][column] === 9,
													})}
													
												/>
												</IconButton>
												{(() => {
												const optNumber: sudokuValue[] = optionNumber(
													values,
													line,
													column
												);
												if (num === undefined)
													return (
													<Grid container item className={classNames(classes.optionNumberBlock,{
														[classes.optionalNumberTopPadding]:!(line%3),
													})}>
													{optNumber.map((num,c) => (
														<NumberOption num={num}
															onMouseEnter={()=>{blockHighlightAction(num)}}
															onClick={()=>{handleOptionClick(line,column,num)}}
														/>
													))}
													</Grid>
													);
												})()}
										</Grid>
									</div>
								))}
							</Grid>
						))}
					</Grid>
				</div>
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
