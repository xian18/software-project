import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { createStyles, makeStyles } from '@material-ui/core/styles';

import { colorToShadow } from './index';
import { Height } from '@material-ui/icons';

const useStyles = makeStyles(({ palette, shadows, spacing, breakpoints }: Theme) =>
    createStyles({
        playBoardContainer:{
            //position:'absolute',
            display:'flex',
            transform: 'translate(-50%,-50%)',
            position: 'fixed',
            top: "50%",
            left: "50%",
            width:"75vmin",
            height:"72vmin"
        },
        PlayBoardLine:{
            margin:spacing(0),
            padding:spacing(0),
            height:"8vmin"
            //marginBottom:"-5px"
        },
        playBoardBlockContainer:{
            position:'relative',
            margin:spacing(0),
            padding:spacing(0),
            cursor:'pointer',
            textAlign:'center',
            verticalAlign:'',
            borderRadius:'0',
        },
        hightLight:{
            backgroundColor:'gray',
            margin:0,
            padding:0,
        },
        numberIconNormal:{
            margin:0,
            padding:0,
            width:"8vmin",
            height:"8vmin",
            
        },
        backdrop: {
            background: palette.primary.main,
        },
        playBoardBlockButton:{
            margin:0,
            padding:0,
            position:"relative",
            
        },
        rightPaddingBorder:{
            paddingRight:"0.3vmin",
            borderRight:'0.5vmin solid black',
        },
        leftPadding:{
            paddingLeft:"0.3vmin",
        },
        bottomPaddingBorder:{
            paddingBottom:"0.3vmin",
            borderBottom:'0.5vmin solid black',
        },
        topPadding:{
            paddingTop:"0.3vmin",
        },
        unchangeableBlock:{
            backgroundColor:'orange',
        },
        optionNumberIcon:{
            background:"blue",
            width:"2.5vmin",
            height:"2.5vmin",
        },
        optionNumberBlock:{
            width:"8vmin",
            height:"8vmin",
            padding:"0vmin",
            margin:"0vmin",
            position:"relative",
        }
    }),
);

export default useStyles;
