import React, { Component } from 'react';
import ParentCreation from './parent-creation.js';

class CurrentParent extends Component {
    render() {
        const parent = 'Parent ' + this.props.parentNumber;
        return (
            <span>{parent}</span>
        );
    }
}

class AddParent extends Component {
    render() {
        return (
            <div className="add-parent">
                <div className="select-parent">
                    <div className="current-parent">
                        <CurrentParent parentNumber={1} />
                    </div>
                </div>
                <ParentCreation />
            </div>
        );
    }
}

export default AddParent;