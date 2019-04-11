import React from 'react';
import { connect } from 'react-redux';
import userBubble from '../assets/user-info-bubble.png';
import parentBubble from '../assets/parent-bubble.png';
import { PAGES } from '../constants';
import { getPage } from '../redux/selectors';
import '../styles/sidebar.scss';

const Sidebar = ({ page }) => {
    let image;
    switch(page) {
        case PAGES.ADD_MOM:
        case PAGES.ADD_DAD:
        case PAGES.DONOR_MOM:
        case PAGES.DONOR_DAD:
            image = parentBubble;
            break;
        default:
            image = userBubble;
    }
    return (
        <div className="sidebar">
            <div className="bubbles">
                <img alt="" src={image}></img>
            </div>
        </div>
    )
}

export default connect(
    state => ({ page: getPage(state) })
)(Sidebar);