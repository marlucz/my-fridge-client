import React from 'react';
import { Form, Button, Input, Icon } from 'semantic-ui-react';
import { useMutation } from '@apollo/react-hooks';

import { useForm } from 'hooks/useForm';

import { CREATE_TAG } from 'graphql/mutations';
import { FETCH_TAGS } from 'graphql/queries';

const TagForm = () => {
    const initState = {
        name: '',
    };

    // eslint-disable-next-line
    const { onChange, onSubmit, values } = useForm(createTagCb, initState);

    // eslint-disable-next-line
    const [createTag, { error }] = useMutation(CREATE_TAG, {
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
    });

    function createTagCb() {
        createTag();
        values.name = '';
    }

    return (
        <Form onSubmit={onSubmit}>
            <Form.Field>
                <Input action error={!!error}>
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
    );
};

export default TagForm;
