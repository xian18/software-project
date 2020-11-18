import React, { FC, lazy, memo,Suspense } from 'react';
import { Route,Switch, withRouter,RouteComponentProps } from 'react-router';
import Counters from '../containers/Counters';
import SnackBar from '../components/SnackBar';
import withRoot from '../styles/withRoot';
import Progress from '../components/Progress';

import Game from './game';
import Frame from '../containers/Frame';
const Index: FC = memo(() => {

    const routeRender = (Component: JSX.Element) => (props: RouteComponentProps) => (
        <Frame {...props}>
            <Suspense fallback={<Progress />}>{Component}</Suspense>
        </Frame>
    );

    return (
        <React.Fragment>
            <SnackBar>
                <Switch>
                    <Route path='/' render={routeRender(<Game />)} />
                    <Route path='/bbb' component={Counters} />
                </Switch>
            </SnackBar>
        </React.Fragment>
    );
});

export default withRouter(withRoot(Index));
