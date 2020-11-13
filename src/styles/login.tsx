import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(({ palette, shadows, spacing, breakpoints }: Theme) =>
    createStyles({
        margin: {
            margin: spacing(1),
        },
    }),
);

export default useStyles;
