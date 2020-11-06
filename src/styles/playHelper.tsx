import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { createStyles, makeStyles } from '@material-ui/core/styles';

import { colorToShadow } from './index';
import { Height } from '@material-ui/icons';

const useStyles = makeStyles(({ palette, shadows, spacing, breakpoints }: Theme) =>
    createStyles({
        hightLight:{
            backgroundColor:'gray',
            margin:0,
            padding:0,
            width:"80px",
            height:"80px"
        },
        numberIconNormal:{
            margin:0,
            padding:0,
            width:"90px",
            height:"90px"
        },
    }),
);

export default useStyles;
