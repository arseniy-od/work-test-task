import {ChangeEvent} from 'react';
import Form from 'react-bootstrap/Form';

type SelectProps = {
    options: string[];
    onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
    defaultText: string
};

function Select({options, onChange, defaultText}: SelectProps) {
    return (
        <Form.Select aria-label="Default select example" style={{width: '15%'}} onChange={onChange}>
            <option value='' selected>{defaultText}</option>
            {options.map(option => (
                <option value={option}>{option}</option>
            ))}
        </Form.Select>
    );
}

export default Select;
