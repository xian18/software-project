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
            borderRadius:"20%",
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
        haveBorder:{
            border:"0.7vmin solid black",
            borderRadius:"20%",
        },
        iconButtonContainer:{
            height:"8vmin",
            width:"8vmin",
        },
        iconButtonIcon:{
            height:"5.5vmin",
            width:"5.5vmin",
            //fontSize:"6vmin",
            color:"#000000",
        },
        hideElement:{
            display:"none",
        }
    }),
);

export default useStyles;
