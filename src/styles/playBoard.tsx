import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(({ palette, shadows, spacing, breakpoints }: Theme) =>
    createStyles({
        playBoardContainer: {
            display: 'flex',
            transform: 'translate(-50%,-50%)',
            position: 'fixed',
            top: '50%',
            left: '50%',
            width: '83.5vmin',
            height: '83.5vmin',

            backgroundColor: `${palette.boardBackgroundColor?.main}`,
        },
        PlayBoardLine: {
            margin: spacing(0),
            padding: spacing(0),
            height: '9vmin',
            width: '9vmin',
        },
        playBoardBlockContainer: {
            position: 'relative',
            margin: spacing(0),
            padding: spacing(0),
            cursor: 'pointer',
            textAlign: 'center',
            verticalAlign: '',
            borderRadius: '0',

            backgroundColor: `${palette.numberBackgroundColor?.main}`,
            color: `${palette.numberBackgroundColor?.contrastText}`,
        },
        hightLight: {
            margin: 0,
            padding: 0,

            backgroundColor: `${palette.hightLightNumberBackgroundColor?.main}`,
            color: `${palette.hightLightNumberBackgroundColor?.contrastText}`,
        },
        numberIconNormal: {
            margin: 0,
            padding: 0,
            width: '9vmin',
            height: '9vmin',
            borderRadius: '20%',
        },
        hideUndefinedIcon: {
            display: 'none',
        },
        backdrop: {
            background: palette.primary.light,
        },

        rightPaddingBorder: {
            paddingRight: '0.3vmin',
            borderRight: '0.5vmin solid black',
        },
        leftPadding: {
            paddingLeft: '0.3vmin',
        },
        bottomPaddingBorder: {
            paddingBottom: '0.3vmin',
            borderBottom: '0.5vmin solid black',
        },
        topPadding: {
            paddingTop: '0.3vmin',
        },
        unchangeableBlock: {
            backgroundColor: 'orange',
        },
        optionNumberIcon: {
            //background:"blue",
            width: '2.5vmin',
            height: '2.5vmin',
            cursor: 'pointer',

            backgroundColor: `${palette.optionNumberBackgroudColor?.main}`,
            color: `${palette.optionNumberBackgroudColor?.contrastText}`,
        },
        optionNumberBlock: {
            width: '9vmin',
            height: '9vmin',
            //padding:"0vmin",
            //margin:"0vmin",
            position: 'relative',
            fontSize: '0rem',
        },
        optionalNumberTopPadding: {
            paddingTop: '0.4vmin',
            //background:"blue",
        },
        conflictOne: {
            backgroundColor: 'blue',
        },
        conflictTwo: {
            backgroundColor: 'red',
        },
        conflictThree: {
            backgroundColor: 'black',
        },
        conflictFour: {
            backgroundColor: 'yellow',
        },
        conflictFive: {
            backgroundColor: 'green',
        },
        conflictSix: {
            backgroundColor: 'purple',
        },
        conflictSeven: {
            backgroundColor: 'gray',
        },
        conflictEight: {
            backgroundColor: '#eeeeee',
        },
        conflictNine: {
            backgroundColor: 'red',
        },
    }),
);

export default useStyles;
