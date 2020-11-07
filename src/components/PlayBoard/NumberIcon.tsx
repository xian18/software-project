import React,{FC,memo} from 'react';

import {sudokuValue} from '../../types';
import useStyles from '../../styles/playBoard';
import classNames from 'classnames';
import { numberIcons } from "../../consts/elements";

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
					className={classNames(className,{})}
				>
					<image width="100%" height="100%" xlinkHref="" />
				</svg>
			);
		} else
			return (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					xmlnsXlink="http://www.w3.org/1999/xlink"
					className={classNames(className,{})}
				>
					{numberIcons.get(num)}
				</svg>
			);
	}
}, comparePlayBoardBlock);

export default NumberIcon;