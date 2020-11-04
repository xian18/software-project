import React,{FC,memo,useRef} from 'react';
import {SnackbarProvider} from 'notistack';
import Cancel from '@material-ui/icons/Cancel'
import useStyles from '../../styles/snackBar';

const SnackBar:FC=memo(({children})=>{
    const classes=useStyles();
    return (
        <SnackbarProvider
            iconVariant={{
                success: '✅',
                error: '✖️',
                warning: '⚠️',
                info: 'ℹ️',
            }}
            dense={false}
            preventDuplicate
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
            }}
            classes={{
                variantSuccess: classes.success,
                variantError: classes.error,
                variantWarning: classes.warning,
                variantInfo: classes.info,
            }}
           >
            {children}
        </SnackbarProvider>
    )
});

export default SnackBar;