import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { Grid } from 'semantic-ui-react';

import Product from 'components/Product/Product';

const FETCH_PRODUCTS_QUERY = gql`
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

const Home = () => {
    const { loading, data } = useQuery(FETCH_PRODUCTS_QUERY);

    return (
        <Grid stackable columns="equal">
            <Grid.Row>
                <h1>All Products</h1>
            </Grid.Row>
            <Grid.Row>
                {loading ? (
                    <h1>Loading products...</h1>
                ) : (
                    data.getProducts &&
                    data.getProducts.map(product => (
                        <Grid.Column
                            key={product.id}
                            width={4}
                            style={{ marginBottom: 10 }}
                        >
                            <Product product={product} />
                        </Grid.Column>
                    ))
                )}
            </Grid.Row>
        </Grid>
    );
};

export default Home;
