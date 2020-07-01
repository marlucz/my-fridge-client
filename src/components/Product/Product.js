import React, { useEffect, useState } from 'react';
import { Card, Image, Progress } from 'semantic-ui-react';

import { expiresIn } from 'utils/date';

const Product = ({ product: { name, createdAt, expires } }) => {
    const [percent, setPercent] = useState(null);

    useEffect(() => {
        const daysToExpiration = expiresIn(expires);

        // eslint-disable-next-line no-unused-expressions
        daysToExpiration >= 10
            ? setPercent(100)
            : setPercent(daysToExpiration * 10);
    }, [expires]);

    const creationDate = new Date(createdAt).toLocaleDateString();

    return (
        <Card>
            <Image
                src="https://source.unsplash.com/600x600/?tomato"
                wrapped
                ui={false}
            />
            <Card.Content>
                <Card.Header>{name}</Card.Header>
                <Card.Meta>
                    <span className="date">Bought - {creationDate}</span>
                </Card.Meta>
            </Card.Content>
            <Card.Content extra>
                <Progress percent={percent} indicating />
                <p> Delete product </p>
            </Card.Content>
        </Card>
    );
};

export default Product;
