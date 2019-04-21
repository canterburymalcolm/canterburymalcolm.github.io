import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getForm, getInitial } from '../../redux/selectors';

class Form extends Component {
    constructor(props) {
        super(props);

        console.log(`form: ${props.form} initial: ${props.initial}`);
        //All the current values from the inputs in this form
        this.state = {
            values: props.initial,
            submitted: false
        };

        window.scrollTo(0, 0)
    }

    //Most general input change handler
    //updates the value field in this forms state
    handleInputChange(event) {
        const target = event.target;
        const name = target.name;
        const value = target.value;
        this.setState(state => (
            { values: { ...state.values, [name]: value } }
        ), () => {
            if (this.props.onChange) {
                this.props.onChange(this.state.values)
            }
        }
        );
    }

    addToChildren(props) {
        return React.Children.map(this.props.children, (child) => {
            if (child) {
                //console.log(child.props.name);
                let value = this.state.values[child.props.name];
                value = value ? value : '';
                //console.log('set ' + child.props.name + ': ' + value);

                props = {
                    ...props,
                    value: value,
                    onChange: (event) => this.handleInputChange(event)
                }
                return React.cloneElement(child, props)
            }
        })

    }

    render() {
        //Give our input change handler to all of our children
        // children = this.addToChildren({ value: '' })
        const children = this.addToChildren({});

        return (
            <div>
                <iframe title="frame" name="trash" style={{ display: 'none' }}></iframe>
                <form
                    className={this.props.className}
                    id={this.props.form}
                    //Pass along all of our values on submit
                    onSubmit={() => {
                        //document.getElementById(this.props.form).reset();
                        this.props.onSubmit(this.state.values);
                    }}
                    target="trash"
                >
                    {children}
                </form>

            </div>
        )
    }
}

export default connect(
    state => ({
        form: getForm(state),
        initial: getInitial(state)
    })
)(Form);