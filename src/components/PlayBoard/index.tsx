import React, { FC, memo, useState, useMemo, useEffect } from "react";
import { IconButton, Grid, SvgIcon, Icon } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";

import DigitBoard from "../../containers/DigitBoard";

import useStyles from "../../styles/playBoard";
import classNames from "classnames";

import { sudokuValue, PlayHistory } from "../../types";
import { Props } from "../../containers/PlayBoard";
import { numberIcons } from "../../consts/elements";
import { optionNumber } from "../../algrithm/optionNumber";

function comparePlayBoardBlock(prevProps: any, nextProps: any) {
	if (prevProps.unchangeable === true) return true;
	return (
		prevProps.num === nextProps.num &&
		prevProps.showUnchangeable === nextProps.showUnchangeable &&
		prevProps.className === nextProps.className
	);
}

const NumberIcon: FC<{
	num: sudokuValue;
	initNum:sudokuValue;
	showUnchangeable: boolean;
	className: any;
}> = memo(({ num, initNum, showUnchangeable, className }) => {
	const classes = useStyles();
	if (initNum !== undefined)
		return (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				xmlnsXlink="http://www.w3.org/1999/xlink"
				className={classNames(
					{
						[classes.unchangeableBlock]: showUnchangeable
					},
					className
				)}
			>
				{numberIcons.get(initNum as number)}
			</svg>
		);
	else {
		if (num === undefined) {
			return (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					xmlnsXlink="http://www.w3.org/1999/xlink"
					className={className}
				>
					<image width="100%" height="100%" xlinkHref="" />
				</svg>
			);
		} else
			return (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					xmlnsXlink="http://www.w3.org/1999/xlink"
					className={className}
				>
					{numberIcons.get(num)}
				</svg>
			);
	}
}, comparePlayBoardBlock);

function compareNumberOption(prevProps:any,nextProps:any){
	return (
		prevProps.num === nextProps.num
	)
}

const NumberOption:FC<{	num:sudokuValue,
						onMouseEnter:Function,
						onClick:Function}>=memo(({num,onMouseEnter,onClick})=>{
	const classes=useStyles();
	const [highlight,setHighlight]=useState(false);
	const toggleHighlight=()=>{
		setHighlight((prev)=>!prev);
	}

	return (
		<div
			onMouseEnter={()=>{onMouseEnter();toggleHighlight()}}
			onClick={()=>{onClick()}}
			onMouseLeave={toggleHighlight}
			className={classNames(classes.optionNumberIcon,{})}
		>
			<NumberIcon
				num={num}
				initNum={undefined}
				showUnchangeable={false}
				className={classNames(classes.optionNumberIcon,{
					[classes.hightLight]:highlight
				})}
			/>
		</div>
	)
},compareNumberOption);

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
		
		toggleDigitBoardAction,
		clearBlockHighlightAction,
		updateSudokuAction,
		chooseDigitStartAction,
		chooseDigitAction,
		playRoundForwardAction,
		blockHighlightAction
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
													} /*This property needs to be configured and set by some button*/
													className={classNames(classes.numberIconNormal, {
														[classes.hightLight]: blockHighlight[line][column],
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
