import React from 'react';
import { disorders } from '../../constants';

const Checkboxes = (props) => {
    const updateForm = value => {
        props.onChange({
            target: {
                name: props.name,
                value: value
            }
        })
    }

    if (!props.value) {
        updateForm([]);
    } 

    const boxes = disorders.map((desc, index) => {
        const checked = props.value.includes(desc);
        return (
            <div key={'box-' + index}>
                <input
                    id={index}
                    type='checkbox'
                    checked={checked}
                    onChange={(event) => {
                        //Add this disorder if it was checked otherwise remove it
                        const disorder = disorders[event.target.id]
                        let selected = props.value;

                        if (event.target.checked) {
                            selected = [...selected, disorder];
                        } else {
                            selected = selected.filter((id) => (disorder !== id));
                        }

                        updateForm(selected);
                    }}
                />
                <label htmlFor={index}></label>
                <span>{desc}</span>
            </div>
        )
    })

    return (
        <div className='checkbox-container'>
            <label>
                {props.desc}
            </label>
            <div className='checkboxes'>
                {boxes}
            </div>
        </div>
    );
}

export default Checkboxes;