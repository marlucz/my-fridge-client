import React from 'react';
import { Card, Image } from 'semantic-ui-react';

const Product = ({ product: { name, createdAt, expires } }) => {
    const creationDate = new Date(createdAt).toLocaleDateString();
    const expirationDate = new Date(expires).toLocaleDateString();

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
                    <span className="date">Bought {creationDate}</span>
                </Card.Meta>
                <Card.Meta>
                    <span className="date">Expires {expirationDate}</span>
                </Card.Meta>
            </Card.Content>
            <Card.Content extra>
                <p> Expiration bar </p>
                <p> Delete product </p>
            </Card.Content>
        </Card>
    );
};

export default Product;
