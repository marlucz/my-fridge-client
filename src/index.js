import React from 'react';
import ReactDOM from 'react-dom';
import ApolloPovider from 'ApolloProvider';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<ApolloPovider />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
