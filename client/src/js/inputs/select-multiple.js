import React from 'react';
import OptionList from './option-list';

function SelectMultipleInput(props) {
    const desc = 'GENETIC DISORDERS (choose all that apply)';

    return (
        <div className="input-select" style={{ gridArea: props.name }}>
            <label>
                {desc}
            </label>
            <select
                name={props.name}
                multiple={true}
                value={props.value}
                onChange={() => { }}
                required
            >
                <OptionList 
                    name={props.name}
                    onChange={props.onChange}
                    options={props.options}
                />
            </select>
        </div>
    );
}

export default SelectMultipleInput;