import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Card, Grid, Image, Responsive, Progress } from 'semantic-ui-react';

import Spinner from 'components/Spinner/Spinner';

import { expiresIn } from 'utils/date';

import { FETCH_PRODUCT } from 'graphql/queries';

const ProductPage = props => {
    const [productImage, setImage] = useState('');

    // eslint-disable-next-line react/destructuring-assignment
    const { productId } = props.match.params;

    const { loading, data: { getProduct } = {} } = useQuery(FETCH_PRODUCT, {
        variables: {
            productId,
        },
    });

    if (loading) {
        return <Spinner />;
    }

    const { name, quantity, unit, createdAt, expires } = getProduct;

    fetch(
        `https://pixabay.com/api/?key=${process.env.REACT_APP_PIXABAY_KEY}&q=${name}&image_type=photo&min_height:300`,
    )
        .then(res => res.json())
        .then(({ hits }) => {
            if (hits.length > 0) {
                setImage(hits[0].webformatURL);
            }
        });

    const daysToExpiration = expiresIn(expires);
    const creationDate = new Date(createdAt).toLocaleDateString();

    return (
        <Grid celled style={{ borderRadius: 10 }}>
            <Grid.Row style={{ borderRadius: 10 }}>
                <Grid.Column width={5}>
                    <Image src={productImage} />
                </Grid.Column>
                <Grid.Column width={11}>
                    <Card fluid style={{ boxShadow: 'none', border: 'none' }}>
                        <Card.Content style={{ paddingTop: 10 }}>
                            <Card.Header style={{ paddingBottom: 10 }}>
                                {name}
                            </Card.Header>
                            <Card.Meta>
                                <span>Bought - {creationDate}</span>
                            </Card.Meta>
                            <Card.Meta>
                                <span>
                                    x{quantity} {unit}
                                </span>
                            </Card.Meta>
                            <Responsive
                                {...Responsive.onlyMobile}
                                as={Progress}
                                indicating
                                percent={
                                    daysToExpiration >= 10
                                        ? 100
                                        : daysToExpiration * 10
                                }
                                size="small"
                                style={{ margin: 0 }}
                            />
                            <Responsive
                                minWidth={Responsive.onlyTablet.minWidth}
                                as={Progress}
                                indicating
                                percent={
                                    daysToExpiration >= 10
                                        ? 100
                                        : daysToExpiration * 10
                                }
                                style={{ marginBottom: 10 }}
                            />
                            <p>
                                {daysToExpiration < 1 && 'Expired'}
                                {daysToExpiration === 1 &&
                                    `${daysToExpiration} day left`}
                                {daysToExpiration > 1 &&
                                    `${daysToExpiration} days left`}
                            </p>
                        </Card.Content>
                    </Card>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    );
};

export default ProductPage;
