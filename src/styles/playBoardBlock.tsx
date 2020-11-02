import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { createStyles, makeStyles } from '@material-ui/core/styles';

import { colorToShadow } from './index';

const useStyles = makeStyles(({ palette, shadows, spacing, breakpoints }: Theme) =>
    createStyles({
        PlayBoardLine:{

        },
        playBoardBlock:{
            position:'relative',
            width:spacing(10),
            height:spacing(5),
            margin:spacing(0),
            padding:spacing(0),
            backgroundColor:'orange',
            cursor:'pointer',
            textAlign:'center',
            verticalAlign:''
        },
        backdrop: {
            background: palette.primary.main,
        },
        hightLight:{
            backgroundColor:'red',
        },
        dehighLight:{
            backgroundColor:'blue'
        }
    }),
);

export default useStyles;
