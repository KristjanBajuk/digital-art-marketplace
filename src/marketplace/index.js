import React from "react";
import {Switch, Route, useRouteMatch, Redirect} from 'react-router-dom';
import List from './List';

const Index = React.memo(() => {
    const match = useRouteMatch();

    return (
        <Switch>
            <Route path={`${match.url}/`} component={List} />
            <Redirect from='*' to={`${match.url}/`} />
        </Switch>
    );
});

export default Index;