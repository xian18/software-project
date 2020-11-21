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
            [breakpoints.down('sm')]: {
                maxWidth: '100%',
            },
            maxHeight: '90%',
            maxWidth: '75%',
        },
        modalHeader: {
            background: palette.primary.light,
            borderRadius: 3,
            marginTop: -spacing(3),
            marginLeft: spacing(5),
            marginRight: spacing(5),
            marginBottom: spacing(1),
            boxShadow: colorToShadow(palette.primary.light),
            userSelect: 'none',
        },
        modalTitle: {
            color: palette.primary.contrastText,
            textAlign: 'center',
            margin: spacing(1),
        },
        backdrop: {
            background: palette.primary.main,
        },
    }),
);

export default useStyles;
