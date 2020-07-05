import gql from 'graphql-tag';

export const FETCH_PRODUCTS = gql`
    {
        getProducts {
            id
            name
            quantity
            unit
            username
            createdAt
            expires
            tag
        }
    }
`;

export const FETCH_TAGS = gql`
    {
        getTags {
            id
            name
            username
            products {
                id
                name
                quantity
                unit
                username
                createdAt
                expires
                tag
            }
        }
    }
`;

export const FETCH_PRODUCTS_BY_TAG = gql`
    query($tagId: ID!) {
        getProductsByTag(tagId: $tagId) {
            id
            name
            quantity
            unit
            username
            createdAt
            expires
            tag
        }
    }
`;
