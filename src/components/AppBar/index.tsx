import React,{FC,memo,useState,useMemo,MouseEventHandler} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Brightness4 from '@material-ui/icons/Brightness4';
import HelpIcon from '@material-ui/icons/HelpOutline';
import MenuIcon from '@material-ui/icons/Menu';
import PersonIcon from '@material-ui/icons/Person';
import RefreshIcon from '@material-ui/icons/Refresh';
import ArrowBack from '@material-ui/icons/ArrowBack';


import Modal from '../Modal';

import classNames from 'classnames';
import useStyles from '../../styles/appBar';

import {Props} from '../../containers/AppBar';

const Bar:FC<Props>=memo(({onUpdateSudoku,onPlayRoundBackward})=>{
    const classes=useStyles();

    const [open,setOpen]=useState(true);
    const [anchorEl, setAnchorEl] = useState<Element | null>(null);
    const [helper,setHelper]=useState(false);

    const handleClickPerson: MouseEventHandler = ({ currentTarget }) => {
        setAnchorEl(currentTarget);
    };

    const handleClosePerson = () => {
        setAnchorEl(null);
    };

    const toggleHelper=()=>{
        setHelper(prev=>!prev);
    };

    const HelpMessage=useMemo(()=>(
        <Typography>这里是我们要做的东西</Typography>
    )
    ,[open])

    return (
        <>
            <AppBar position='fixed' className={classes.appBar}>
                <Toolbar
                    classes={{ gutters: classes.appBarGutters, regular: classes.regular }}>
                    {useMemo(
                        () => (
                            <IconButton
                                color='inherit'
                                className={classes.menuButton}>
                                <MenuIcon />
                            </IconButton>
                        ),
                        // eslint-disable-next-line
                        [open, classes.menuButton],
                    )}

                    {useMemo(
                        () => (
                            <div className={classNames(classes.rightButtons)}>
                                <IconButton color='inherit' onClick={onPlayRoundBackward}>
                                    <ArrowBack />
                                </IconButton>
                                <IconButton color='inherit' onClick={toggleHelper}>
                                    <HelpIcon />
                                </IconButton>
                                <IconButton color='inherit' onClick={onUpdateSudoku}>
                                    <RefreshIcon />
                                </IconButton>
                                <IconButton color='inherit'>
                                    <Brightness4 />
                                </IconButton>
                                <IconButton color='inherit' onClick={handleClickPerson}>
                                    <PersonIcon />
                                </IconButton>
                            </div>
                        ),
                        // eslint-disable-next-line
                        [open,classes.rightButtons],
                    )}
                    <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClosePerson}>
                        <MenuItem>退出</MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>
            <Modal title='help' open={helper} onClose={toggleHelper}>
                {HelpMessage}
            </Modal>
        </>
    )
})

export default Bar;