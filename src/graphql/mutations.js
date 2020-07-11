import gql from 'graphql-tag';

export const LOGIN_USER = gql`
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

export const REGISTER_USER = gql`
    mutation register(
        $username: String!
        $email: String!
        $password: String!
        $passwordConfirm: String!
    ) {
        register(
            registerInput: {
                username: $username
                email: $email
                password: $password
                passwordConfirm: $passwordConfirm
            }
        ) {
            id
            email
            username
            createdAt
            token
        }
    }
`;

export const CREATE_TAG = gql`
    mutation createTag($name: String!) {
        createTag(name: $name) {
            id
            name
            username
            products {
                name
            }
        }
    }
`;

export const CREATE_PRODUCT = gql`
    mutation createProduct(
        $name: String!
        $quantity: Float!
        $unit: String!
        $expires: String!
        $tag: ID!
    ) {
        createProduct(
            productInput: {
                name: $name
                quantity: $quantity
                unit: $unit
                expires: $expires
                tag: $tag
            }
        ) {
            id
            name
            username
            quantity
            unit
            createdAt
            expires
            tag
        }
    }
`;
