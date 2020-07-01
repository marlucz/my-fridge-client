import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import 'semantic-ui-css/semantic.min.css';
import './App.css';

import MenuBar from 'components/MenuBar/MenuBar';
import Home from 'pages/Home';
import Login from 'pages/Login';
import Register from 'pages/Register';
import NotFound from 'pages/NotFound';

function App() {
    return (
        <Container>
            <Router>
                <MenuBar />
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/register" component={Register} />
                    <Route component={NotFound} />
                </Switch>
            </Router>
        </Container>
    );
}

export default App;
