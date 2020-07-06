import React from 'react';
import { Form, Button, Input, Icon } from 'semantic-ui-react';
import { useMutation } from '@apollo/react-hooks';

import { useForm } from 'hooks/useForm';

import { CREATE_TAG } from 'graphql/mutations';

const TagForm = () => {
    const initState = {
        name: '',
    };

    // eslint-disable-next-line
    const { onChange, onSubmit, values } = useForm(createTagCb, initState);

    // eslint-disable-next-line
    const [createTag, { error }] = useMutation(CREATE_TAG, {
        update(_, result) {
            console.log(result);
            values.name = '';
        },
        variables: values,
    });

    function createTagCb() {
        createTag();
    }

    return (
        <Form onSubmit={onSubmit}>
            <Form.Field>
                <Input action>
                    <input
                        name="name"
                        type="text"
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
