import React, { Component } from 'react';
import OptionList from './option-list';

class SelectInput extends Component {
    constructor(props) {
        super(props);

        this.props.onChange({
            target: {
                name: this.props.name,
                value: this.props.placeholder,
            }
        });
    }

    render() {
        const desc = this.props.name.toUpperCase() + ': ';

        return (
            <div className="select-input" style={{ gridArea: this.props.name }}>
                <label>
                    {desc}
                </label>
                <select
                    name={this.props.name}
                    defaultValue='MA'
                    value={this.props.value}
                    onChange={this.props.onChange}
                    required
                >
                    <option value='MA' disabled hidden>
                        {this.props.placeholder}
                    </option>
                    <OptionList
                        name={this.props.name}
                        onChange={this.props.onChange}
                        options={this.props.options}
                    />
                </select>
            </div>
        );
    }
}

export default SelectInput;