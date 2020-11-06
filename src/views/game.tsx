import React,{FC,memo} from 'react';

import PlayBoard from '../containers/PlayBoard';
import PlayHelper from '../containers/PlayHelper';
import AppBar from '../containers/AppBar';

const Game:FC=memo(({})=>{

    return (
        <>
            <PlayBoard />
            <PlayHelper />
        </>
    )
})

export default Game;