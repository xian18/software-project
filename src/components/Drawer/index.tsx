import React, { FC,memo,useState } from 'react';

import classNames from 'classnames';

import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import HomeIcon from '@material-ui/icons/Home';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';


import useStyles from '../../styles/drawer';

import Anchor from '../Anchor';

export interface localProps {
  open:boolean;
}

const listItems=[
  {
    icon:<DashboardIcon />,
    text:'dashboard',
  },{
    icon:<HomeIcon />,
    text:'home',
  }
]

const CustomDrawer: FC<localProps> = memo(({open}) => {
    const classes = useStyles();

    return (
        <Drawer
            variant='permanent'
            classes={{ paper: classNames(classes.drawerPaper, !open && classes.drawerPaperClose) }}
            open={open}>
            <div className={classes.toolbar}>
            </div>
            <Divider />
            <List>
              {listItems.map(({icon,text}, index) => (
                <ListItem button>
                  <ListItemIcon className={classes.icon}>{icon}</ListItemIcon>
                  <ListItemText primary={text} />
                </ListItem>
                ))}
            </List>
        </Drawer>
    );
});

export default CustomDrawer;