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
            display:"flex",
        },
        numberContainerNormal:{
            margin:0,
            padding:0,
            [theme.breakpoints.up("lg")]:{
                width:"18vmin",
                height:"50vmin",
                display:'flex',
                transform: 'translate(-0%,-50%)',
                position: 'fixed',
                top: "50vh",
                left: "85vw",
            },
            [theme.breakpoints.only("md")]:{
                width:"8vmin",
                height:"80vh",
                display:'flex',
                transform: 'translate(0%,-50%)',
                position: 'fixed',
                top: "50vh",
                left: "91vw",
            }
        },
        buttomNormal:{
            height:"3vmin",
            width:"3vmin",
            margin:0,
            padding:0,
            border:0,
            fontSize:"0.05rem",
        },
        haveBorder:{
            border:"0.7vmin solid black",
            borderRadius:"20%",
        },
    }),
);

export default useStyles;
