import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { createStyles, makeStyles } from '@material-ui/core/styles';

import { colorToShadow } from './index';
import { Height } from '@material-ui/icons';

const useStyles = makeStyles(({ palette, shadows, spacing, breakpoints }: Theme) =>
    createStyles({
        playBoardContainer:{
            position:'relative',
            //display:'flex',
            height:'100%',
            width:'100%',
            top:"0px",
            left:"0px"
        },
        PlayBoardLine:{
            margin:spacing(0),
            padding:spacing(0),
            //marginBottom:"-5px"
        },
        playBoardBlockContainer:{
            position:'relative',
            margin:spacing(0),
            padding:spacing(0),
            cursor:'pointer',
            textAlign:'center',
            verticalAlign:'',
        },
        hightLight:{
            backgroundColor:'gray',
            margin:0,
            padding:0,
            width:"80px",
            height:"80px"
        },
        normal:{
            margin:0,
            padding:0,
            width:"80px",
            height:"80px"
        },
        backdrop: {
            background: palette.primary.main,
        },
        playBoardBlockButton:{
            margin:0,
            padding:0,
            position:"relative",
        },

    }),
);

export default useStyles;
