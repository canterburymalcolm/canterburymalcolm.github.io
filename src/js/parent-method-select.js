import React, { Component } from 'react';
import { CREATION_METHODS } from '../constants';
import ChangeMethodButton from './buttons/change-method-button';
import '../styles/parent-method-select.scss';

class ParentMethodSelect extends Component {
    render() {
        return (
            <div className="select-method">
                <ChangeMethodButton
                    method={CREATION_METHODS.PARENT}
                    id='create-parent'
                    desc='Create a New Parent'
                />
                <ChangeMethodButton
                    method={CREATION_METHODS.DONOR}
                    id='use-donor'
                    desc='Choose From Donors'
                />
            </div>
        );
    }
}

export default ParentMethodSelect;