import React from 'react';
import { connect } from 'react-redux';
import TextInput from './inputs/text-input';
import { PAGES } from '../constants';
import { getPage } from '../redux/selectors';
import '../styles/user-info.scss';

const LogIn = ({ page }) => {
    return (
        <div className="log-in">
            <TextInput
                name='user'
                desc='Username'
                placeholder='Your Username'
            />
            <TextInput
                name='pass'
                desc='Password'
                isPassword={true}
            />
            {page !== PAGES.LOG_IN &&
                <TextInput
                    name='confirm'
                    desc='Confirm password'
                    isPassword={true}
                />
            }
        </div>
    )
}

export default connect(
    state => ({ page: getPage(state) })
)(LogIn);