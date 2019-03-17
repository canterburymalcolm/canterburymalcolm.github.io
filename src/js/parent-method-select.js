import React, { Component } from 'react';
import '../styles/parent-method-select.scss';

class ParentMethodSelect extends Component {
    render() {
        return (
            <div className="select-method">
                <div className="use-donor">
                    <ParentMethodButton desc={'Choose From Donors'} />
                </div>
                <div className="create-parent">
                    <ParentMethodButton desc={'Create a New Parent'} />
                </div>
            </div>
        );
    }
}

function ParentMethodButton(props) {
    return (
        <button className="button">{props.desc}</button>
    );
}

export default ParentMethodSelect;