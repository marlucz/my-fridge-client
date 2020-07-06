import React, { useState } from 'react';
import styled from 'styled-components';
import { useQuery } from '@apollo/react-hooks';

import { Dropdown, Grid, Menu, Segment } from 'semantic-ui-react';
import Products from 'components/Products/Products';
import TagForm from 'components/TagForm/TagForm';

import {
    FETCH_TAGS,
    FETCH_PRODUCTS,
    FETCH_PRODUCTS_BY_TAG,
    FETCH_PRODUCTS_EXPIRED,
} from 'graphql/queries';

const StyledGrid = styled(Grid)`
    margin: auto !important;
    max-width: 100%;
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
            setQuery(FETCH_PRODUCTS_EXPIRED);
        }
        setActive(name);
    };

    const handleItemClick = (e, { name, tagid }) => {
        setTagId(tagid);
        setQuery(FETCH_PRODUCTS_BY_TAG);
        setActive(name);
    };

    return (
        <StyledGrid stackable columns="equal">
            <Grid.Row>
                <Menu attached="top">
                    <Dropdown
                        item
                        text={active}
                        style={{ textTransform: 'capitalize' }}
                    >
                        <Dropdown.Menu>
                            <Dropdown.Item
                                name="all"
                                active={active === 'all'}
                                onClick={handleStaticItemClick}
                            >
                                All
                            </Dropdown.Item>
                            {loading ? (
                                <h1>Loading tags...</h1>
                            ) : (
                                tags !== undefined &&
                                tags.map(tag => (
                                    <Dropdown.Item
                                        key={tag.id}
                                        tagid={tag.id}
                                        name={tag.name}
                                        active={active === tag.name}
                                        onClick={handleItemClick}
                                    >
                                        {tag.name}
                                    </Dropdown.Item>
                                ))
                            )}
                            <Dropdown.Item
                                name="expired"
                                active={active === 'expired'}
                                onClick={handleStaticItemClick}
                            >
                                Expired
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    <Menu.Menu position="right">
                        <Menu.Item>
                            <TagForm />
                        </Menu.Item>
                    </Menu.Menu>
                </Menu>
                <Segment attached="bottom">
                    <Products query={query} tagId={tagId} />
                </Segment>
            </Grid.Row>
        </StyledGrid>
    );
};

export default Home;
