import React from 'react';
import { connect } from 'react-redux';
import Title from './title';
import LogIn from './users/log-in';
import SignUp from './users/sign-up';
import AddParent from './parents/add-parent';
import AddDonor from './parents/add-donor';
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
        case PAGES.DONOR_MOM:
        case PAGES.DONOR_DAD:
            content = <AddDonor />;
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