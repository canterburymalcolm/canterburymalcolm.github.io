import React, { Component } from 'react';
import ParentCreation from './parent-creation.js';

function CurrentParent(props) {
    const parent = 'Parent ' + (props.parentNumber + 1);
    return (
        <span>{parent}</span>
    );
}

class AddParent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: 0
        };

        this.nextParent = this.nextParent.bind(this);
    }

    nextParent() {
        this.setState({
            id: 1
        });
    }

    render() {
        return (
            <div className="add-parent">
                <div className="select-parent">
                    <div className="current-parent">
                        <CurrentParent parentNumber={this.state.id} />
                    </div>
                </div>
                <ParentCreation 
                    id={this.state.id}
                    nextParent={this.nextParent}
                />
            </div>
        );
    }
}

export default AddParent;