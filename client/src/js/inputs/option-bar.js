import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeMethod } from '../../redux/actions';
import { optionBarMap } from '../../constants';
import '../../styles/inputs.scss';

class OptionBar extends Component {
    constructor(props) {
        super(props);

        const defaultIndex = this.props.defaultOption ? this.props.defaultOption : 0;
        const defaultOption = optionBarMap.get(this.props.name)[defaultIndex];

        //Set the state to the given default option if one exists
        //otherwise use the first option
        this.state = {
            selected: defaultOption
        };

        //Pass our default value to the parent form on creation
        if (this.props.name !== 'method') {
            this.props.onChange({
                target: {
                    name: this.props.name,
                    value: this.state.selected
                }
            });
        }
    }

    //Select the given option and update our parent form
    //if we are the method bar then change the page accordingly
    selectOption(event) {
        this.setState({
            selected: event.target.value
        });

        if (this.props.name === 'method') {
            this.props.changeMethod();
        } else {
            //Don't add the method to the parent form
            this.props.onChange(event);
        }
    }

    render() {
        //Generate a list of input elements containing each of our options
        const options = optionBarMap.get(this.props.name).map((opt) => {
            //if this option is selected then highlight it
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