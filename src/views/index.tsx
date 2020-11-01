import React,{FC,lazy,memo} from 'react';
import {Route,RouteComponentProps,Switch,withRouter} from 'react-router';

import Counters from '../containers/Counters';
import Dialog from '../components/Dialog'
import Testmain from '../components/Testmain';


const Index:FC=memo(()=>{
    return (
        <>
            <Testmain />
            <Switch>
                <Route path='/aaa' component={Counters} />
                <Route path='/bbb' component={Counters} />
            </Switch>
        </>
    )
})

export default Index;