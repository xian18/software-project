import { HotKeys } from "react-hotkeys";
import React,{FC,memo,useCallback} from 'react';

const customHotKeys:FC = memo(() => {
  const deleteNode = React.useCallback(() => {
    console.log("aaaaaa");
  }, [])
  
  const keyMap = {
    SNAP_LEFT: "command+left",
    DELETE_NODE: ['w'],
  };

  const handlers = {
    DELETE_NODE: deleteNode
  };

  return (
        <HotKeys keyMap={keyMap}>
            <HotKeys handlers={handlers}>Node contents</HotKeys>
        </HotKeys>
    )
})

export default customHotKeys;