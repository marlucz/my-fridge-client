import React from 'react';
import { ApolloConsumer } from '@apollo/react-hooks';

const withClient = Component => {
    return function contextComponent(props) {
        return (
            <ApolloConsumer>
                {client => <Component {...props} client={client} />}
            </ApolloConsumer>
        );
    };
};

export default withClient;
