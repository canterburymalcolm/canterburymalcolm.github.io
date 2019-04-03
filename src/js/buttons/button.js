import React from 'react';
import '../../styles/buttons.scss';

function Button(props) {
    return (
        <div className={'button ' + props.className} id={props.id}>
            <button
                type='button'
                onClick={props.onClick}
            >{props.desc}
            </button>
        </div>
    )
    
}

export default Button;