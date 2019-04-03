import React from 'react';
import '../../styles/inputs.scss';

function TextInput(props) {
    let type = 'text';
    let placeholder = props.placeholder;
    if (props.isPassword) {
        type = 'password';
        placeholder = '••••••••••';
    } else if (props.isEmail) {
        type = 'email';
        placeholder = 'Your email address';
    }
    return (
        <div className="text-input" style={{ gridArea: props.name }}>
            <label>
                {props.desc}
            </label>
            <input
                name={props.name}
                type={type}
                value={props.value}
                placeholder={placeholder}
                onChange={props.onChange}
                required
            />
        </div>
    );
}

export default TextInput;