import { HotKeys } from "react-hotkeys";
import React,{FC,memo,useCallback} from 'react';

const customHotKeys:FC = memo(({children}) => {
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
        <HotKeys keyMap={keyMap} handlers={handlers}>
          {children}
        </HotKeys>
    )
})

export default customHotKeys;