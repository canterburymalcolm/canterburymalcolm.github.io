import React, { Component } from 'react';
import '../styles/parent-method-select.scss';

class ParentMethodSelect extends Component {

    renderMethodButton(method) {
        const desc = method === 'parent' ? 'Create a New Parent' : 'Choose From Donors';
        const className = method === 'parent' ? 'create-parent' : 'use-donor';

        return (
            <div className={className}>
                <ParentMethodButton
                    desc={desc}
                    onClick={() => this.props.onClick(method)}
                />
            </div>
        );

    }

    render() {
        return (
            <div className="select-method">
                {this.renderMethodButton('parent')}
                {this.renderMethodButton('donor')}
            </div>
        );
    }
}

function ParentMethodButton(props) {
    return (
        <button className="button" onClick={props.onClick}>{props.desc}</button>
    );
}

export default ParentMethodSelect;