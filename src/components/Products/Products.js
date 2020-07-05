import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Grid } from 'semantic-ui-react';

import Product from 'components/Product/Product';

import { FETCH_PRODUCTS_QUERY } from 'graphql/queries';

const Home = () => {
    const { loading, data: { getProducts: products } = {} } = useQuery(
        FETCH_PRODUCTS_QUERY,
    );

    return (
        <div>
            <Grid stackable columns="equal">
                <Grid.Row>
                    {loading ? (
                        <h1>Loading products...</h1>
                    ) : (
                        products &&
                        products.map(product => (
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
        </div>
    );
};

export default Home;
