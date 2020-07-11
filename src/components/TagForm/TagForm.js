import React, { useState } from 'react';
import styled from 'styled-components';
import { Form, Button, Input, Icon, Message } from 'semantic-ui-react';
import { useMutation } from '@apollo/react-hooks';

import { useForm } from 'hooks/useForm';

import { CREATE_TAG } from 'graphql/mutations';
import { FETCH_TAGS } from 'graphql/queries';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const StyledMessage = styled(Message)`
    padding: 1em !important;
    font-size: 0.8em !important;
`;

const TagForm = () => {
    const initState = {
        name: '',
    };
    const [errors, setErrors] = useState({});

    // eslint-disable-next-line
    const { onChange, onSubmit, values } = useForm(createTagCb, initState);

    // eslint-disable-next-line
    const [createTag] = useMutation(CREATE_TAG, {
        variables: values,
        update(proxy, result) {
            const data = proxy.readQuery({
                query: FETCH_TAGS,
            });
            proxy.writeQuery({
                query: FETCH_TAGS,
                data: {
                    getTags: [...data.getTags, result.data.createTag],
                },
            });
        },

        onError(err) {
            setErrors(err.graphQLErrors[0].extensions.exception.errors);
        },
    });

    function createTagCb() {
        createTag();
        values.name = '';
        setErrors({});
    }

    return (
        <Wrapper>
            <Form onSubmit={onSubmit}>
                <Form.Field>
                    <Input action error={!!errors.tag}>
                        <input
                            name="name"
                            onChange={onChange}
                            value={values.name}
                            placeholder="Add tag"
                        />
                        <Button type="submit" positive icon>
                            <Icon name="tag" />
                        </Button>
                    </Input>
                </Form.Field>
            </Form>
            {Object.keys(errors).length > 0 && (
                <StyledMessage error header={errors.tag} />
            )}
        </Wrapper>
    );
};

export default TagForm;
