import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CREATION_METHODS, Parent, exampleDonors } from '../constants';
import ParentMethodSelect from './parent-method-select.js';
import ParentForm from './parent-form.js';

class ParentCreation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.id,
            parents: [new Parent('malcolm'), new Parent()],
            options: {
                eyes: ['blue', 'green', 'brown', 'hazel', 'gray'],
                hair: ['brown', 'blond', 'black', 'red', 'gray'],
                disorders: ['sickle cell anemia', 'tay-sachs disease', 'cystic fibrosis', 'thalassemia', 'none']
            },
            donor: 0,
            donors: exampleDonors,
            method: CREATION_METHODS.NONE
        }
    }

    mod(n, m) {
        return ((n % m) + m) % m;
    }

    // onParentButton(name) {
    //     if (name === 'cancel') {
    //         this.setState({
    //             selected: ''
    //         });
    //     } else {
    //         const change = name === 'next' ? 1 : -1;
    //         const index = this.mod((this.state.donor + change), this.state.donors.length);
    //         this.setState({
    //             donor: index
    //         })
    //     }
    // }

    render() {
        let stage = <ParentMethodSelect />;
        if (this.props.method !== CREATION_METHODS.NONE) {
            const parent = this.props.method === CREATION_METHODS.PARENT ?
                this.state.parents[this.state.id] :
                this.state.donors[this.state.donor];
            stage =
                <ParentForm
                    options={this.state.options}
                    //handleEvent={(e) => this.handleTextChange(e)}
                    //onButtonClick={(n) => this.onParentButton(n)}
                    //onSubmit={this.props.nextParent}
                    selected={this.props.method}
                />
        }
        return (
            stage
        );
    }
}

function mapState(state) {
    return { method: state.method };
}

export default connect(
    mapState
)(ParentCreation);