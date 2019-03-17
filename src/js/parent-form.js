import React, { Component } from 'react';
import '../styles/parent-form.scss';

class ParentForm extends Component {
    constructor(props) {
        super(props);

        this.handleTextChange = this.props.handleEvent.bind(this);
    }

    renderText(name) {
        return (
            <ParentText
                name={name}
                value={this.props.parent[name]}
                onChange={this.handleTextChange}
            />
        );
    }

    renderSelect(name) {
        return (
            <ParentSelect
                name={name}
                value={this.props.parent[name]}
                options={this.props.options[name]}
                onChange={this.handleTextChange}
            />
        )
    }

    renderButton(name) {
        if (!(name === 'next' || name === 'prev') || this.props.selected === 'donor') {
            return (
                <ParentButton
                    name={name}
                    onClick={() => this.props.onButtonClick(name)}
                />
            );
        }
    }

    render() {
        return (
            <form className="parent-form" onSubmit={this.props.onSubmit}>
                {this.renderButton('cancel')}
                {this.renderButton('next')}
                {this.renderButton('prev')}
                <ParentSubmit />
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
    const desc = props.name === 'cancel' ? 'Cancel Creation' : props.name.toUpperCase();
    return (
        <div className="input-button" style={{ gridArea: props.name }}>
            <input type="button" value={desc} onClick={props.onClick} />
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
                required
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
        onChange = () => { };
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
                required
            >
                {optList}
            </select>
        </div>
    );
}

export default ParentForm;