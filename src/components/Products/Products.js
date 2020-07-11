import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Grid } from 'semantic-ui-react';

import Product from 'components/Product/Product';
import ProductForm from 'components/ProductForm/ProductForm';

const Home = ({ query, tagId }) => {
    const { loading, data } = useQuery(query, {
        variables: { tagId },
    });

    return (
        <div>
            <Grid stackable columns="equal">
                <Grid.Row>
                    {loading ? (
                        <h1>Loading products...</h1>
                    ) : data && data[Object.keys(data)[0]].length > 0 ? (
                        data[Object.keys(data)[0]].map(product => (
                            <Grid.Column
                                key={product.id}
                                width={4}
                                style={{ marginBottom: 10 }}
                            >
                                <Product product={product} />
                            </Grid.Column>
                        ))
                    ) : (
                        <h1>
                            {' '}
                            You don&apos;t have any products in this category
                        </h1>
                    )}
                    <Grid.Column>
                        <ProductForm />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </div>
    );
};

export default Home;
