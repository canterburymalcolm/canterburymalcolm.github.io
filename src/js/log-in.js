import React, { Component } from 'react';
import { connect } from 'react-redux';
import Form from './inputs/form';
import TextInput from './inputs/text-input';
import { PAGES } from '../constants';
import { startUser, nextPage } from '../redux/actions';
import { getPage, getProfiles } from '../redux/selectors';
import '../styles/user-info.scss';

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
                //the username is free
                const match = user.password === user.confirm;
                const found = this.props.profiles.reduce((acc, profile) => {
                    return acc || (user.username === profile.username);
                }, false);
                if (!found && match) {
                    this.props.startUser(user);
                    this.props.nextPage();
                }
                this.setState({
                    isFree: !found,
                    isMatch: match
                });
            } :
            (user) => {
                //Get the index of the this user if it exists in profiles
                //Set the current user to that index
                let index = -1;
                this.props.profiles.forEach((profile, i) => {
                    if (user.username === profile.username
                        && user.password === profile.password) {
                        index = i;
                    }
                });
                const isValid = (index >= 0);
                if (isValid) {
                    this.props.startUser({ id: index });
                    this.props.nextPage();
                }
                this.setState({
                    isValid: isValid
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
        isLanding: (getPage(state) === PAGES.LANDING),
        profiles: getProfiles(state)
    }),
    { startUser, nextPage }
)(LogIn);