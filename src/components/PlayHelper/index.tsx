import React,{FC,memo} from 'react';
import {useSnackbar} from 'notistack';

import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';

import {numberIcons} from '../../consts/elements';
import useStyles from '../../styles/playBoard';

import {Props} from '../../containers/PlayHelper';

const PlayHelper:FC<Props>=memo(({blockHighlightAction})=>{
    const classes=useStyles();

    const {enqueueSnackbar,closeSnackbar}=useSnackbar();
    return (
        <React.Fragment>
            <Grid container>
                <Grid container item></Grid>
                {Array.from(numberIcons.keys()).map((value,index)=>(
                    <Grid item>
                        <IconButton onMouseEnter={()=>(blockHighlightAction(value))}>
                            <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" className={classes.numberIconNormal}>
                                {numberIcons.get(value)}
                            </svg>
                        </IconButton>
                    </Grid>
                ))}
            </Grid>
        </React.Fragment>
    )
})

export default PlayHelper;