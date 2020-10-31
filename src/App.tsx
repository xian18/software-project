import React,{FC,memo} from 'react';
import logo from './logo.svg';
import './App.css';
import {Counters} from './components/Counters'
import {createStore} from 'redux';
import { Provider } from 'react-redux';
import {reducers} from './reducers';
import {BrowserRouter as Router} from 'react-router-dom';
import Index from './views'

export const store=createStore(reducers);

const App:FC=memo(()=>{
  return (
    <Provider store={store}>
      <Router>
        <Index />
      </Router>
    </Provider>
  )
})

export default App;
