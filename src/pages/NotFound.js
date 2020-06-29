import React from 'react';
import { Message } from 'semantic-ui-react';

const NotFound = () => (
    <Message negative>
        <Message.Header>404</Message.Header>
        <p>Page not found</p>
    </Message>
);

export default NotFound;
