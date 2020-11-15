import React, { FC, lazy, memo } from 'react';
import { Route,Switch, withRouter } from 'react-router';
import Counters from '../containers/Counters';
import SnackBar from '../components/SnackBar';
import withRoot from '../styles/withRoot';
import HotKeys from '../containers/HotKeys';

import AppBar from '../containers/AppBar';
import Game from './game';
const Index: FC = memo(() => {
    return (
        <React.Fragment>
            <SnackBar>
                <HotKeys />
                <AppBar />
                <Switch>
                    <Route path='/' component={Game} />
                    <Route path='/bbb' component={Counters} />
                </Switch>
            </SnackBar>
        </React.Fragment>
    );
});

export default withRouter(withRoot(Index));
