import React, { useState } from 'react';
import styled from 'styled-components';
import { Form, Button, Message, Icon } from 'semantic-ui-react';
import { useMutation } from '@apollo/react-hooks';

import { useForm } from 'hooks/useForm';
import withClient from 'hoc/withClient';

import { CREATE_PRODUCT } from 'graphql/mutations';
import { FETCH_PRODUCTS, FETCH_TAGS } from 'graphql/queries';

const Wrapper = styled.div`
    width: 100%;
    max-width: 400px;
    margin: auto;
`;

const StyledDateInput = styled(Form.Input)`
    input {
        color: gray;
        &:before {
            font-family: Lato, 'Helvetica Neue', Arial, Helvetica, sans-serif;
            color: #d4d4d5;
            content: attr(placeholder) !important;
            margin-right: 0.5em;
        }

        &:focus:before {
            content: '';
        }
        &:valid:before {
            content: '';
        }
    }
`;

const ProductForm = ({ client }) => {
    const [tags, setTags] = useState();
    const [errors, setErrors] = useState({});
    const initState = {
        name: '',
        quantity: '',
        unit: '',
        expires: '',
        tag: '',
    };

    // check if queries were called and cached
    // !tags - prevents infinite rerender loop after passing new prop tags to hoc
    if (
        !tags &&
        client.cache.data.data.ROOT_QUERY &&
        Object.keys(client.cache.data.data.ROOT_QUERY).length >= 2
    ) {
        const { getTags } = client.readQuery({
            query: FETCH_TAGS,
        });

        setTags(getTags);
    }

    // eslint-disable-next-line
    const { onChange, onSubmit, values } = useForm(createProductCb, initState);

    const [createProduct] = useMutation(CREATE_PRODUCT, {
        // eslint-disable-next-line
        update(proxy, result) {
            const data = proxy.readQuery({
                query: FETCH_PRODUCTS,
            });
            proxy.writeQuery({
                query: FETCH_PRODUCTS,
                data: {
                    getProducts: [
                        ...data.getProducts,
                        result.data.createProduct,
                    ],
                },
            });
        },

        onError(err) {
            setErrors(err.graphQLErrors[0].extensions.exception.errors);
        },

        variables: values,
    });

    function createProductCb() {
        createProduct();
    }

    return (
        <Wrapper>
            <Form onSubmit={onSubmit}>
                <h2 style={{ fontSize: `1.5rem` }}>Add Product</h2>
                <Form.Input
                    type="text"
                    placeholder="Name"
                    name="name"
                    value={values.name}
                    error={!!errors.name}
                    onChange={onChange}
                />
                <Form.Group widths="equal">
                    <Form.Input
                        type="number"
                        placeholder="Quantity"
                        name="quantity"
                        value={values.quantity}
                        error={!!errors.quantity}
                        onChange={onChange}
                    />

                    <Form.Input
                        type="text"
                        placeholder="Unit"
                        name="unit"
                        value={values.unit}
                        error={!!errors.unit}
                        onChange={onChange}
                    />
                </Form.Group>
                <StyledDateInput
                    type="date"
                    placeholder="Expires"
                    name="expires"
                    value={values.expires}
                    error={!!errors.expires}
                    onChange={onChange}
                />
                <Form.Input
                    type="text"
                    placeholder="Unit"
                    name="unit"
                    value={values.unit}
                    error={!!errors.unit}
                    onChange={onChange}
                />
                <Button type="submit" positive icon>
                    <Icon name="plus" />
                </Button>
            </Form>
            {Object.keys(errors).length > 0 && (
                <Message
                    error
                    header="Please verify your inputs"
                    list={Object.values(errors).map(value => (
                        <li key={value}>{value}</li>
                    ))}
                />
            )}
        </Wrapper>
    );
};

export default withClient(ProductForm);
