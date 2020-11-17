import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { createStyles, makeStyles } from '@material-ui/core/styles';

import { colorToShadow } from './index';

const useStyles = makeStyles(({ palette, shadows, spacing, breakpoints }: Theme) =>
    createStyles({
        modalContainer: {
            display: 'flex',
            alignItems:'center',
            justifyContent: 'center',
        },
        modal: {
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            borderRadius: 10,
            //boxShadow: shadows[5],
            padding: spacing(1),
            outline: 'none',
            [breakpoints.down('xs')]: {
                maxWidth: '100%',
            },
            maxHeight: '100%',
            maxWidth: '100%',
        },
        digitsContainer:{
            display:'flex',
            maxWidth:'35%',
            margin:'auto',
            backgroundColor:palette.primary.main,
        },
        digitButton:{
            color:palette.secondary.light,
            borderRadius:15,
            margin:spacing(2),
        },
        backdrop: {
            background: palette.primary.main,
        },
    }),
);

export default useStyles;
