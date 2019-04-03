import React from 'react';
import { connect } from 'react-redux';
import { changeMethod } from '../../redux/actions';
import Button from './button';
import '../../styles/parent-method-button.scss';

function ChangeMethodButton(props) {
        return (
            <Button 
                className={props.className}
                id={props.id}
                onClick={() => props.changeMethod(props.method)}
                desc={props.desc}
            />
        );
}

export default connect(
    null,
    { changeMethod }
)(ChangeMethodButton);