import React from 'react';

function OptionList(props){ 
    return props.options.map((opt) => {
        return (
            <option
                className={props.name}
                key={opt}
                value={opt}
                onClick={props.onChange}
            >{opt}
            </option>
        );
    });
}

export default OptionList;