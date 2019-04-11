import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PAGES, formMap } from '../../constants';
import { getPage, getMom, getDad } from '../../redux/selectors';

class Form extends Component {
    constructor(props) {
        super(props);
        //All the current values from the inputs in this form

        let initial = {};
        if (props.page === PAGES.ADD_MOM || props.page === PAGES.ADD_DAD) {
            initial = props.page === PAGES.ADD_MOM ? getMom() : getDad();
        } 
        this.state = {
            values: initial 
        };
        
    }

    //Most general input change handler
    //updates the value field in this forms state
    handleInputChange(event) {
        const target = event.target;
        const name = target.name;
        const value = target.value;
        this.setState(state => {
            return {
                values: { ...state.values, [name]: value }
            }
        } /*, () => { this.props.onChange(this.state.values) }*/ );
    }

    render() {
        //Give our input change handler to all of our children
        const children = React.Children.map(this.props.children, (child) => {
            if (child) {
                //console.log(child.props.name + ': ' + this.state.values[child.props.name]);
                return React.cloneElement(child, {
                    onChange: (event) => this.handleInputChange(event),
                    //initial: this.state.values[child.props.name]  
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
    //Gives us our form id depending on the current page
    state => ({ form: formMap.get(getPage(state)) })
)(Form);