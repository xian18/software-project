import React,{FC,memo,useState,useMemo,MouseEventHandler,useContext} from 'react';
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
import ArrowBack from '@material-ui/icons/ArrowBack';
import Tooltip from '@material-ui/core/Tooltip';
import Drawer from '../Drawer';
import Slide from '@material-ui/core/Slide';
import Button from '@material-ui/core/Button';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';

import Modal from '../Modal';
import classNames from 'classnames';
import useStyles from '../../styles/appBar';

import {Props} from '../../containers/AppBar';
import { ThemeContext } from '../../styles/withRoot';
import {TipButton} from '../SmallComponents/'
import { title } from 'process';


const Bar:FC<Props>=memo(({updateSudokuAction,playRoundBackwardAction})=>{
    const classes=useStyles();

    const [open,setOpen]=useState(false);
    const [right,setRight]=useState(false);
    const [anchorEl, setAnchorEl] = useState<Element | null>(null);
    const [helper,setHelper]=useState(false);
    const [drawer,setDrawer]=useState(false);
    const { darkMode, setDarkMode } = useContext(ThemeContext);

    const handleClickPerson: MouseEventHandler = ({ currentTarget }) => {
        setAnchorEl(currentTarget);
    }

    const handleClosePerson = () => {
        setAnchorEl(null);
    }

    const toggleOpen=()=>{
        setOpen((open)=>!open);
    }

    const toggleRight=()=>{
        setRight((right)=>!right);
    }

    const toggleHelper=()=>{
        setHelper(prev=>!prev);
    }

    const toggleDrawer=()=>{
        setDrawer((drawer)=>!drawer);
    }

    const HelpMessage=useMemo(()=>(
        <Typography>这里是我们要做的东西</Typography>
    )
    ,[open])

    const trigger = useScrollTrigger({ target:undefined });

    return (
        <>
            
            <Slide appear={false} direction="down" in={open}>
                <AppBar position='fixed' className={classNames(classes.appBar,{
                    [classes.appBarShift]:right,
                })}>
                    <Toolbar
                        disableGutters={!right}
                        classes={{ gutters: classes.appBarGutters, regular: classes.regular }}>
                        {useMemo(
                            () => (
                                <IconButton
                                    color='inherit'
                                    className={classNames(classes.menuButton,
                                        {

                                        })}
                                    onClick={()=>{
                                        toggleDrawer();
                                        toggleRight();
                                    }}>
                                    <MenuIcon />
                                </IconButton>
                            ),
                            // eslint-disable-next-line
                            [right, classes.menuButton],
                        )}

                        {useMemo(
                            () => (
                                <div className={classNames(classes.rightButtons)}>
                                    <TipButton 
                                        TooltipProp={{title:"GoBack",children:<></>}} 
                                        IconButtonProp={{onClick:()=>playRoundBackwardAction(),color:"inherit"}}
                                    >
                                        <ArrowBack />
                                    </TipButton>
                                    <TipButton 
                                        TooltipProp={{title:"Help",children:<></>}} 
                                        IconButtonProp={{onClick:()=>toggleHelper(),color:"inherit"}}
                                    >
                                        <HelpIcon />
                                    </TipButton>
                                    <TipButton 
                                        TooltipProp={{title:"Dark",children:<></>}} 
                                        IconButtonProp={{onClick:()=>{},color:"inherit"}}
                                    >
                                        <Brightness4 />
                                    </TipButton>
                                    <TipButton 
                                        TooltipProp={{title:"Logout",children:<></>}} 
                                        IconButtonProp={{onClick:handleClickPerson,color:"inherit"}}
                                    >
                                        <PersonIcon />
                                    </TipButton>
                                </div>
                            ),
                            // eslint-disable-next-line
                            [right,classes.rightButtons],
                        )}
                        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClosePerson}>
                            <MenuItem>退出</MenuItem>
                        </Menu>
                    </Toolbar>
                </AppBar>
            </Slide>
            <Modal title='help' open={helper} onClose={toggleHelper}>
                    {HelpMessage}
                </Modal>
            <Drawer open={drawer}/>
            <Button variant='contained' color='primary' onClick={toggleOpen}><Typography>Hide</Typography></Button>
        </>
    )
})

export default Bar;