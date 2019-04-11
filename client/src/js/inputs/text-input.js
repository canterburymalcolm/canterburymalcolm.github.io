import React from 'react';
import '../../styles/inputs.scss';

const TextInput = (props) => {

    //Determine the type of this textInput
    let type = 'text';
    let placeholder = props.placeholder;
    if (props.isPassword) {
        type = 'password';
        placeholder = '••••••••••';
    } else if (props.isEmail) {
        type = 'email';
        placeholder = 'Your email address';
    } else if (props.isNumber) {
        type = 'number';
        placeholder = '0';
    }
    
    return (
        <div className="text-input" style={{ gridArea: props.name }}>
            <label>
                {props.desc}
                {/* display the given error message after the description*/}
                <span className="error">{props.error}</span>
            </label>
            <input
                name={props.name}
                type={type}
                value={props.initial}
                placeholder={placeholder}
                onChange={props.onChange}
                required
            />
        </div>
    )
}

export default TextInput;