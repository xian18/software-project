import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { createStyles, makeStyles } from '@material-ui/core/styles';

import { colorToShadow } from './index';

const useStyles = makeStyles(({ palette, shadows, spacing, breakpoints }: Theme) =>
    createStyles({
        modalContainer: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        modal: {
            display: 'flex',
            flexDirection: 'column',
            position: 'absolute',
            borderRadius: 6,
            backgroundColor: palette.background.paper,
            boxShadow: shadows[5],
            padding: spacing(1),
            outline: 'none',
            [breakpoints.down('xs')]: {
                maxWidth: '100%',
            },
            maxHeight: '90%',
            maxWidth: '75%',
        },
        backdrop: {
            background: palette.primary.main,
        },
    }),
);

export default useStyles;