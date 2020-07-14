import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import 'semantic-ui-css/semantic.min.css';
import './App.css';

import { AuthProvider } from 'context/auth';
import { AuthRoute, UnauthRoute } from 'utils/routeAuthenticate';

import Spinner from 'components/Spinner/Spinner';

const MenuBar = lazy(() => import('components/MenuBar/MenuBar'));
const Home = lazy(() => import('pages/Home'));
const Login = lazy(() => import('pages/Login'));
const Register = lazy(() => import('pages/Register'));
const NotFound = lazy(() => import('pages/NotFound'));
const ProductPage = lazy(() => import('pages/ProductPage'));

function App() {
    return (
        <AuthProvider>
            <Router>
                <Suspense fallback={<Spinner />}>
                    <Container>
                        <MenuBar />
                        <Switch>
                            <AuthRoute exact path="/" component={Home} />
                            <AuthRoute
                                exact
                                path="/products/:productId"
                                component={ProductPage}
                            />
                            <UnauthRoute
                                exact
                                path="/login"
                                component={Login}
                            />
                            <UnauthRoute
                                exact
                                path="/register"
                                component={Register}
                            />
                            <Route component={NotFound} />
                        </Switch>
                    </Container>
                </Suspense>
            </Router>
        </AuthProvider>
    );
}

export default App;
