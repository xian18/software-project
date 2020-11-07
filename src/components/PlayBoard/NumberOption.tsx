import React,{FC,memo,useState} from 'react';

import {sudokuValue} from '../../types';
import useStyles from '../../styles/playBoard';
import classNames from 'classnames';
import NumberIcon from './NumberIcon';

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

export default NumberOption;