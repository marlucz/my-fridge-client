import React, { useState } from 'react';
import styled from 'styled-components';
import { useQuery } from '@apollo/react-hooks';

import { Grid, Menu, Segment } from 'semantic-ui-react';
import Products from 'components/Products/Products';

import {
    FETCH_TAGS,
    FETCH_PRODUCTS,
    FETCH_PRODUCTS_BY_TAG,
} from 'graphql/queries';

const StyledMenuItem = styled(Menu.Item)`
    a {
        text-transform: capitalize;
    }
`;

const Home = () => {
    const { loading, data: { getTags: tags } = {} } = useQuery(FETCH_TAGS);
    const [query, setQuery] = useState(FETCH_PRODUCTS);
    const [tagId, setTagId] = useState(null);
    const [active, setActive] = useState('all');

    const handleStaticItemClick = (e, { name }) => {
        setTagId(null);
        if (name === 'all') {
            setQuery(FETCH_PRODUCTS);
        } else if (name === 'expired') {
            // to be done on server side
            // setQuery(FETCH_EXPIRED_PRODUCTS);
            setQuery(FETCH_PRODUCTS);
        }
        setActive(name);
    };

    const handleItemClick = (e, { name, tagid }) => {
        setTagId(tagid);
        setQuery(FETCH_PRODUCTS_BY_TAG);
        setActive(name);
    };

    return (
        <Grid stackable columns="equal">
            <Grid.Row>
                <Menu attached="top" tabular>
                    <StyledMenuItem
                        name="all"
                        active={active === 'all'}
                        onClick={handleStaticItemClick}
                    />
                    {loading ? (
                        <h1>Loading tags...</h1>
                    ) : (
                        tags !== undefined &&
                        tags.map(tag => (
                            <Menu.Item
                                key={tag.id}
                                tagid={tag.id}
                                name={tag.name}
                                active={active === tag.name}
                                onClick={handleItemClick}
                            />
                        ))
                    )}
                    <Menu.Item
                        name="expired"
                        active={active === 'expired'}
                        onClick={handleStaticItemClick}
                    />
                </Menu>
                <Segment attached="bottom">
                    <Products query={query} tagId={tagId} />
                </Segment>
            </Grid.Row>
        </Grid>
    );
};

export default Home;
