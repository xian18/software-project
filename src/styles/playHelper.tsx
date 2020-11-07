import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { createStyles, makeStyles } from '@material-ui/core/styles';

import { colorToShadow } from './index';
import { Height } from '@material-ui/icons';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        hightLight:{
            backgroundColor:'gray',
        },
        numberIconNormal:{
            margin:0,
            padding:0,
            height:"8vmin",
            width:"8vmin",
        },
        numberContainerNormal:{
            margin:0,
            padding:0,
            width:"8vmin",
            height:"8vmin",
        },
        numbers:{
            
        },
        root:{
            [theme.breakpoints.up("md")]:{
                width:"5vmax",
                height:"95vmin",
                display:'flex',
                //transform: 'translate(-50%,-50%)',
                position: 'fixed',
                top: "5vmin",
                left: "90vmax",
            }
        },
        buttomNormal:{
            height:"3vmin",
            width:"3vmin",
            margin:0,
            padding:0,
            border:0,
            fontSize:"0.05rem",
        }
    }),
);

export default useStyles;
