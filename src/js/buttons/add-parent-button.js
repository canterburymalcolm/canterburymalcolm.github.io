import React from 'react';
import { connect } from 'react-redux';
import { addParent } from '../../redux/actions';
import Button from './button';
import '../../styles/parent-form.scss';

function AddParentButton(props) {
    return (
        <Button 
            className='input-button'
            id='submit'
            onClick={() => props.addParent(props.parent)}
            desc='Add Parent'
        />
    )
}

export default connect(
    null,
    { addParent }
)(AddParentButton);