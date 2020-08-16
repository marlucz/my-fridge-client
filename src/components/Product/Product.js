import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, Responsive, Image, Progress } from 'semantic-ui-react';

import { expiresIn } from 'utils/date';

const Product = ({
    product: { id, name, createdAt, expires, quantity, unit, image },
}) => {
    const [productImage, setImage] = useState('');

    useEffect(() => {
        // eslint-disable-next-line no-unused-expressions
        image.path !== null
            ? setImage(image)
            : fetch(
                  `https://pixabay.com/api/?key=${process.env.REACT_APP_PIXABAY_KEY}&q=${name}&image_type=photo&min_height:200`,
              )
                  .then(res => res.json())
                  .then(({ hits }) => {
                      if (hits.length > 0) {
                          setImage(hits[0].webformatURL);
                      }
                  });
    }, [image]);

    const daysToExpiration = expiresIn(expires);
    const creationDate = new Date(createdAt).toLocaleDateString();

    return (
        <Card fluid>
            <Card.Content style={{ paddingBottom: 0.5 }}>
                <Responsive
                    {...Responsive.onlyMobile}
                    as={Image}
                    src={
                        image.path !== null
                            ? `http://localhost:5000/${productImage.path}`
                            : productImage
                    }
                    floated="left"
                    size="mini"
                />
                <Responsive
                    minWidth={Responsive.onlyTablet.minWidth}
                    as={Image}
                    src={
                        image.path !== null
                            ? `http://localhost:5000/${productImage.path}`
                            : productImage
                    }
                    style={{ marginBottom: 10, maxHeight: 150 }}
                    size="medium"
                />
                <Card.Header as={Link} to={`/products/${id}`}>
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
                    {daysToExpiration < 1 && 'Expired'}
                    {daysToExpiration === 1 && `${daysToExpiration} day left`}
                    {daysToExpiration > 1 && `${daysToExpiration} days left`}
                </p>
            </Card.Content>
        </Card>
    );
};

export default Product;
