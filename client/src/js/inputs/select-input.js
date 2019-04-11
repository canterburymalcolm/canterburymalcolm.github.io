import React from 'react';
import OptionList from './option-list';

function SelectInput(props) {
    const desc = props.name.toUpperCase() + ': ';
    //const value = props.value ? props.value: 'default';

    return (
        <div className="select-input" style={{ gridArea: props.name }}>
            <label>
                {desc}
            </label>
            <select
                name={props.name}
                defaultValue='default'
                value={props.value}
                onChange={() => {}}
                required
            >
            <option value='default' disabled hidden>
                {props.placeholder}
            </option>
                <OptionList 
                    name={props.name}
                    onChange={props.onChange}
                    options={props.options}
                />
            </select>
        </div>
    );
}

export default SelectInput;