import React from 'react';
import { connect } from 'react-redux';
import Title from './title';
import LogIn from './log-in';
import SignUp from './sign-up';
import Footer from './footer';
import { PAGES } from '../constants';
import { getPage } from '../redux/selectors';
import '../styles/content.scss';

const Content = ({ page }) => {
    let content;
    let title;
    switch (page) {
        case PAGES.LOG_IN:
            content = <LogIn />
            title = "Welcome back! Log in with your info below.";
            break;
        case PAGES.SIGN_UP:
            content = <SignUp />
            title = "Hello! Please tell us a little bit about yourself.";
            break;
        default:
            content = <LogIn />
            title = "Let's create your account to get started designing a baby!";
    }

    return (
        <div className="content">
            <Title text={title}/>
            {content}
            <Footer />
        </div>
    )
}

export default connect(
    state => ({ page: getPage(state) })
)(Content);