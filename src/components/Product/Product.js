import React, { useEffect, useState } from 'react';
import { Card, Responsive, Image, Progress } from 'semantic-ui-react';

import { expiresIn } from 'utils/date';

const Product = ({ product: { name, createdAt, expires } }) => {
    const [productImage, setImage] = useState('');

    useEffect(() => {
        fetch(
            `https://pixabay.com/api/?key=${process.env.REACT_APP_PIXABAY_KEY}&q=${name}&image_type=photo&min_height:200`,
        )
            .then(res => res.json())
            .then(({ hits }) => {
                if (hits.length > 0) {
                    setImage(hits[0].webformatURL);
                }
            });
    });

    const daysToExpiration = expiresIn(expires);
    const creationDate = new Date(createdAt).toLocaleDateString();

    return (
        <Card fluid>
            <Card.Content style={{ paddingBottom: 0.5 }}>
                <Responsive
                    {...Responsive.onlyMobile}
                    as={Image}
                    src={productImage}
                    floated="left"
                    size="mini"
                />
                <Responsive
                    minWidth={Responsive.onlyTablet.minWidth}
                    as={Image}
                    src={productImage}
                    style={{ marginBottom: 10, maxHeight: 150 }}
                    size="medium"
                />
                <Card.Header>{name}</Card.Header>
                <Card.Meta>
                    <span className="date">Bought - {creationDate}</span>
                </Card.Meta>
            </Card.Content>
            <Card.Content style={{ paddingTop: 10 }}>
                <Responsive
                    {...Responsive.onlyMobile}
                    as={Progress}
                    indicating
                    percent={
                        daysToExpiration >= 10 ? 100 : daysToExpiration * 10
                    }
                    size="small"
                    style={{ margin: 0 }}
                />
                <Responsive
                    minWidth={Responsive.onlyTablet.minWidth}
                    as={Progress}
                    indicating
                    percent={
                        daysToExpiration >= 10 ? 100 : daysToExpiration * 10
                    }
                    style={{ marginBottom: 10 }}
                />
                <p>
                    {daysToExpiration} {daysToExpiration > 1 ? 'days' : 'day'}{' '}
                    left
                </p>
            </Card.Content>
        </Card>
    );
};

export default Product;
