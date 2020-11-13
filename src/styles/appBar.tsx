import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { createStyles, makeStyles } from '@material-ui/core/styles';

import { drawerWidth } from './index';

const useStyles = makeStyles(({ zIndex, palette, transitions, spacing, breakpoints }: Theme) =>
    createStyles({
        appBar: {
            zIndex: zIndex.drawer + 1,
            background: `${palette.primary.main}`, //`linear-gradient(60deg, ${palette.primary.main}, ${palette.primary.dark})`,
            transition: transitions.create(['width', 'margin'], {
                easing: transitions.easing.sharp,
                duration: transitions.duration.leavingScreen,
            }),
        },
        appBarShift: {
            marginLeft: drawerWidth,
            width: `calc(100% - ${drawerWidth}px)`,
            transition: transitions.create(['width', 'margin'], {
                easing: transitions.easing.sharp,
                duration: transitions.duration.enteringScreen,
            }),
        },
        appBarGutters: {
            paddingRight: 0,
        },
        regular: {
            minHeight: spacing(8),
            [breakpoints.down('xs')]: {
                minHeight: spacing(6),
            },
        },
        menuButton: {
            marginLeft: spacing(2),
            marginRight: spacing(4),
            [breakpoints.down('xs')]: {
                marginLeft: 0,
                marginRight: 0,
                padding: spacing(1),
            },
        },
        rightButtons: {
            marginLeft: 'auto',
            display: 'flex',
            '& button': {
                [breakpoints.down('xs')]: {
                    padding: spacing(1),
                },
            },
        },
        hide: {
            display: 'none',
        },
        suggestion: {
            padding: spacing(2),
            overflowY: 'auto',
        },
        collapse: {
            zIndex: zIndex.drawer + 1,
            position: 'fixed',
            top: spacing(8),
            [breakpoints.down('xs')]: {
                top: spacing(6),
            },
            right: 0,
        },

        hideButton: {
            top: spacing(0),
        },
        hideButtonShowing: {
            display: 'flex',
            position: 'fixed',
            right: 0,
        },
    }),
);

export default useStyles;
