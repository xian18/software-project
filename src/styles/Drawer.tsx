import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(({ palette, shadows, spacing, breakpoints }: Theme) =>
    createStyles({
        list: {
            width: 250,
          },
          fullList: {
            width: 'auto',
          },
    })
)

export default useStyles;