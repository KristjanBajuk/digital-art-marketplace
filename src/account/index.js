import React from "react";
import Mint from './mint';
import Profile from './profile';
import Settings from './settings';
import { Switch, Route, useRouteMatch, Redirect } from 'react-router-dom';

const Index = React.memo(() => {
    const match = useRouteMatch();

    return (
        <Switch>
            <Route path={`${match.url}/settings`} component={Settings}/>
            <Route path={`${match.url}/`} component={Profile} />
            <Redirect from='*' to={`${match.url}/`} />
        </Switch>
    );
});

Index.Mint = Mint;

export default Index;