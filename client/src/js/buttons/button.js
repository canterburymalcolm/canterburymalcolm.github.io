import React from 'react';
import '../../styles/buttons.scss';

function Button(props) {
    
    let type = 'button';
    let onClick = props.onClick;
    //Change the type to submit and ignore the 
    //onClick that was passed to us
    if (props.submit) {
        type = 'submit';
        onClick = () => {};
    }

    return (
        <div className={'button ' + props.className} id={props.id}>
            <input
                value={props.desc}
                type={type}
                onClick={onClick}
                form={props.form}
            />
        </div>
    )
}

export default Button;