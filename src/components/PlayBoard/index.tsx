import React,{FC,memo,useState} from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

export interface Props {
    values:number[][];
}

const PlayBoard:FC<Props>=memo(({values})=>{

    console.log(values);
    const FormRow:FC<{nums:number[]}>=memo(({nums})=>(
        <React.Fragment>
            {nums.map(num=>(
                <Grid item spacing={0}>
                <Button size='small' color='secondary'>{num}</Button>
                </Grid>
            ))}
        </React.Fragment>
    ));

    return (
        <div>
            <Grid container spacing={1}>
                {values.map((nums:number[])=>(
                    <Grid container item spacing={0}>
                        <FormRow nums={nums}/>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
})

export default PlayBoard;