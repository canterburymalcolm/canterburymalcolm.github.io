import React from 'react';
import { connect } from 'react-redux';
import { changeMethod } from '../../redux/actions';
import { optionBarMap } from '../../constants';
import '../../styles/inputs.scss';

const OptionBar = (props) => {
    //If no value is given then give our default value to the parent form
    if (!props.value) {
        props.onChange({
            target: {
                name: props.name,
                value: optionBarMap.get(props.name)[0]
            }
        })
    }

    //Generate a list of input elements containing each of our options
    const options = optionBarMap.get(props.name).map((opt) => {
        //if this option is selected then highlight it
        const isSelected = props.value === opt ? 'selected' : '';
        return (
            <input
                name={props.name}
                className={isSelected}
                type='button'
                value={opt}
                onClick={(event) => {
                    //Select the given option and update our parent form
                    //if we are the method bar then change the page accordingly
                    if (props.name === 'method') {
                        props.changeMethod();
                    } else {
                        props.onChange(event);
                    }
                }}
                key={opt}
            />
        )
    });

    return (
        <div className='option-bar' style={{ gridArea: props.name }}>
            <label>
                {props.desc}
            </label>
            <div className='options'>
                {options}
            </div>
        </div>
    )
}

export default connect(
    null,
    { changeMethod }
)(OptionBar); 