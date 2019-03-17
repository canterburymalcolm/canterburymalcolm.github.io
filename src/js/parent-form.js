import React, { Component } from 'react';
import '../styles/parent-form.scss';

class ParentForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            first: '',
            last: '',
            dob: '',
            age: '',
            height: '',
            weight: '',
            eyes: 'blue',
            hair: 'brown',
            disorders: [],
            options: {
                eyes: ['blue', 'green', 'brown', 'hazel', 'gray'],
                hair: ['brown', 'blond', 'black', 'red', 'gray'],
                disorders: ['sickle cell anemia', 'tay-sachs disease', 'cystic fibrosis', 'thalassemia']
            }
        };

        this.handleTextChange = this.handleTextChange.bind(this);
        //this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleTextChange(event) {
        const target = event.target;
        let name;
        if (typeof target.name === 'undefined') {
            name = target.className;
        } else {
            name = target.name;
        }
        const curValue = this.state[name];
        let value;

        //Only accept digits in the age, height, and weight inputs
        if ((name === 'age' || name === 'height' || name === 'weight')
            && !(/^[0-9]+$/.test(target.value) || target.value === '')) {
            value = curValue;
        } else {
            value = target.value;
        }
        
        if (Array.isArray(this.state[name])) {
            if (curValue.includes(target.value)) {
                if (curValue.length === 1) {
                    value = [];
                } else {
                    value = curValue.filter((v) => { return (v !== target.value) });
                }
            } else {
                value = this.state[name].concat([target.value]);
            }
        }

        this.setState({
            [name]: value
        })

    }

    renderText(name) {
        return (
            <ParentText
                name={name}
                value={this.state[name]}
                onChange={this.handleTextChange}
            />
        );
    }

    renderSelect(name) {
        return (
            <ParentSelect
                name={name}
                value={this.state[name]}
                options={this.state['options'][name]}
                onChange={this.handleTextChange}
            />
        )
    }

    render() {
        return (
            <form className="parent-form">
                <ParentButton
                    name={'cancel'}
                />
                <ParentSubmit
                />
                {this.renderText('first')}
                {this.renderText('last')}
                {this.renderText('dob')}
                {this.renderText('age')}
                {this.renderText('height')}
                {this.renderText('weight')}
                {this.renderSelect('eyes')}
                {this.renderSelect('hair')}
                {this.renderSelect('disorders')}
            </form>
        );
    }
}

function ParentButton(props) {
    const desc = props.name === 'cancel' ? 'Cancel Creation' : 'Add Parent';
    return (
        <div className="input-button" style={{ gridArea: props.name }}>
            <input type="button" value={desc} />
        </div>
    );
}

function ParentSubmit() {
    return (
        <div className="input-button" style={{ gridArea: 'submit' }}>
            <input type="submit" value="Add Parent" />
        </div>
    );
}

function ParentText(props) {
    const desc = props.name.toUpperCase() + ': ';
    return (
        <div className="input-text" style={{ gridArea: props.name }}>
            <label>
                {desc}
            </label>
            <input
                name={props.name}
                type="text"
                value={props.value}
                onChange={props.onChange}
            />
        </div>
    );
}

function ParentSelect(props) {
    let desc = props.name.toUpperCase();
    let multiple = false;
    let onChange = props.onChange;
    if (props.name === 'disorders') {
        desc = 'GENETIC DISORDERS (choose all that apply)';
        multiple = true;
        onChange = ()=>{};
    }

    desc += ': ';

    const optList = props.options.map((opt) => {
        return (
            <option
                className={props.name}
                key={opt}
                value={opt}
                onClick={props.onChange}
            >{opt}
            </option>
        );

    });

    return (
        <div className="input-select" style={{ gridArea: props.name }}>
            <label>
                {desc}
            </label>
            <select 
                name={props.name} 
                multiple={multiple} 
                value={props.value} 
                onChange={onChange}
            >
                {optList}
            </select>
        </div>
    );
}

export default ParentForm;