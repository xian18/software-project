import React, { FC, memo } from 'react';
import {Grid,Button} from '@material-ui/core';


export interface localProps {
    numbers:number[][];
    onMouseEnter:Function;
    onClick:Function;
}

const Digits:FC<localProps>=memo(
    ({numbers,onMouseEnter,onClick})=>{
    
    return (
        <Grid container spacing={1}>
        {numbers.map((nums, index) => (
            <Grid key={`DigitBoardLine${index}`} container item spacing={0}>
                {nums.map((num, index) => (
                    <Grid key={`DigitBoard${num}`} item spacing={0}>
                        <Button
                            size='small'
                            color='secondary'
                            onMouseEnter={() => {
                                onMouseEnter(num);
                            }}
                            onClick={()=>{
                                onClick(num);
                            }}>
                            {num}
                        </Button>
                    </Grid>
                ))}
            </Grid>
        ))}
    </Grid>
    );
})

export default Digits;