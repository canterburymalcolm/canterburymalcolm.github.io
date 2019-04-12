import React, { Component } from 'react';
import { connect } from 'react-redux';
import Form from '../inputs/form';
import TextInput from '../inputs/text-input';
import { PAGES } from '../../constants';
import { hasUser } from '../client';
import { setUser, nextPage } from '../../redux/actions';
import { getPage } from '../../redux/selectors';
import '../../styles/user-info.scss';

class LogIn extends Component {
    constructor(props) {
        super(props);
        //Whether or not to display error messages
        this.state = {
            isFree: true,
            isMatch: true,
            isValid: true
        };
    }
    render() {
        const onSubmit = this.props.isLanding ?
            (user) => {
                //Only start this user if the passwords match and 
                //the username is available 
                const match = user.password === user.confirm;
                hasUser(user, false, found => {
                    if (!found && match) {
                        this.props.setUser(user);
                        this.props.nextPage();
                    } else {
                        this.setState({
                            isFree: !found,
                            isMatch: match
                        });
                    }
                });
            } :
            (user) => {
                //Get the user_id of the this user if it exists
                //Set the current user to that id
                hasUser(user, true, index => {
                    if (index >= 0) {
                        this.props.setUser({ id: index });
                        this.props.nextPage();
                    } else {
                        this.setState({
                            isValid: false
                        });
                    }
                });

            };
        //Decide which error message to display
        let userError = '';
        if (!this.state.isFree && this.props.isLanding) {
            userError = '*this username is already in use';
        } else if (!this.state.isValid && !this.props.isLanding) {
            userError = '*either the username or password is incorrect';
        }
        return (
            <Form
                className="log-in"
                onSubmit={(user) => onSubmit(user)}
            >
                <TextInput
                    name='username'
                    desc='Username'
                    placeholder='Your Username'
                    error={userError}
                />
                <TextInput
                    name='password'
                    desc='Password'
                    isPassword={true}
                    error={(!this.state.isMatch && this.props.isLanding)
                        && '*passwords must match'}
                />
                {this.props.isLanding &&
                    <TextInput
                        name='confirm'
                        desc='Confirm password'
                        isPassword={true}
                    />
                }
            </ Form>
        )
    }
}

export default connect(
    state => ({
        isLanding: (getPage(state) === PAGES.LANDING)
    }),
    { setUser, nextPage }
)(LogIn);