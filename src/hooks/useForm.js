import { useState } from 'react';

export const useForm = (cb, initState = {}) => {
    const [values, setValues] = useState(initState);

    const onChange = e => {
        if (e.target.name === 'quantity') {
            const parsedValue = parseFloat(e.target.value);
            setValues({ ...values, [e.target.name]: parsedValue });
        } else {
            setValues({ ...values, [e.target.name]: e.target.value });
        }
    };

    const onSelectChange = (name, value) => {
        setValues({ ...values, [name]: value });
    };

    const onSubmit = e => {
        e.preventDefault();

        cb();
    };

    return {
        onChange,
        onSelectChange,
        onSubmit,
        values,
    };
};
