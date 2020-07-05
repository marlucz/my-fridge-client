import React, { useState } from 'react';
import styled from 'styled-components';
import { useQuery } from '@apollo/react-hooks';

import { Grid, Menu, Segment } from 'semantic-ui-react';
import Products from 'components/Products/Products';

import { FETCH_TAGS } from 'graphql/queries';

const StyledMenuItem = styled(Menu.Item)`
    a {
        text-transform: capitalize;
    }
`;

const Home = () => {
    const { loading, data: { getTags: tags } = {} } = useQuery(FETCH_TAGS);

    const [active, setActive] = useState('all');
    const handleItemClick = (e, { name }) => setActive(name);

    return (
        <Grid stackable columns="equal">
            <Grid.Row>
                <Menu attached="top" tabular>
                    <StyledMenuItem
                        name="all"
                        active={active === 'all'}
                        onClick={handleItemClick}
                    />
                    {loading ? (
                        <h1>Loading tags...</h1>
                    ) : (
                        tags !== undefined &&
                        tags.map(tag => (
                            <Menu.Item
                                key={tag.id}
                                name={tag.name}
                                active={active === tag.name}
                                onClick={handleItemClick}
                            />
                        ))
                    )}
                    <Menu.Item
                        name="expired"
                        active={active === 'expired'}
                        onClick={handleItemClick}
                    />
                </Menu>
                <Segment attached="bottom">
                    <Products active={active} />
                </Segment>
            </Grid.Row>
        </Grid>
    );
};

export default Home;
