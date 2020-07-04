import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Grid } from 'semantic-ui-react';

import Product from 'components/Product/Product';

import { FETCH_PRODUCTS_QUERY } from 'graphql/queries';

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
