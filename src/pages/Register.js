import React, { useState, useContext } from 'react';
import { Form, Button, Message } from 'semantic-ui-react';
import styled from 'styled-components';
import { useMutation } from '@apollo/react-hooks';

import { AuthContext } from 'context/auth';
import { useForm } from 'hooks/useForm';

import { REGISTER_USER } from 'graphql/mutations';

const Wrapper = styled.div`
    width: 100%;
    max-width: 400px;
    margin: auto;
`;

const Register = props => {
    const context = useContext(AuthContext);
    const [errors, setErrors] = useState({});
    const initState = {
        username: '',
        email: '',
        password: '',
        passwordConfirm: '',
    };

    // eslint-disable-next-line
    const { onChange, onSubmit, values } = useForm(registerUser, initState);

    const [addUser, { loading }] = useMutation(REGISTER_USER, {
        // eslint-disable-next-line
        update(_, { data: { register: userData } }) {
            context.login(userData);
            props.history.push('/');
        },

        onError(err) {
            setErrors(err.graphQLErrors[0].extensions.exception.errors);
        },

        variables: values,
    });

    function registerUser() {
        addUser();
    }

    return (
        <Wrapper>
            <Form
                onSubmit={onSubmit}
                noValidate
                className={loading ? 'loading' : ''}
            >
                <h1>Register</h1>
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
                    type="email"
                    label="Email"
                    placeholder="Email"
                    name="email"
                    value={values.email}
                    error={!!errors.email}
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
                <Form.Input
                    type="password"
                    label="Confirm Password"
                    placeholder="Confirm Password"
                    name="passwordConfirm"
                    value={values.passwordConfirm}
                    error={!!errors.passwordConfirm}
                    onChange={onChange}
                />
                <Button type="submit" positive>
                    Register
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

export default Register;
