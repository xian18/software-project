import React,{FC,memo} from 'react';

import PlayBoard from '../containers/PlayBoard';
import PlayHelper from '../containers/PlayHelper';
import Share from '../components/Share';
import AppBar from '../containers/AppBar';

const Game:FC=memo(({})=>{

    return (
        <>
            <PlayBoard />
            <PlayHelper />
            <Share content={''}/>
        </>
    )
})

export default Game;