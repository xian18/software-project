import {GlobalHotKeys } from "react-hotkeys";
import React,{FC,memo} from 'react';
import {Props} from '../../containers/HotKeys';


const customHotKeys:FC<Props> = memo(
  ({saveGameAction,loadGameAction}) => {
  
  const keyMap = {
    SAVE_GAME:['ctrl+s'],
    LOAD_GAME:['ctrl+l'],
  };

  const handlers = {
    SAVE_GAME: (event)=>{
      event.preventDefault();
      saveGameAction();
    },
    LOAD_GAME:loadGameAction,
  };

  return (
        <GlobalHotKeys keyMap={keyMap} handlers={handlers} />
    )
})

export default customHotKeys;