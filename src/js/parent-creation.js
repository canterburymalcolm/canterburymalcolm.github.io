import React, { Component } from 'react';
import ParentMethodSelect from './parent-method-select.js';
import ParentForm from './parent-form.js';

class Parent {
    constructor() {
        this.first = '';
        this.last = '';
        this.dob = '';
        this.age = '';
        this.height = '';
        this.weight = '';
        this.eyes = 'blue';
        this.hair = 'brown';
        this.disorders = [];
    }
}

class ParentCreation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.id,
            parents: [new Parent(), new Parent()],
            options: {
                eyes: ['blue', 'green', 'brown', 'hazel', 'gray'],
                hair: ['brown', 'blond', 'black', 'red', 'gray'],
                disorders: ['sickle cell anemia', 'tay-sachs disease', 'cystic fibrosis', 'thalassemia', 'none']
            },
            donors: [],
            selected: ''
        }
    }

    onMethodSelect(method) {
        this.setState({
            selected: method
        });
    }

    handleTextChange(event) {
        const target = event.target;
        let name;
        if (typeof target.name === 'undefined') {
            name = target.className;
        } else {
            name = target.name;
        }
        const curValue = this.state.parents[this.state.id][name];
        let value;

        //Only accept digits in the age, height, and weight inputs
        if ((name === 'age' || name === 'height' || name === 'weight')
            && !(/^[0-9.]+$/.test(target.value) || target.value === '')) {
            value = curValue;
        } else {
            value = target.value;
        }

        if (Array.isArray(curValue)) {
            if (curValue.includes(target.value)) {
                if (curValue.length === 1) {
                    value = [];
                } else {
                    value = curValue.filter((v) => { return (v !== target.value) });
                }
            } else {
                value = curValue.concat([target.value]);
            }
        }

        const copyParents = JSON.parse(JSON.stringify(this.state.parents));
        copyParents[this.state.id][name] = value;

        this.setState({
            parents: copyParents
        })
    }

    onParentButton(name) {
        if (name === 'cancel') {
            this.setState({
                selected: ''
            });
        }
    }

    render() {
        let stage = <ParentMethodSelect onClick={(m) => this.onMethodSelect(m)}/>;
        if (this.state.selected !== '') {
            stage =
                <ParentForm
                    parent={this.state.parents[this.state.id]}
                    options={this.state.options}
                    handleEvent={(e) => this.handleTextChange(e)}
                    onButtonClick={(n) => this.onParentButton(n)}
                    onSubmit={this.props.nextParent}
                />
        }
        return (
            stage
        );
    }
}

export default ParentCreation;