import React, { useState, useContext } from 'react';
import { Form, Button, Message } from 'semantic-ui-react';
import styled from 'styled-components';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { useForm } from 'utils/hooks';
import { AuthContext } from 'context/auth';

const Wrapper = styled.div`
    width: 100%;
    max-width: 400px;
    margin: auto;
`;

const LOGIN_USER = gql`
    mutation login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            id
            email
            username
            createdAt
            token
        }
    }
`;

const Login = props => {
    const context = useContext(AuthContext);
    const [errors, setErrors] = useState({});
    const initState = {
        username: '',
        password: '',
    };

    // eslint-disable-next-line
    const { onChange, onSubmit, values } = useForm(loginUserCb, initState);

    const [loginUser, { loading }] = useMutation(LOGIN_USER, {
        // eslint-disable-next-line
        update(_, { data: { login: userData } }) {
            context.login(userData);
            props.history.push('/');
        },

        onError(err) {
            setErrors(err.graphQLErrors[0].extensions.exception.errors);
        },

        variables: values,
    });

    function loginUserCb() {
        loginUser();
    }

    return (
        <Wrapper>
            <Form
                onSubmit={onSubmit}
                noValidate
                className={loading ? 'loading' : ''}
            >
                <h1>Login</h1>
                <Form.Input
                    type="text"
                    label="Username"
                    placeholder="Username"
                    name="username"
                    value={values.username}
                    error={!!errors.username}
                    onChange={onChange}
                />
                <Form.Input
                    type="password"
                    label="Password"
                    placeholder="Password"
                    name="password"
                    value={values.password}
                    error={!!errors.password}
                    onChange={onChange}
                />
                <Button type="submit" positive>
                    Login
                </Button>
            </Form>
            {Object.keys(errors).length > 0 && (
                <Message
                    error
                    header="Please verify your inputs"
                    list={Object.values(errors).map(value => (
                        <li key={value}>{value}</li>
                    ))}
                />
            )}
        </Wrapper>
    );
};

export default Login;
