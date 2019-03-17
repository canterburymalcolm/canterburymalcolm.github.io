import React, { Component } from 'react';
import ParentMethodSelect from './parent-method-select.js';
import ParentForm from './parent-form.js';



class Parent {
    constructor(first, last, dob, age, height, weight, eyes, hair, diorders) {
        this.first = first || '';
        this.last = last || '';
        this.dob = dob || '';
        this.age = age || '';
        this.height = height || '';
        this.weight = weight || '';
        this.eyes = eyes || 'blue';
        this.hair = hair || 'brown';
        this.disorders = diorders || [];
    }
}

var exampleDonors = [
    new Parent("first", "donor", "1", "1", "1", "1", "green", "blond", ['none']),
    new Parent("second", "donor", "2", "2", "2", "2", "brown", "black", ['none']),
    new Parent("third", "donor", "3", "3", "3", "3", "hazel", "red", ['tay-sachs disease', 'cystic fibrosis']),
];

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
            selected: ''
        }
    }

    onMethodSelect(method) {
        this.setState({
            selected: method
        });
    }

    handleTextChange(event) {
        if (this.state.selected === 'donor') {
            return;
        }
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

    mod(n, m) {
        return ((n % m) + m) % m;
    }

    onParentButton(name) {
        if (name === 'cancel') {
            this.setState({
                selected: ''
            });
        } else {
            const change = name === 'next' ? 1 : -1;
            const index = this.mod((this.state.donor + change), this.state.donors.length);
            this.setState({
                donor: index
            })
        }
    }

    render() {
        let stage = <ParentMethodSelect onClick={(m) => this.onMethodSelect(m)} />;
        if (this.state.selected !== '') {
            const parent = this.state.selected === 'parent' ?
                this.state.parents[this.state.id] :
                this.state.donors[this.state.donor];
            stage =
                <ParentForm
                    parent={parent}
                    options={this.state.options}
                    handleEvent={(e) => this.handleTextChange(e)}
                    onButtonClick={(n) => this.onParentButton(n)}
                    onSubmit={this.props.nextParent}
                    selected={this.state.selected}
                />
        }
        return (
            stage
        );
    }
}

export default ParentCreation;