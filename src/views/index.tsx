import React,{FC,lazy,memo} from 'react';
import {Route,RouteComponentProps,Switch,withRouter} from 'react-router';
import Counters from '../containers/Counters';
import Testmain from '../components/Testmain';
import SnackBar from '../components/SnackBar';
import withRoot from '../styles/withRoot';

const Index:FC=memo(()=>{
    return (
        <React.Fragment>
            <SnackBar>
                <Testmain />
                <Switch>
                    <Route path='/aaa' component={Counters} />
                    <Route path='/bbb' component={Counters} />
                </Switch>
            </SnackBar>
        </React.Fragment>
    )
})

export default withRouter(withRoot(Index));