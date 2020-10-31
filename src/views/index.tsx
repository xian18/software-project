import React,{FC,lazy,memo} from 'react';
import {Route,RouteComponentProps,Switch,withRouter} from 'react-router';

import Counters from '../containers/Counters'

const Index:FC=memo(()=>{
    return (
        <>
            <Counters />
            <Counters />
            <Counters />
            <Switch>
                <Route path='/aaa' component={Counters} />
                <Route path='/bbb' component={Counters} />
            </Switch>
        </>
    )
})

export default Index;