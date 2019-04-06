import React from 'react';
import { connect } from 'react-redux';
import Title from './title';
import LogIn from './log-in';
import SignUp from './sign-up';
import AddParent from './add-parent';
import Footer from './footer';
import { PAGES } from '../constants';
import { getPage } from '../redux/selectors';
import '../styles/content.scss';

const Content = ({ page }) => {
    let content;
    let title;
    
    //Determine what content and what title to use depending on the current page
    switch (page) {
        case PAGES.LOG_IN:
            content = <LogIn />;
            break;
        case PAGES.ADD_USER:
            content = <SignUp />;
            break;
        case PAGES.ADD_DAD:
        case PAGES.ADD_MOM:
            content = <AddParent />;
            break;
        default:
            content = <LogIn />;
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