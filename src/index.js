import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';
import Themes from './@components/themes';

import Marketplace from './marketplace';
import Account from './account';

import UI from './@components/UI';


const Index = () => {
    return (
        <Box>
            <UI.AppBar />
            <Toolbar variant="dense" />
            <Switch>
                <Route path="/create" component={Account.Mint} />
                <Route path="/" component={Marketplace} />
                <Redirect from='*' to="/" />
            </Switch>
        </Box>
    )
}

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter basename={''}>
            <ThemeProvider theme={Themes.Light}>
                <Index/>
            </ThemeProvider>
        </BrowserRouter>
    </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
