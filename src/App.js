import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import 'semantic-ui-css/semantic.min.css';
import './App.css';

import { AuthProvider } from 'context/auth';
import { AuthRoute, UnauthRoute } from 'utils/routeAuthenticate';

import MenuBar from 'components/MenuBar/MenuBar';
import Home from 'pages/Home';
import Login from 'pages/Login';
import Register from 'pages/Register';
import NotFound from 'pages/NotFound';

function App() {
    return (
        <AuthProvider>
            <Router>
                <Container>
                    <MenuBar />
                    <Switch>
                        <AuthRoute exact path="/" component={Home} />
                        <UnauthRoute exact path="/login" component={Login} />
                        <UnauthRoute
                            exact
                            path="/register"
                            component={Register}
                        />
                        <Route component={NotFound} />
                    </Switch>
                </Container>
            </Router>
        </AuthProvider>
    );
}

export default App;
