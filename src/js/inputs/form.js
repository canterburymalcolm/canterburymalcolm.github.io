import React, { Component } from 'react';
import { connect } from 'react-redux';
import { formMap } from '../../constants';
import { nextPage } from '../../redux/actions';
import { getPage } from '../../redux/selectors';

class Form extends Component {
    constructor(props) {
        super(props);
        //All the current values from the inputs in this form
        this.state = {
            values: {}
        };
    }

    //Most general input change handler
    //updates the value field in this forms state
    handleInputChange(event) {
        const target = event.target;
        const name = target.name;
        const value = target.value;
        this.setState({
            values: { ...this.state.values, [name]: value }
        })
    }

    render() {
        //Give our input change handler to all of our children
        const children = React.Children.map(this.props.children, (child) => {
            if (child) {
                return React.cloneElement(child, {
                    onChange: (event) => this.handleInputChange(event),
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
                    onSubmit={() => this.props.onSubmit(this.state.values)}
                    target="trash"
                >
                    {children}
                </form>

            </div>
        )
    }
}

export default connect(
    //Gives us our form id depending on the current page
    state => ({ form: formMap.get(getPage(state)) }),
    { nextPage }
)(Form);