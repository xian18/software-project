import {GlobalHotKeys } from "react-hotkeys";
import React,{FC,memo, useCallback} from 'react';
import {Props} from '../../containers/HotKeys';

import {sudokuValue,PlayHistory} from '../../types';
import {useSnackbar} from 'notistack';

const customHotKeys:FC<Props> = memo(
  ({values,initValues,playHistorys,playRound,loadGameAction}) => {
  
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const keyMap = {
    SAVE_GAME:['ctrl+s'],
    LOAD_GAME:['ctrl+l'],
  };

  const handleSaveGame=useCallback(()=>{
    localStorage.setItem('values',JSON.stringify(values));
    localStorage.setItem('initValues',JSON.stringify(initValues));
    localStorage.setItem('playHistorys',JSON.stringify(playHistorys));
    enqueueSnackbar('save game success!',{variant:'info'});
  },[values,initValues,playHistorys,playRound])

  const handleLoadGame=useCallback(()=>{
    let valuesSerialized=localStorage.getItem('values');
    let initValuesSerialized=localStorage.getItem('initValues');
    let playHistorysSerialized=localStorage.getItem('playHistorys');
    if(valuesSerialized && initValuesSerialized && playHistorysSerialized){
        let values:sudokuValue[][]=JSON.parse(valuesSerialized);
        let initValues:sudokuValue[][]=JSON.parse(initValuesSerialized);
        let playHistorys:PlayHistory[]=JSON.parse(playHistorysSerialized);
        loadGameAction(values,initValues,playHistorys);
        enqueueSnackbar('load game success!',{variant:'info'});
    }else{
      enqueueSnackbar('load game fail!',{variant:'error'});
    }
  },[])

  const handlers = {
    SAVE_GAME: (event)=>{
      event.preventDefault();
      handleSaveGame();
    },
    LOAD_GAME:handleLoadGame,
  };

  return (
        <GlobalHotKeys keyMap={keyMap} handlers={handlers} allowChanges/>
    )
})

export default customHotKeys;