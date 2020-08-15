import React from 'react';
import App from 'App';
import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createUploadLink } from 'apollo-upload-client';
// import { createHttpLink } from "apollo-link-http";
import { ApolloProvider } from '@apollo/react-hooks';
import { setContext } from 'apollo-link-context';

const httpLink = createUploadLink({
    // uri: 'https://my-fridge-server.herokuapp.com/',
    uri: 'http://localhost:5000/',
});

const authLink = setContext(() => {
    const token = localStorage.getItem('token');

    return {
        headers: {
            Authorization: token ? `Bearer ${token}` : '',
        },
    };
});

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
    connectToDevTools: true,
});

const Provider = () => (
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>
);

export default Provider;
