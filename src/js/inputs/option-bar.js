import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeMethod } from '../../redux/actions';
import { optionBarMap } from '../../constants';
import '../../styles/inputs.scss';

class OptionBar extends Component {
    constructor(props) {
        super(props);
        const defaultOption = this.props.defaultOption ? this.props.defaultOption : 0;
        this.state = {
            selected: optionBarMap.get(this.props.name)[defaultOption]
        };

        this.props.onChange({
            target: {
                name: this.props.name,
                value: this.state.selected
            }
        });
    }

    selectOption(event) {
        this.setState({
            selected: event.target.value
        }, () => {console.log('changed ' + this.props.name)});

        if (this.props.name === 'method') {
            this.props.changeMethod();
        }

        this.props.onChange(event);
    }

    render() {

        const options = optionBarMap.get(this.props.name).map((opt) => {

            const isSelected = this.state.selected === opt ? 'selected' : '';
            return (
                <input
                    name={this.props.name}
                    className={isSelected}
                    type='button'
                    value={opt}
                    onClick={(event) => this.selectOption(event)}
                    key={opt}
                />
            )
        });

        return (
            <div className='option-bar' style={{ gridArea: this.props.name }}>
                <label>
                    {this.props.desc}
                </label>
                <div className='options'>
                    {options}
                </div>
            </div>
        );
    }
}

export default connect(
    null,
    { changeMethod }
)(OptionBar); 