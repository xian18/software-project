import React, { FC,memo,MouseEvent, MouseEventHandler,useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

import useStyles from '../../styles/Drawer';

export interface DrawerItem {
  text:string;
  icon:any;
  handler:Function;
}

export interface localProps {
  open:boolean;
  onOpen:()=>void;
  onClose:()=>void;
}

const Drawer:FC<localProps>=memo(({open,onOpen,onClose})=>{

  const classes = useStyles();

  const items:DrawerItem[]=[
    {
      text:'Inbox',
      icon:<InboxIcon />,
      handler:()=>{console.log('Drawer Inbox')},
    },{
      text:'Starred',
      icon:<MailIcon />,
      handler:()=>{console.log('Drawer MailIcon')},
    }
  ]

  const list=(drawerItems:DrawerItem[])=>{
    {
      return (
        drawerItems.map((item:DrawerItem,index:number)=>{
          return (
            <ListItem button key={item.text}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText>{item.text}</ListItemText>
            </ListItem>
          );
        })
      )
    }
  }

  return (
    <div>
        <React.Fragment>
            <SwipeableDrawer
                open={open}
                onClose={onClose}
                onOpen={onOpen}
            >
              <div
                role="presentation"
                onClick={onClose}
                onKeyDown={onClose}
              >
                <List>
                  <>
                    {list(items)}
                  </>
                </List>
              </div>
            </SwipeableDrawer>
        </React.Fragment>
    </div>
  )
})

export default Drawer;