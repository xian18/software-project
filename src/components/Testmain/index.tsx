import React,{FC,memo,useState} from 'react';

import Modal from '../Modal';
import Dialog from '../Dialog';
import Counters from '../../containers/Counters';

import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import useTheme from '@material-ui/core/styles/useTheme';
import useMediaQuery from '@material-ui/core/useMediaQuery/useMediaQuery';

export interface Props {

}

const Testmain:FC<Props>=memo(()=>{
    const [modal,setModal]=useState(false);

    const toggleOpen=(name:string)=>()=>{
        if(name=='modal') setModal(!modal);
    }

    const theme=useTheme();
    const isMobile=useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <>
            <Counters />
            <Card>
                <div>
                    <a>aaa</a>
                </div>
            </Card>
            <Button variant='contained' color='primary' onClick={toggleOpen('modal')}>
                Open Modal
            </Button>
            <Modal open={modal} title='发送通知' onClose={toggleOpen('modal')}>
                <Typography>This is children</Typography>
            </Modal>
        </>
    );
})

export default Testmain;