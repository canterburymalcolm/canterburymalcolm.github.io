import React, { Component } from 'react';
import { connect } from 'react-redux';
import ChangeMethodButton from './buttons/change-method-button';
import AddParentButton from './buttons/add-parent-button';
import { CREATION_METHODS } from '../constants';
import { addParent } from '../redux/actions';
import TextInput from './inputs/text-input';
import SelectInput from './inputs/select-input';
import '../styles/parent-form.scss';
import SelectMultipleInput from './inputs/select-multiple';

class ParentForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            curParent: this.props.parent
        }
        this.handleInputChange = this.handleInputChange.bind(this);
    }


    handleInputChange(event) {
        if (this.state.selected === 'donor') {
            return;
        }
        const target = event.target;
        const name = target.name;
        const value = target.value;
        this.setState({
            curParent: {
                ...this.state.curParent,
                [name]: value
            }
        })
    }

    handleNumberChange(event) {
        const target = event.target;
        if (/^[0-9.]+$/.test(target.value) || target.value === '') {
            this.handleInputChange(event);
        }
    }

    handleMultipleSelectChange(event) {
        const target = event.target;
        const name = target.className;
        const curValue = this.state.curParent[name];
        let value = curValue.concat([target.value]);

        if (curValue.includes(target.value)) {
            value = curValue.filter((v) => { return (v !== target.value) });
        }

        this.handleInputChange({
            target: {
                name: name,
                value: value
            }
        })
    }

    renderTextInput(name, onChange = this.handleInputChange) {
        return (
            <TextInput
                name={name}
                desc={name.toUpperCase() + ': '}
                value={this.state.curParent[name]}
                onChange={onChange}
            />
        );
    }

    renderNumberInput(name) {
        return this.renderTextInput(name, (e) => this.handleNumberChange(e));
    }

    renderSelect(name) {
        return (
            <SelectInput
                name={name}
                value={this.state.curParent[name]}
                options={this.props.options[name]}
                onChange={this.handleInputChange}
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
            <form
                className="parent-form"
                onSubmit={() => this.props.addParent(this.state.curParent)}
            >
                <ChangeMethodButton
                    method={CREATION_METHODS.NONE}
                    className='input-button'
                    id='cancel'
                    desc='Cancel Creation'
                />

                {this.renderButton('next')}
                {this.renderButton('prev')}

                <AddParentButton parent={this.state.curParent} />

                {this.renderTextInput('first')}
                {this.renderTextInput('last')}
                {this.renderTextInput('dob')}

                {this.renderNumberInput('age')}
                {this.renderNumberInput('height')}
                {this.renderNumberInput('weight')}

                {this.renderSelect('eyes')}
                {this.renderSelect('hair')}
                {((name) => {
                    return <SelectMultipleInput
                        name={name}
                        value={this.state.curParent[name]}
                        options={this.props.options[name]}
                        onChange={(e) => this.handleMultipleSelectChange(e)}
                    />
                })('disorders')}
            </form>
        );
    }
}

function ParentButton(props) {
    const desc = props.name === 'cancel' ? 'Cancel Creation' : props.name.toUpperCase();
    return (
        <div className="input-button">
            <button value={desc} onClick={props.onClick} />
        </div>
    );
}

function mapState(state) {
    console.log('update ' + state.parent);
    return { parent: state.parent }
}

export default connect(
    mapState,
    { addParent }
)(ParentForm);