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
import Tooltip from '@material-ui/core/Tooltip';


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

    const MyButton:FC<{title:string,onClick?:Function}>=memo(({children,title,onClick=()=>{}})=>(
        <Tooltip title={title} arrow>
            <IconButton color='inherit' onClick={()=>onClick()}>
                {children}
            </IconButton>
        </Tooltip>
    ));

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
                                <MyButton title='GoBack' onClick={onPlayRoundBackward}>
                                    <ArrowBack />
                                </MyButton>
                                <MyButton title='Help' onClick={toggleHelper}>
                                    <HelpIcon />
                                </MyButton>
                                <MyButton title='Dark'>
                                    <Brightness4 />
                                </MyButton>
                                <MyButton title='Logout' onClick={handleClickPerson}>
                                    <PersonIcon />
                                </MyButton>
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