import React from 'react';
import { Card, Responsive, Image, Progress } from 'semantic-ui-react';

import { expiresIn } from 'utils/date';

const Product = ({ product: { name, createdAt, expires } }) => {
    const daysToExpiration = expiresIn(expires);
    const creationDate = new Date(createdAt).toLocaleDateString();

    return (
        <Card fluid>
            <Card.Content style={{ paddingBottom: 0.5 }}>
                <Responsive
                    {...Responsive.onlyMobile}
                    as={Image}
                    src="https://source.unsplash.com/600x600/?tomato"
                    floated="left"
                    size="mini"
                />
                <Responsive
                    minWidth={Responsive.onlyTablet.minWidth}
                    as={Image}
                    src="https://source.unsplash.com/600x600/?banana"
                    style={{ marginBottom: 10 }}
                    wrapped
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
