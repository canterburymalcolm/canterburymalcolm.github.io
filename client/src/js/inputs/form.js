import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getForm, getInitial } from '../../redux/selectors';

class Form extends Component {
    constructor(props) {
        super(props);

        //All the current values from the inputs in this form
        this.state = {
            values: props.initial
        };
    }

    //Most general input change handler
    //updates the value field in this forms state
    handleInputChange(event) {
        const target = event.target;
        const name = target.name;
        const value = target.value;
        this.setState(state => (
            { values: { ...state.values, [name]: value } }
        ),
            () => { if (this.props.onChange) this.props.onChange(this.state.values) }
        );
    }

    render() {
        //Give our input change handler to all of our children
        const children = React.Children.map(this.props.children, (child) => {
            if (child) {
                //console.log(child.props.name + ': ' + this.state.values[child.props.name]);
                return React.cloneElement(child, {
                    onChange: (event) => this.handleInputChange(event)
                });
            }
        });

        return (
            <div>
                <iframe title="frame" name="trash" style={{ display: 'none' }}></iframe>
                <form
                    className={this.props.className}
                    id={this.props.form}
                    //Pass along all of our values on submit
                    onSubmit={() => {
                        this.props.onSubmit(this.state.values);
                        document.getElementById(this.props.form).reset();
                        window.scrollTo(0, 0);
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